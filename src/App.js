import React, { Component } from 'react';
import './App.css';
import { Header } from "./components/Header";
import Modal from './components/Modal';
import { Input } from "./components/Input";

function contentEditable(WrappedComponent) {
  return class extends React.Component {
    state = {
      editing: false
    }

    toggleEdit = (e) => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState({
        editing: true
      }, () => {
        this.domElm.focus();
      });
    };

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.props.onSave && this.isValueChanged()) {
          console.log('Value is changed', this.domElm.textContent);
        }
      });
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    };

    handleKeyDown = (e) => {
      switch (e) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() { 
      let editOnClick = true;
      const {editing} = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
      >
        {this.props.value}
      </WrappedComponent>
      )
    }
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.add_row=this.add_row.bind(this);
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
          description:'HR Manager1'    
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
          description:'HR Manager2'
        }
      ], 
      isShowing : false,
      modalIndex:'',
     // isViewIndex:0,
      gender: ''
    }
  }
  openModalHandler = (index) => {
    console.log(index);
    this.setState({
      isShowing: true,
      modalIndex:index
    //  isViewIndex :index
           
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
  deleteRow = (index) => { 
    const newRows = this.state.Data.slice(0, index).concat(this.state.Data.slice(index + 1));
    this.setState({
      Data: newRows,
    });
  };
  render(){
  // let Editabletable = contentEditable('table');
   let Editabledata = contentEditable('td');
    return(
    <div>
    <Header />
    <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler} >
            {this.state.modalIndex ===''? <div className="input"><Input addrow={this.add_row} /></div> :<div><div className="profile"><img src={this.state.Data[this.state.modalIndex].gender === "Female" ? "http://www.lagunawoodspodiatry.com/images/2016/12/06/female_avatar.jpg" : "https://i1.wp.com/dizitalsquare.com/wp-content/uploads/2018/07/Male-Avatar.png"} alt="123" /></div> <div>Name : {this.state.Data[this.state.modalIndex].name}</div><div className="gender">Gender : {this.state.Data[this.state.modalIndex].gender}</div><div className="about">About : {this.state.Data[this.state.modalIndex].description}</div></div>}        
    </Modal>
    <div>
      { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
        <button className="open-modal-btn" onClick={() =>this.openModalHandler('')} ref="Add Emmployee">Add Employee</button>
   
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
        <th><h3>Delete</h3></th>         
      </tr>
    </thead>
    <tbody>
    {
      this.state.Data.map((item,index) =>(
        <tr key={index}>  
          <td > 
            <img src={item.gender === "Female" ? "http://www.lagunawoodspodiatry.com/images/2016/12/06/female_avatar.jpg" : "https://i1.wp.com/dizitalsquare.com/wp-content/uploads/2018/07/Male-Avatar.png"} alt="123" /></td>
          <Editabledata value={item.name} /> 
          <td>{item.gender}</td>
          <Editabledata value={item.description} />
          <td>  { this.state.isShowing ? <div onClick={() =>this.closeModalHandler(index)} className="back-drop"></div> : null }
          <button  onClick={() => this.openModalHandler(index)} ref="view employee">View</button>
      
          </td>
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
}
const container = document.createElement("div");
document.body.appendChild(container);
export default App;
