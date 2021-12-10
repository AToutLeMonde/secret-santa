import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { getPersons, updatePerson, getConcurrent } from 'src/model/repositories';

export const BlankPage = (props: any) => {
  const routeParams = useParams<any>();

  const loadPersons = async () => {
    //const newPerson = await deletePerson('k6MkKNWmcSrUv9IsHFEM');
    // console.log(newPerson)
    const data = await getConcurrent();

  }

  React.useEffect(() => {
    loadPersons()

  }, [])

  return (
    <div>
      <p>BlankPage</p>

      <pre>{JSON.stringify(routeParams, null, 2)}</pre>

    </div>
  )
}