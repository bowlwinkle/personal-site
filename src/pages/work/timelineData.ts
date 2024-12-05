import NikeLogo from '../../assets/company-logos/nike.png'
import IntelLogo from '../../assets/company-logos/intel.png'

type WorkExperience = {
  logo: string
  company: string
  title: string
  startDate: string
  endDate: string
  markDown: string
}

export const TimeLineData: Array<WorkExperience> = [
  {
    logo: NikeLogo,
    company: 'Nike',
    title: 'Software Engineering Manager',
    startDate: 'May 2021',
    endDate: 'March 2024',
    markDown: `
* Managed a team of 4 engineers.
* Lead cross-functional engagements
* Collaborated with designers, engineers, teams, product, and program.
* Developed engineering roadmap as well as team tasks.
`,
  },
  {
    logo: NikeLogo,
    company: 'Nike',
    title: 'Senior Software Engineer III',
    startDate: 'March 2021',
    endDate: 'May 2019',
    markDown: `
* Built an internal AWS type platform for internal offerings for engineers to leverage.
* Worked on greenfield projects from design to production.
* Developed and maintained 5 internal platforms.
    `,
  },
  {
    logo: IntelLogo,
    company: 'Intel',
    title: 'Senior Software Engineer II',
    startDate: 'March 2016',
    endDate: 'May 2019',
    markDown: `
* Directed Acyclic Graph (DAG) Scheduler leveraging gRPC for communication,
    accessed by either API or UI
* Designed a UI to manage a server rack's physical resources based on workload
    requirements for compute, storage, and memory requirements.
    `,
  },
  {
    logo: IntelLogo,
    company: 'Intel',
    title: 'Software Engineer',
    startDate: 'July 2011',
    endDate: 'March 2016',
    markDown: `
    Software Engineer focused on test automation, validating wireless
    standards/protocols, wireless certifications, and automation tools team.

  * Worked on internal testing IDE and reporting tools.
  * Wrapped native Intel wireless libraries using C# .NET for automated testing.
  * Customer engagements to help leverage wireless features, along with OS integration:
      Microsoft, HP, Panasonic, and ActionTec`,
  },
]
