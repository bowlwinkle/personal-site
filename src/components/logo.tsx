import anime from 'animejs/lib/anime.es'
import LGPNG from '../assets/lg.png'
import { Image, ImageProps } from 'semantic-ui-react'
import { useEffect } from 'react'

type Logo = {
  id?: string
  width?: string
  height?: string
  circle?: boolean
  className?: string
  animate?: ((id: string) => void) | boolean
}

// function defaultAnimation() {
//   anime({
//     targets: '#LGLogo > path',
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 1500,
//     delay: function (el, i) {
//       return i * 250
//     },
//     direction: 'normal',
//     loop: true,
//   })
// }

function LG({ id }: Logo) {
  return (
    <svg
      id={id}
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="path1"
        d="M10.7916 4.416H11.9556V8.304C11.8596 8.336 11.7196 8.372 11.5356 8.412C11.3596 8.452 11.1516 8.492 10.9116 8.532C10.6796 8.572 10.4236 8.604 10.1436 8.628C9.86364 8.66 9.57964 8.676 9.29164 8.676C8.70764 8.676 8.17564 8.58 7.69564 8.388C7.21564 8.196 6.80364 7.916 6.45964 7.548C6.11564 7.18 5.84764 6.728 5.65564 6.192C5.47164 5.656 5.37964 5.04 5.37964 4.344C5.37964 3.648 5.48364 3.032 5.69164 2.496C5.90764 1.952 6.19564 1.496 6.55564 1.128C6.91564 0.76 7.33564 0.48 7.81564 0.288C8.30364 0.096 8.82364 0 9.37564 0C9.75164 0 10.0836 0.0240002 10.3716 0.0720005C10.6676 0.12 10.9196 0.176 11.1276 0.24C11.3356 0.304 11.5036 0.368 11.6316 0.432C11.7676 0.496 11.8596 0.544 11.9076 0.576L11.5356 1.548C11.3036 1.396 10.9956 1.272 10.6116 1.176C10.2276 1.072 9.83564 1.02 9.43564 1.02C9.01164 1.02 8.62364 1.096 8.27164 1.248C7.92764 1.4 7.63164 1.62 7.38364 1.908C7.14364 2.196 6.95564 2.548 6.81964 2.964C6.68364 3.372 6.61564 3.832 6.61564 4.344C6.61564 4.84 6.67164 5.292 6.78364 5.7C6.90364 6.108 7.07964 6.46 7.31164 6.756C7.55164 7.044 7.84364 7.268 8.18764 7.428C8.53964 7.588 8.95164 7.668 9.42364 7.668C9.75964 7.668 10.0436 7.652 10.2756 7.62C10.5156 7.58 10.6876 7.544 10.7916 7.512V4.416Z"
        fill="black"
      />
      <path
        id="path2"
        d="M5.03598 7.50002V8.50802H3.78498H2.53398H1.28298H0.0319824V7.46852V6.42902V5.38952V4.35002V3.31052V2.27102V1.23152V0.192017H1.19598V2.01902V3.84602V4.75952V5.67302V6.58652V7.50002H2.15598H3.11598H4.07598H5.03598Z"
        fill="black"
      />
    </svg>
  )
}

// function Code() {
//   return (
//     <svg
//       width="11"
//       height="10"
//       viewBox="0 0 11 10"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M7.28955 2.39984C7.74555 2.22384 8.18955 1.99984 8.62155 1.72784C9.05355 1.44784 9.44955 1.09984 9.80955 0.683838H10.6016V1.72334V2.24309V2.76284V3.28259V3.80234V4.32209V4.84184V5.36159V5.88134V6.40109V6.92084V7.44059V7.96034V8.48009V8.99984H9.48555V8.15384V7.30784V6.46184V5.61584V4.76984V3.92384V3.07784V2.23184C9.38955 2.31984 9.26955 2.41184 9.12555 2.50784C8.98955 2.60384 8.83755 2.69584 8.66955 2.78384C8.50955 2.87184 8.33755 2.95584 8.15355 3.03584C7.97755 3.11584 7.80555 3.18384 7.63755 3.23984L7.28955 2.39984Z"
//         fill="black"
//       />
//       <path
//         d="M0 4.83594C0 3.44394 0.244 2.37194 0.732 1.61994C1.228 0.867944 1.912 0.491943 2.784 0.491943C3.656 0.491943 4.336 0.867944 4.824 1.61994C5.32 2.37194 5.568 3.44394 5.568 4.83594C5.568 6.22794 5.32 7.29994 4.824 8.05194C4.336 8.80394 3.656 9.17994 2.784 9.17994C1.912 9.17994 1.228 8.80394 0.732 8.05194C0.244 7.29994 0 6.22794 0 4.83594ZM4.392 4.83594C4.392 4.37994 4.364 3.94794 4.308 3.53994C4.26 3.13194 4.172 2.77594 4.044 2.47194C3.924 2.16794 3.76 1.92794 3.552 1.75194C3.344 1.56794 3.088 1.47594 2.784 1.47594C2.48 1.47594 2.224 1.56794 2.016 1.75194C1.808 1.92794 1.64 2.16794 1.512 2.47194C1.392 2.77594 1.304 3.13194 1.248 3.53994C1.2 3.94794 1.176 4.37994 1.176 4.83594C1.176 5.29194 1.2 5.72394 1.248 6.13194C1.304 6.53994 1.392 6.89594 1.512 7.19994C1.64 7.50394 1.808 7.74794 2.016 7.93194C2.224 8.10794 2.48 8.19594 2.784 8.19594C3.088 8.19594 3.344 8.10794 3.552 7.93194C3.76 7.74794 3.924 7.50394 4.044 7.19994C4.172 6.89594 4.26 6.53994 4.308 6.13194C4.364 5.72394 4.392 5.29194 4.392 4.83594Z"
//         fill="black"
//       />
//     </svg>
//   )
// }

// function Markup() {
//   return (
//     <svg
//       width="17"
//       height="13"
//       viewBox="0 0 17 13"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M11.3789 4.65996L11.6909 3.73596L12.9869 4.28496L13.6349 4.55946L14.2829 4.83396L14.9309 5.10846L15.5789 5.38296L16.2269 5.65746L16.8749 5.93196V6.41196V6.89196L16.2269 7.16646L15.5789 7.44096L14.9309 7.71546L14.2829 7.98996L13.6349 8.26446L12.9869 8.53896L11.6909 9.08796L11.3789 8.16396L11.9114 7.94496L12.4439 7.72596L12.9764 7.50696L13.5089 7.28796L14.0414 7.06896L14.5739 6.84996L15.1064 6.63096L15.6389 6.41196L14.5739 5.97396L14.0414 5.75496L13.5089 5.53596L12.9764 5.31696L12.4439 5.09796L11.3789 4.65996Z"
//         fill="black"
//       />
//       <path
//         d="M6.98937 12.22H5.84937L9.91737 0.604004H11.0334L6.98937 12.22Z"
//         fill="black"
//       />
//       <path
//         d="M1.236 6.41196L1.7685 6.63096L2.301 6.84996L3.366 7.28796L4.431 7.72596L5.496 8.16396L5.184 9.08796L4.536 8.81346L3.888 8.53896L3.24 8.26446L2.592 7.98996L1.944 7.71546L1.296 7.44096L0.648 7.16646L0 6.89196V5.93196L1.296 5.38296L2.592 4.83396L3.888 4.28496L5.184 3.73596L5.496 4.65996L4.431 5.09796L3.366 5.53596L2.301 5.97396L1.236 6.41196Z"
//         fill="black"
//       />
//     </svg>
//   )
// }

function morphAnimation(id: string) {
  /*eslint no-debugger: "warn"*/
  const animation1 = anime({
    targets: `#${id} #path2`,
    points: [
      {
        value:
          'M10.7916 4.416H11.9556V8.304C11.8596 8.336 11.7196 8.372 11.5356 8.412C11.3596 8.452 11.1516 8.492 10.9116 8.532C10.6796 8.572 10.4236 8.604 10.1436 8.628C9.86364 8.66 9.57964 8.676 9.29164 8.676C8.70764 8.676 8.17564 8.58 7.69564 8.388C7.21564 8.196 6.80364 7.916 6.45964 7.548C6.11564 7.18 5.84764 6.728 5.65564 6.192C5.47164 5.656 5.37964 5.04 5.37964 4.344C5.37964 3.648 5.48364 3.032 5.69164 2.496C5.90764 1.952 6.19564 1.496 6.55564 1.128C6.91564 0.76 7.33564 0.48 7.81564 0.288C8.30364 0.096 8.82364 0 9.37564 0C9.75164 0 10.0836 0.0240002 10.3716 0.0720005C10.6676 0.12 10.9196 0.176 11.1276 0.24C11.3356 0.304 11.5036 0.368 11.6316 0.432C11.7676 0.496 11.8596 0.544 11.9076 0.576L11.5356 1.548C11.3036 1.396 10.9956 1.272 10.6116 1.176C10.2276 1.072 9.83564 1.02 9.43564 1.02C9.01164 1.02 8.62364 1.096 8.27164 1.248C7.92764 1.4 7.63164 1.62 7.38364 1.908C7.14364 2.196 6.95564 2.548 6.81964 2.964C6.68364 3.372 6.61564 3.832 6.61564 4.344C6.61564 4.84 6.67164 5.292 6.78364 5.7C6.90364 6.108 7.07964 6.46 7.31164 6.756C7.55164 7.044 7.84364 7.268 8.18764 7.428C8.53964 7.588 8.95164 7.668 9.42364 7.668C9.75964 7.668 10.0436 7.652 10.2756 7.62C10.5156 7.58 10.6876 7.544 10.7916 7.512V4.416Z',
      },
      {
        value:
          'M7.28955 2.39984C7.74555 2.22384 8.18955 1.99984 8.62155 1.72784C9.05355 1.44784 9.44955 1.09984 9.80955 0.683838H10.6016V1.72334V2.24309V2.76284V3.28259V3.80234V4.32209V4.84184V5.36159V5.88134V6.40109V6.92084V7.44059V7.96034V8.48009V8.99984H9.48555V8.15384V7.30784V6.46184V5.61584V4.76984V3.92384V3.07784V2.23184C9.38955 2.31984 9.26955 2.41184 9.12555 2.50784C8.98955 2.60384 8.83755 2.69584 8.66955 2.78384C8.50955 2.87184 8.33755 2.95584 8.15355 3.03584C7.97755 3.11584 7.80555 3.18384 7.63755 3.23984L7.28955 2.39984Z',
      },
    ],

    easing: 'easeOutQuad',
    duration: 2000,
    loop: true,
  })

  console.log('Animation1: ', animation1)

  anime({
    targets: `#${id} #path1`,
    points: [
      {
        value:
          'M5.03598 7.50002V8.50802H3.78498H2.53398H1.28298H0.0319824V7.46852V6.42902V5.38952V4.35002V3.31052V2.27102V1.23152V0.192017H1.19598V2.01902V3.84602V4.75952V5.67302V6.58652V7.50002H2.15598H3.11598H4.07598H5.03598Z',
      },
      {
        value:
          'M0 4.83594C0 3.44394 0.244 2.37194 0.732 1.61994C1.228 0.867944 1.912 0.491943 2.784 0.491943C3.656 0.491943 4.336 0.867944 4.824 1.61994C5.32 2.37194 5.568 3.44394 5.568 4.83594C5.568 6.22794 5.32 7.29994 4.824 8.05194C4.336 8.80394 3.656 9.17994 2.784 9.17994C1.912 9.17994 1.228 8.80394 0.732 8.05194C0.244 7.29994 0 6.22794 0 4.83594ZM4.392 4.83594C4.392 4.37994 4.364 3.94794 4.308 3.53994C4.26 3.13194 4.172 2.77594 4.044 2.47194C3.924 2.16794 3.76 1.92794 3.552 1.75194C3.344 1.56794 3.088 1.47594 2.784 1.47594C2.48 1.47594 2.224 1.56794 2.016 1.75194C1.808 1.92794 1.64 2.16794 1.512 2.47194C1.392 2.77594 1.304 3.13194 1.248 3.53994C1.2 3.94794 1.176 4.37994 1.176 4.83594C1.176 5.29194 1.2 5.72394 1.248 6.13194C1.304 6.53994 1.392 6.89594 1.512 7.19994C1.64 7.50394 1.808 7.74794 2.016 7.93194C2.224 8.10794 2.48 8.19594 2.784 8.19594C3.088 8.19594 3.344 8.10794 3.552 7.93194C3.76 7.74794 3.924 7.50394 4.044 7.19994C4.172 6.89594 4.26 6.53994 4.308 6.13194C4.364 5.72394 4.392 5.29194 4.392 4.83594Z',
      },
    ],
    easing: 'easeOutQuad',
    duration: 2000,
    loop: true,
  })
}

// function OriginalLogoSVG({
//   id,
//   width = '100%',
//   height = '100%',
//   circle = false,
//   className,
// }: Logo) {
//   return (
//     <svg
//       id={id}
//       width={width}
//       height={height}
//       viewBox={`0 0 290 290`}
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       {circle ? (
//         <circle cx="145" cy="145" r="143" stroke="#6F6F6F" stroke-width="4" />
//       ) : null}
//       <path
//         d="M244 112V93H155V99.5L244 112Z"
//         fill="transparent"
//         stroke="#80CEAD"
//       />
//       <path d="M209 197H225V137L209 197Z" fill="transparent" stroke="#80CEAD" />
//       <path
//         d="M63 197H46L46 93H53L63 197Z"
//         fill="transparent"
//         stroke="#80CEAD"
//       />
//       <path d="M72 93H46V197L72 93Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M172 93H155V197L172 93Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M155 197H172L155 111V197Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M155 180V197H244L155 180Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M238 152V135H194L238 152Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M46 180V197H135L46 180Z" fill="transparent" stroke="#80CEAD" />
//       <path d="M46 180V197H135L46 180Z" fill="transparent" stroke="#80CEAD" />
//     </svg>
//   )
// }

export function LogoSVG({ animate = false }: Logo, { ...rest }: Logo) {
  const id = rest.id || 'LGLogo'

  useEffect(() => {
    try {
      if (animate) {
        if (typeof animate === 'function') {
          animate(id)
        } else {
          // defaultAnimation()
          morphAnimation(id)
        }
      }
    } catch (e) {
      console.warn('Failed to animate LG logo: ', e)
    }
  })

  return <LG id="LGLogo" {...rest} />
}

export function LogoPNG(props: ImageProps) {
  return <Image src={LGPNG} {...props} />
}
