import React, { Component } from "react";
import firebase from "../firebase";
import instance from "../../instance";
import firebaseDb from "../firebase";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import store from "store";
import isloggedIn from "../../helpers/is_logged_in";

const handleLogout = (history) => () => {
  store.remove("loggedIn");
  history.push("/login");
};

class AddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      name: "",
      image: "",
      default: "",
      description: "",
      discount: "",
      menuId: "",
      menuId_default: "",
      menuId_default_status: "",
      menuId_status: "",
      price: "",
      rating: "",
      rating_cnt: "",
      size: "",
      status: "",
      results: [], // show list
      category: [], //for drop down
      selectedCategory: "",
      Newteams: [],
      currentId: "",
    };
  }

  componentDidMount() {
    instance
      .get("/Food.json") // changing to show food
      .then((response) => {
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

    //fetch(`https://boncafe-cc1be.firebaseio.com/Catagory`)
    // fetch(`https://boncafe-cc1be.firebaseio.com/Catagory`, {
    //     headers : {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*'
    //      }

    //   })

    // .then(response=>response.json())

    instance.get("/Catagory.json").then((response) => {
      console.log(response.data);
      const fetchedResult = [];
      for (let key in response.data) {
        fetchedResult.unshift({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ category: fetchedResult });
    });
    //.then(category=>this.setState({category:category}))
  } // end component did mount

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
          price: this.state.price,
          description: this.state.description,
          discount: this.state.discount,
          default: this.state.default,
          size: this.state.size,
          menuId: this.state.selectedCategory,
          menuId_default:
            this.state.selectedCategory + "_" + this.state.default,
          menuId_default_status:
            this.state.selectedCategory + "_" + this.state.default + "_Yes",
          menuId_status: this.state.selectedCategory + "_Yes",
          status: "Yes",
          rating: "0",
          rating_cnt: "0",
        };

        firebaseDb.database().ref().child("Food").push(data);
      });
  };
  handlenameChange = (event) => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  handlepriceChange = (event) => {
    const price = event.target.value;
    this.setState({ price: price });
  };

  handledescrptionChange = (event) => {
    const description = event.target.value;
    this.setState({ description: description });
  };

  handlediscountChange = (event) => {
    const discount = event.target.value;
    this.setState({ discount: discount });
  };

  handleRadioChange = (event) => {
    const radio = event.target.value;
    this.setState({ default: radio });
  };

  handleRadioSizeChange = (event) => {
    const size = event.target.value;
    this.setState({ size: size });
  };

  handledropdownChange = (event) => {
    const drop = event.target.value;
    this.setState({ selectedCategory: drop });
  };

  onDelete = (key) => {
    if (window.confirm("Are you sure to Delete this ?"))
      firebaseDb.database().ref().child(`Food/${key}`).remove(); //`Food/${key}`

    this.setState({ currentId: "" });
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
              <h3>Add New Food</h3>

              <div className="form-group">
                <label>Select Category </label>
                <select
                  className="form-control"
                  value={this.state.selectedCategory}
                  onChange={(e) =>
                    this.setState({ selectedCategory: e.target.value })
                  }
                >
                  {this.state.category.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handlenameChange}
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.handlepriceChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.handledescrptionChange}
                />
                {/* <input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handledescrptionChange} /> */}
              </div>

              <div className="form-group">
                <label>Discount</label>
                <input
                  name="discount"
                  type="text"
                  className="form-control"
                  value={this.state.discount}
                  onChange={this.handlediscountChange}
                />
              </div>

              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radio"
                    id="inlineRadio1"
                    value="All"
                    onChange={this.handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    All
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radio"
                    id="inlineRadio2"
                    value="Dinner"
                    onChange={this.handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Dinner
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radiosize"
                    id="inlineRadiosize1"
                    value="S"
                    onChange={this.handleRadioSizeChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inlineRadiosize1"
                  >
                    Small
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radiosize"
                    id="inlineRadiosize2"
                    value="L"
                    onChange={this.handleRadioSizeChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inlineRadiosize2"
                  >
                    Large
                  </label>
                </div>
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
                    <th>Availability</th>
                    <th>Price</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.results.map((result) => {
                    //result //result.id
                    return (
                      <tr key={result.id}>
                        <td>{result.name}</td>
                        <td>{result.status}</td>
                        <td>Rs. {result.price}</td>

                        <td>
                          <a className="btn text-primary">
                            <i className="fas fa-pencil-alt"></i>
                          </a>

                          <a
                            className="btn text-danger"
                            onClick={() => {
                              this.onDelete(result.id);
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
      </div>
    );
  }
}
export default withRouter(AddFood);
