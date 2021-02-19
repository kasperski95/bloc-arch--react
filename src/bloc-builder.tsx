import React from 'react'
import { Bloc, BlocEvent, BlocState } from '@bloc-arch/core'
import { Subscription } from 'rxjs'

export function useBlocRenderProp<S extends BlocState>(
  renderProp: (state: S) => JSX.Element,
  deps: React.DependencyList
) {
  return React.useCallback(renderProp, deps)
}

interface BlocBuilderProps<E extends BlocEvent, S extends BlocState> {
  bloc: Bloc<E, S>
  renderer: (blocState: S) => JSX.Element
  /** Called only when bloc's state changes. */
  listener?: (blocState: S) => void
}

export class BlocBuilder<
  E extends BlocEvent,
  S extends BlocState
> extends React.PureComponent<BlocBuilderProps<E, S>, { blocState: S }> {
  private blocSubscription?: Subscription

  constructor(props: BlocBuilderProps<E, S>) {
    super(props)
    if (!props.bloc) throw new Error("BlocBuilder received 'undefined' bloc.")
    this.state = { blocState: props.bloc.initialState }
  }

  componentDidMount = () => {
    this.blocSubscription = this.props.bloc.subscribe((newState) => {
      this.setState({ blocState: newState })
      if (this.props.listener) this.props.listener(newState)
    })
  }

  componentWillUnmount = () => {
    this.blocSubscription?.unsubscribe()
  }

  render() {
    return this.props.renderer(this.state.blocState)
  }
}
