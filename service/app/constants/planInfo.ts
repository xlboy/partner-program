export enum CompleteStatus {
  /**
   * 未开始
   */
  NOT_START = 'NOT_START',
  /**
   * 进行中
   */
  UNDERWAY = 'UNDERWAY',
  /**
   * 正常完成
   */
  NORMAL_COMPLETE = 'NORMAL_COMPLETE',
  /**
   * 延时完成
   */
  DELAY_COMPLETE = 'DELAY_COMPLETE',
  /**
   * 未完成
   */
  NOT_COMPLETE = 'NOT_COMPLETE'
}


export enum ContentTypes {
  /**
   * 自定义内容
   */
  DIY = 'DIY',
  /**
   * 按时早起
   */
  MORN_GET_UP = 'MORN_GET_UP',
  /**
  *  按时晚睡
  */
  NIGHT_SLEEP = 'NIGHT_SLEEP',
}