import React from 'react'
import { BlocState } from '@bloc-arch/core'

export function useBlocRenderProp<S extends BlocState>(
  renderProp: (state: S) => JSX.Element,
  deps: React.DependencyList
) {
  return React.useCallback(renderProp, deps)
}
