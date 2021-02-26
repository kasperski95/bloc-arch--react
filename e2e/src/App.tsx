import { BlocBuilder, useBlocRenderProp } from '@bloc-arch/react'
import React from 'react'
import { SampleEvents, SampleStates } from './blocs/sample'
import { useBloc, useWeakBloc } from './blocs/setup-blocs'

function App() {
  useBloc('sample')()
  const getSampleBloc = useWeakBloc('sample')

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
        listener={React.useCallback((state: SampleStates.SampleState) => {
          if (state instanceof SampleStates.NotInitial) {
          }
        }, [])}
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
