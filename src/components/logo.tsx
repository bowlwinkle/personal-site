import LGPNG from '../assets/lg.png'
import { Image, ImageProps } from 'semantic-ui-react'

type Logo = {
  width?: string
  height?: string
  circle?: boolean
  className?: string
}

export function LogoSVG({
  width = '100%',
  height = '100%',
  circle = false,
  className,
}: Logo) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 290 290`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {circle ? (
        <circle cx="145" cy="145" r="143" stroke="#6F6F6F" stroke-width="4" />
      ) : null}
      <path d="M244 112V93H155V99.5L244 112Z" fill="#80CEAD" />
      <path d="M209 197H225V137L209 197Z" fill="#80CEAD" />
      <path d="M63 197H46L46 93H53L63 197Z" fill="#C44AE2" />
      <path d="M72 93H46V197L72 93Z" fill="#80CEAD" />
      <path d="M172 93H155V197L172 93Z" fill="#C44AE2" />
      <path d="M155 197H172L155 111V197Z" fill="#78B1BE" />
      <path d="M155 180V197H244L155 180Z" fill="#80CEAD" />
      <path d="M238 152V135H194L238 152Z" fill="#80CEAD" />
      <path d="M46 180V197H135L46 180Z" fill="#78B1BE" />
    </svg>
  )
}

export function LogoPNG(props: ImageProps) {
  return <Image src={LGPNG} {...props} />
}
