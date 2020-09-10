import styles from '~/styles/layout/index.module.scss'
import { Layout, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { GlobalContext } from '~/pages/_app'
import LayoutFooter from '~/components/layout/footer'
import LayoutHeader from '~/components/layout/header'
import { useContext } from 'react'
const { Content } = Layout

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function IndexPage (props: any) {
  const globalContext: any = useContext(GlobalContext)

  return (
    <Spin size="large" spinning={globalContext.indexState.loading} indicator={antIcon}>
      <Layout className={styles.container}>
        <LayoutHeader/>
        <Content style={{padding: '0 50px'}} className={styles.content}>
          {props.children}
        </Content>
        <LayoutFooter/>
      </Layout>
    </Spin>
  )
}