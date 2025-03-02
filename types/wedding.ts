type ParentInfo = {
  relation: string;
  name: string;
};

type HostPerson = {
  name: string;
  host: string;
  relation: string;
  parents: ParentInfo[];
};

type Greeting = {
  title: string;
  message: string;
  host: {
    groom: HostPerson;
    bride: HostPerson;
  };
  eventDetail: string;
};

type AccountInfo = {
  name: string;
  relation: string;
  bank: string;
  account: string;
};

type HostInfo = {
  host: string;
  accountInfo: AccountInfo[];
};

type MapInfo = {
  address1: string;
  address2: string;
  naverMap: string;
  lat: number;
  lon: number;
};

type LocationInfo = {
  title: string;
  desc: string;
};

export type WeddingData = {
  greeting: Greeting;
  hostInfo: HostInfo[];
  mapInfo: MapInfo;
  locationInfo: LocationInfo[];
  emojis: string[];
};
