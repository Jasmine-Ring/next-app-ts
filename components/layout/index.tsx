import styles from '~/styles/layout/index.module.scss'
import { Layout, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { GlobalContext } from '~/pages/_app'
import LayoutFooter from '~/components/layout/footer'
import LayoutHeader from '~/components/layout/header'
import { useContext, ReactElement } from 'react'
const { Content } = Layout

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const IndexPage:React.FC<{children: ReactElement[] | ReactElement}> = (props) => {
  const globalContext: any = useContext(GlobalContext)

  return (
    <Spin className={styles.test} spinning={globalContext.indexState.loading} indicator={antIcon}>
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

export default IndexPage