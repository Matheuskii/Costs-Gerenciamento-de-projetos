// src/components/service/ServiceCard.jsx
import styles from '../pages/Projects.module.css' // Reaproveitando grid de projetos
import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove }) {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <div className={styles.card_header}>
                <h3>{name}</h3>
            </div>
            <div className={styles.card_body}>
                <p><strong>Custo:</strong> R$ {parseFloat(cost).toFixed(2)}</p>
                <p>{description}</p>
            </div>
            <div className={styles.card_actions}>
                <button className={styles.btn_delete} onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard