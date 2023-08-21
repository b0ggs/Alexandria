// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "forge-std/Script.sol";
import "../src/AlexandriaData.sol";
import "../src/AlexandriaMint.sol";
import "../src/AlexandriaOracle.sol";
import "../src/AlexandriaV1.sol";

/**
 * To deploy to goerli, make sure INFURA_API_KEY, ETHERSCAN_API_KEY and PRIVATE_KEY are set where
 * ETHERSCAN_API_KEY is derived from a free etherscan account
 * INFURA_API_KEY is derived from a free infura account
 * PRIVATE_KEY the private key of a wallet you want to deploy the contract
 * run: source .env && \
 *      ETHERSCAN_API_KEY=$(ETHERSCAN_API_KEY) \
 *      PRIVATE_KEY=$(PRIVATE_KEY) \
 *      forge script script/Deploy.s.sol:GoerliDeploy --rpc-url https://goerli.infura.io/v3/$(INFURA_API_KEY) --broadcast --verify -vvvv
 */
contract GoerliDeploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address alexandriaData = new AlexandriaData();
        address alexandriaOracle = new AlexandriaOracle(alexandriaData);
        address alexandriaMint = new AlexandriaMint(alexandriaData);
        AlexandriaV1 v1 = new AlexandriaV1(
            alexandriaData,
            alexandriaOracle,
            alexandriaMint
        );

        // v1.propose(...);
        vm.stopBroadcast();
    }
}
