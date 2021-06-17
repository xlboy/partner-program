import { allModel } from '..'

type GetModel<Model extends {}> = Model extends {
  core: { ModelTypeDefine?: any }
}
  ? Exclude<Model['core']['ModelTypeDefine'], undefined>[0]
  : never

type GetModelEffect<ModelType extends {}> = ModelType extends {
  effects: any
}
  ? ModelType['effects']
  : never

type GetModelEffectPayload<
  ModelName extends string,
  EffectName extends string,
  AllModel extends typeof allModel = typeof allModel
> = ModelName extends keyof AllModel
  ? GetModelEffect<GetModel<AllModel[ModelName]>>[EffectName]
  : never

export type AllModelEffect<
  AllModel extends typeof allModel = typeof allModel,
  Model = AllModel
> = Model extends AllModel
  ? keyof Model extends `${infer Name}`
    ? Name extends keyof AllModel
      ? keyof GetModelEffect<GetModel<AllModel[Name]>> extends string
        ? `${Name}/${keyof GetModelEffect<GetModel<AllModel[Name]>>}`
        : never
      : never
    : never
  : never

export type AllModelEffectPayload = {
  [K in AllModelEffect]: K extends `${infer ModelName}/${infer EffectName}`
    ? GetModelEffectPayload<ModelName, EffectName>
    : never
}
export type AllModelState<AllModel extends typeof allModel = typeof allModel> = {
  [K in keyof AllModel]: GetModel<AllModel[K]> extends Store.ModelDefine
    ? GetModel<AllModel[K]>['state']
    : never
}