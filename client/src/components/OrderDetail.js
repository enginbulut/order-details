import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "semantic-ui-react";

import { withCookies } from "react-cookie";

class OrderDetail extends Component {
  render() {
    return (
      <Container textAlign="left" className="order-detail">
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <h1>Sipariş Detay</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Firma Adı</strong>
              <div>Halil Pazarlama</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Adres</strong>
              <div>
                Kozyatağı mahallesi, Marmara Cad. Şale Apt. No:7
                Kadıköy/İstanbul
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Telefon</strong>
              <div>0090 0216 123 4567</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>e-Posta</strong>
              <div>kapinizda@halilpazarlama.com</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Ünvan</strong>
              <div>Halil Pazarlama İnş. Tah. Turz. Tic. Ltd. Şti.</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Fatura Adresi</strong>
              <div>
                Kozyatağı mahallesi, Marmara Cad. Şale Apt. No:7
                Kadıköy/İstanbul
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Vergi Dairesi</strong>
              <div>Büyük mükellefler vd.</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <strong>Vergi No</strong>
              <div>123456789012</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies
  };
};

export default withCookies(connect(mapStateToProps, {})(OrderDetail));
