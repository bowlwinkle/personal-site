import { NavLink } from 'react-router-dom'

const joinedIndustry = '2011-06-18T00:00:00'
const engManagerBeginning = '2021-03-15T00:00:00'

function getYears(specificDate: Date) {
  const calculatedDifference =
    new Date().getTime() - new Date(specificDate).getTime()
  return Math.abs(new Date(calculatedDifference).getUTCFullYear() - 1970)
}

export function AboutContent() {
  const totalWorkExp = getYears(new Date(joinedIndustry))
  const engManagerWorkExp = getYears(new Date(engManagerBeginning))
  const sweWorkExp = totalWorkExp - engManagerWorkExp
  return (
    <>
      <p>
        I'm Lucas and I've been in the tech industry for <b>{totalWorkExp}</b>{' '}
        years and counting. I've been an individual contributor for{' '}
        <b>{sweWorkExp}</b> and was an engineering manager for{' '}
        <b>{engManagerWorkExp}</b>. I do not have any external projects but
        checkout my <NavLink to="/work?tab=Resume">resume</NavLink>,{' '}
        <NavLink to="/skills">skills</NavLink>, and a little bit about me!
      </p>
      <p>
        During the summer of 2023, my daughter was born! I finally see what
        every parent has told me before... yada yada yada, <b>"you'll see"</b>.
        I see and love her so much!
      </p>
      <p>
        My family and I are gearing up for our next big adventure—yes, we're
        moving again (can you believe it?)! A new opportunity has come our way,
        and we're seizing it with excitement and determination. Central Oregon,
        here we come!
      </p>
      <p>
        Born in southern Oregon, attended Oregon Institute of Technology,
        obtained my B.S. in Software Engineering, before I relocated to Portland
        Oregon to work for my first company, Intel.
      </p>
      <p>
        I love hanging out with my family, skiing, being outside, and tinkering
        on something in the shop.
      </p>
    </>
  )
}
