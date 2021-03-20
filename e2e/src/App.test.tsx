import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { SampleBloc, SampleStates } from './blocs/sample'
import { blocFactories, BlocProvider } from './blocs/setup-blocs'

class SampleBlocMock extends SampleBloc {
  async *mapEventToState(event: any) {
    yield new SampleStates.NotInitial()
  }
}

test('should handle simple use case', async () => {
  render(
    <BlocProvider
      blocFactories={{ ...blocFactories, sample: () => new SampleBlocMock() }}
    >
      <App />
    </BlocProvider>
  )

  await screen.findByText('initial state')

  fireEvent.click(screen.getByText('click'))

  await screen.findByText('not initial state')
})
