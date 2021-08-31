import * as React from 'react';
import { Eta } from './views/Eta';
import { Home } from './views/Home';
import Div100vh from 'react-div-100vh';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  return (
    <Div100vh style={{ overflowX: 'hidden' }}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/eta/:line/:station" component={Eta} />
          <Route path="/" component={Home} />
        </Switch>
      </AnimatePresence>
    </Div100vh>
  );
};
