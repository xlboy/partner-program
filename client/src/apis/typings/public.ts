export interface APIFormat<T = any> {
  code: number;
  data?: T;
  msg: string;
}
