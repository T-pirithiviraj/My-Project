import React from 'react';

export class Input extends React.Component{
state = {
    radio: ' ',
}
constructor(props){
    super(props);
    this.addRow = this.addRow.bind(this); 
  
}  
onRadioChange(value) {
    this.setState({
      radio: value,
    })
  }
addRow(){
    let empName=this.refs.empName.value;
    let gender =this.state.radio;
    let description =this.refs.description.value;
    let newRow = {name:empName , gender:gender ,description : description};
    this.props.addrow(newRow);
    
    
}

    render(){
        return(
            <div className="addEmp">
                <div>Name <input type="text"  ref ="empName" /></div><br></br>
                <div>Gender <input type="radio" name="gender"  value="Male" onChange={(e) => this.onRadioChange('Male')} ref="gender"/>Male 
                <input type="radio" name ="gender" value="Female" onChange={(e) => this.onRadioChange('Female')} ref="gender"/>Female </div>
                <div>About <textarea ref="description"></textarea></div> <br></br>     
                <button onClick={this.addRow}>Add</button>
            </div>  
        );
    }
}
