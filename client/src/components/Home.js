import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "semantic-ui-react";

import { withCookies } from "react-cookie";

import { fetchProducts } from "../actions/product";

import OrderDetail from "./OrderDetail";
import ProductList from "./ProductList";
import PageHeader from "./PageHeader";
class Home extends Component {
  componentDidMount() {
    if (!this.props.cookies.get("token")) this.props.history.push("/");

    this.props.fetchProducts();
  }

  render() {
    return (
      <Container textAlign="center">
        <PageHeader history={this.props.history} />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <OrderDetail props={this.props} />
            </Grid.Column>
            <Grid.Column width={12}>
              <ProductList
                products={this.props.products}
                isLoading={this.props.isLoading}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products, isLoading, hasError, error } = state.product;
  return {
    cookies: ownProps.cookies,
    products,
    isLoading,
    hasError,
    error
  };
};

export default withCookies(connect(mapStateToProps, { fetchProducts })(Home));
