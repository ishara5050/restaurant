import React, { Component } from "react";
import "./LoginPageStyle.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import store from "store";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  // render() {
  //     // return (
  //     //     <div className="loginParent">
  //     //         <div className="loginForm">
  //     //             <form>
  //     //                 <div className="form-group">
  //     //                     <label htmlFor="exampleInputEmail1">Email address</label>
  //     //                     <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  //     //                     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  //     //                 </div>
  //     //                 <div className="form-group">
  //     //                     <label htmlFor="exampleInputPassword1">Password</label>
  //     //                     <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
  //     //                 </div>
  //     //                 <div className="form-group form-check">
  //     //                     <input type="checkbox" className="form-check-input" id="exampleCheck1" />
  //     //                     <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  //     //                 </div>
  //     //                 <button type="submit" className="btn btn-primary">Submit</button>
  //     //             </form>
  //     //         </div>
  //     //     </div>
  //     // );
  // }

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    console.log(history);
    this.setState({ error: false });

    if (!(username === "nalaka" && password === "nalaka")) {
      return this.setState({ error: true });
    }

    store.set("loggedIn", true);
    history.push("/emp");
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;

    return (
      // <Grid>
      //   <Helmet>
      //     <title>Login</title>
      //   </Helmet>

      //   <Grid.Column width={6} />
      //   <Grid.Column width={4}>
      //     <Form className="loginForm" error={error} onSubmit={this.onSubmit}>
      //       <Header as="h1">Login</Header>
      //       {error && <Message
      //         error={error}
      //         content="That username/password is incorrect. Try again!"
      //       />}
      //       <Form.Input
      //         inline
      //         label="Username"
      //         name="username"
      //         onChange={this.handleChange}
      //       />
      //       <Form.Input
      //         inline
      //         label="Password"
      //         type="password"
      //         name="password"
      //         onChange={this.handleChange}
      //       />
      //       <Form.Button type="submit">Go!</Form.Button>
      //     </Form>
      //   </Grid.Column>
      // </Grid>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={require("../../login.png")} /> Log-In
          </Header>
          {error && (
            <Message
              error={error}
              content="That username/password is incorrect. Try again!"
            />
          )}
          <Form size="large" error={error} onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User Name"
                name="username"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />

              <Form.Button color="teal" fluid size="large" type="submit">
                Login
              </Form.Button>
            </Segment>
          </Form>          
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(LoginPage);
