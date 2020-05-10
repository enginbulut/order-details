import React, { Component } from "react";
import {
  Header,
  Image,
  Container,
  Dropdown,
  Menu,
  Confirm,
  Transition
} from "semantic-ui-react";
import { connect } from "react-redux";

import { withCookies } from "react-cookie";
import { resetRedux } from "../actions/user";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      // Because Redux state is not persistent we have to carry user name on cookies.
      username: cookies.get("user_name") || "Not logged in",
      visible: true,
      logoutConfirm: false
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    this.setState({ username: cookies.get("user_name") || "Not logged in" });
  }

  showLogout = () => this.setState({ logoutConfirm: true });

  handleConfirm = () => {
    this.setState({ logoutConfirm: false });
    this.logout();
  };
  handleCancel = () => this.setState({ logoutConfirm: false });

  logout = () => {
    const { cookies } = this.props;
    cookies.remove("token", { path: "/" });
    cookies.remove("user_name", { path: "/" });
    this.props.history.push("/");
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="page-header">
        <Menu>
          <Menu.Item>
            <Image
              circular
              src="https://x5n5i6t7.stackpathcdn.com/wp-content/uploads/2017/04/netuce_web_logo.png"
              size="mini"
            />
          </Menu.Item>

          <Container textAlign="center" className="page-header-text">
            <Transition animation={"tada"} duration={700} visible={visible}>
              <Header as="h4">Netuce App</Header>
            </Transition>
          </Container>
          <Menu.Item position="right">
            <Dropdown text={this.state.username} pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Sign Out"
                  value={2}
                  onClick={this.showLogout}
                />
                <Confirm
                  open={this.state.logoutConfirm}
                  header="Logout Netuce App"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userInfo, currentApp } = state.user;
  return { userInfo, cookies: ownProps.cookies, currentApp };
};

export default withCookies(
  connect(mapStateToProps, { resetRedux })(PageHeader)
);
