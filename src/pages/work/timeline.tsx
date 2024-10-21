import { ReactElement, useEffect, useMemo } from 'react'
import { TimeLineData } from './timelineData'
import Markdown from 'react-markdown'
import anime from 'animejs'
import { Grid, Header, Image } from 'semantic-ui-react'

const config = {
  duration: 1000,
  circleRadius: 10,
  yIncrement: 300,
  xStartCoord: 21, // In percentage
  dateXOffset: 20, // In percentage
  yOffset: 50,
}

function calcYCoordinate(
  index: number,
  increment: number,
  circleRadius: number,
  offset: number
) {
  return increment * index + circleRadius / 2 + offset
}

function animateTimeline(
  workExpIndex: number,
  yIncrement: number,
  circleRadius: number,
  yOffset: number
) {
  const timelineInstance = anime.timeline({
    easing: 'easeOutExpo',
    duration: config.duration, // This is the duration for all steps
    autoplay: true,
  })

  timelineInstance.add({
    targets: `#workExp${workExpIndex} line`,
    opacity: 1,
    y2: calcYCoordinate(workExpIndex, yIncrement, circleRadius, yOffset),
    easing: 'linear',
  })

  timelineInstance.add({
    targets: `#workExp${workExpIndex} circle, #workExp${workExpIndex} text, #workExp${workExpIndex} foreignObject`,
    opacity: [0, 1],
  })

  return timelineInstance
}

export function Timeline() {
  const cr = config.circleRadius
  const yInc = config.yIncrement
  const xCoord = config.xStartCoord
  const dateOffset = config.dateXOffset
  const yOffset = config.yOffset

  /* @ts-expect-error asdf asdf asdf */
  let timelines = []

  useEffect(() => {
    timelines = TimeLineData.map((_, i) => {
      // if (i === 0) return // Leave commented out when the auto start is enabled
      return animateTimeline(i, yInc, cr, yOffset)
    })
  }, [])

  function triggerTimeline(i: number) {
    if (i < timelines.length) {
      /* @ts-expect-error asdf asdf asdf */
      timelines[i].play()
    }
  }

  const timelineData = useMemo(() => {
    return TimeLineData.map((workData, i): ReactElement => {
      // Starting position before animation
      const yCoordinate = calcYCoordinate(i, yInc, cr, yOffset)
      const yLineCoordinate = calcYCoordinate(i - 1, yInc, cr, yOffset)

      return (
        <g id={`workExp${i}`} key={`workExp${i}`} height="auto" width="auto">
          <text
            x={`${xCoord - dateOffset}%`}
            y={yCoordinate}
            className="svgDate"
            stroke="#3d3d3d"
            fill="#3d3d3d"
          >
            {workData.startDate} - {workData.endDate}
          </text>
          <circle
            fill="#3d3d3d"
            cx={`${xCoord}%`}
            cy={yInc * i + yOffset}
            r={cr}
            onClick={() => triggerTimeline(i + 1)}
          />
          {i > 0 && i < TimeLineData.length ? (
            <line
              x1={`${xCoord}%`}
              y1={yLineCoordinate}
              x2={`${xCoord}%`}
              y2={yLineCoordinate}
              stroke="#3d3d3d"
            />
          ) : null}
          <foreignObject
            x={`${xCoord + 4}%`}
            y={yCoordinate - 35}
            width={'70%'}
            height={'25%'}
            style={{ position: 'absolute' }}
          >
            <Grid columns={2} style={{ position: 'absolute', left: '5%' }}>
              <Grid.Row verticalAlign="bottom">
                <Grid.Column width={4}>
                  <Image
                    src={workData.logo}
                    alt={workData.company}
                    size="tiny"
                    lazy
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header as="h2">{workData.title}</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Markdown>{workData.markDown}</Markdown>
              </Grid.Row>
            </Grid>
          </foreignObject>
        </g>
      )
    })
  }, [TimeLineData])

  return (
    <svg
      id="work-timeline"
      viewBox="0 0 1000 1250"
      fill="none"
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {timelineData}
    </svg>
  )
}
