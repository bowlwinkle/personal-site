import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { RadarData } from '../data/skills'

type TechnicalSkillsProps = {
  data: RadarData
  fullMark?: number
}

function TechnicalSkills({ data, fullMark = 100 }: TechnicalSkillsProps) {
  return (
    <div className="technicalSkills">
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, fullMark]} />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TechnicalSkills
