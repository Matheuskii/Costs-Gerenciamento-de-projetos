import styles from './PageInfo.module.css'

function PageInfo({ title, description, children }) {
  return (
    <div className={styles.page_container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default PageInfo
