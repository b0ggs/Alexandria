export type ReservationMadeEvent = {
  kind: "reservationMade";
  bookHash?: `0x${string}` | undefined;
  reserver?: string | undefined;
  reservationId?: bigint | undefined;
  timestamp?: bigint | undefined;
  startPage?: bigint | undefined;
  endPage?: bigint | undefined;
  bookBondAmount?: bigint | undefined;
  pageCount?: number | undefined;
  bookURL?: string | undefined;
};

export type ProposeEvent = {
  kind: "propose";
  bookHash?: `0x${string}` | undefined;
  bookId?: bigint | undefined;
  startPage?: bigint | undefined;
  endPage?: bigint | undefined;
  proposer?: string | undefined;
  bookURL?: string | undefined;
  carURI?: string | undefined;
};

export type DisputeEvent = {
  kind: "dispute";
  bookHash?: `0x${string}` | undefined;
  bookId?: bigint | undefined;
  startPage?: bigint | undefined;
  endPage?: bigint | undefined;
  bookBondAmount?: bigint | undefined;
  proposer?: string | undefined;
  disputer?: string | undefined;
  bookURL?: string | undefined;
};

export type PageMintedEvent = {
  kind: "pageMinted";
  tokenId?: bigint | undefined;
  recipient?: string | undefined;
  timestamp?: number | undefined;
  carURI?: string | undefined;
};

export type PageBurnedEvent = {
  kind: "pageBurned";
  tokenId?: bigint | undefined;
  claimer?: string | undefined;
  backingValue?: bigint | undefined;
};

export type DisputeAddedToMintQueueEvent = {
  kind: "disputeAddedToMintQueue";
  bookId?: bigint | undefined;
  disputer?: string | undefined;
  timestamp?: number | undefined;
  pageCount?: number | undefined;
  carURI?: string | undefined;
};

export type BookAddedToMintQueueEvent = {
  kind: "bookAddedToMintQueue";
  bookId?: bigint | undefined;
};

export type BookEventsType =
  | ReservationMadeEvent
  | ProposeEvent
  | DisputeEvent
  | PageMintedEvent
  | PageBurnedEvent
  | DisputeAddedToMintQueueEvent
  | BookAddedToMintQueueEvent;
