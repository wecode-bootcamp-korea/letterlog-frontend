import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Search from './pages/Search/Search';
import Collection from './pages/Collection/Collection';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/collection" component={Collection} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
