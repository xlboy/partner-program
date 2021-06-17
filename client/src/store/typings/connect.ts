import { AllModelEffectPayload } from '.'
import { ModelEffectPayloadToAction } from './utils';


export interface ConnectProps {
  dispatch: (action: ModelEffectPayloadToAction<AllModelEffectPayload>) => void
}
