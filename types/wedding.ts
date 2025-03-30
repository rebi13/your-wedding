type HeaderInfo = {
  title: string;
  subTitle: string;
};

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
  holidayList: string[];
  eventDay: string;
  eventDayTime: string;
  eventKor: string;
  eventEng: string;
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
  emoji: string;
  accountInfo: AccountInfo[];
};

type MapInfo = {
  address1: string;
  address2: string;
  tel: string;
  naverMap: string;
  lat: number;
  lon: number;
};

type LocationInfo = {
  title: string;
  desc: string;
};

export type WeddingData = {
  header: HeaderInfo;
  greeting: Greeting;
  hostInfo: HostInfo[];
  hostMessage: string;
  NoWreathMessage: string;
  mapInfo: MapInfo;
  locationInfo: LocationInfo[];
  emojis: string[];
  madeBy: string;
};
