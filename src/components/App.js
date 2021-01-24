//import logo from '../logo.svg';
import React from 'react';
import '../css/App.css';
import axios from 'axios';
import { Form, Input, Grid, Header, Image, Segment } from 'semantic-ui-react';
import bitcoinLogo from '../images/bitcoinLogo.png';
import 'semantic-ui-css/semantic.css'


class BcConverter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      bitCoin: 0,
      rateData: 0,
      dollars: 0
    }
  }
  
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.fetchRate()
  }

  fetchRate = async () => {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json'),

      rate = response.data.bpi.USD.rate_float;

      this.setState({
        rateData: rate,
        isLoading: false
      });
    } catch(err) {
      this.setState({
        isLoading: false
      });
    }
  };

  handleBitCoinChange(event) {
    let bitCoin = parseFloat(event.target.value);
    let dollars = isNaN(bitCoin) ? 0 : bitCoin * this.state.rateData;

    this.setState({
      bitCoin: bitCoin,
      dollars: dollars.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    });
  }

  render() {
    return (

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          <Image src={bitcoinLogo} /> Bitcoin to USD Calculator
        </Header>
        <Form size='large'>
          <Segment stacked>
          <Input
            className='btc_input'
            label={{ icon: 'btc' }}
            labelPosition='left'
            placeholder='BTC Amount'
            style={{ width:'235px' }}
            onChange={this.handleBitCoinChange.bind(this)}
          />
          <div className="rate" style={{ paddingTop:'15px' }}>Current Rate: {this.state.rateData}</div>
          <div className="dollars">Value: ${this.state.dollars}</div>
          </Segment>
        </Form>
      </Grid.Column>
      </Grid>
    );
  }
}
export default BcConverter;
