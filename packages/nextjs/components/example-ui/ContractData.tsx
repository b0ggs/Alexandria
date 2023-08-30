import { useRef, useState } from "react";
// import { useAccount } from "wagmi";
import BookEvents from "./BookEvents";
import type {
  BookAddedToMintQueueEvent,
  BookEventsType,
  DisputeAddedToMintQueueEvent,
  DisputeEvent,
  PageBurnedEvent,
  PageMintedEvent,
  ProposeEvent,
  ReservationMadeEvent,
} from "./EventTypes";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  // const { address } = useAccount();
  const [bookEvents, setBookEvents] = useState<BookEventsType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const addBookEvent = (evt: BookEventsType) => {
    setBookEvents(prev => {
      console.log("Adding evt to bookEvents | size:", prev.length);
      const newEvents = [...prev, evt];
      return newEvents;
    });
  };

  useScaffoldEventSubscriber({
    contractName: "AlexandriaOracle",
    eventName: "ReservationMade",
    listener: logs => {
      logs.map(log => {
        const { bookHash, startPage, endPage, pageCount, bookURL } = log.args;
        const evt = { kind: "reservationMade", ...log.args } satisfies ReservationMadeEvent;
        addBookEvent(evt);
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
        const evt = { kind: "propose", ...log.args } satisfies ProposeEvent;
        addBookEvent(evt);
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
    contractName: "AlexandriaOracle",
    eventName: "BookAddedToMintQueue",
    listener: logs => {
      logs.map(log => {
        const { bookId } = log.args;
        const evt = { kind: "bookAddedToMintQueue", ...log.args } satisfies BookAddedToMintQueueEvent;
        addBookEvent(evt);
        console.log("📡 BookAddedToMintQueue event", { bookId });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaData",
    eventName: "DisputeAddedToMintQueue",
    listener: logs => {
      logs.map(log => {
        const { bookId, disputer, pageCount, carURI } = log.args;
        const evt = { kind: "disputeAddedToMintQueue", ...log.args } satisfies DisputeAddedToMintQueueEvent;
        addBookEvent(evt);
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
        const evt = { kind: "dispute", ...log.args } satisfies DisputeEvent;
        addBookEvent(evt);
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
        const { tokenId, carURI, recipient } = log.args;
        const evt = { kind: "pageMinted", ...log.args } satisfies PageMintedEvent;
        addBookEvent(evt);
        console.log("📡 PageMinted event", { tokenId, carURI, recipient });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "AlexandriaV1",
    eventName: "PageBurned",
    listener: logs => {
      logs.map(log => {
        const { tokenId, claimer } = log.args;
        const evt = { kind: "pageBurned", ...log.args } satisfies PageBurnedEvent;
        addBookEvent(evt);
        console.log("📡 PageBurned event", { tokenId, claimer });
      });
    },
  });

  return (
    <div className="flex flex-col items-center bg-[url('/assets/alexandria.jpg')] bg-[length:100%_100%] py-6 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div className={`flex flex-col max-w-4xl bg-base-200 rounded shadow-lg px-5 py-4 w-full`}>
        <span className="text-4xl">History</span>

        <div className="mt-3 border border-primary bg-neutral rounded text-secondary  overflow-hidden whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          <div className="relative overflow-x-hidden" ref={containerRef}>
            {/* for speed calculating purposes */}
            <div className="flex flex-col items-start max-h-[90%]">
              <BookEvents events={bookEvents} />
            </div>
            <table className="hidden w-full table-auto border-collapse border border-slate-400">
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
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div className="hidden w-44 p-0.5 items-center bg-neutral border border-primary rounded-full">
            <div className="h-1.5 border border-primary rounded-full bg-secondary animate-grow" />
          </div>
        </div>
      </div>
    </div>
  );
};
