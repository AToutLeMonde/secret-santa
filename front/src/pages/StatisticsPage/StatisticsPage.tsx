import { Grid, Result, Tag } from 'antd-mobile';
import { SmileOutline } from 'antd-mobile-icons';
import React from 'react';
import { HeaderBar } from 'src/components';
import { usePersons, useReservationCounts } from 'src/model';

export const StatisticsPage = (props: any) => {

  const persons = usePersons();
  const count = useReservationCounts();

  return (
    <>
      <HeaderBar />
      <div style={{ padding: 15, height: 'calc(100vh - 120px)', overflow: 'scroll' }}>

        {persons.length > 0 && count === persons.length && (
          <Result
            icon={<SmileOutline />}
            status='success'
            title='Hapy New Year!'
            description='All have successfully chose their gift recipients'
          />

        )}
        {persons.length > 0 && count !== persons.length && (
          <>
            <p style={{ textAlign: 'left', fontSize: '120%' }}>
              <Tag color='success'>{count}</Tag> participants have already chosen their gift recipient person.
            </p>

            <p style={{ textAlign: 'left', fontSize: '120%' }}>
              <Tag color='warning'>{persons.length - count}</Tag> participants left.
            </p>
          </>
        )}



      </div>

    </>
  )
}