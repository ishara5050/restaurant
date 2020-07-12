import React, { useState,useEffect } from 'react';
import './AddNewEmpStyle.css';

const AddNewEmp=(props)=>{
    const initialFieldValues={
        empId :'',
        empName :'',
        empMobile :'',
        empNic :''
    }

    var [values,setValues] = useState(initialFieldValues)

    useEffect(() => {
        if(props.currentId =='')
            setValues({
                ...initialFieldValues
                
            })
        else
            setValues({
                ...props.employeeObjects[props.currentId]
            })
     
    },[props.currentId,props.employeeObjects])
        

    const handleInputChange =(e)=>{
         var {name,value} = e.target
            setValues({
                ...values,
                [name] : value
            })
    }

    const handleFormSubmit =(e)=>{

        e.preventDefault();
        props.addOrEdit(values)
        alert
        ("Added Successfully")

    }
    
    return (
        <div> 
            <h3 className="title">Add New Employee</h3>
             <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Employee ID</label>
                        <input type="number" className="form-control" name="empId"  placeholder="Employee ID" value={values.empId} onChange={handleInputChange} />
                        
                    </div>

                    <div className="form-group">
                        <label>Employee Name</label>
                        <input type="text" className="form-control" name="empName"  placeholder="Name" value={values.empName} onChange={handleInputChange}/>
                        
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="number" className="form-control" name="empMobile" placeholder="Contact Number" value={values.empMobile} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>NIC</label>
                        <input type="text" className="form-control" name="empNic" placeholder="NIC"  value={values.empNic} onChange={handleInputChange}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block"/>
                    </div>

                </form>
       
        </div>
    );


}


export default AddNewEmp;
