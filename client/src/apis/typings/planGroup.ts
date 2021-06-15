export interface APIPlanGroup {
    id: number;
    introduce: string;
    groupName: string;
    isnotify: boolean;
    groupNum: number;
}
export interface APIUserPlanGroupList {
  myGroup: APIPlanGroup[],
  otherGroup: APIPlanGroup[]
}