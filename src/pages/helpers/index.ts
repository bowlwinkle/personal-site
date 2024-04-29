import { ParamKeyValuePair } from 'react-router-dom'

// Pretty dumb/specific function for tab query param
export const generateTabParams = (
  key: string,
  value: number | string | undefined
): ParamKeyValuePair[] => [[key, String(value)]]
