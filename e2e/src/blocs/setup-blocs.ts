import { setupBlocs } from '@bloc-arch/react'
import { SampleBloc } from './sample'

export const { BlocProvider, useBlocGetter, useNewBloc } = setupBlocs({
  sample: () => new SampleBloc(),
})
