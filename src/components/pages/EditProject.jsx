import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import Loading from '../layout/Loading'
import EmptyState from '../layout/EmptyState'
import styles from './EditProject.module.css'

function EditProject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`)
            .then(resp => {
                if (!resp.ok) {
                    setTimeout(() => {
                        setNotFound(true)
                        setLoading(false)
                    }, 1000)
                    return
                }
                return resp.json()
            })
            .then(data => {
                if (data) {
                    setTimeout(() => {
                        setProject(data)
                        setLoading(false)
                    }, 1000)
                }
            })
            .catch(err => {
                console.log(err)
                setTimeout(() => {
                    setNotFound(true)
                    setLoading(false)
                }, 1000)
            })
    }, [id])

    const handleEdit = (updatedProject) => {
        // Validar dados
        if (!updatedProject.project_name || !updatedProject.budget) {
            alert('Preencha todos os campos obrigatórios')
            return
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_name: updatedProject.project_name.trim(),
                budget: parseFloat(updatedProject.budget),
                category_id: updatedProject.category?.id
            }),
        })
        .then(resp => resp.json())
        .then(() => {
            alert('Projeto atualizado com sucesso!')
            navigate('/projects')
        })
        .catch(err => {
            console.log(err)
            alert('Erro ao atualizar projeto')
        })
    }

    if (loading) return <Loading />

    if (notFound || !project) {
        return (
            <div className={styles.edit_container}>
                <EmptyState
                    icon="❌"
                    title="Projeto não encontrado"
                    description="O projeto que você está tentando editar não existe ou foi removido. Verifique o ID e tente novamente ou retorne à lista de projetos."
                    buttonText="Voltar para Projetos"
                    buttonLink="/projects"
                    variant="error"
                />
            </div>
        )
    }

    return (
        <div className={styles.edit_container}>
            <div className={styles.edit_header}>
                <Link to="/projects" className={styles.back_link}>← Voltar</Link>
                <h1>Editar Projeto</h1>
            </div>
            <ProjectForm 
                handleSubmit={handleEdit} 
                btnText="Atualizar Projeto"
                projectData={{
                    ...project,
                    category: { id: project.category_id }
                }}
            />
        </div>
    )
}

export default EditProject
