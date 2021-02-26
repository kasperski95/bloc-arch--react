import { setupBlocs } from '@bloc-arch/react'
import { SampleBloc } from './sample'

export const { BlocProvider, useBloc, useWeakBloc } = setupBlocs({
  sample: () => new SampleBloc(),
})
