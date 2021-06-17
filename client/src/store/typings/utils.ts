import { AllModelEffectPayload } from '.'

export type ModelEffectPayloadToAction<
  ModelEffectPayload extends AllModelEffectPayload,
  K = keyof ModelEffectPayload
> = K extends keyof ModelEffectPayload
  ? {
      type: K
      payload: ModelEffectPayload[K]
    }
  : never
