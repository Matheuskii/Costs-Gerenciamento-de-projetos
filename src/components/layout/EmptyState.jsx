import { Link } from 'react-router-dom'
import styles from './EmptyState.module.css'

function EmptyState({ icon, title, description, buttonText, buttonLink, variant = 'default' }) {
    return (
        <div className={`${styles.empty_state} ${styles[`empty_state_${variant}`]}`}>
            <div className={styles.empty_icon}>{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            {buttonLink && (
                <Link to={buttonLink} className={styles.empty_btn}>
                    {buttonText}
                </Link>
            )}
        </div>
    )
}

export default EmptyState