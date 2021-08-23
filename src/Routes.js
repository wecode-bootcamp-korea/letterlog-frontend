import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from 'pages/Main/Main';
import Search from 'pages/Search/Search';
import Collection from 'pages/Collection/Collection';
import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Footer';

const Routes = () => {
  const [navHidden, setNavHidden] = useState(true);

  const handleNavHidden = props => {
    setNavHidden(false);
  };

  return (
    <Router>
      {navHidden && <Nav />}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/collections/:q"
          render={() => <Collection handleNavHidden={handleNavHidden} />}
        />
        {/* <Route exact path="/collections/:q" component={Collection} /> */}
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
