import { Bloc } from '@bloc-arch/core'
import * as SampleEvents from './SampleEvent'
import * as SampleStates from './SampleState'

export class SampleBloc extends Bloc<
  SampleEvents.SampleEvent,
  SampleStates.SampleState
> {
  constructor() {
    super(new SampleStates.Initial())
  }

  async *mapEventToState(event: SampleEvents.SampleEvent) {
    yield new SampleStates.NotInitial()
  }
}
