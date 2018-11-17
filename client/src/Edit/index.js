import React  from 'react';


const Edit = (props) =>  {

  return (
    <div>
      <h4> Edit </h4>
      <form onSubmit={props.closeAndEdit}>
        <label>
          <input type="text" name="name" onChange={props.handleFormChange} value={props.partyToEdit.name}/>
        </label>

        <label>
          <input type="date" name="date" onChange={props.handleFormChange} value={props.partyToEdit.date}/>
        </label>

        <label>
          <input type="text" name="location" onChange={props.handleFormChange} value={props.partyToEdit.location}/>
        </label>

        <label>
          <input type="text" name="zip" onChange={props.handleFormChange} value={props.partyToEdit.date}/>
        </label>

        <label>
          <input type="text" name="information" onChange={props.handleFormChange} value={props.partyToEdit.information}/>
        </label>

        <input type='Submit'/>
      </form>
    </div>

    )
  }

export default Edit;
