import { Bloc } from '@bloc-arch/core'
import React from 'react'

export interface BlocFactoryFunctions {
  [key: string]: (...args: any) => Bloc<any, any>
}

export function setupBlocs<T extends BlocFactoryFunctions>(blocs: T) {
  const memoizedBlocs = {} as { [key in keyof T]: Bloc<any, any> | undefined }

  const BlocContext = React.createContext<Partial<T>>(blocs)

  return {
    BlocContext,
    BlocProvider: (props: {
      children: React.ReactChild | React.ReactChild[]
      blocFactories?: Partial<T>
    }) => {
      return (
        <BlocContext.Provider value={props.blocFactories || blocs}>
          {props.children}
        </BlocContext.Provider>
      )
    },

    /** Instantiates a new bloc if it doesn't exist. */
    useBloc: <K extends keyof T>(name: K) => {
      const blocFactoryFn = (React.useContext(BlocContext) as T)[name]
      if (!blocFactoryFn)
        throw new Error(`Bloc factory function "${name}" not found.`)

      React.useEffect(
        () => () => {
          memoizedBlocs[name] = undefined
        },
        []
      )

      return React.useCallback(
        (...args: Parameters<T[K]>) => {
          if (!memoizedBlocs[name]) memoizedBlocs[name] = blocFactoryFn(...args)
          return memoizedBlocs[name] as ReturnType<T[K]>
        },
        [name, blocFactoryFn]
      )
    },

    /** Returns a function returning bloc (if it was already instantiated by useBloc). */
    useWeakBloc: <K extends keyof T>(name: K) => {
      return React.useCallback(
        () => memoizedBlocs[name] as ReturnType<T[K]> | undefined,
        [name]
      )
    },
  }
}
