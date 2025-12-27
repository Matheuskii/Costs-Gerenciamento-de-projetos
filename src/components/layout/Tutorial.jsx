import { useState } from 'react';
import styles from './Tutorial.module.css';

function Tutorial({ onClose }) {
    const [step, setStep] = useState(1);

    const steps = [
        {
            title: "Passo 1: Criar Projeto",
            content: "Clique em 'Novo Projeto' no menu superior. Preencha o nome, orçamento e a categoria desejada.",
            icon: "🚀"
        },
        {
            title: "Passo 2: Gerenciar Custos",
            content: "Na lista de 'Meus Projetos', clique em editar. Lá você poderá visualizar quanto do orçamento já foi gasto.",
            icon: "📊"
        },
        {
            title: "Passo 3: Adicionar Serviços",
            content: "Dentro da edição do projeto, clique em 'Adicionar Serviço'. O valor de cada serviço será subtraído do seu orçamento total automaticamente.",
            icon: "💰"
        }
    ];

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <span className={styles.icon}>{steps[step-1].icon}</span>
                <h2>{steps[step-1].title}</h2>
                <p>{steps[step-1].content}</p>
                
                <div className={styles.actions}>
                    {step < steps.length ? (
                        <button onClick={() => setStep(step + 1)} className={styles.btn_next}>Próximo</button>
                    ) : (
                        <button onClick={onClose} className={styles.btn_finish}>Começar Agora!</button>
                    )}
                </div>
                
                <div className={styles.dots}>
                    {steps.map((_, i) => (
                        <div key={i} className={`${styles.dot} ${step === i + 1 ? styles.active : ''}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tutorial;