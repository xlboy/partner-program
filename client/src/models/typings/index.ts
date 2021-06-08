import { allModel } from "..";

type GetModelType<Model extends {}> = Model extends {
  core: { ModelTypeDefine?: any };
} ? Exclude<Model["core"]["ModelTypeDefine"], undefined>[0]
  : never;

type GetModelTypeEffect<ModelType extends {}> = ModelType extends {
  effects: any;
}
  ? ModelType["effects"]
  : never;

export type AllModelEffectType<
  AllModel extends typeof allModel = typeof allModel,
  Model = AllModel
> = Model extends AllModel
  ? keyof Model extends `${infer Name}`
    ? Name extends keyof AllModel
      ? keyof GetModelTypeEffect<GetModelType<AllModel[Name]>> extends string
        ? `${Name}/${keyof GetModelTypeEffect<GetModelType<AllModel[Name]>>}`
        : never
      : never
    : never
  : never;

type GetModelEffectPayload<
  ModelName extends string,
  EffectName extends string,
  AllModel extends typeof allModel = typeof allModel
> = ModelName extends keyof AllModel
  ? GetModelTypeEffect<GetModelType<AllModel[ModelName]>>[EffectName]
  : never;

export type AllModelEffectTypePayload = {
  [K in AllModelEffectType]: K extends `${infer ModelName}/${infer EffectName}`
    ? GetModelEffectPayload<ModelName, EffectName>
    : never; 
};
