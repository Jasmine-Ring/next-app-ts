import styles from '~/styles/index/index.module.scss'
import IndexLeft from '~/components/index/left'
import IndexRight from '~/components/index/right'
import LayoutDefault from '~/components/layout'

const IndexPage: React.FC = () => {
  return (
    <LayoutDefault>
      <div className={styles.nav}>
        <IndexLeft/>
      </div>
      <div className={styles.main}>
        <IndexRight/>
      </div>
    </LayoutDefault>
  )
}

export default IndexPage