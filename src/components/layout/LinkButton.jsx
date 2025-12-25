import styles from './LinkButton.modules.css'

function LinkButton({to, text}) {
    return (
        <Link className={styles.btn} to={to}>
        {text}
        </Link>

    )
}

export default LinkButton