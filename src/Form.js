import React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BASE_API_URL} from './App';

//Styled Components
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledLabel = styled.label`
    padding: 1rem 0 0.5rem 0;
    font-weight: bold;
`;

const StyledButton = styled.button`
    margin: 2rem 0;
    background-color: lightblue;
    height: 2rem;
    border-radius: 3px;
    border: 1px solid gray;
    font-weight: bold;

    &:hover{
        background-color: darkcyan;
    }
`;

function Form({onProjectAdded}) {
    const [types, setTypes] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [yarn, setYarn] = useState('');
    const [date, setDate] = useState('');
 
    // gettting form type options from mongodb
    useEffect(() => {
        const getTypes = async () => {
            const response = await fetch(`${BASE_API_URL}/project/types`)
            const data = await response.json();
            setTypes(data);
            setType(data[0].value);
        }
        getTypes();
    }, []);
    
    // form post submition 
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const repsonse = await fetch(`${BASE_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify({name, date, type, yarn})
        })
        const newProject = await repsonse.json(); 

        onProjectAdded(newProject);
    }

    return (
    <div>
        <StyledForm onSubmit={handleSubmit}>

            <StyledLabel htmlFor="name">Name:</StyledLabel>
                <input 
                    type='text' 
                    name='name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} required/>
            
            <StyledLabel htmlFor="date">Date finished:</StyledLabel>
                <input 
                    type='date' 
                    name='date' 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} required/>

            <StyledLabel htmlFor="type">Type:</StyledLabel>
                <select 
                    name="type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}>
                    {/* mapping throught options */}
                    {types.map(type => (
                        <option key={type.value} value={type.value}>{type.name}</option>
                    ))}
                </select>
            
            <StyledLabel htmlFor="yarn">Yarn used:</StyledLabel>
                <input 
                    type='text' 
                    name='yarn' 
                    value={yarn} 
                    onChange={(e) => setYarn(e.target.value)} required/>
            
            <StyledButton type="submit">Save</StyledButton>
        </StyledForm>
    </div>
  );
}

export default Form;