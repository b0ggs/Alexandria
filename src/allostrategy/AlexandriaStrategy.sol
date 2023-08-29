//TODO check all requires
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

// Interfaces
import {IAllo} from "allo-v2/core/interfaces/IAllo.sol";
import {IAlexandriaPayoutStrategy} from "./interfaces/IAlexandriaPayoutStrategy.sol";
import {IRegistry} from "allo-v2/core/interfaces/IRegistry.sol";

// Internal Libraries
import {BaseStrategy} from "allo-v2/strategies/BaseStrategy.sol";
import {AlexandriaV1} from "../core/AlexandriaV1.sol";

// External Libraries
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Alexandria Strategy for Allo Protocol
/// @author b0gs
/// @notice This strategy allows for the integration of minting NFTs on Alexandria as an Allo strategy.
/// @dev This contract must integrate with an AlexandriaPayoutStrategy.
contract AlexandriaStrategy is BaseStrategy, Initializable, ReentrancyGuard {
    /// ==========================
    /// ==== State Variables =====
    /// ==========================

    address public owner;
    AlexandriaV1 public alexandria;
    IAllo public alloContract;
    IAlexandriaPayoutStrategy public payoutStrategy;
    IRegistry private _registry;
    uint256 public currentPoolId;
    uint256 public allocationStartTime;
    uint256 public allocationEndTime;
    uint256 public registrationStartTime;
    uint256 public registrationEndTime;
    uint256 public totalDonations;

    //@notice allocateToRecipient determines whether donations from users
    //go to the project, the Project Registry, or to increasing the pool.
    bool public allocateToRecipient;
    mapping(address => bool) public registeredRecipients;
    mapping(address => uint256) public recipientDonations;
    address[] public addressArray;

    /// ======================
    /// ======= Events =======
    /// ======================

    event DonationAllocated(address indexed recipient, uint256 amount);
    event FundsDistributed(address indexed recipient, uint256 amount);
    event RemoveAdditionalFunds(string message);
    event AlexandriaInitialized(
        uint256 poolId,
        bool allocateToRecipient,
        uint256 registrationStartTime,
        uint256 registrationEndTime,
        uint256 allocationStartTime,
        uint256 allocationEndTime
    );
    event StrategyReset(
        uint256 poolId,
        bool allocateToRecipient,
        uint256 registrationStartTime,
        uint256 registrationEndTime,
        uint256 allocationStartTime,
        uint256 allocationEndTime
    );
    event OwnerChanged(address indexed previousOwner, address indexed newOwner);
    event AllocationTimeSet(
        uint256 allocationStartTime,
        uint256 allocationEndTime
    );
    event RegistrationTimeSet(
        uint256 registrationStartTime,
        uint256 registrationEndTime
    );
    event StrategyPoolFunded(uint256 amount);
    event PayoutStrategyUpdated(
        address indexed previousStrategy,
        address indexed newStrategy
    );
    event RecipientRegistered(address indexed recipient);
    event AmountWithdrawn(address indexed poolManager, uint256 amount);

    /// ====================================
    /// =========== Modifiers ==============
    /// ====================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyActiveRegistration() {
        require(
            block.timestamp >= registrationStartTime &&
                block.timestamp <= registrationEndTime,
            "Registration not active"
        );
        _;
    }

    modifier onlyWhenPoolActive() {
        require(_isPoolActive(), "Pool is not active");
        _;
    }

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

    /// @notice Creates a new AlexandriaStrategy contract.
    /// @param _allo The address of the Allo contract.
    /// @param _name The name of the strategy.
    /// @param _initialStrategy The address of the initial payout strategy.
    /// @param _alexandria The address of the Alexandria contract.
    constructor(
        address _allo,
        string memory _name,
        address _initialStrategy,
        address _alexandria
    ) BaseStrategy(_allo, _name) {
        payoutStrategy = IAlexandriaPayoutStrategy(_initialStrategy);
        alexandria = AlexandriaV1(_alexandria);
        owner = msg.sender;
        alloContract = IAllo(_allo);
    }

    /// ===============================
    /// ========= Initialize ==========
    /// ===============================

    function initialize(
        uint256 /*_poolId*/,
        bytes memory /*_data*/
    ) external pure override {
        revert("Use AlexandriaInitialize Instead");
    }

    /// @notice Initializes the Alexandria strategy.
    /// @dev This function should be called after deploying the contract.
    /// @param _poolId The ID of the pool.
    /// @param _allocateToRecipient Whether donations from users are allocated to the recipient.
    /// @param _registrationStartTime The start time for registration.
    /// @param _registrationEndTime The end time for registration.
    /// @param _allocationStartTime The start time for allocation.
    /// @param _allocationEndTime The end time for allocation.
    function AlexandriaInitialize(
        uint256 _poolId,
        bool _allocateToRecipient,
        uint256 _registrationStartTime,
        uint256 _registrationEndTime,
        uint256 _allocationStartTime,
        uint256 _allocationEndTime
    ) external initializer {
        _initializeOrReset(
            _poolId,
            _allocateToRecipient,
            _registrationStartTime,
            _registrationEndTime,
            _allocationStartTime,
            _allocationEndTime
        );
        emit AlexandriaInitialized(
            _poolId,
            _allocateToRecipient,
            _registrationStartTime,
            _registrationEndTime,
            _allocationStartTime,
            _allocationEndTime
        );
    }

    /// ========================
    /// ======= External =======
    /// ========================

    /// @notice Resets the strategy with new parameters.
    /// @param _poolId The ID of the new pool.
    /// @param _allocateToRecipient Whether donations from users are allocated to the recipient.
    /// @param _registrationStartTime The start time for registration.
    /// @param _registrationEndTime The end time for registration.
    /// @param _allocationStartTime The start time for allocation.
    /// @param _allocationEndTime The end time for allocation.
    function resetStrategy(
        uint256 _poolId,
        bool _allocateToRecipient,
        uint256 _registrationStartTime,
        uint256 _registrationEndTime,
        uint256 _allocationStartTime,
        uint256 _allocationEndTime
    ) external onlyOwner {
        // Reset necessary state variables
        require(!_isPoolActive(), "Allocation period is live");
        poolAmount = 0;
        totalDonations = 0;

        for (uint256 i = 0; i < addressArray.length; i++) {
            registeredRecipients[addressArray[i]] = false;
            recipientDonations[addressArray[i]] = 0;
        }
        delete addressArray;

        _initializeOrReset(
            _poolId,
            _allocateToRecipient,
            _registrationStartTime,
            _registrationEndTime,
            _allocationStartTime,
            _allocationEndTime
        );
        emit StrategyReset(
            _poolId,
            _allocateToRecipient,
            _registrationStartTime,
            _registrationEndTime,
            _allocationStartTime,
            _allocationEndTime
        );
    }

    /// @notice Updates the owner of the strategy.
    /// @param _newOwner The address of the new owner.
    function setOwner(address _newOwner) external onlyOwner {
        require(
            _newOwner != address(0),
            "New owner cannot be the zero address"
        );
        owner = _newOwner;
        emit OwnerChanged(owner, _newOwner);
    }

    /// @notice Sets the allocation time for the strategy.
    /// @param _allocationStartTime The start time for allocation.
    /// @param _allocationEndTime The end time for allocation.
    function setAllocationTime(
        uint256 _allocationStartTime,
        uint256 _allocationEndTime
    ) external onlyOwner {
        _setAllocationTime(_allocationStartTime, _allocationEndTime);
        emit AllocationTimeSet(_allocationStartTime, _allocationEndTime);
    }

    /// @notice Sets the registration time for the strategy.
    /// @param _registrationStartTime The start time for registration.
    /// @param _registrationEndTime The end time for registration.
    function setRegistrationTime(
        uint256 _registrationStartTime,
        uint256 _registrationEndTime
    ) external onlyOwner {
        require(
            block.timestamp < _registrationStartTime &&
                _registrationStartTime < _registrationEndTime,
            "Invalid timestamps"
        );
        registrationStartTime = _registrationStartTime;
        registrationEndTime = _registrationEndTime;
        emit RegistrationTimeSet(_registrationStartTime, _registrationEndTime);
    }

    /// @notice Funds the strategy pool with a specified amount.
    /// @param _amount The amount to fund the strategy pool with.
    function fundStrategyPool(
        uint256 _amount
    ) external payable onlyOwner nonReentrant {
        require(_amount > 0, "Amount should be greater than zero");
        alloContract.fundPool(currentPoolId, _amount);
        poolAmount += _amount;
        emit StrategyPoolFunded(_amount);
    }

    /// @notice Updates the payout strategy for the contract.
    /// @param newStrategy The address of the new payout strategy.
    function setPayoutStrategy(address newStrategy) external onlyOwner {
        payoutStrategy = IAlexandriaPayoutStrategy(newStrategy);
        emit PayoutStrategyUpdated(address(payoutStrategy), newStrategy);
    }

    /// @notice Retrieves the status of a recipient.
    /// @param _recipientAddress The address of the recipient.
    /// @return RecipientStatus Returns the internal recipient status specific to this strategy.
    function getRecipientStatus(
        address _recipientAddress
    ) external view override returns (RecipientStatus) {
        return _getRecipientStatus(_recipientAddress);
    }

    /// @notice Registers a new recipient.
    /// @param recipient The address of the recipient to register.
    function registerRecipient(
        address recipient
    ) external onlyActiveRegistration {
        require(
            _registry.isOwnerOrMemberOfProfile(
                keccak256(abi.encode(recipient)),
                msg.sender
            ),
            "Not a registered profile in IRegistry"
        );
        require(
            !registeredRecipients[recipient],
            "Recipient already registered"
        );
        _registerRecipient(abi.encode(recipient), msg.sender);
    }

    /// @notice Allows a user to donate and mint.
    /// @param project The address of the project to donate to.
    function donateAndmint(
        address project
    ) external payable nonReentrant onlyWhenPoolActive {
        require(
            registeredRecipients[project],
            "Project is not a registered recipient"
        );
        uint256 mintCost = payoutStrategy.mintCost();
        uint256 minimumDonation = payoutStrategy.minimumDonation();
        require(
            msg.value >= mintCost + minimumDonation,
            "Insufficient funds sent"
        );

        // Update votes in AlexandriaQVPayout
        payoutStrategy.updateVotesForDonation(project, msg.value);

        // Forward the mintCost to the alexandria contract and mint
        alexandria.mintPageDonation{value: mintCost}(msg.sender);

        uint256 donationAmount = msg.value - mintCost;
        alloContract.fundPool(currentPoolId, donationAmount);
        poolAmount += donationAmount;

        // If allocateToRecipient is true, then allocate immediately
        if (allocateToRecipient) {
            bytes memory data = abi.encode(project, donationAmount);
            alloContract.allocate(currentPoolId, data);
            totalDonations += donationAmount;
        }
    }

    /// @notice Allows the pool manager to withdraw a specified amount from the strategy pool.
    /// @dev The amount withdrawn must be less than or equal to the available pool funds.
    /// @param _amount The amount to be withdrawn from the strategy pool.
    function withdraw(
        uint256 _amount
    ) external onlyPoolManager(msg.sender) onlyWhenPoolActive {
        // Decrement the pool amount
        require(_amount > 0, "Amount should be greater than zero");
        require(_amount <= poolAmount, "Amount exceeds available pool funds");

        poolAmount -= _amount;

        // Transfer the amount to the pool manager
        _transferAmount(
            alloContract.getPool(poolId).token,
            msg.sender,
            _amount
        );
        emit AmountWithdrawn(msg.sender, _amount);
    }

    /// @notice Distributes funds to registered recipients.
    function distribute() external onlyOwner onlyWhenPoolActive {
        require(
            block.timestamp > allocationEndTime,
            "Allocation period is not over yet"
        );

        address[] memory recipients = _getAllRecipients();
        uint256[] memory amounts;
        IAllo.Pool memory pool = alloContract.getPool(poolId);
        address poolToken = pool.token;
        uint256 totalDistributed = 0;

        if (allocateToRecipient) {
            amounts = payoutStrategy.calculateDistributions(
                recipients,
                poolAmount - totalDonations
            );
            for (uint256 i = 0; i < recipients.length; i++) {
                uint256 totalAmountForRecipient = amounts[i] +
                    recipientDonations[recipients[i]];
                _transferAmount(
                    poolToken,
                    recipients[i],
                    totalAmountForRecipient
                );
                totalDistributed += amounts[i];
                recipientDonations[recipients[i]] = 0;
                emit FundsDistributed(recipients[i], totalAmountForRecipient);
            }
        } else {
            amounts = payoutStrategy.calculateDistributions(
                recipients,
                poolAmount
            );
            for (uint256 i = 0; i < recipients.length; i++) {
                _transferAmount(poolToken, recipients[i], amounts[i]);
                totalDistributed += amounts[i];
                emit FundsDistributed(recipients[i], amounts[i]);
            }
        }
        require(poolAmount >= totalDistributed, "Insufficient funds in pool");
        poolAmount -= totalDistributed;
        if (poolAmount == 0) {
            _setPoolActive(false);
        } else {
            emit RemoveAdditionalFunds("Use withdraw to remove final funds");
        }
    }

    /// @notice Retrieves the minimum donation amount.
    /// @return The minimum donation amount.
    function getMinimumDonation() external view returns (uint256) {
        return payoutStrategy.minimumDonation();
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    /// @notice Shared logic for AlexandriaInitialize and resetStrategy.
    /// @param _poolId The ID of the pool.
    /// @param _allocateToRecipient Whether donations from users are allocated to the recipient.
    /// @param _registrationStartTime The start time for registration.
    /// @param _registrationEndTime The end time for registration.
    /// @param _allocationStartTime The start time for allocation.
    /// @param _allocationEndTime The end time for allocation.
    function _initializeOrReset(
        uint256 _poolId,
        bool _allocateToRecipient,
        uint256 _registrationStartTime,
        uint256 _registrationEndTime,
        uint256 _allocationStartTime,
        uint256 _allocationEndTime
    ) internal {
        __BaseStrategy_init(_poolId);

        allocateToRecipient = _allocateToRecipient;
        _registry = alloContract.getRegistry();

        // Set the registration and allocation times
        require(
            block.timestamp < _registrationStartTime &&
                _registrationStartTime < _registrationEndTime,
            "Invalid registration timestamps"
        );
        registrationStartTime = _registrationStartTime;
        registrationEndTime = _registrationEndTime;

        require(
            block.timestamp < _allocationStartTime &&
                _allocationStartTime < _allocationEndTime,
            "Invalid allocation timestamps"
        );
        allocationStartTime = _allocationStartTime;
        allocationEndTime = _allocationEndTime;
        _setPoolActive(true);
    }

    /// @dev Retrieves all registered recipients.
    /// This function first counts the number of valid recipients and then
    /// allocates memory to store their addresses. It then populates the
    /// array with the addresses of the registered recipients.
    /// @return recipients An array containing the addresses of all registered recipients.
    function _getAllRecipients() internal view returns (address[] memory) {
        uint256 recipientCount = 0;

        // First, count the number of valid recipients
        for (uint256 i = 0; i < addressArray.length; i++) {
            if (registeredRecipients[addressArray[i]]) {
                recipientCount++;
            }
        }
        // Now, allocate memory for the recipients and fill it
        address[] memory recipients = new address[](recipientCount);
        uint256 index = 0;
        for (uint256 i = 0; i < addressArray.length; i++) {
            if (registeredRecipients[addressArray[i]]) {
                recipients[index] = addressArray[i];
                index++;
            }
        }

        return recipients;
    }

    /// @notice Sets the allocation times for the strategy.
    /// @param _allocationStartTime The start time for allocation.
    /// @param _allocationEndTime The end time for allocation.
    function _setAllocationTime(
        uint256 _allocationStartTime,
        uint256 _allocationEndTime
    ) internal {
        require(
            block.timestamp < _allocationStartTime &&
                _allocationStartTime < _allocationEndTime,
            "Invalid timestamps"
        );
        allocationStartTime = _allocationStartTime;
        allocationEndTime = _allocationEndTime;
    }

    /// @notice Retrieves the internal status of a recipient.
    /// @param _recipientAddress The address of the recipient.
    /// @return The internal status of the recipient.
    function _getRecipientStatus(
        address _recipientAddress
    ) internal view override returns (RecipientStatus) {
        if (
            !_registry.isOwnerOrMemberOfProfile(
                keccak256(abi.encode(_recipientAddress)),
                _recipientAddress
            )
        ) {
            return RecipientStatus.Rejected;
        }
        if (!registeredRecipients[_recipientAddress]) {
            return RecipientStatus.None;
        }
        return RecipientStatus.Accepted; // All recipients are accepted in this strategy
    }

    /// @notice Allocates funds to a recipient.
    /// @param _data Encoded data containing the recipient's address and the amount to allocate.
    function _allocate(
        bytes memory _data,
        address /*_sender*/
    ) internal override {
        (address decodedRecipient, uint256 decodedAmount) = abi.decode(
            _data,
            (address, uint256)
        );

        require(decodedRecipient != address(0), "Invalid recipient address");
        require(
            decodedAmount > 0 && decodedAmount <= poolAmount,
            "Invalid allocation amount"
        );
        require(
            registeredRecipients[decodedRecipient],
            "Recipient not registered or not in 'Accepted' state"
        );

        recipientDonations[decodedRecipient] += decodedAmount;

        emit DonationAllocated(decodedRecipient, decodedAmount);
    }

    /// @notice Distributes funds to recipients.
    /// @dev This function is overridden to revert because the main distribute function should be used.
    function _distribute(
        address[] memory /*_recipientIds*/,
        bytes memory /*_data*/,
        address /*_sender*/
    ) internal pure override {
        revert("Use distribute function");
    }

    /// @notice Registers a recipient internally.
    /// @param _data Encoded data containing the recipient's address.
    /// @return The address of the registered recipient.
    function _registerRecipient(
        bytes memory _data,
        address /*_sender*/
    ) internal override returns (address) {
        address decodedRecipient = abi.decode(_data, (address));
        registeredRecipients[decodedRecipient] = true;
        addressArray.push(decodedRecipient);
        emit RecipientRegistered(decodedRecipient);
        return decodedRecipient;
    }

    /// @notice Checks if the pool is currently active.
    /// @return True if the pool is active, false otherwise.
    function _isPoolActive() internal view override returns (bool) {
        return
            allocationStartTime <= block.timestamp &&
            block.timestamp <= allocationEndTime;
    }

    /// @notice Retrieves the payout summary for a recipient.
    /// @param _recipientId The address of the recipient.
    /// @return The payout summary for the recipient.
    function _getPayout(
        address _recipientId,
        bytes memory
    ) internal view override returns (PayoutSummary memory) {
        address[] memory recipients = _getAllRecipients();
        uint256 payoutAmount = payoutStrategy.getPayoutAmount(
            _recipientId,
            poolAmount,
            recipients
        );
        return PayoutSummary(_recipientId, payoutAmount);
    }

    /// @notice Checks if an address is a valid allocator.
    /// @param _allocator The address to check.
    /// @return True if the address is a valid allocator, false otherwise.
    function _isValidAllocator(
        address _allocator
    ) internal view override returns (bool) {
        return alloContract.isPoolManager(poolId, _allocator);
    }
}
