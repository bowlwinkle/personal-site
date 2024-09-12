import { Skill } from './skills'

export enum Companies {
  Nike = 'Nike',
  Intel = 'Intel',
}

export enum WorkType {
  FE = 'Frontend',
  BE = 'Backend',
  App = 'Application',
}

export type Project = {
  name: string
  redacted: boolean
  overview: string
  builtFor: Companies
  builtWith: Skill[]
  workType: WorkType[]
  year: string
}

export const projects: Project[] = [
  {
    name: 'Developer Portal',
    redacted: false,
    overview:
      'Internal platform that hosted documentation, and provisioned OAuth applications for internal developers (OAuth 2.0, OpenID Connect)',
    builtFor: Companies.Nike,
    builtWith: [Skill.React, Skill.Node, Skill.NewRelic],
    workType: [WorkType.FE, WorkType.BE],
    year: "'21-'24",
  },
  {
    name: 'Platform Console',
    redacted: true,
    overview: `Built an internal AWS-style console, providing a centralized hub for technical products and documentation.
Simplified access to critical tools, improving efficiency for the entire organization leveraging a micro-frontend architecture.`,
    builtFor: Companies.Nike,
    builtWith: [
      Skill.React,
      Skill.GraphQL,
      Skill.Lambda,
      Skill.Dynamo,
      Skill.MicroFrontend,
      Skill.ClientAWS,
    ],
    workType: [WorkType.BE, WorkType.FE],
    year: "'19-'24",
  },
  {
    name: 'Nark',
    redacted: false,
    overview: `Stood up an internal schemaless data enrichment metric service, enhancing data quality and decision-making.
Leveraged active directory and analytics to drive insights.`,
    builtFor: Companies.Nike,
    builtWith: [
      Skill.APIGateway,
      Skill.Lambda,
      Skill.SNS,
      Skill.SQS,
      Skill.NewRelic,
    ],
    workType: [WorkType.BE],
    year: '2020',
  },
  {
    name: 'Digital Asset Management',
    redacted: true,
    overview:
      'Delivered a user-friendly DAM (Digital Asset Management) user interface, enabling efficient management of digital assets.  Assisted backend team to increase velocity.',
    builtFor: Companies.Nike,
    builtWith: [Skill.Mobx, Skill.Node, Skill.Kubernetes],
    workType: [WorkType.FE, WorkType.BE],
    year: '2020',
  },
  {
    name: 'GEM',
    redacted: true,
    overview:
      'Developed a user interface for an internal managed kafka platform.',
    builtFor: Companies.Nike,
    builtWith: [Skill.React, Skill.Redux, Skill.Stylus],
    workType: [WorkType.FE, WorkType.BE],
    year: "'19-'21",
  },
  {
    name: 'Rack Scale Design',
    redacted: true,
    overview: `Designed a user-friendly UI to manage server rack resources dynamically.
Optimized resource allocation based on workload requirements (compute, storage, memory).`,
    builtFor: Companies.Intel,
    builtWith: [Skill.React, Skill.Redux, Skill.Less],
    workType: [WorkType.FE],
    year: '2017',
  },
  {
    name: 'Syndicate',
    redacted: false,
    overview:
      'Directed Acyclic Graph (DAG) Scheduler leveraging gRPC for communication, accessed either by API or UI.',
    builtFor: Companies.Intel,
    builtWith: [
      Skill.React,
      Skill.Redux,
      Skill.Less,
      Skill.BeeGo,
      Skill.Postgres,
    ],
    workType: [WorkType.BE, WorkType.FE],
    year: '2016',
  },
  {
    name: 'Automation Tools Team',
    redacted: false,
    overview: ``,
    builtFor: Companies.Intel,
    builtWith: [
      Skill.CSharp,
      Skill.React,
      Skill.Redux,
      Skill.Less,
      Skill.CPlusPlus,
    ],
    workType: [WorkType.App, WorkType.FE],
    year: "'14-'16",
  },
  {
    name: 'WHQL Automation',
    redacted: false,
    overview: `Developed an application that runs the Microsoft wireless certification on 30 plus machines
      using the WHQL API asynchronously, adapting, and monitoring failures.  Work required a variety of APIs, SDKs, and technology to properly monitor, reset, initialize the platform.`,
    builtFor: Companies.Intel,
    builtWith: [Skill.CSharp, Skill.WPF, Skill.Other],
    workType: [WorkType.App],
    year: '2014',
  },
  {
    name: 'OEM Test Plans Automation',
    redacted: false,
    overview: `Worked with customers to obtain test plans, and automated the test plans to run on Intel hardware before shipping driver updates.`,
    builtFor: Companies.Intel,
    builtWith: [
      Skill.CSharp,
      Skill.CPlusPlus,
      Skill.Powershell,
      Skill.VBScript,
      Skill.Bash,
      Skill.Other,
    ],
    workType: [WorkType.App],
    year: '2013',
  },
  {
    name: 'Wifi Direct Certification',
    redacted: false,
    overview: `Created an application that runs the Wifi Alliance's Wi-fi Direct certification on Intel hardware, and software.`,
    builtFor: Companies.Intel,
    builtWith: [
      Skill.CSharp,
      Skill.CPlusPlus,
      Skill.Powershell,
      Skill.VBScript,
      Skill.Bash,
      Skill.Other,
    ],
    workType: [WorkType.App],
    year: '2013',
  },
  {
    name: 'Wireless Test Automation',
    redacted: false,
    overview: ``,
    builtFor: Companies.Intel,
    builtWith: [
      Skill.CSharp,
      Skill.CPlusPlus,
      Skill.Powershell,
      Skill.VBScript,
      Skill.Bash,
      Skill.Other,
    ],
    workType: [WorkType.App],
    year: "'11-'14",
  },
]
