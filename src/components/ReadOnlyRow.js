import React from 'react';

const ReadOnlyRow = ({contact, handleEditClick, handleDeleteClick}) => {
    return(
        <tr className=".table-striped">
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td>
                <button className="btn btn-primary" type="button" onClick={(event) => handleEditClick(event, contact)}>Edit</button>
                <button className="btn btn-danger ml-4" type="button" onClick={() => handleDeleteClick(contact.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;