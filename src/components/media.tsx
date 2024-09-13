import { createMedia } from '@artsy/fresnel'
import { config } from '../config'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: config.breakpoints,
})

export { MediaContextProvider, Media }
