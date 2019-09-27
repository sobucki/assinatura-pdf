import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Uploader from '../pages/Uploader';

const Routes = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path="/" component={Uploader} />
      </Switch>
    </>
  </BrowserRouter>
);

export default Routes;
