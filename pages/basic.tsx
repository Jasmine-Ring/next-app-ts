import LayoutDefault from '~/components/layout'
import { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'

interface Data {
  time: number
}

const Show:React.FC<Data> = ({time, children}) => {
  const changeTime = (time: number): string => {
    console.log('changeTime')
    return new Date(time).toISOString()
  }

  const newTime: string = useMemo(() => {
    return changeTime(time)
  }, [time])

  // const getNewTime = useCallback(() => {
  //   return changeTime(time)
  // }, [time])

  return (
    <div>
      {/* <p>Time is: { getNewTime() }</p> */}
      <p>Time is: { newTime }</p>
      <p>Random is: {children}</p>
    </div>
  )
}

const BasicPage: React.FC = () => {
  const [time, setTime] = useState<number>(0)
  const [random, setRandom] = useState<number>(0)

  return (
    <LayoutDefault>

      <Button onClick={() => setTime(new Date().getTime())}>获取当前时间</Button>
      <Button onClick={() => setRandom(Math.random())}>获取当前随机数</Button>
      <Show time={time}>{random}</Show>
    </LayoutDefault>
  )
}

export default BasicPage