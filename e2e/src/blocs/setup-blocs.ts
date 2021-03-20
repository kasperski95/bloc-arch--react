import { setupBlocs } from '@bloc-arch/react'
import { SampleBloc } from './sample'

export const blocFactories = {
  sample: () => new SampleBloc(),
  sampleDependency: (arg1: string, arg2: number) => {
    if (typeof arg1 !== 'string' || typeof arg2 !== 'number') {
      console.log(typeof arg1, typeof arg2)
      throw new Error('wrong parameters')
    }
    return new SampleBloc()
  },
}

export const { BlocProvider, useBloc, useWeakBloc } = setupBlocs(blocFactories)
