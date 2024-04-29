import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { overTimeData, ScatterPoint } from '../data/skills'

export function SkillsOverTimeScatter() {
  const scatterPoints = useMemo(() => {
    return overTimeData.map((cv: ScatterPoint) => {
      return (
        <Scatter
          key={cv.label}
          name={cv.label}
          data={cv.series}
          line
          fill="#8884d8"
        />
      )
    })
  }, overTimeData)

  return (
    <div className="scatterChart">
      <ResponsiveContainer width="100%" height="80%">
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="year" name="year" unit="yr" />
          <YAxis
            type="number"
            dataKey="competency"
            name="competency"
            unit="%"
          />
          <Tooltip />
          <Legend />
          {scatterPoints}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
