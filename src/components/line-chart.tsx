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

  const skillLines = useMemo(() => {
    return dataKeys.map((key, i) => {
      return (
        <Line
          type="monotone"
          dataKey={key.dataKey}
          name={key.name}
          key={key.dataKey}
          stroke={colors[i]}
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
