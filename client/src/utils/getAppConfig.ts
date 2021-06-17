/**
 * @description require在weapp环境下可行，在h5环境下会找不到内容。
 */
export default () => require('@/app.config').default as AppConfig
