import React, { Component } from 'react';
import './App.css';
import { Header } from "./components/Header";
import Modal from './components/Modal';
import { Input } from "./components/Input";

// import { details } from "./components/details";
class App extends Component {
  constructor(props){
    super(props);
    this.add_row=this.add_row.bind(this);
    this.updateComponentValue=this.updateComponentValue.bind(this);
    this.changeEditMode=this.changeEditMode.bind(this);
    this.renderEditView=this.renderEditView.bind(this);
    this.renderDefaultValue=this.renderDefaultView.bind(this);
    this.onGenderChange=this.onGenderChange.bind(this);
    this.state = {
      Data: [
        {
          id:1,
          name:'Prithivi',
          gender:'Male',
          description:'Talent Acquisition'
        },
        {
          id:2,
          name:'Divya',
          gender:'Female',
          description:'Corporate HR Executive'
        },
        {
          id:3,
          name:'Sethu',
          gender:'Male',
          description:'HR Manager'    
        },
        {
          id:4,
          name:'Mellinda',
          gender:'Female',
          description:'Talent Acquisition Executive'    
        },
        {
          id:5,
          name:'Gautham',
          gender:'Male',
          description:'HR Manager'
        }
      ],
      isInEditMode : false,
      isEditIndex : 0,
      isShowing : false,
      gender: ''
    }
  }
  openModalHandler = () => {
    this.setState({
        isShowing: true
      });
    }

  closeModalHandler = () => {
    this.setState({
        isShowing: false
      });
    }

  onGenderChange = (value) => {
    this.setState({
      gender: value
    })
  }
  add_row = (childData)=>{
    console.log(childData);
    this.state.Data.push(childData);
    this.setState({
    Data:this.state.Data
    });
  }
  changeEditMode = (index) =>{
    this.setState({
   
      isInEditMode : !this.state.isInEditMode ,
      isEditIndex : index   
    })
  }
  updateComponentValue = ((ind) =>{
    let newState = this.state;
    newState.Data[ind] = {
    name:this.refs.name.value,
    gender:this.state.gender,
    description:this.refs.description.value}; 
    console.log(ind);
    this.setState({ 
      isInEditMode: false,
      Data:newState.Data
    })
  });

  renderEditView = (ind) =>{
    return(
    <div className="editData">
      <form>
        <ul>
          <li className="editList">Name <input type="text" 
          defaultValue={this.state.Data[this.state.isEditIndex].name}
          ref="name" /></li><hr />

        <li>Gender<br></br><input type="radio"
          name="gender" defaultChecked={this.state.Data[this.state.isEditIndex].gender === "Male" ? 
          "checked":""}
          value="Male"
          onChange={(e) => this.onGenderChange('Male')} />Male<span></span>

        <input type="radio"
          name="gender" defaultChecked={this.state.Data[this.state.isEditIndex].gender ==="Female" ? 
          "checked":""}
          value="Female"
          onChange={(e) => this.onGenderChange('Female')} />Female</li><hr />

          <li className="editList">Description <input type="textarea"
          defaultValue={this.state.Data[this.state.isEditIndex].description}
          ref="description" /></li>

          <div><button onClick={this.changeEditMode}>Cancel</button><span></span>
          <button onClick={()=>{this.updateComponentValue(ind);}}>Save</button>
          </div>
        </ul>
      </form>
    </div>
    )
  }
  renderDefaultView = () =>{
    return(
      <div>
        <Header />
        <div>
          { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
            <button className="open-modal-btn" onClick={this.openModalHandler}>Add Employee</button>
              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}>
                 <div className="input">
                    <Input addrow={this.add_row} />
                 </div> 
              </Modal>
        </div>
        <div className ="hr_data">
        <table id='employee'>
        <thead>
          <tr>
            <th><h3>Profile</h3></th>
            <th><h3>Name</h3></th>
            <th><h3>Gender</h3></th>  
            <th><h3>About</h3></th>  
            <th><h3>View</h3></th>
            <th><h3>Edit</h3></th>
            <th><h3>Delete</h3></th>         
          </tr>
        </thead>
        <tbody>
        {
          this.state.Data.map((item,index) =>(
            <tr key={index}>  
              <td><img src={item.gender === "Female" ? "http://www.lagunawoodspodiatry.com/images/2016/12/06/female_avatar.jpg" : "https://i1.wp.com/dizitalsquare.com/wp-content/uploads/2018/07/Male-Avatar.png"} alt="123" /></td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.description}</td>
              <td><button onclick={this.view}>View</button></td>
              <td><button onClick={() => {this.changeEditMode(index)}}>Edit</button></td>
              <td><button onClick={() => { this.deleteRow(index); }}>delete</button></td>
              {/* <td><button onClick={this.full_details}>click</button></td> */}
            </tr>                   
          ))
        }      
        </tbody>
        </table>    
        </div>
      </div> 
    )
  }
  deleteRow = (index) => { 
    const newRows = this.state.Data.slice(0, index).concat(this.state.Data.slice(index + 1));
    this.setState({
      Data: newRows,
    });
  };
  render(){
    
    //return this.renderDefaultView();
    return this.state.isInEditMode ? this.renderEditView(this.state.isEditIndex) :this.renderDefaultView()
      
  }
}
const container = document.createElement("div");
document.body.appendChild(container);
export default App;
