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
    startDate: 'March 2001',
    endDate: 'Feb 2024',
    markDown: `## Howdy
    asdf
    ![](./public/lg-logo.png)`,
  },
  {
    logo: NikeLogo,
    company: 'Nike',
    title: 'Software Engineering Manager',
    startDate: 'March 2001',
    endDate: 'Feb 2024',
    markDown: `## Howdy
    asdf
    ![](./public/lg-logo.png)`,
  },
  {
    logo: IntelLogo,
    company: 'Intel',
    title: 'Software Engineering Manager',
    startDate: 'March 2001',
    endDate: 'Feb 2024',
    markDown: `## Howdy`,
  },
  {
    logo: IntelLogo,
    company: 'Intel',
    title: 'Software Engineering Manager',
    startDate: 'March 2001',
    endDate: 'Feb 2024',
    markDown: `## Howdy`,
  },
]
