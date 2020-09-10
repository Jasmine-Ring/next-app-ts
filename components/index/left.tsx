import styles from '~/styles/index/left.module.scss'
import { Tree } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '~/pages/_app'
import { setCurTreeDataItem, TreeDataItem, setLoading } from '~/action'
import API from '~/utils/http'

export default function IndexLeftPage() {
  const globalContext: any = useContext(GlobalContext)

  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [showLine, setShowLine] = useState<boolean>(true)
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<TreeDataItem[]>([])
  // @ts-ignore
  const onSelect = (selectedKeys: any, { selectedNodes }) => {
    setSelectedKeys(selectedKeys)
    globalContext.dispatch(setCurTreeDataItem(selectedNodes[0]))
  }

  const getTreeData = async () => {
    globalContext.dispatch(setLoading(true))
    const {data} = await API.get('/tree').catch((e: Error) => {
      globalContext.dispatch(setLoading(false))
    })
    globalContext.dispatch(setLoading(false))
    setTreeData(data)
    const selTreeData = data[0].children[0]
    const {key: _id} = selTreeData
    // @ts-ignore
    setExpandedKeys([_id])
    // @ts-ignore
    setSelectedKeys([_id])
    globalContext.dispatch(setCurTreeDataItem(selTreeData))
  }

  useEffect(() => {
    getTreeData()
  }, [])

  return (
    <div className={styles.container}>
      <Tree treeData={treeData}
            showLine={ showLine }
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={onSelect}/>
    </div>
  )
}