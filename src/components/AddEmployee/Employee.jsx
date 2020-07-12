import React, { useState,useEffect } from 'react';
import './AddNewEmpStyle.css';
import AddNewEmp from './AddNewEmp'
import firebaseDb from "../firebase";


const Employee=()=>{

    var [employeeObjects,setEmployeeObjects]=useState({})
    var [currentId,setCurrentId]=useState('')

    useEffect(() => {
        firebaseDb.database().ref().child('employees').on('value',snapshot=>{
                    if(snapshot.val()!=null)
                    setEmployeeObjects({
                        ...snapshot.val()
                    })

        })
       
    }, [])

    const addOrEdit = obj =>{
        if(currentId=='')
        firebaseDb.database().ref().child('employees').push(
                obj,
                err=>{
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')

                }
            )
        else
        firebaseDb.database().ref().child(`employees/${currentId}`).set(
                obj,
                err=>{
                    if(err)
                        console.log(err)
                    else
                     setCurrentId('')

                }
            )


    }

    const onDelete = key =>{
            if(window.confirm('Are you sure to Delete this ?'))

            firebaseDb.database().ref().child(`employees/${key}`).remove(
           
            err=>{
                if(err)
                    console.log(err)
                else
                 setCurrentId('')

            }
        )


    }

    return (
        <div>
            <div className="row">
            <div className="col-sm-5">
                <AddNewEmp {...({addOrEdit,currentId,employeeObjects})}/>
            </div>

            <div className="col-sm-7"> <h3>List of Employees</h3>
                <table className="table table-borderless table-stripped"> 
                    <thead className="thead-light">
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>NIC</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.keys(employeeObjects).map(id=>{
                                    return <tr key={id}>
                                        <td>{employeeObjects[id].empId}</td>
                                        <td>{employeeObjects[id].empName}</td>
                                        <td>{employeeObjects[id].empMobile}</td>
                                        <td>{employeeObjects[id].empNic}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>

                                            <a className="btn text-danger" onClick={()=>{onDelete(id)}}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>

                                    </tr>
                            })
                        }
                    </tbody>



                </table>

            </div>
            </div>
            
        </div>
    );


}

export default Employee;
