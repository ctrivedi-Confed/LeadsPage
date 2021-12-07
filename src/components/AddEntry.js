import React from "react";
import './AddEntry.css';

const AddEntry = (props) => {
    return (props.trigger) ?
        (<div className="popup">
            <div className="popup-inner">
                <h3> {(props.update) ? "update" : "Add"} Entry</h3>
                <button 
                    className="close-btn"
                    onClick = {() => props.setTrigger(false)}
                >   X
                </button>
                <hr style={{backgroundColor: "grey"}}/>
                { props.children }
            </div>
        </div>) : "";
}

export default AddEntry;