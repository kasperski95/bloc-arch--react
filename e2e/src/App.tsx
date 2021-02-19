import { BlocBuilder, useBlocRenderProp } from '@bloc-arch/react'
import React from 'react'
import { SampleEvents, SampleStates } from './blocs/sample'
import { useBlocGetter, useNewBloc } from './blocs/setup-blocs'

function App() {
  useNewBloc('sample')()
  const getSampleBloc = useBlocGetter('sample')

  return (
    <>
      <button
        onClick={() => {
          getSampleBloc()?.dispatch(new SampleEvents.Foo())
        }}
      >
        click
      </button>
      <BlocBuilder
        bloc={getSampleBloc()!}
        renderer={useBlocRenderProp((state) => {
          if (state instanceof SampleStates.NotInitial)
            return <div>not initial state</div>
          return <div>initial state</div>
        }, [])}
      />
    </>
  )
}

export default App
