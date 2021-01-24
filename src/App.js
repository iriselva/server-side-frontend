
import {useEffect, useState} from 'react';
import Form from './Form';
import styled from 'styled-components';

export const BASE_API_URL = "http://localhost:5000";

// Styled components
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: sans-serif;
  border: 1rem; 
`;

const StyledTable = styled.table`
  text-align: left;
  width: 100%;
  border-radius: 3px
  border: 1px solid lightgray;
  border-collapse: collapse;

  &&& {
    th, 
    td {
      border: 1px solid lightgray;
      padding: 0.5rem;

      button {
        width: -webkit-fill-available;
        border: 1px solid gray;
        background-color: white;
        border-radius: 3px;

        &:hover {
          background-color: lightgray;
        }
      }
    }
  }
`;

function App() {
  const [projects, setProjects] = useState([]);

  // getting and setting projects data from mongodb
  useEffect(() => {
    const getProjects = async ()=> { 
      const response = await fetch(`${BASE_API_URL}/projects`);
      const data = await response.json();
      setProjects(data);
    }
    
    getProjects();
  }, [])

  // deleting an items from projectslist
  const deleteRow = async (id)=>{
    await fetch(`${BASE_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    // return list minus deletet object
    setProjects(projects.filter( project => {
      return project._id !== id;
    }));
  }
  
  return (
    <StyledApp>
      <h1>Knitting Workbook</h1>
      <h2>My Projects</h2>
      <div>
        <StyledTable>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Yarn</th>
            <th>Delete</th>
          </tr>
          {/* mapping through each object */}
          {projects.map(project => (
            <tr key={project._id}>
              <td>{`${project.name}`}</td>
              <td>{`${project.date}`}</td>
              <td>{`${project.type}`}</td>
              <td>{`${project.yarn}`}</td>
              <td>
                {/* finding id when clicking */}
                <button onClick={() => deleteRow(project._id)}>✕</button>
              </td>
            </tr>
          ))}
        </StyledTable>
      </div>
        
      <h2>Add new project</h2>
      {/* adding new item to list through form */}
      <Form onProjectAdded={(newProject) => setProjects([...projects, newProject])}/>

    </StyledApp>
  );
}

export default App;