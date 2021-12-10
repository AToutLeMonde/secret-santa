import React from 'react';
import { HeaderBar } from 'src/components';
import { useIsFetching, usePersons } from 'src/model';

import { Collapse, Loading } from 'antd-mobile'
import { ParticipantDetails } from './ParticipantDetails';


export const ParticipantsPage = (props: any) => {

  const isFetching = useIsFetching();
  const data = usePersons();
  const [selected, setSelected] = React.useState<string>('')


  const persons = React.useMemo(() => {

    return data.filter(i => !i.isSystem)
      .map(p => {
        return (
          <Collapse.Panel key={p.id} title={p.name}>
            <ParticipantDetails person={p} callback={() => setSelected('')} />
          </Collapse.Panel>
        )
      })
  }, [data])

  if (isFetching) {
    return <Loading color='primary' />
  }


  return (
    <>
      <HeaderBar />


      <div style={{ padding: 15, height: 'calc(100vh - 120px)', overflow: 'scroll' }}>
        <Collapse
          accordion={true}
          activeKey={selected} onChange={(e) => {
            setSelected(e)
          }}>
          {persons}
        </Collapse>
      </div>




    </>
  )
}