import React, { useState, useEffect } from "react";
import "./AddNewEmpStyle.css";
import AddNewEmp from "./AddNewEmp";
import firebaseDb from "../firebase";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import store from "store";
import isloggedIn from "../../helpers/is_logged_in";

const handleLogout = (history) => () => {
  store.remove("loggedIn");
  history.push("/login");
};

const Employee = ({ history }) => {
  
  var [employeeObjects, setEmployeeObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb
      .database()
      .ref()
      .child("employees")
      .on("value", (snapshot) => {
        if (snapshot.val() != null)
          setEmployeeObjects({
            ...snapshot.val(),
          });
      });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == "")
      firebaseDb
        .database()
        .ref()
        .child("employees")
        .push(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    else
      firebaseDb
        .database()
        .ref()
        .child(`employees/${currentId}`)
        .set(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to Delete this ?"))
      firebaseDb
        .database()
        .ref()
        .child(`employees/${key}`)
        .remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
  };
  if (!isloggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className="row">
        <div className="head">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/emp">
                    Manage Employees
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Manage Menu
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/cat">
                      Food Category
                    </a>
                    <a className="dropdown-item" href="/food">
                      Food Item
                    </a>
                  </div>
                </li>
                {/* <li className="nav-item">
              <a className="nav-link" href="#">Reports</a>
            </li> */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Reports
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Sales Reports
                    </a>
                    <a className="dropdown-item" href="#">
                      Estimation Reports
                    </a>
                    <a className="dropdown-item" href="#">
                      Food Rating Reports
                    </a>
                    <a className="dropdown-item" href="#">
                      Employee Rating Reports
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleLogout(history)}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-5">
          <AddNewEmp {...{ addOrEdit, currentId, employeeObjects }} />
        </div>

        <div className="col-sm-7">
          {" "}
          <h3>List of Employees</h3>
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
              {Object.keys(employeeObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{employeeObjects[id].empId}</td>
                    <td>{employeeObjects[id].empName}</td>
                    <td>{employeeObjects[id].empMobile}</td>
                    <td>{employeeObjects[id].empNic}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>

                      <a
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Employee);
