import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

function Loading() {
  return (
    <div className={styles.loading_container}>
      <img src={loading} alt="Carregando" className={styles.loader} />
      <p>Carregando...</p>
    </div>
  )
}

export default Loading
