import { useEffect } from 'react'
import anime from 'animejs'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const LOAD_DELAY = 500
const DELAY = 250
const SM_DURATION = 250
const MED_DURATION = 650
const LG_DURATION = 1000

export function Map({ primaryColor = '#242539' }: { primaryColor?: string }) {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  )

  // Get theme-aware colors
  const getThemeColor = () => {
    switch (currentTheme) {
      case 'dark':
        return '#6272a4'
      case 'dracula':
        return '#bd93f9'
      case 'monokai':
        return '#66d9ef'
      case 'github':
        return '#238636'
      case 'discord':
        return '#5865f2'
      case 'notion':
        return '#2eaadc'
      case 'solarized':
        return '#268bd2'
      case 'nord':
        return '#5e81ac'
      default:
        return primaryColor
    }
  }

  const themeColor = getThemeColor()

  useEffect(() => {
    // Reset mountains when theme changes
    anime.set('.ui .container svg #mountain', { opacity: 0 })

    const timeline = anime.timeline({
      easing: 'easeInOutSine',
      delay: anime.stagger(DELAY),
    })

    timeline.add({
      targets: '.ui .container svg circle',
      r: [0, 22.5],
      duration: LG_DURATION,
      easing: 'easeOutBounce',
      delay: LOAD_DELAY,
    })

    timeline.add({
      targets: '.ui .container svg #maskPath1',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: MED_DURATION,
    })

    timeline.add({
      targets: '.ui .container svg #mountain',
      opacity: 1,
      duration: MED_DURATION,
    })

    timeline.add({
      targets: '.ui .container svg #maskPath2',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: MED_DURATION,
    })

    timeline.add({
      targets: '#cross1',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: SM_DURATION,
    })

    timeline.add({
      targets: '#cross2',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: SM_DURATION,
    })
  }, [currentTheme])

  return (
    <svg
      width="320"
      height="555"
      viewBox="0 0 320 555"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="maskPath1Anim">
          <path
            id="maskPath1"
            d="M130 75C119 133.5 241.706 144.251 262 151.5C339 179 321.711 236 294 265C272.5 287.5 228 287.5 198 287.5"
            fill="none"
            stroke="white"
            strokeWidth="5"
          />
        </mask>
        <mask id="maskPath2Anim">
          <path
            id="maskPath2"
            d="M66.9993 287.5C-29.5008 287.5 -6.63593 380.5 67 406.5C127.621 427.904 130 463 130 498.5"
            fill="none"
            stroke="white"
            strokeWidth="5"
          />
        </mask>
      </defs>
      <circle
        cx="132.364"
        cy="27.5"
        r="22.5"
        stroke={themeColor}
        strokeWidth="10"
        fill="transparent"
      />

      {/* Animated dotted paths - start hidden and draw progressively */}
      <g>
        <path
          id="firstPath"
          d="M130 75C119 133.5 241.706 144.251 262 151.5C339 179 321.711 236 294 265C272.5 287.5 228 287.5 198 287.5"
          stroke={themeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 8"
          opacity="0.6"
          fill="none"
          mask='url("#maskPath1Anim")'
        />
      </g>
      <g>
        <path
          id="secondPath"
          d="M66.9993 287.5C-29.5008 287.5 -6.63593 380.5 67 406.5C127.621 427.904 130 463 130 498.5"
          stroke={themeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 8"
          opacity="0.6"
          fill="none"
          mask='url("#maskPath2Anim")'
        />
      </g>
      <g id="mountain" style={{ opacity: 0 }}>
        <path
          d="M131.06 239.148C132.824 233.554 140.741 233.554 142.504 239.148L161.753 300.196C162.972 304.062 160.085 308 156.031 308H117.534C113.479 308 110.592 304.062 111.811 300.196L131.06 239.148Z"
          fill={themeColor}
          opacity="0.7"
        />
        <path
          d="M110.826 257.395C113.135 253.395 118.909 253.395 121.218 257.395L145.486 299.428C147.795 303.428 144.909 308.428 140.29 308.428H91.7542C87.1354 308.428 84.2487 303.428 86.5581 299.428L110.826 257.395Z"
          fill={themeColor}
          opacity="0.5"
        />
        <path
          d="M163.316 271.492C165.648 267.616 171.267 267.616 173.598 271.492L190.417 299.441C192.823 303.44 189.943 308.535 185.276 308.535H151.639C146.972 308.535 144.092 303.44 146.498 299.441L163.316 271.492Z"
          fill={themeColor}
          opacity="0.6"
        />
        <path
          d="M136.526 240.936C136.946 237.805 141.121 237.029 142.639 239.8V239.8C142.729 239.965 142.805 240.138 142.866 240.316L145.985 249.465L151.55 268.299L155.645 281.118C156.171 282.765 155.961 284.558 155.07 286.039L150.971 292.847C148.917 296.259 152.612 300.23 156.163 298.427V298.427C156.92 298.042 157.533 297.424 157.913 296.665L159.09 294.311C160.318 291.856 163.411 291.02 165.708 292.522V292.522C168.701 294.479 172.683 292.413 172.808 288.84L173.166 278.572L173.38 273.008V273.008C173.329 272.496 174.008 272.271 174.273 272.712L184.081 289.059L187.933 295.266L192.642 303.185V303.185C194.051 305.533 192.35 308.518 189.613 308.504L91.7815 308.009C90.6212 308.003 89.49 307.645 88.5375 306.983V306.983C84.5498 304.209 85.605 298.042 90.2882 296.752L100.966 293.81C101.583 293.64 102.222 293.57 102.86 293.602L115.369 294.229C119.333 294.427 122.394 290.791 121.523 286.919L121.062 284.873C120.984 284.526 120.937 284.172 120.921 283.816L120.543 275.104C120.525 274.707 120.555 274.309 120.632 273.918L121.036 271.867C121.797 268.002 126.958 267.174 128.89 270.607L129.938 272.47C131.458 275.172 135.505 274.601 136.218 271.583L136.791 269.155C137.218 267.348 139.547 266.84 140.687 268.306V268.306C142.204 270.256 145.291 268.627 144.537 266.275L139.784 251.435C139.638 250.98 139.428 250.549 139.16 250.155L136.834 246.734C136.249 245.874 136.003 244.829 136.141 243.799L136.526 240.936Z"
          fill={themeColor}
        />
        <path
          d="M156.206 236.698L153 236L156.323 238.187C156.853 238.536 157.424 238.819 158.023 239.029L158.457 239.181C159.271 239.467 160.001 239.951 160.58 240.589C161.266 241.345 162.455 241.345 163.141 240.589L163.308 240.406C163.781 239.884 164.346 239.452 164.973 239.13L166.909 238.137L170 236L168.21 236.325C166.402 236.652 164.683 237.36 163.168 238.401L162.786 238.663C162.157 239.096 161.336 239.132 160.671 238.757L158.716 237.654C157.932 237.211 157.086 236.889 156.206 236.698Z"
          fill={themeColor}
        />
        <path
          d="M151.579 245.354L150 245L152.151 246.458C152.493 246.691 152.864 246.879 153.253 247.02L153.529 247.12C154.057 247.311 154.528 247.632 154.899 248.052C155.342 248.555 156.125 248.555 156.568 248.052L156.677 247.929C156.979 247.587 157.34 247.302 157.744 247.088L159 246.425L161 245L160.058 245.176C158.746 245.421 157.503 245.947 156.413 246.718C155.958 247.04 155.358 247.067 154.876 246.787L154.133 246.355C153.338 245.893 152.476 245.555 151.579 245.354Z"
          fill={themeColor}
        />
        <path
          d="M166.732 250.15L166 250L167.172 250.728C167.36 250.845 167.561 250.939 167.77 251.009L167.928 251.061C168.214 251.156 168.473 251.319 168.682 251.536C168.925 251.789 169.33 251.789 169.573 251.536L169.631 251.476C169.803 251.297 170.005 251.15 170.228 251.042L170.909 250.712L172 250L171.468 250.091C170.763 250.212 170.091 250.475 169.491 250.864C169.244 251.024 168.93 251.037 168.67 250.899L168.382 250.746C167.863 250.469 167.308 250.269 166.732 250.15Z"
          fill={themeColor}
        />
      </g>
      <g id="crosss">
        <path
          id="cross1"
          d="M116.318 518L148 549.682"
          stroke={themeColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          id="cross2"
          d="M147.682 518.317L116 549.999"
          stroke={themeColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
