import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2' // Importação corrigida aqui
import styles from './Projects.module.css' // Barra removida aqui
import Loading from '../layout/Loading'
import EmptyState from '../layout/EmptyState'

function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/projects')
            .then(resp => resp.json())
            .then(data => {
                setTimeout(() => {
                    setProjects(data)
                    setLoading(false)
                }, 1000)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    function removeProject(id) {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffbb33',
            cancelButtonColor: '#222',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar',
            background: '#efefef'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/projects/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(() => {
                    setProjects(projects.filter(project => project.id !== id));
                    
                    Swal.fire(
                        'Deletado!',
                        'Seu projeto foi removido com sucesso.',
                        'success'
                    );
                })
                .catch(err => {
                    Swal.fire('Erro!', 'Não foi possível deletar o projeto.', 'error');
                });
            }
        });
    }

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '70vh'
            }}>
                <Loading />
            </div>
        )}
    

    return (
        <div>
            <h1>Projetos</h1>
            <Link to="/newproject" className={styles.btn}>Novo Projeto</Link>
            
            {projects.length === 0 ? (
                <EmptyState
                    icon="📋"
                    title="Nenhum projeto cadastrado"
                    description="Comece criando seu primeiro projeto agora mesmo!"
                    buttonText="Criar Primeiro Projeto"
                    buttonLink="/newproject"
                    variant="info"
                />
            ) : (
                <div className={styles.projects_grid}>
                    {projects.map(project => (
                        <div key={project.id} className={styles.project_card}>
                            <div className={styles.card_header}>
                                <h3>{project.project_name}</h3>
                                <span className={styles.category_badge}>Cat: {project.category_id}</span>
                            </div>
                            <div className={styles.card_body}>
                                <div className={styles.card_info}>
                                    <p><strong>Orçamento:</strong></p>
                                    <p className={styles.budget}>R$ {parseFloat(project.budget).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className={styles.card_actions}>
                                <Link to={`/projects/${project.id}`} className={styles.btn_edit}>Editar</Link>
                                <button className={styles.btn_delete}
                                    onClick={() => removeProject(project.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects