import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import Loading from "../layout/Loading";
import EmptyState from "../layout/EmptyState";
import styles from "./EditProject.module.css";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [services, setServices] = useState([]);
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then((resp) => {
        if (!resp.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        return resp.json();
      })
      .then((data) => {
        if (data) {
          setProject(data);
          return fetch(`http://localhost:5000/projects/${id}/services`);
        }
      })
      .then((resp) => {
        if (resp && resp.ok) {
          return resp.json();
        }
      })
      .then((servicesData) => {
        if (servicesData) {
          setServices(servicesData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = (updatedProject) => {
    if (!updatedProject.project_name || !updatedProject.budget) {
      toast.warning("Preencha todos os campos obrigatórios");
      return;
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: updatedProject.project_name.trim(),
        budget: parseFloat(updatedProject.budget),
        category_id: updatedProject.category?.id,
      }),
    })
      .then((resp) => resp.json())
      .then(() => {
        toast.success("Projeto atualizado com sucesso!");
        navigate("/projects");
      })
      .catch((err) => toast.error("Erro ao atualizar projeto"));
  };

  function createService(service) {
    const newCost = parseFloat(project.cost || 0) + parseFloat(service.cost);

    if (newCost > parseFloat(project.budget)) {
      toast.warning("Orçamento insuficiente para este serviço!");
      return;
    }

    fetch(`http://localhost:5000/projects/${id}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    })
      .then((resp) => resp.json())
      .then(() => {
        toast.success("Serviço adicionado!");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function removeService(serviceId, cost) {
    Swal.fire({
        title: 'Remover Serviço?',
        text: `O valor de R$ ${cost} voltará para o orçamento.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ffbb33',
        cancelButtonColor: '#222',
        confirmButtonText: 'Sim, remover'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/services/${serviceId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cost: cost, project_id: id })
            })
            .then(() => {
                setServices(services.filter((s) => s.id !== serviceId));
                setProject({ ...project, cost: project.cost - cost });
                
                Swal.fire('Sucesso!', 'Serviço removido.', 'success');
            })
            .catch(err => console.log(err));
        }
    });
}

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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

  if (notFound || !project) {
    return (
      <div className={styles.edit_container}>
        <EmptyState
          icon="❌"
          title="Projeto não encontrado"
          description="O projeto que você está tentando editar não existe."
          buttonText="Voltar para Projetos"
          buttonLink="/projects"
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className={styles.edit_container}>
      <div className={styles.edit_header}>
        <Link to="/projects" className={styles.back_link}>
          ← Voltar
        </Link>
        <h1>Editar Projeto</h1>
      </div>

      <ProjectForm
        handleSubmit={handleEdit}
        btnText="Atualizar Projeto"
        projectData={{
          ...project,
          category: { id: project.category_id },
        }}
      />

      <div className={styles.service_section}>
        <h2>Adicionar um serviço:</h2>
       <button 
    className={`${styles.btn} ${showServiceForm ? styles.btn_close : ''}`} 
    onClick={toggleServiceForm}
>
    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
</button>

        {showServiceForm && (
          <ServiceForm
            handleSubmit={createService}
            btnText="Adicionar Serviço"
            projectData={project}
          />
        )}
      </div>

      <h2>Serviços:</h2>
      <div className={styles.services_list}>
        {services.length > 0 ? (
          services.map((s) => (
            <ServiceCard
              key={s.id}
              id={s.id}
              name={s.service_name}
              cost={s.cost}
              description={s.description}
              handleRemove={removeService}
            />
          ))
        ) : (
          <p>Não há serviços cadastrados.</p>
        )}
      </div>
    </div>
  );
}

export default EditProject;
