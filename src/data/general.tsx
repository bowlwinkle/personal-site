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
        <b>{engManagerWorkExp}</b>. I do not have any externally facing projects
        but checkout my resume, skills, and a little bit about me!
      </p>
      <p>
        I love learning as I go and I love the people that I meet on the way.
        The end goal for my career is still unknown, but I keep climbing.
      </p>
      <p>
        I'm currently unemployed due to the fact that I moved out of the city of
        Portland during covid to be next to family. I was given the choice to
        either move back to Portland or resign and leave the company. I chose to
        resign and leave the company. On June 24th, 2023, my daughter was born
        and I chose to take a little hiatus to spend some time with her before I
        spend a lot of time looking for the next chapter in my career. It was
        fun and rewarding, but the time has come to get back to work.
      </p>
      <p>
        I'm looking for a remote position, so if you know of any opportunities,
        please don't hesitate to reach out!
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
