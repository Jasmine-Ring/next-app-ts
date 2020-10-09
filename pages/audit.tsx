import LayoutDefault from '~/components/layout'
import styles from '~/styles/audit/index.module.scss'
import { Tabs, Table, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useState, useEffect, useContext } from 'react'
import { User } from '~/components/index/right'
import API from '~/utils/http'
import { GlobalContext } from '~/pages/_app'
import { setLoading } from '~/action'
import { ColumnsType } from 'antd/lib/table'
const { TabPane } = Tabs
const { confirm } = Modal

interface TabsData {
  label: string
  key: string
}

const AuditPage: React.FC = () => {
  const globalContext: any = useContext(GlobalContext)
  const [activeKey, setActiveKey] = useState<string>('todo')
  const tabs: TabsData[] = [
    {label: '待审核', key: 'todo'},
    {label: '与我相关', key: 'aboutUs'},
    {label: '已审核', key: 'done'},
  ]
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true
  })
  const [tableData, setTableData] = useState<User[]>([])
  const showDetail = (record: User) => {
    console.log('showDetail', record)
  }
  const deleteUser = (record: User) => {
    confirm({
      title: '确定删除当前数据吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后，不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('删除成功！')
      },
      onCancel() {
        message.info('已取消删除操作！')
      },
    })
  }
  
  const columns: ColumnsType<User> = [
    {title: '姓名', dataIndex: 'name', key: 'name', render: (text: string, record: User) => <a onClick={() => showDetail(record)}>{record.name}</a>},
    {title: '年龄', dataIndex: 'age', key: 'age'},
    {title: '住址', dataIndex: 'address', key: 'address'},
    {title: '操作', key: 'action', render: (text: string, record: User) => (
      <Space size="middle">
        <a onClick={() => deleteUser(record)}>删除</a>
      </Space>
    )}
  ]

  const loadTableData  = async () => {
    globalContext.dispatch(setLoading(true))
    const {current, pageSize} = pagination
    let { data: {data, total} } = await API.post('/audits', {
      current,
      pageSize,
      type: activeKey
    }).catch((e: Error) => {
      globalContext.dispatch(setLoading(false))
    })
    globalContext.dispatch(setLoading(false))
    setTableData(data)
    setPagination({
      ...pagination,
      total,
    })
  }
  const tabsChange = (key: string) => {
    loadTableData()
  }

  const handleTabClick = (key: string) => {
    setActiveKey(key)
  }

  useEffect(() => {
    loadTableData()
  }, [])

  return (
    <LayoutDefault>
      <div className={styles.container}>
        <Tabs activeKey={activeKey} onChange={tabsChange} onTabClick={handleTabClick}>
          {
            tabs.map(x => (<TabPane tab={x.label} key={x.key}>
              <Table<User> dataSource={tableData} columns={columns} pagination={pagination} onChange={loadTableData} />
            </TabPane>))
          }
        </Tabs>
      </div>
    </LayoutDefault>
  )
}

export default AuditPage