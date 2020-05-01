import React from 'react';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/Checkout" component={Checkout}/>
          <Route path="/Orders" component={Orders}/>
          <Route path="/" component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
