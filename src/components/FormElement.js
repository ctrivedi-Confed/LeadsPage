import React, { useState, useEffect} from 'react'
import './AddEntry.css';

function FormElement(props) {
    let current = Date.now().toString();
    const [inputs, setInputs] = useState({id: current, date: new Date().toString()});

    useEffect(() => {
        if(props.update){
            setInputs(props.person);
        }
    },[props.update, props.person]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value, date: new Date().toString()}));
    }

    const validate = (e) => {
        e.preventDefault();
        let errors = false;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let errorString = "";
        document.querySelector(`#error`).innerHTML = "";
        var inputFields = document.querySelectorAll("form input[type='text']");
        var emailField = document.querySelector("form input[name='email']");
        for(let i=1; i< inputFields.length; i++){
            if(inputFields[i].value === "" || inputFields[i].value === undefined){
                errorString += inputFields[i].name + ", ";
                errors = true;
            } 
        };
        if(errorString.length > 0)
            document.querySelector(`#error`).innerHTML = "mandatory fields: " +errorString.slice(0, -2);
        if(!pattern.test(emailField.value)){
            var div1 = document.createElement('div');
            var text1 = document.createTextNode("* please validate your email");
            div1.appendChild(text1);
            document.querySelector(`#error`).appendChild(div1);
            errors = true;
        }
        
        if(!(errors)) {
            handleSubmit(e);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(props.update){
            props.setPeople(props.people.map((person) => {
                if(person.id === inputs.id)
                    return inputs;
                else
                    return person;
            }));
        }else {
            props.setPeople([...props.people, inputs]);
        }

        props.setTrigger(false);
    }

    return (
        <>
        <div id="error"></div>
        <form>
             <label>ID: 
                <input 
                    type="text" 
                    name="id" 
                    placeholder="id" 
                    value = {inputs.id || ""}
                    disabled
                    />
            </label>
            <br />
            <label>First Name* 
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value = {inputs.firstName || ""}
                    onChange = {handleChange}
                    />
            </label>
          
            <br />
            <label>Last Name* 
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value = {inputs.lastName || ""}
                    onChange = {handleChange}
                    />
            </label>  
            
            <br />
            <label>Email* 
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email Address" 
                    value = {inputs.email || ""}
                    onChange = {handleChange}
                    />
            </label>
            <br />
            <label>Date 
                <input 
                    type="text" 
                    name="date" 
                    placeholder="date" 
                    value = {inputs.date || ""}
                    disabled
                    />
            </label>
            
            <br />
            <label>Notes* 
                <input 
                    type="text" 
                    name="notes" 
                    placeholder="Extra Notes" 
                    value = {inputs.notes || ""}
                    onChange = {handleChange}
                    />
            </label>
            
            <br />
            <input type="submit" className="success-btn" onClick={validate} value={(props.update) ? "update" : "Add"} />
        </form> 
        </>
    );
}

export default FormElement
