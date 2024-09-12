// import React from 'react'
import { ParamKeyValuePair } from 'react-router-dom'

// Pretty dumb/specific function for tab query param
export const generateTabParams = (
  key: string,
  value: number | string | undefined
): ParamKeyValuePair[] => [[key, String(value)]]

// export function memo<T>(staleFunc: () => T, deps: React.DependencyList | undefined): T {
//   let previousDeps: React.DependencyList | undefined
//   let previousResult: T = new Proxy({} as T, { get: () => undefined })

//   previousDeps = deps

//   return (function (): T {
//     // Initial run
//     if (!previousDeps) {
//       previousDeps = deps
//       previousResult = staleFunc()
//     }

//     // Check if deps have changed
//     const hasChanged = deps?.some((dep, index) => dep !== previousDeps?[index])

//     if (hasChanged) {
//       previousDeps = deps
//       previousResult = staleFunc()
//     }

//     return previousResult
//   })()
// }
