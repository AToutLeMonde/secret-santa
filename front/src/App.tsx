import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { NavigationBar } from './components';
import { useIsFetching } from './model';

import { BlankPage, HomePage, ParticipantsPage, ReservationPage, StatisticsPage } from './pages';
import { PageContainer } from './pages/PageContainer';


function App() {




  return (

    <div style={{
      width: '100%',

    }}>

      <PageContainer>
        <Route path="/" exact={true} >
          <HomePage />
        </Route>

        <Route path="/participants" exact={true} >
          <ParticipantsPage />
        </Route>

        <Route path="/statistics" exact={true} >
          <StatisticsPage />
        </Route>

        <Route path="/reservation" exact={true} >
          <ReservationPage />
        </Route>

        <NavigationBar />

      </PageContainer>

    </div>
  );
}

export default App;
