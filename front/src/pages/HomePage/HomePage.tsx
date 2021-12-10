import React from 'react';


import { Button, Loading, Space } from 'antd-mobile'
import { getPersons, updatePerson, getConcurrent } from 'src/model/repositories';

import Lottie from "react-lottie";

import hero from 'src/assets/animations/secretSanta.json'
import { useHistory } from 'react-router-dom';
import { useIsFetching, usePersons, useReservationCounts } from 'src/model';

const animationOptions = {
  loop: true,
  autoplay: true,
  animationData: hero,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },

}



export const HomePage = (props: any) => {
  const history = useHistory()

  const persons = usePersons();
  const count = useReservationCounts();

  const isFetching = useIsFetching();

  return (
    <>

      <div style={{ boxSizing: 'border-box', paddingTop: 0 }}>
        <Lottie options={animationOptions} height={120} width={120} speed={1.5} />
      </div>
      <div style={{ textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: '110%' }}>
        <h2>Hi, friend!</h2>
        <p>Please&nbsp;click the&nbsp;red&nbsp;button below and follow the&nbsp;instructions.</p>
        <p>
          You&nbsp;will be&nbsp;given a&nbsp;randomly selected&nbsp;name of&nbsp;the&nbsp;Secret
          Santa App participant to&nbsp;whom you should&nbsp;send&nbsp;a&nbsp;New&nbsp;Year&nbsp;gift.</p>

        <p><b>Remember carefully the provided name</b> and&nbsp;don't tell&nbsp;it&nbsp;anyone.</p>

        <p style={{ marginBottom: 40, color: '#999' }}>
          You can also go to Participants tab and specify your preferences what would <b>you</b> like to receive as a gift.

        </p>

        {persons.length > 1 && count < persons.length && (
          <Button color='danger' onClick={() => history.push('/reservation')}>Generate gift recipient</Button>
        )
        }

        {isFetching && <Loading color='primary' />}



      </div>

    </>
  )
}