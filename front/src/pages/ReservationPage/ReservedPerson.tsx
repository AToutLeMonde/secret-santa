

import { Card } from 'antd-mobile';
import Avatar from 'boring-avatars';
import React from 'react';
import { Person } from 'src/model/repositories';


export const ReservedPerson = (props: any) => {
  const person = props.person as Person;

  return (
    <Card title={'Your gift recipient is'} style={{ textAlign: 'center' }}>
      <Avatar
        size={120}
        name={person.id}
        variant="beam"
        colors={[
          '#a3a948',
          '#edb92e',
          '#f85931',
          '#ce1836',
          '#009989'
        ]}
      />
      <h1>{person.name}</h1>
      <p style={{ color: '#999', fontSize: '120%' }}>It would be&nbsp;a&nbsp;greate idea to&nbsp;take a&nbsp;screenshot of&nbsp;this&nbsp;page so&nbsp;as&nbsp;not&nbsp;to&nbsp;forget your&nbsp;gift recipient&nbsp;name.</p>
      <p style={{ color: '#999' }}>Chekout participants tab to find out more information about the person.</p>
      <h3>Have fun!</h3>
    </Card>

  )
}