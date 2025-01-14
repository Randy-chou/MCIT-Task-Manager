import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const ProjectPage = ({ match, history }) => {

    let projectId = match.params.id
    console.log(projectId)
    let [project, setProject] = useState({ project: '', description: '' })

    useEffect(() => {
        getProject()
    }, [projectId])


    let getProject = async () => {
        if (projectId === 'new') return

        let response = await fetch(`/api/projects/${projectId}/`)
        let data = await response.json()
        setProject(data)
    }

    let createProject = async () => {
        fetch(`/api/projects/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
    }


    let updateProject = async () => {
        fetch(`/api/projects/${projectId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
    }


    let deleteProject = async () => {
        fetch(`/api/projects/${projectId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    let handleSubmit = () => {
        console.log('NOTE:', project)
        if (projectId !== 'new' && (project.description === '' || project.project === '')) {
            deleteProject()
        } else if (projectId !== 'new') {
            updateProject()
        } else if (projectId === 'new' && project.description !== '' && project.project !== '') {
            createProject()
        }
        history.push('/')
    }

    let handleChange = (input, inputType) => {
        if (inputType === "project") {
            setProject(project => ({ ...project, 'project': input }))
        } else if (inputType === "description") {
            setProject(project => ({ ...project, 'description': input }))
        }
    }

    return (
        <div className="task" >

            <div className="task-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {projectId !== 'new' ? (
                    <button onClick={deleteProject}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <div className="task-detail">
                <h5>Project Name</h5>
                <textarea defaultValue="" className='task-textarea-title' onChange={(e) => { handleChange(e.target.value, "project") }} value={project?.project}></textarea>
            </div>

            <div className="task-detail">
                <h5>Description</h5>
                <textarea onChange={(e) => { handleChange(e.target.value, "description") }} value={project?.description}></textarea>
            </div>
        </div>

    )
}

export default ProjectPage
