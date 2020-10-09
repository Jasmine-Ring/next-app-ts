
import styles from '~/styles/layout/index.module.scss'
import { Layout } from 'antd'
const {Footer} = Layout

const LayoutFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>footer部分</Footer>
  )
}

export default LayoutFooter