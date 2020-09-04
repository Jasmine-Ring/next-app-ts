import styles from '~/styles/layout/index.module.scss'
import { Layout } from 'antd'
import LayoutFooter from '~/components/layout/footer'
import LayoutHeader from '~/components/layout/header'
const { Content } = Layout

export default function IndexPage (props: any) {
  return (
    <Layout className={styles.container}>
      <LayoutHeader/>
      <Content style={{padding: '0 50px'}} className={styles.content}>
        {props.children}
      </Content>
      <LayoutFooter/>
    </Layout>
  )
}