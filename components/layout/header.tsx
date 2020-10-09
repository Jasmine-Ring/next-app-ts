

import styles from '~/styles/layout/index.module.scss'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Dropdown } from 'antd'
import { HomeOutlined, BarsOutlined, DatabaseOutlined, DownOutlined} from '@ant-design/icons'
import { GlobalContext } from '~/pages/_app'
import { setActiveMenu } from '~/action'
const { Header } = Layout
const { SubMenu } = Menu

const LayoutHeader:React.FC = () => {
  const globalContext: any = useContext(GlobalContext)
  const router = useRouter()
  const { route } = router

  const handleUserMenuClick = (e: any) => {
    console.log(e)
    switch (e.key) {
      case 'center':
        router.push('/userCenter')
        break;
      case 'logout':
        router.push('/login')
        break;
      default:
        break;
    }
  }

  const handleMenuClick = (e: any) => {
    globalContext.dispatch(setActiveMenu(e.key))
    if (e.key ==='index') {
      router.push('/')
    } else {
      router.push(`/${e.key}`)
    }
  }

  const menu = () => (
    <Menu theme="dark" onClick={handleUserMenuClick}>
      <Menu.Item key="center">个人中心</Menu.Item>
      <Menu.Item key='logout'>退出</Menu.Item>
    </Menu>
  )

  useEffect(() => {
    const activeMenu = route.substring(1) || 'index'
    globalContext.dispatch(setActiveMenu(activeMenu))
  }, [])

  return (
    <Header className={styles.header}>
      <Menu mode="horizontal" theme="dark" onClick={handleMenuClick} selectedKeys={[globalContext.indexState.activeMenu]} style={{flex: 1}}>
        <Menu.Item key="index"><HomeOutlined />首页</Menu.Item>
        <SubMenu title="标准" icon={<BarsOutlined />}>
          <Menu.Item key="basic">基础标准</Menu.Item>
          <Menu.Item key="statistic">统计标准</Menu.Item>
          <Menu.Item key="group">机构清单</Menu.Item>
        </SubMenu>
        <Menu.Item key="audit"><DatabaseOutlined />标准审核</Menu.Item>
      </Menu>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>{globalContext.indexState.username}<DownOutlined style={{marginLeft: 10}}/></a>
      </Dropdown>
    </Header>
  )
}

export default LayoutHeader