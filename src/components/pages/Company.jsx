import PageInfo from '../layout/PageInfo'
import styles from './Company.module.css'

function Company() {
    return (
        <PageInfo 
            title="Sobre a Empresa"
            description="Conheça mais sobre nossa missão e valores"
        >
            <div className={styles.company_content}>
                <section className={styles.section}>
                    <h2>Nossa Missão</h2>
                    <p>Simplificar o gerenciamento de projetos e custos, permitindo que empreendedores e gestores tenham total controle sobre seus investimentos de forma prática e intuitiva.</p>
                </section>

                <section className={styles.section}>
                    <h2>Visão</h2>
                    <p>Ser a plataforma preferida para gerenciamento de projetos, oferecendo soluções simples, eficientes e acessíveis a todos os tipos de negócio.</p>
                </section>

                <section className={styles.section}>
                    <h2>Valores</h2>
                    <ul className={styles.values_list}>
                        <li><strong>Simplicidade:</strong> Interfaces intuitivas e fáceis de usar</li>
                        <li><strong>Eficiência:</strong> Ferramentas práticas que economizam tempo</li>
                        <li><strong>Transparência:</strong> Dados claros e sempre atualizados</li>
                        <li><strong>Confiabilidade:</strong> Segurança e estabilidade garantidas</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Por Que Escolher Costs?</h2>
                    <ul className={styles.features_list}>
                        <li>✓ Interface simples e intuitiva</li>
                        <li>✓ Gerenciamento completo de projetos</li>
                        <li>✓ Controle de orçamentos em tempo real</li>
                        <li>✓ Categorizações automáticas</li>
                        <li>✓ Suporte rápido e eficiente</li>
                    </ul>
                </section>
            </div>
        </PageInfo>
    )
}

export default Company
