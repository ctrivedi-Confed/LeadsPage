import { useState } from 'react';
import Navbar from './components/Navbar';
import './components/AddEntry.css';
import './index.css';
import AddEntry from './components/AddEntry'
import FormElement from './components/FormElement';


function App() {
  const [people, setPeople] = useState([{
    id:"123", 
    firstName:"Chintan",
    lastName: "Trivedi",
    email: "chintant777@gmail.com", 
    date: "Tue Dec 07 2021 11:15:21 GMT-0500 (Eastern Standard Time)",
    notes: "created by assuming that data has been received by back-end server. storing temporary in array of json object."
  }, {
    id:"1234", 
    firstName:"nameFields",
    lastName: "Validation",
    email: "validate@gmail.com", 
    date: "Tue Dec 06 2021 11:15:21 GMT-0500 (Eastern Standard Time)",
    notes: "validated all the input fields of create and update should not be empty!!"
  }]);
  const [update, setUpdate] = useState(false);
  const [person, setPerson] = useState({});
  const [data, setData] = useState(people);
  const [searchText, setSearchText] = useState("");

  const deleteUser = (event) => {
      setPeople(people.filter((person) => {
          return person.id !== event.target.id;
      }));
  }
     
  const editUser = (e) => {
      setUpdate(true);
      setPerson(people.filter((p) => {
          return p.id === e.target.id;
      })[0]);
      console.log(person);
  }

     
  // handle change event of search input
  const handleChange = (event) => {
    setSearchText(event.target.value);
    filterData(searchText);
  };
 
  // filter records by search text
  const filterData = (value) => {
    // const lowercasedValue = value.toLowerCase().trim();
    if (value === "") setData(people);
    else {
      const filteredData = people.filter(item => {
        return Object.keys(item).some(key => item[key].toString().includes(value));
      });
      setData(filteredData);
    }
  }

  return (
    <>
      <Navbar people = {people} setPeople={setPeople} searchChange={handleChange}/>
      <table className="tableData" border="1">
        <thead>
          <tr>
            <th width="15%">Name</th>
            <th width="15%">Email</th>
            <th width="15%">Date</th>
            <th>Notes</th>
            <th width="10%">Actions</th>
          </tr>
        </thead>
       <tbody>
        {searchText.length === 0 ? 
          (people.map((lead) =>  {
              return (
              <tr key={lead.id}>
                  <td>{lead.firstName + ' ' + lead.lastName} </td>
                  <td>{lead.email}</td>
                  <td>{lead.date}</td>
                  <td>{lead.notes}</td>
                  <td>
                      <span><button className="Btn editBtn" onClick={editUser} id={lead.id}>
                            Edit
                      </button></span>
                      <span><button className="Btn deleteBtn" onClick={deleteUser} id={lead.id}>Delete</button></span>
                  </td>
              </tr>
              )}
          )) :
          (data.map((lead) =>  {
              return (
              <tr key={lead.id}>
                  <td>{lead.firstName + ' ' + lead.lastName} </td>
                  <td>{lead.email}</td>
                  <td>{lead.date}</td>
                  <td>{lead.notes}</td>
                  <td style={{display: "flex", justifyContent: "space-evenly"}}>
                      <span><button className="Btn editBtn" onClick={editUser} id={lead.id}>
                            Edit
                      </button></span>
                      <span><button className="Btn deleteBtn" onClick={deleteUser} id={lead.id}>Delete</button></span>
                  </td>
              </tr>
              )}
          ))}
        </tbody>
      </table>
      {data.length === 0 && <span id="error">No data to display</span>}
      {(update)?
          (<AddEntry trigger={update} setTrigger={setUpdate} update={update}>
              <FormElement 
                setPeople={setPeople} 
                people={people} 
                person = {person} 
                setPerson= {setPerson} 
                setTrigger={setUpdate} 
                deleteUser = {deleteUser}
                update={update}/>
          </AddEntry>)
            : ""
      }      
    </>
  );
}

export default App;
