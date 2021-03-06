import React, { Component } from "react";
import firebase from "../firebase";
import instance from "../../instance";
import { withRouter, Redirect } from "react-router-dom";
import store from "store";
import isloggedIn from "../../helpers/is_logged_in";

const handleLogout = (history) => () => {
  store.remove("loggedIn");
  history.push("/login");
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      name: "",
      image: "",

      results: [],
    };
  }

  componentDidMount() {
    instance.get("/Catagory.json").then((response) => {
      console.log(response.data);
      const fetchedResult = [];
      for (let key in response.data) {
        fetchedResult.unshift({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ results: fetchedResult });
    });
  }

  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };

  handleSave = () => {
    let bucketName = "image";
    let file = this.state.files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,

      () => {
        let downloadURL = uploadTask.snapshot.downloadURL;
      }
    );
  }; // end handle save

  showImage = () => {
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child("image/" + this.state.files[0].name);
    storageRef
      .child("image/" + this.state.files[0].name)
      .getDownloadURL()
      .then((url) => {
        //console.log(url)
        this.setState({ image: url });
        console.log(this.state.image);
        console.log(this.state.name);

        const data = {
          name: this.state.name,
          image: this.state.image,
        };

        firebase.database().ref().child("Catagory").push(data);
      });
  };
  handlenameChange = (event) => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  render() {
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
                    <a
                      className="nav-link"
                      href=""
                      onClick={handleLogout(this.props.history)}
                    >
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
            <div>
              <h3>Add New Category</h3>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={this.state.name}
                  onChange={this.handlenameChange}
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    this.handleChange(e.target.files);
                  }}
                />
              </div>

              <button
                onClick={this.handleSave}
                className="btn btn-secondary btn-block"
              >
                Upload Image
              </button>
              <br></br>
              <button
                onClick={this.showImage}
                className="btn btn-primary btn-block"
              >
                Add
              </button>
              <img id="new-img" />
            </div>
          </div>

          <div className="col-sm-7">
            {" "}
            <h3>List of Categories</h3>
            <div
              style={{ width: "750px", height: "70vh", overflowY: "scroll" }}
            >
              <table className="table table-borderless table-stripped">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.results.map((result) => {
                    return (
                      <tr key={result.id}>
                        <td>{result.name}</td>

                        <td>
                          <a className="btn text-primary">
                            <i className="fas fa-pencil-alt"></i>
                          </a>

                          <a className="btn text-danger">
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
      </div>
    );
  }
}
export default withRouter(Test);
