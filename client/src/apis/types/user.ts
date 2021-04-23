import { APIPlanGroup } from "./planGroup";

export interface ApiUserinfoResult {
  username: string;
  nickname: string;
  sex: boolean;
  token: string;
  age: null | number;
  email: null | string;
  avatar: string;
}

export interface APIUserPlanGroupList {
  myGroup: APIPlanGroup[],
  otherGroup: APIPlanGroup[]
}