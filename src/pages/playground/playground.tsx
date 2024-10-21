import './playground.scss'
import { animate } from 'motion'
import { useEffect } from 'react'

export function Playground() {
  useEffect(() => {
    animate(
      '.box',
      {
        x: 100,
        y: 100,
        scale: 2,
        rotate: 180,
        borderRadius: 50,
        backgroundColor: 'var(--bgWork)',
      },
      { duration: 5 }
    )

    animate(
      '.pointlessBackground',
      {
        width: [0, '200%'],
      },
      { duration: 5 }
    )

    animate(
      '.pointlessBackground2',
      {
        width: ['0', '200%'],
      },
      { duration: 0.5, delay: 0.5 }
    )
  })

  return <div className="box" />
}
