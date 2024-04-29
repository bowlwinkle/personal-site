import anime from 'animejs'
import { Media } from './media'
import { Header } from 'semantic-ui-react'

const DEFAULT_SIZE = 'original'
type MountainProps = {
  className?: string
  width?: string | 'original'
  height?: string | 'original'
  animate?: boolean
  original?: boolean
  disableWhenMobile?: boolean
}

function animateMountain() {
  const timeline = anime.timeline({
    easing: 'easeInOutSine',
  })

  timeline.add({
    targets: '#mountain path',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1500,
    stroke: '#000',
    fill: 'transparent',
    delay: function (el, i) {
      return i * 250
    },
  })

  // Fill in the mountain
  timeline.add({
    targets: '#mountain path',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1500,
    stroke: 'transparent',
    delay: function (el, i) {
      return i * 250
    },
  })
}

type MountainSVGProps = {
  width: string
  height: string
  className: string | undefined
}

function MountainSVG({ width, height, className }: MountainSVGProps) {
  return (
    <>
      <Header as="h1"></Header>
      <h1 style={{ left: '500px', bottom: '363px' }}></h1>
      <svg
        id="mountain"
        width={width}
        height={height}
        viewBox="0 0 2719 1296"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M396.683 867.521L367.582 882.068L263 1034.5L117 1136L0 1296.5H148H2719L2626.5 1172L2488 1080.43L2436.41 1030.18L2379.53 925.708L2327.94 808.011L2236.67 739.244L2187.73 720.73L2126.88 665.187L2054.13 583.196H1905.98L1801.48 555.425L1667.88 452.275L1542.21 367.638L1484.01 293.582L1409.93 163.983L1314.69 81.9913L1267.07 35.7059H1212.84L1177.12 0L1076.59 81.9913L1031.62 120.342L999.871 235.394L952.251 331.932L859.656 367.638L723.41 511.784L678.435 583.196L659.916 616.257H637.429L550.125 764.37L460.176 808.011L432.398 851.651L396.683 867.521Z"
          fill="#333333"
        />
        <path
          d="M1115.93 216.454L1169.14 345.175L1297.86 398.39L1389.91 505.538L1472.61 583.196L1521.51 691.069L1570.41 759.745L1535.89 818.353L1458.23 798.937L1342.45 691.069L1314.69 749.318L1342.45 818.353L1409.93 867.253L1371.93 1047.75L1472.61 1198.76L1570.41 1295.85H2488H2718L2627 1172.5L2488 1081.5L2436.41 1030.18L2379.53 925.708L2327.94 808.011L2236.67 739.244L2187.73 720.73L2126.88 665.187L2054.13 583.196H1905.98L1801.48 555.425L1667.88 452.275L1542.21 367.638L1484.01 293.582L1409.93 163.983L1314.69 81.9913L1267.07 35.7059H1212.84L1177.12 0V138.07L1115.93 216.454Z"
          fill="url(#paint0_linear_568_131)"
          fillOpacity="0.2"
        />
        <path
          d="M1115.93 216.454L1169.14 345.175L1297.86 398.39L1389.91 505.538L1472.61 583.196L1521.51 691.069L1570.41 759.745L1535.89 818.353L1458.23 798.937L1342.45 691.069L1314.69 749.318L1342.45 818.353L1409.93 867.253L1371.93 1047.75L1472.61 1198.76L1570.41 1295.85H2488H2718L2627 1172.5L2488 1081.5L2436.41 1030.18L2379.53 925.708L2327.94 808.011L2236.67 739.244L2187.73 720.73L2126.88 665.187L2054.13 583.196H1905.98L1801.48 555.425L1667.88 452.275L1542.21 367.638L1484.01 293.582L1409.93 163.983L1314.69 81.9913L1267.07 35.7059H1212.84L1177.12 0V138.07L1115.93 216.454Z"
          fill="url(#paint1_linear_568_131)"
          fillOpacity="0.2"
        />
        <path
          d="M1901.92 579.607C1901.92 579.607 1810.45 552.999 1798.37 550.123L1753.06 518.482L1784.71 584.641L1836.48 605.495L1879.63 635.698L1955.14 724.868L2109.75 759.385L2146.42 798.218L2182.38 870.129L2288.81 937.726L2350.65 956.423L2376.54 991.66L2491.5 1118L2616 1167.5L2488 1079.39L2453.48 1045.59L2427.59 1011.08L2376.54 903.208L2331.23 803.251L2245.66 730.621L2193.88 716.239L2054.37 579.607H1901.92Z"
          fill="url(#paint2_linear_568_131)"
        />
        <path
          d="M736.955 556.595L776.978 735.728L859.205 940.602L1186.4 810.443L1186.4 582.483L1133.19 530.707L1018.13 490.137L951.971 332.95L859.205 368.187L826.55 518.055L792.35 490.137L736.955 556.595Z"
          fill="url(#paint3_linear_568_131)"
        />
        <path
          d="M629.807 908.242L652.1 843.522L666.482 821.949L652.1 804.69V769.453L666.482 791.746L688.055 821.949L695.966 889.545L688.055 958.58V1011.08L674.392 1088.02L652.1 1159.21L584.503 1170L471.5 1295.5H432.77L486.703 1225.37L464.411 1159.21L543.513 1088.02L600.323 1073.64L629.807 908.242Z"
          fill="url(#paint4_linear_568_131)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_568_131"
            x1="1210.85"
            y1="458.795"
            x2="2080.26"
            y2="-115.059"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#333333" />
            <stop offset="1" stopColor="#AFAFAF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_568_131"
            x1="1348.92"
            y1="750.756"
            x2="1115.93"
            y2="1184.38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#333333" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_568_131"
            x1="1783.27"
            y1="1059.26"
            x2="2047.18"
            y2="651.518"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D9D9D9" />
            <stop offset="1" stopColor="#333333" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_568_131"
            x1="1018.13"
            y1="668.777"
            x2="293.261"
            y2="-286.208"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#333333" />
            <stop offset="1" stopColor="#AFAFAF" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_568_131"
            x1="813.181"
            y1="1099.53"
            x2="100.538"
            y2="425.716"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#333333" />
            <stop offset="1" stopColor="#AFAFAF" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}

export function Mountain({
  width = '100%',
  height = '100%',
  animate = false,
  original = false,
  disableWhenMobile = true,
  className,
}: MountainProps) {
  if (animate) {
    animateMountain()
  }

  if (original) {
    width = DEFAULT_SIZE
    height = DEFAULT_SIZE
  }

  width = width === 'original' ? '2719' : width
  height = height === 'original' ? '1296' : height

  const ConfiguredMountainComponent = () => (
    <MountainSVG width={width} height={height} className={className} />
  )

  return disableWhenMobile ? (
    <Media greaterThan="mobile">
      <ConfiguredMountainComponent />
    </Media>
  ) : (
    <ConfiguredMountainComponent />
  )
}
