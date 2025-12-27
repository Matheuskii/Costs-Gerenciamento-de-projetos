import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm( {handleSubmit, btnText, projectData} ) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() =>{
        fetch("http://localhost:5000/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        
        if (!project.project_name || project.project_name.trim().length < 3) {
            toast.warning('Nome do projeto deve ter pelo menos 3 caracteres')
            return
        }
        
        if (!project.budget || parseFloat(project.budget) <= 0) {
            toast.warning('Orçamento deve ser maior que 0')
            return
        }
        
        if (!project.category) {
    Swal.fire({
        icon: 'info',
        title: 'Ops...',
        text: 'Por favor, selecione uma categoria!',
        confirmButtonColor: '#ffbb33'
    });
    return;
}

        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value})
        console.log(project)
    }

    function handleCategory(e){
        setProject({
            ...project, category: {
                id: e.target.value,
                category_name: e.target.options[e.target.selectedIndex].text,
            },
        })
        console.log(project)
            }
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Nome do projeto" 
            nome='project_name' 
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value={project.project_name || ''}
            />

          <Input 
          type="number" 
          text="Orçamento do projeto" 
          nome='budget' 
          placeholder="0.00"
          handleOnChange={handleChange}
          value={project.budget || ''}
          isCurrency={true}
          />
           <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
           <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm