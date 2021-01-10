import React, { Suspense, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as action from './store/actions/index';

// Implement asynchrone component for Checkout component
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

// Implement asynchrone component for Orders component
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

// Implement asynchrone component for Auth component
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

function App(props) {

  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(App));
