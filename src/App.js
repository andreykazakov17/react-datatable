import React, {useState, Fragment} from 'react';
//import './App.css';
import data from './mock-data.json';
import {nanoid} from 'nanoid';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import Pagination from './components/Pagination';

const App = () => {

  const [contacts, setContacts] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5);

  // Get current contacts

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  })

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  //
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email
    }

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email
    }

    const newContacts = [ ...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    }

    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return(
    <div className="app-container">
      <nav className="navbar navbar-light bg-light">
        <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" onChange={event => {setSearchTerm(event.target.value)}}/>
      </nav>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.filter((contact) => {
              if (searchTerm === "") {
                return currentContacts;
              } else if (contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                return currentContacts;
              }
            }).map((contact) => (
                <>
                  {editContactId === contact.id ? 
                    <EditableRow 
                      editFormData={editFormData} 
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}/> : 
                    <ReadOnlyRow 
                      contact={contact} 
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}/>}
                </>
              ))}
            </tbody>
        </table>
      </form>

      <Pagination 
        contactsPerPage={contactsPerPage} 
        totalContacts={contacts.length} 
        paginate={paginate}/>

      <h2 className="ml-2">Add a contact</h2>
      <form className="form-inline" onSubmit={handleAddFormSubmit}>
        <input
          className="form-control col-2 ml-2" 
          type="text" 
          name="fullName" 
          required="required" 
          placeholder="Enter a name"
          onChange={handleAddFormChange}
        />
        <input
          className="form-control col-2 ml-2" 
          type="text" 
          name="address" 
          required="required" 
          placeholder="Enter an address"
          onChange={handleAddFormChange}
        />
        <input
          className="form-control col-2 ml-2" 
          type="text" 
          name="phoneNumber" 
          required="required" 
          placeholder="Enter an phone number"
          onChange={handleAddFormChange}
        />
        <input
          className="form-control col-2 ml-2" 
          type="text" 
          name="email" 
          required="required" 
          placeholder="Enter an email"
          onChange={handleAddFormChange}
        />
        <button className="btn btn-success ml-4" type="submit">Add</button>
      </form>

    </div>
  )
}

export default App;