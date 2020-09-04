import styles from '~/styles/index/right.module.scss'
import { GlobalContext } from '~/pages/_app'
import React, { useContext, useState, useEffect } from 'react'
import { Table, Radio, Divider, Modal, Button } from 'antd'
import API from '~/utils/http'
import { RadioChangeEvent } from 'antd/lib/radio'
const usersEndpoint = '/users'
const userDetailEndpoint = '/user-detail'

interface User {
  key: string
  name: string
  age: number | null
  address: string
}

interface TableInfo {
  total: number
  list: Array<User>
}

export default function IndexRightPage() {
  const globalContext: any = useContext(GlobalContext)
  const {indexState: {curTreeDataItem}} = globalContext
  const [users, setUsers] = useState([])
  const [detailInfo, setDetailInfo] = useState({
    key: '',
    name: '',
    age: null,
    address: ''
  })
  const [detailModel, setDetailModel] = useState({
    title: '',
    visible: false,
  })
  const showDetail = async (record: User) => {
    const { data } = await API.post(userDetailEndpoint, {key: record.key})
    setDetailInfo(data)
    setDetailModel({
      title: `${data.name}基本信息`,
      visible: true
    })
  }
  const [columns, setColumns] = useState([
    {title: '姓名', dataIndex: 'name', key: 'name', render: (text: string, record: User)=> <a onClick={() =>showDetail(record)}>{record.name}</a>},
    {title: '年龄', dataIndex: 'age', key: 'age'},
    {title: '住址', dataIndex: 'address', key: 'address'}
  ])
  const [selectionType, setSelectionType] = useState() // checkbox
  const [selectedRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    total: 6,
    current: 1,
    pageSize: 20,
  })

  const rowSelection = {
    // @ts-ignore
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows, 'onChange')
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: (record: User) => ({
      disabled:  record.name === '张三',
      name: record.name,
    })
  }
  const handleSelectionType = (e: RadioChangeEvent): void => {
    const { target: { value } } = e
    setSelectionType(value)
  }
  // @ts-ignore
  const getTableData = async (pagination) => {
    setLoading(true)
    const {data: {total, list, current}} = await API.post(usersEndpoint, pagination)
    setLoading(false)
    setPagination({
      ...pagination,
      total,
    })
    console.log(current, 'current')
    setUsers(list)
  }

  const handleDetailModalOk = () => {
    setDetailModel({
      ...detailModel,
      visible: false,
    })
  }
  
  useEffect(() => {
    getTableData(pagination)
  }, [])

  return (
    <div className={styles.container}>IndexRightPage
      {curTreeDataItem?.title}
      <p>已选中{selectedRows.length}条数据</p>
      <div>
        <Radio.Group onChange={handleSelectionType} value={selectionType}>
          <Radio value="checkbox">checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>
        <Divider/>
        <Table loading={loading} rowSelection={{type: selectionType, ...rowSelection}} dataSource={users} columns={columns} pagination={pagination} onChange={getTableData}/>
      </div>
      <Modal {...detailModel} onCancel={handleDetailModalOk} footer={[
        <Button key="ok" onClick={handleDetailModalOk}>确定</Button>,
      ]}>
        <p>姓名：{ detailInfo?.name }</p>
        <p>年龄：{ detailInfo?.age }</p>
        <p>住址：{ detailInfo?.address }</p>
      </Modal>
    </div>
  )
}