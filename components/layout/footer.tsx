
import styles from '~/styles/layout/index.module.scss'
import { Layout } from 'antd'
const {Footer} = Layout

export default function LayoutFooter () {
  return (
    <Footer className={styles.footer}>footer部分</Footer>
  )
}