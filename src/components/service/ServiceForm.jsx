import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css' 

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        if (!service.name || !service.cost) {
            toast.warning("Preencha o nome e o custo do serviço!")
            return
        }
        handleSubmit(service)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                nome="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                nome="cost"
                placeholder="0.00"
                isCurrency={true}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                nome="description"
                placeholder="Descreva o que será feito"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm