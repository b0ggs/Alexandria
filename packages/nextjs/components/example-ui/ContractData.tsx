import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
// import { useAccount } from "wagmi";
import {
  // useAnimationConfig,
  // useScaffoldContract,
  // useScaffoldContractRead,
  // useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  // const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const totalCounter = "0";
  const currentGreeting = "AlexandriaV1";
  // const { data: bookMintQueue } = useScaffoldContractRead({
  //   contractName: "AlexandriaData",
  //   functionName: "bookMintQueue",
  // });

  // const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
  //   contractName: "YourContract",
  //   functionName: "greeting",
  // });

  // useScaffoldEventSubscriber({
  //   contractName: "AlexandriaData",
  //   eventName: "MintQueueUpdated",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { message } = log.args;
  //       console.log("📡 MintQueueUpdated event", message);
  //     });
  //   },
  // });

  // const {
  //   data: reservationMadeChangeEvents,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "AlexandriaOracle",
  //   eventName: "ReservationMade",
  //   fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
  //   filters: { reserver: address },
  //   blockData: true,
  // });

  // console.log("Events:", isLoadingEvents, errorReadingEvents, reservationMadeChangeEvents);

  // const {
  //   data: pageMintedChangeEvents,
  //   isLoading: isLoadingPageMintedEvents,
  //   error: errorPageMintedReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "AlexandriaMint",
  //   eventName: "PageMinted",
  //   fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
  //   // filters: { reserver: address },
  //   blockData: true,
  // });
  // console.log("Events:", isLoadingPageMintedEvents, errorPageMintedReadingEvents, pageMintedChangeEvents);

  useScaffoldEventSubscriber({
    contractName: "AlexandriaOracle",
    eventName: "ReservationMade",
    listener: logs => {
      logs.map(log => {
        const { bookHash, startPage, endPage, pageCount, bookURL } = log.args;
        console.log("📡 ReservationMade event", { bookHash, startPage, endPage, pageCount, bookURL });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaOracle",
    eventName: "BookProposed",
    listener: logs => {
      logs.map(log => {
        const { bookHash, bookId, startPage, endPage, bookBondAmount, pageCount, carURI, bookURL } = log.args;
        console.log("📡 BookProposed event", {
          bookHash,
          bookId,
          startPage,
          endPage,
          bookBondAmount,
          pageCount,
          carURI,
          bookURL,
        });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaData",
    eventName: "DisputeAddedToMintQueue",
    listener: logs => {
      logs.map(log => {
        const { bookId, disputer, pageCount, carURI } = log.args;
        console.log("📡 DisputeAddedToMintQueue event", { bookId, disputer, pageCount, carURI });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaOracle",
    eventName: "BookDisputed",
    listener: logs => {
      logs.map(log => {
        const { bookHash, bookId, startPage, endPage, bookBondAmount, disputer, pageCount, carURI, bookURL } = log.args;
        console.log("📡 DisputeAddedToMintQueue event", {
          bookHash,
          bookId,
          startPage,
          endPage,
          bookBondAmount,
          disputer,
          pageCount,
          carURI,
          bookURL,
        });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaMint",
    eventName: "PageMinted",
    listener: logs => {
      logs.map(log => {
        const { tokenId, carURI } = log.args;
        console.log("📡 PageMinted event", { tokenId, carURI });
      });
    },
  });

  // const { data: yourContract } = useScaffoldContract({ contractName: "AlexandriaV1" });
  // console.log("yourContract: ", yourContract?.address);

  const showAnimation = false;
  const showTransition = false;
  // const { showAnimation } = useAnimationConfig()
  // const { showAnimation } = useAnimationConfig(totalCounter);

  // const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/alexandria.jpg')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-4xl bg-base-200 rounded shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <span className="text-4xl">Proposed</span>
        <div className="flex justify-between w-full">
          <button
            className="hidden btn btn-circle btn-ghost relative bg-center bg-[url('/assets/switch-button-on.png')] bg-no-repeat"
            onClick={() => {
              setTransitionEnabled(!transitionEnabled);
            }}
          >
            <div
              className={`absolute inset-0 bg-center bg-no-repeat bg-[url('/assets/switch-button-off.png')] transition-opacity ${
                transitionEnabled ? "opacity-0" : "opacity-100"
              }`}
            />
          </button>
          <div className="bg-secondary border border-primary rounded-xl hidden">
            <div className="p-2 py-1 border-r border-primary flex items-end">Total count</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {totalCounter?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border border-primary bg-neutral rounded-xl text-secondary  overflow-hidden whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          <div className="relative overflow-x-hidden" ref={containerRef}>
            {/* for speed calculating purposes */}
            <div className="hidden absolute -left-[9999rem]" ref={greetingRef}>
              <div className="px-4">{currentGreeting}</div>
            </div>
            <table className="w-full table-auto border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300">Book Hash</th>
                  <th className="border border-slate-300">Book Id</th>
                  <th className="border border-slate-300"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300">
                    0xa4dde636154771510ae537862844c8049e2b1be99d57907459b1e1330a6eddd9
                  </td>
                  <td className="border border-slate-300">1</td>
                  <td className="border border-slate-300">
                    <a href="#">Dispute</a>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* {new Array(3).fill("").map((_, i) => {
              const isLineRightDirection = i % 2 ? isRightDirection : !isRightDirection;
              return (
                <Marquee
                  key={i}
                  direction={isLineRightDirection ? "right" : "left"}
                  gradient={false}
                  play={showTransition}
                  speed={marqueeSpeed}
                  className={i % 2 ? "-my-10" : ""}
                >
                  <div className="px-4">{currentGreeting || " "}</div>
                </Marquee>
              );
            })} */}
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <button
            className={`hidden btn btn-circle btn-ghost border border-primary hover:border-primary w-12 h-12 p-1 bg-neutral flex items-center ${
              isRightDirection ? "justify-start" : "justify-end"
            }`}
            onClick={() => {
              if (transitionEnabled) {
                setIsRightDirection(!isRightDirection);
              }
            }}
          >
            <div className="border border-primary rounded-full bg-secondary w-2 h-2" />
          </button>
          <div className="hidden w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full">
            <div
              className="h-1.5 border border-primary rounded-full bg-secondary animate-grow"
              style={{ animationPlayState: showTransition ? "running" : "paused" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
