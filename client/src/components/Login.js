import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import {
  fetchUser,
  onChangeText,
  authUserWithFetch,
  loginHasError,
  clearLoginError,
  authUserStarted
} from "../actions/user";
import { withCookies } from "react-cookie";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChangeUsername(value) {
    this.setState({ username: value });
  }

  onChangePassword(value) {
    this.setState({ password: value });
  }

  componentDidMount() {
    if (this.props.cookies.get("token")) this.props.history.push("/netuce");
  }

  authUser = () => {
    const { username, password } = this.state;
    const { authUserWithFetch, fetchUser } = this.props;
    this.props.clearLoginError();
    this.props.authUserStarted();
    authUserWithFetch(username, password)
      .then(token => {
        fetchUser()
          .then(user_data => {
            this.authForward(token, user_data.data);
          })
          .catch(err => {
            console.log("authUserWithFetch error", { err });
          });
      })
      .catch(err => {
        console.log("authUserWithFetch error", { err });
      });
    this.setState({ username: "" });
    this.setState({ password: "" });
    document.getElementById("login-form").reset();
  };

  authForward(token, user_data) {
    const { cookies } = this.props;
    const { error } = this.props;
    if (error === "") {
      localStorage.setItem("token", token);
      cookies.set("token", token, { path: "/" });
      cookies.set("user_name", user_data.name, { path: "/" });
      cookies.set("userId", user_data.id, { path: "/" });
      this.props.history.push("/netuce");
    }
  }

  render() {
    const { error, authUserGoingOn } = this.props;
    let errorMessage = "";
    let loadingMessage = "";

    if (authUserGoingOn) {
      loadingMessage = (
        <Message icon warning>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Thanks for your patience</Message.Header>
            We are trying to login
          </Message.Content>
        </Message>
      );
    } else {
      if (error.length > 1) {
        errorMessage = (
          <Message negative>
            <Message.Header>ERROR</Message.Header>
            <p>{error}</p>
          </Message>
        );
      }
    }

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image
                style={{ width: "auto", height: "50px" }}
                src="https://x5n5i6t7.stackpathcdn.com/wp-content/uploads/2017/04/netuce_web_logo.png"
              />
              <br />
              Log-in to your account
            </Header>
            <Form size="large" id="login-form">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e => this.onChangeUsername(e.target.value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.onChangePassword(e.target.value)}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={e => {
                    this.authUser();
                  }}
                >
                  Login to account
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <button>Sign Up</button>
            </Message>
            {errorMessage}
            {loadingMessage}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userInfo, error, authUserGoingOn } = state.user;
  return { userInfo, cookies: ownProps.cookies, error, authUserGoingOn };
};

export default withCookies(
  connect(mapStateToProps, {
    fetchUser,
    onChangeText,
    authUserWithFetch,
    loginHasError,
    clearLoginError,
    authUserStarted
  })(Login)
);
