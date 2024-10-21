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
    subject: 'CI/CD',
    value: 75,
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
    subject: 'SQL',
    value: 65,
    fullMark,
  },
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
  year: string
  cplusplus: number
  csharp: number
  // vbscript: number
  // powershell: number
  bash: number
  // batch: number
  // win32API: number
  go: number
  react: number
  aws: number
  node: number
  terraform: number
  docker: number
  web: number
}

/* Skills  - don't love how I'm providing this data*/
export enum Skill {
  React = 'React',
  Redux = 'Redux',
  Node = 'Node.js',
  SNS = 'AWS SNS',
  SQS = 'AWS SQS',
  Dynamo = 'AWS Dynamo DB',
  Lambda = 'AWS Lambda',
  NewRelic = 'New Relic',
  APIGateway = 'AWS API Gateway',
  StepFunctions = 'AWS Step Functions',
  MicroFrontend = 'Micro-Frontend',
  GraphQL = 'GraphQL',
  CloudFront = 'AWS CloudFront',
  S3 = 'AWS S3',
  CSharp = 'C# .NET',
  WPF = 'WPF',
  WCF = 'WCF',
  Kubernetes = 'Kubernetes',
  Mobx = 'Mobx',
  SQL = 'SQL',
  Postgres = 'PostgresSQL',
  BeeGo = 'BeeGo',
  CPlusPlus = 'C++',
  VBScript = 'VBScript',
  Powershell = 'Powershell',
  Bash = 'Bash',
  Stylus = 'Stylus',
  Less = 'Less',
  AWS = 'AWS',
  Win32API = 'Win32API',
  Batch = 'Batch',
  Go = 'Go',
  Terraform = 'Terraform',
  Docker = 'Docker',
  Figma = 'Figma',
  Other = 'Other',
}

const cplusplus = [65, 65, 55, 50, 45, 40, 40, 35, 35, 30, 30, 30, 30]
const csharp = [60, 65, 75, 80, 80, 75, 65, 60, 50, 45, 40, 40, 40]
// const vbscript = [0, 50, 55, 55, 45, 40, 30, 30, 30, 30, 30, 30, 30]
// const powershell = [0, 40, 60, 40, 25, 10, 10, 10, 10, 10, 10, 10, 10]
const bash = [0, 40, 60, 40, 25, 10, 10, 10, 10, 60, 60, 60, 60]
// const batch = [0, 40, 60, 40, 25, 10, 10, 10, 10, 10, 10, 10, 10]
// const win32API = [60, 50, 40, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0]
const go = [0, 0, 0, 0, 0, 40, 60, 70, 65, 55, 45, 40, 40]
const react = [0, 0, 0, 40, 60, 70, 80, 80, 85, 85, 75, 75, 75]
const aws = [0, 0, 0, 0, 0, 0, 0, 0, 50, 70, 75, 70, 70]
const node = [0, 0, 0, 30, 50, 60, 70, 70, 75, 75, 75, 75, 70]
const terraform = [0, 0, 0, 0, 0, 0, 0, 0, 40, 50, 60, 60, 60]
const docker = [0, 0, 0, 0, 0, 0, 30, 40, 50, 60, 60, 60, 60]
const web = [30, 30, 30, 40, 60, 70, 80, 80, 85, 85, 75, 75, 75]

export function dataKeysOverTime() {
  const dataKeys = [
    'cplusplus',
    'csharp',
    // 'vbscript',
    // 'powershell',
    'bash',
    // 'batch',
    // 'win32API',
    'go',
    'react',
    'aws',
    'node',
    'terraform',
    'docker',
    'web',
  ]

  return dataKeys.map((key) => ({ dataKey: key, name: key }))
}

// Provide a default skill level when you stopped using
export function skillsOverTimeData() {
  const careerBegan = 2011
  const timeFrame = new Date().getFullYear() - careerBegan
  const series: SkillScatterPoint[] = []

  for (let i = 0; i < timeFrame; i++) {
    series.push({
      year: String(careerBegan + i),
      cplusplus: cplusplus[i],
      csharp: csharp[i],
      // vbscript: vbscript[i],
      // powershell: powershell[i],
      bash: bash[i],
      // batch: batch[i],
      // win32API: win32API[i],
      go: go[i],
      react: react[i],
      aws: aws[i],
      node: node[i],
      terraform: terraform[i],
      docker: docker[i],
      web: web[i],
    })
  }

  return series
}
