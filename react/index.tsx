/* eslint-disable react-hooks/exhaustive-deps */
import { useDebounceFn } from 'ahooks'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'

interface Pps {
  width?: number
  height?: number
}

const ScreenScale: React.FC<Pps> = (props) => {
  const { children, width = 1920, height = 1080 } = props

  const getScale = () => {
    const ww = window.innerWidth / width
    const wh = window.innerHeight / height
    return ww < wh ? ww : wh
  }

  const [scale, setScale] = useState<number>(getScale())

  const { run } = useDebounceFn(() => setScale(getScale()), {
    wait: 500,
  })

  useEffect(() => {
    window.addEventListener('resize', () => run())
    return () => {
      window.removeEventListener('resize', () => run())
    }
  }, [])

  return (
    <div
      className={styles['scale-box']}
      style={{
        transform: `scale(${scale}) translate(-50%, -50%)`,
        WebkitTransform: `scale(${scale}) translate(-50%, -50%)`,
        width: width + 'px',
        height: height + 'px',
      }}
    >
      {children}
    </div>
  )
}

export default ScreenScale
