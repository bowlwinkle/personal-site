import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dataKeysOverTime, skillsOverTimeData } from '../data/skills'
import { Divider, Radio, CheckboxProps } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const data = skillsOverTimeData()
const dataKeys = dataKeysOverTime()

const purple1 = '#F149FF'
const purple2 = '#8D0096'

const green1 = '#33B300'
const green2 = '#258900'
const green3 = '#0B3C00'

const blue1 = '#00B7F1'
const blue2 = '#00698C'
const blue3 = '#002433'

const gold1 = '#F6C472'
const gold2 = '#DEAA00'
const gold3 = '#816300'

const orange1 = '#F39100'
const orange2 = '#8C5100'

const colors = [
  purple1,
  purple2,
  blue1,
  blue2,
  blue3,
  orange1,
  orange2,
  green1,
  green2,
  green3,
  gold1,
  gold2,
  gold3,
]

// Fisher-Yates shuffle algorithm
function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

shuffleArray(colors)

export function SkillsOverTime() {
  const [toggle, setToggle] = useState(false)
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme)

  // Get theme-aware colors
  const getThemeColors = () => {

    // Use CSS custom properties or fallback colors based on theme
    switch (currentTheme) {
      case 'dark':
        return ['#f8f8f2', '#bd93f9', '#50fa7b', '#ffb86c', '#ff5555', '#8be9fd', '#f1fa8c']
      case 'dracula':
        return ['#f8f8f2', '#bd93f9', '#50fa7b', '#ffb86c', '#ff5555', '#8be9fd', '#f1fa8c']
      case 'monokai':
        return ['#f8f8f2', '#66d9ef', '#a6e22e', '#fd971f', '#f92672', '#ae81ff', '#e6db74']
      case 'github':
        return ['#c9d1d9', '#238636', '#da3633', '#f85149', '#58a6ff', '#f2cc60', '#bc8cff']
      case 'discord':
        return ['#dcddde', '#5865f2', '#57f287', '#ed4245', '#faa61a', '#eb459e', '#00d4aa']
      case 'notion':
        return ['#e9e9e7', '#2eaadc', '#9065b0', '#d44c47', '#448361', '#e16259', '#9b59b6']
      case 'solarized':
        return ['#839496', '#268bd2', '#859900', '#dc322f', '#b58900', '#d33682', '#2aa198']
      case 'nord':
        return ['#d8dee9', '#5e81ac', '#a3be8c', '#bf616a', '#d08770', '#b48ead', '#88c0d0']
      default:
        return colors // fallback to original colors
    }
  }

  const themeColors = getThemeColors()

  const skillLines = useMemo(() => {
    return dataKeys.map((key, i) => {
      return (
        <Line
          type="monotone"
          dataKey={key.dataKey}
          name={key.name}
          key={key.dataKey}
          stroke={themeColors[i % themeColors.length]}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      )
    })
  }, [dataKeys])

  return (
    <div className="lineChart">
      <Divider />
      <Radio
        type="radio"
        toggle
        onClick={(_, data: CheckboxProps) => setToggle(!!data.checked)}
      />
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid
            fill={toggle ? 'black' : undefined}
            fillOpacity={0.8}
            strokeDasharray="3 3"
          />
          <XAxis dataKey="year" name="year" unit="yr" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {skillLines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
