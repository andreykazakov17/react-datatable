import React from 'react';

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return(
        <tr className=".table-striped">
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name"
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an address"
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a phone number"
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button className="btn btn-success" type="submit">Save</button>
                <button className="btn btn-secondary ml-4" type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow;