import styles from '~/styles/index/left.module.scss'
import { Tree } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '~/pages/_app'
import { setCurTreeDataItem } from '~/action/index'
import API from '~/utils/http'

export default function IndexLeftPage() {
  const globalContext: any = useContext(GlobalContext)
    const expandedKeys = ['0-1']

  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState(expandedKeys)
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(expandedKeys)
  const [showLine, setShowLine] = useState(true)
  const [treeData, setTreeData] = useState([])

  // @ts-ignore
  const onSelect = (selectedKeys: any, { selectedNodes }) => {
    setDefaultSelectedKeys(selectedKeys)
    console.log(selectedKeys, 'selectedNodes[0]')
    globalContext.dispatch(setCurTreeDataItem(selectedNodes[0]))
  }

  const getTreeData = async () => {
    const {data} = await API.get('/tree')
    setTreeData(data)
    // @ts-ignore
    setDefaultExpandedKeys(expandedKeys)
    // const selectedKeys = ['0-2']
    // @ts-ignore
    setDefaultSelectedKeys(expandedKeys)
    console.log(data[0].children[1], 'data[0][1]')
    globalContext.dispatch(setCurTreeDataItem(data[0].children[0]))
  }

  useEffect(() => {
    getTreeData()
  }, [])

  return (
    <div className={styles.container}>
      <Tree treeData={treeData} showLine={ showLine } defaultExpandedKeys={defaultExpandedKeys} defaultSelectedKeys={defaultSelectedKeys} onSelect={onSelect}/>
    </div>
  )
}