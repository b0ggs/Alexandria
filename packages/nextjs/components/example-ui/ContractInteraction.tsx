import { useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  // const [visible, setVisible] = useState(true);
  const [proposeBookHash, setProposeBookHash] = useState("");
  const [proposePageCount, setProposePageCount] = useState(1);
  const [reserveBookUrl, setReserveBookUrl] = useState("");
  const [disputeBookId, setDisputeBookId] = useState(0);
  const [proposeCarUri, setProposeCarUri] = useState("");
  const [reserveCost, setReserveCost] = useState(0);
  const [claimAndBurnBookId, setClaimAndBurnBookId] = useState(0);

  const { writeAsync: writeReserveAsync, isLoading: isReserveLoading } = useScaffoldContractWrite({
    contractName: "AlexandriaV1",
    functionName: "reservePages",
    args: [proposeBookHash, BigNumber.from(proposePageCount).toBigInt(), reserveBookUrl] as readonly [
      `0x${string}` | undefined,
      bigint | undefined,
      string | undefined,
    ],
    // args: [proposeBookHash, proposePageCount],
    value: reserveCost.toPrecision(18) as `${number}`,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeClaimAndBurnAsync, isLoading: isClaimAndBurnLoading } = useScaffoldContractWrite({
    contractName: "AlexandriaV1",
    functionName: "claimAndBurn",
    args: [BigNumber.from(claimAndBurnBookId).toBigInt()] as readonly [bigint | undefined],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeProposeAsync, isLoading: isProposeLoading } = useScaffoldContractWrite({
    contractName: "AlexandriaV1",
    functionName: "propose",
    args: [proposeCarUri] as readonly [string | undefined],
    // value: "0.001",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeDisputeAsync, isLoading: isDisputeLoading } = useScaffoldContractWrite({
    contractName: "AlexandriaV1",
    functionName: "dispute",
    args: [BigNumber.from(disputeBookId).toBigInt()] as readonly [bigint | undefined],
    // args: [proposeBookHash, proposePageCount],
    value: reserveCost.toPrecision(18) as `${number}`,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeMintPageAsync, isLoading: isMintPageLoading } = useScaffoldContractWrite({
    contractName: "AlexandriaV1",
    functionName: "mintPage",
    // value: "0.001",
    value: "0.0011",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-[url('/assets/alexandria.jpg')] bg-[length:100%_100%] relative pb-10">
      {/* <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" /> */}
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        {/* <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">👋🏻</span>
            <div>
              <div>
                In this page you can see how some of our <strong>hooks & components</strong> work, and how you can bring
                them to life with your own design! Have fun and try it out!
              </div>
              <div className="mt-2">
                Check out{" "}
                <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem]">
                  packages / nextjs/pages / example-ui.tsx
                </code>{" "}
                and its underlying components.
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div> */}

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Reserve Pages</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Book URL"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => setReserveBookUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Book Hash"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => setProposeBookHash(e.target.value)}
            />
            <input
              type="text"
              placeholder="Page Count"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => {
                const numPages = +e.target.value;
                setProposePageCount(numPages);
                setReserveCost(numPages * 0.001);
              }}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeReserveAsync()}
                  disabled={isReserveLoading}
                >
                  {isReserveLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <span className="text-4xl sm:text-6xl text-black">Propose</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Car Uri"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => setProposeCarUri(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeProposeAsync()}
                  disabled={isProposeLoading}
                >
                  {isProposeLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <span className="text-4xl sm:text-6xl text-black">Dispute</span>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Proposed Book ID"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => setDisputeBookId(+e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeDisputeAsync()}
                  disabled={isDisputeLoading}
                >
                  {isDisputeLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <span className="text-4xl sm:text-6xl text-black">Mint Page</span>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              className="input invisible font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
            />

            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeMintPageAsync()}
                  disabled={isMintPageLoading}
                >
                  {isMintPageLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <span className="text-4xl sm:text-6xl text-black">Claim &#38; Burn</span>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Book ID"
              className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray-500"
              onChange={e => setClaimAndBurnBookId(+e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeClaimAndBurnAsync()}
                  disabled={isClaimAndBurnLoading}
                >
                  {isClaimAndBurnLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 hidden gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
