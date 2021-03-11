export enum CompleteStatus {
  NOT_START = 'NOT_START',
  NDERWAY = 'NDERWAY',
  COMPLETE = 'COMPLETE',
  NOT_COMPLETE = 'NOT_COMPLETE'
}

export interface PlanInfoObj {
  startTime: number;
  endTime: number;
  isRemind: boolean;
  content: string;
  completeStatus: CompleteStatus
}