import { toast } from 'react-toastify'
import PageInfo from '../layout/PageInfo'
import styles from './Contact.module.css'

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success('Mensagem enviada com sucesso!')
        e.target.reset()
    }

    return (
        <PageInfo 
            title="Entre em Contato"
            description="Estamos aqui para ajudar! Envie sua mensagem ou entre em contato conosco"
        >
            <div className={styles.contact_container}>
                <div className={styles.contact_info}>
                    <section className={styles.info_section}>
                        <h3>📧 Email</h3>
                        <p>
                            <a href="mailto:contato@costs.com.br">contato@costs.com.br</a>
                        </p>
                        <p className={styles.small_text}>Respondemos em até 24 horas</p>
                    </section>

                    <section className={styles.info_section}>
                        <h3>📞 Telefone</h3>
                        <p>
                            <a href="tel:+551199999999">(11) 9999-9999</a>
                        </p>
                        <p className={styles.small_text}>Segunda a Sexta, 9h às 18h</p>
                    </section>

                    <section className={styles.info_section}>
                        <h3>📍 Localização</h3>
                        <p>São Paulo - SP</p>
                        <p className={styles.small_text}>Atendimento online disponível</p>
                    </section>
                </div>

                <form className={styles.contact_form} onSubmit={handleSubmit}>
                    <h3>Envie uma Mensagem</h3>
                    
                    <div className={styles.form_group}>
                        <label htmlFor="name">Nome:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="Seu nome"
                            maxLength="100"
                            required 
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            placeholder="seu@email.com"
                            required 
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="subject">Assunto:</label>
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject"
                            placeholder="Assunto da mensagem"
                            maxLength="100"
                            required 
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="message">Mensagem:</label>
                        <textarea 
                            id="message" 
                            name="message"
                            placeholder="Sua mensagem..."
                            rows="5"
                            maxLength="500"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.submit_btn}>
                        Enviar Mensagem
                    </button>
                </form>
            </div>
        </PageInfo>
    )
}

export default Contact
