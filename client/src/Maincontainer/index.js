import React, {Component} from 'react';
import Parties from '../Parties';
import CreateParty from '../CreateParty';
import Edit from '../Edit';
// import queryString from 'query-string';

// THIS IS OUR PROFILE PAGE WITH ALL OUR CRUD
class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      parties:[],
      showEdit: false,
      editPartyId: null,
      partyToEdit:{
        name:'',
        date:'',
        location:'',
        zip:'',
        information:''
          }
    }
  }

  componentDidMount(){
      this.getParties().then((parties) => {
      this.setState({
          parties: parties.data,
          user: parties.user
        })
      }).catch((err) => {
        console.log(err)
      });







    }

    addParty = async (party, e) => {
      e.preventDefault();
      try {
        const CreateParty = await fetch('http://localhost:3001/api/v1/main', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(party),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const parsedResponse = await CreateParty.json();
        console.log(parsedResponse,'this is parsedResponse');
        this.setState({parties: [...this.state.parties, parsedResponse.data]})
      } catch(err){
        console.log(err,'this is the error');
      }

    }


    getParties = async () => {
      const parties = await fetch('http://localhost:3001/api/v1/main', {method: 'GET', credentials: 'include'});
      const parsedParties = parties.json();
      return parsedParties
    }



    deleteParty = async (id, e) => {
      e.preventDefault();
      console.log('deleteParty function is being called, this is the id: ', id);

      try {
        const deleteParty = await fetch('http://localhost:3001/api/v1/main/' + id, {
          method: 'DELETE',
          credentials: 'include',
        });

        const parsedResponse = await deleteParty.json();
        console.log(parsedResponse,'this is parsedResponse');
        if(parsedResponse.status === 200){
          this.setState({parties: this.state.parties.filter((party, i) => party._id !== id)})
        }
      } catch(err){
        console.log(err);
      }
    }


    showModal = (id) => {
      const partyToEdit = this.state.parties.find((party) => party._id === id);
      this.setState({
        showEdit: true,
        editPartyId: id,
        partyToEdit: partyToEdit
      });

    }
    closeAndEdit = async (e) => {
       e.preventDefault();
       try {
        const editParty = await fetch('http://localhost:3001/api/v1/main/' + this.state.editPartyId, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(this.state.partyToEdit),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const parsedResponse = await editParty.json();
        const editedPartyArray = this.state.parties.map((party) => {

          if(party._id === this.state.editPartyId){

            party.name = parsedResponse.data.name;
            party.date = parsedResponse.data.date;
            party.location = parsedResponse.data.location;
            party.zip = parsedResponse.data.zip;
            party.information = parsedResponse.data.information;

          }

          return party
        });

        this.setState({
          parties: editedPartyArray,
          showEdit: false
        });

       } catch(err) {
        console.log(err)
       }

    }
    handleFormChange = (e) => {
      this.setState({
        partyToEdit: {
          ...this.state.partyToEdit,
          [e.target.name]: e.target.value
        }
      });
    }
    render(){
      console.log(this.state,'this is the state for maincontainer');
      return (
        <div>


           <CreateParty addParty={this.addParty}/>
          {this.state.showEdit ? <Edit closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} partyToEdit={this.state.partyToEdit}/> : null}
          <br></br>
          <br></br>

          <Parties parties={this.state.parties} deleteParty={this.deleteParty}
          showModal={this.showModal} user={this.state.user} />
          <br></br>
          <br></br>
          <br></br>

        </div>
      )
    }
}


  export default MainContainer;
