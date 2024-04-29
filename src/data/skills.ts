/*eslint @typescript-eslint/no-explicit-any: "off"*/
export type RadarData = any[] | undefined

const fullMark = 100

export const technicalData: RadarData = [
  {
    subject: 'React (JS & TS)',
    value: 80,
    fullMark,
  },
  {
    subject: 'NodeJS (JS & TS)',
    value: 88,
    fullMark,
  },
  {
    subject: 'AWS',
    value: 72,
    fullMark,
  },
  {
    subject: 'REST/GraphQL',
    value: 78,
    fullMark,
  },
  {
    subject: 'CircleCI/Jenkins/GH Actions',
    value: 65,
    fullMark,
  },
  {
    subject: 'DynamoDB',
    value: 65,
    fullMark,
  },
  {
    subject: 'Docker',
    value: 60,
    fullMark,
  },
  {
    subject: 'Terraform',
    value: 65,
    fullMark,
  },

  {
    subject: 'Figma/Sketch',
    value: 37,
    fullMark,
  },
]

export const pastTechData: RadarData = [
  {
    subject: 'Vue',
    value: 75,
    fullMark,
  },
  {
    subject: 'Golang',
    value: 75,
    fullMark,
  },
  {
    subject: 'C#',
    value: 88,
    fullMark,
  },
  {
    subject: 'C++',
    value: 72,
    fullMark,
  },
  {
    subject: 'VBScript',
    value: 78,
    fullMark,
  },
  {
    subject: 'Powershell',
    value: 65,
    fullMark,
  },
  {
    subject: 'Bash',
    value: 60,
    fullMark,
  },
  {
    subject: 'Batch',
    value: 65,
    fullMark,
  },
  {
    subject: 'Win32',
    value: 65,
    fullMark,
  },
]

type SkillScatterPoint = {
  competency: number
  year: number
  fullMark: number
}

export type ScatterPoint = {
  label: string
  series: SkillScatterPoint[]
}

export const overTimeData: ScatterPoint[] = [
  {
    label: 'C++',
    series: [
      { competency: 65, year: 2011, fullMark },
      { competency: 65, year: 2013, fullMark },
    ],
  },
  {
    label: 'C#',
    series: [
      { competency: 55, year: 2011, fullMark },
      { competency: 80, year: 2019, fullMark },
    ],
  },
  {
    label: 'VBScript',
    series: [
      { competency: 0, year: 2011, fullMark },
      { competency: 70, year: 2015, fullMark },
    ],
  },
  {
    label: 'Powershell',
    series: [
      { competency: 0, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: '802.11',
    series: [
      { competency: 15, year: 2011, fullMark },
      { competency: 72, year: 2016, fullMark },
    ],
  },
  {
    label: 'Bash',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Batch',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Win32',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Golang',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'React',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'AWS',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Node',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Terraform',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Docker',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Vue',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
  {
    label: 'Figma/Sketch',
    series: [
      { competency: 2, year: 2011, fullMark },
      { competency: 2, year: 2011, fullMark },
    ],
  },
]
