import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import PaymentForm from 'redux-payment-form';
import Button from '@material-ui/core/Button';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    
    this.state = { isFormValid: false, cardDetails: {}, isLoading: false };
    this.submit = this.submit.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
  }

  submit() {
    const { cardDetails } = this.state;
    this.props.SaveCardDetails(cardDetails);
    this.setState({isLoading: true});  
  }

  onCardChange(paymentForm) {
    if(paymentForm !== null && paymentForm !== undefined){
      const {valid, card} = paymentForm;
      this.setState({isFormValid: valid ? valid : false, cardDetails: card });     
    }
  }

  render() {
    const {
      loading, error, repos
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    if(this.state.isLoading){
      return (
        <article>
          <div className="home-page">
            <section className="centered">
              <h2>Payment Processing</h2>
            </section>
            <ReposList { ...{...reposListProps, loading: true} } />
          </div>
        </article>
      );
    }

    return (
      <article>
        <Helmet>
          <title>Payment Page</title>
          <meta name="description" content="Payment App homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Payment Form</h2>
            <p> User payment details </p>
          </section>
          <section>            
            <PaymentForm
              onCardChange={this.onCardChange}
              acceptedCards={["visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]}              
            />
            <Button variant="outlined" size="large" color="primary" disabled={!this.state.isFormValid} onClick={this.submit}>
                Pay Now
            </Button>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  submit: PropTypes.func,
  onCardChange:  PropTypes.func
};
