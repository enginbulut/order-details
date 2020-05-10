import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Loader, Step, Icon } from "semantic-ui-react";

import { withCookies } from "react-cookie";
import utility from "../util/common";

class ProductList extends Component {
  renderProductList = products => {
    return (
      <React.Fragment>
        {this.renderProductTable(products)}
        {this.renderTotalPrice(products)}
      </React.Fragment>
    );
  };
  renderProductTable = products => {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.HeaderCell>Ürün Kodu</Table.HeaderCell>
          <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
          <Table.HeaderCell>Birim Fiyat(TL)</Table.HeaderCell>
          <Table.HeaderCell>Adet</Table.HeaderCell>
          <Table.HeaderCell>Fiyat(TL)</Table.HeaderCell>
        </Table.Header>

        <Table.Body>
          {products &&
            products.map(product => (
              <Table.Row className="cursor-pointer">
                <Table.Cell textAlign="left">{product.productid}</Table.Cell>
                <Table.Cell textAlign="left">{product.productName}</Table.Cell>
                <Table.Cell textAlign="right">
                  {product.productPrice.toFixed(2)}
                </Table.Cell>
                <Table.Cell textAlign="right">{product.qnty}</Table.Cell>
                <Table.Cell textAlign="right">
                  {(product.productPrice * product.qnty).toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    );
  };

  renderTotalPrice = products => {
    const totalPrice = products
      .map(p => p.productPrice * p.qnty)
      .reduce(function(p1, p2) {
        return p1 + p2;
      }, 0)
      .toFixed(2);
    const formattedMoney = utility.formatMoney(totalPrice);
    return (
      <Step.Group style={{ float: "left" }}>
        <Step link>
          <Icon name="credit card" />
          <Step.Content>
            <Step.Title style={{ "text-align": "left" }}>Toplam</Step.Title>
            <Step.Description style={{ "text-align": "left" }}>
              {formattedMoney}
              <br />
              <p>
                <strong>yalnız </strong>
                {utility.printMoneyAsWords(formattedMoney)}
              </p>
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  };

  render() {
    const products = this.props.products;
    const isLoading = this.props.isLoading;
    return (
      <Container className="product-list">
        {isLoading ? (
          <Loader active inline="centered" />
        ) : (
          this.renderProductList(products)
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies
  };
};

export default withCookies(connect(mapStateToProps, {})(ProductList));
