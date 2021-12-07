import React, {useState} from 'react';
import '../index.css';
import AddEntry from "./AddEntry";
import FormElement from './FormElement';


const Navbar = (props) => {
    const [buttonTrigger, setButtonTrigger] = useState(false);
    
    return ( 
        <div className= "header">
            <h2 className="title"> Leads Page </h2><br/>
            <button className="successBtn" onClick= {() => setButtonTrigger(true) }> Create </button>
            <div className="searchBar">   
                <input type="text" placeholder="search" name="search" onChange={props.searchChange}></input> 
            </div>
        
            <AddEntry trigger={buttonTrigger} setTrigger={setButtonTrigger}>
                <FormElement people = {props.people} setPeople= {props.setPeople} setTrigger={setButtonTrigger} setData={props.setData}/>
            </AddEntry>
        </div>
        
    );
}

export default Navbar;