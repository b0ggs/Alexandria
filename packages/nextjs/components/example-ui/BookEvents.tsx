import {
  BookAddedToMintQueueEvent,
  BookEventsType,
  DisputeAddedToMintQueueEvent,
  DisputeEvent,
  PageBurnedEvent,
  PageMintedEvent,
  ProposeEvent,
  ReservationMadeEvent,
} from "./EventTypes";

type Props = {
  events: BookEventsType[];
};

const BookEvents = ({ events }: Props) => {
  return events.map(evt => {
    switch (evt.kind) {
      case "reservationMade": {
        const rEvt: ReservationMadeEvent = evt;
        return (
          <div key={`reservationMade:${rEvt.bookHash}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Reservation Made</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Source:</span>
              <span className="ml-2">{rEvt.bookURL}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Hash:</span>
              <span className="ml-2">{rEvt.bookHash}</span>
            </div>
            <div className="flex flex-row items-start">
              <span># Pages:</span>
              <span className="ml-2">{rEvt.pageCount}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Start Token:</span>
              <span className="ml-2">{rEvt.startPage?.toString()}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>End Token:</span>
              <span className="ml-2">{rEvt.endPage?.toString()}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Reserver:</span>
              <span className="ml-2">{rEvt.reserver}</span>
            </div>
            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "propose": {
        const pEvt: ProposeEvent = evt;
        return (
          <div key={`propose:${pEvt.bookHash}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Propose</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Source:</span>
              <span className="ml-2">{pEvt.bookURL}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Hash:</span>
              <span className="ml-2">{pEvt.bookHash}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Car Uri</span>
              <span className="ml-2">{pEvt.carURI}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Proposer:</span>
              <span className="ml-2">{pEvt.proposer}</span>
            </div>
            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "dispute": {
        const dEvt: DisputeEvent = evt;
        return (
          <div key={`dispute:${dEvt.bookHash}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Dispute</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Source:</span>
              <span className="ml-2">{dEvt.bookURL}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Hash:</span>
              <span className="ml-2">{dEvt.bookHash}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Proposer:</span>
              <span className="ml-2">{dEvt.proposer}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Disputer:</span>
              <span className="ml-2">{dEvt.disputer}</span>
            </div>

            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "disputeAddedToMintQueue": {
        const damqEvt: DisputeAddedToMintQueueEvent = evt;
        return (
          <div key={`disputeAddedToMintQueueEvent:${damqEvt.bookId}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Dispute Added To Mint Queue</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Book ID:</span>
              <span className="ml-2">{damqEvt.bookId?.toString()}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>CAR URI:</span>
              <span className="ml-2">{damqEvt.carURI}</span>
            </div>
            <div className="flex flex-row items-start">
              <span># Pages:</span>
              <span className="ml-2">{damqEvt.pageCount}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Disputer:</span>
              <span className="ml-2">{damqEvt.disputer}</span>
            </div>

            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "bookAddedToMintQueue": {
        const bamqEvt: BookAddedToMintQueueEvent = evt;
        return (
          <div key={`bookAddedToMintQueueEvent:${bamqEvt.bookId}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Book Added To Mint Queue</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Book ID:</span>
              <span className="ml-2">{bamqEvt.bookId?.toString()}</span>
            </div>
            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "pageMinted": {
        const pmEvt: PageMintedEvent = evt;
        return (
          <div key={`pageMintedEvent:${pmEvt.tokenId}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Page Minted</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Token ID:</span>
              <span className="ml-2">{pmEvt.tokenId?.toString()}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Recipient:</span>
              <span className="ml-2">{pmEvt.recipient}</span>
            </div>
            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
      case "pageBurned": {
        const pbEvt: PageBurnedEvent = evt;
        return (
          <div key={`pageBurnedEvent:${pbEvt.tokenId}`}>
            <div className="flex flex-row items-start">
              <span>Event:</span>
              <span className="ml-2">Page Burned</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Token ID:</span>
              <span className="ml-2">{pbEvt.tokenId?.toString()}</span>
            </div>
            <div className="flex flex-row items-start">
              <span>Claimer:</span>
              <span className="ml-2">{pbEvt.claimer}</span>
            </div>
            <hr className="w-full border h-1 border-black" />
          </div>
        );
      }
    }
  });
};

export default BookEvents;
