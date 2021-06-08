import { AllModelEffectTypePayload } from '.'

type ModelEffectToAction<
  ModelEffect extends AllModelEffectTypePayload,
  K = keyof ModelEffect
> = K extends keyof ModelEffect
  ? {
      type: K
      payload: ModelEffect[K]
    }
  : never

export interface ConnectProps {
  dispatch: (Action: ModelEffectToAction<AllModelEffectTypePayload>) => void
}
