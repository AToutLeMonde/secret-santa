import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { homeTabSelected, participantsTabSelected, statisticsTabSelected, unknownTabSelected, useCurrentTab } from 'src/model';


const updateCurrentTab = (location: any) => {

  let navigationTab = (location.pathname || '').split('/').find(i => i) || '';
  if (navigationTab === '') navigationTab = 'home';

  //console.log('navigationTab', navigationTab)

  if (navigationTab === 'home') {
    homeTabSelected();
  } else if (navigationTab === 'participants') {
    participantsTabSelected();
  } else if (navigationTab === 'statistics') {
    statisticsTabSelected();
  } else {
    //console.log('ww')
    unknownTabSelected();
  }

}

export const PageContainer = (props: any) => {
  const routeParams = useParams<any>();
  const location = useLocation();
  const history = useHistory()


  React.useEffect(() => {
    updateCurrentTab(location);
    return history.listen((newLocation) => {
      updateCurrentTab(newLocation);
    })
  }, [history])

  return (
    <>
      {props.children}
    </>
  )
}


