import { Button, Card, Dialog, Form, Loading, Picker, PickerView } from 'antd-mobile';
import React from 'react';
import { HeaderBar } from 'src/components';
import { generateFx, useIsFetching, usePersons, useReservedPerson } from 'src/model';
import { ReservedPerson } from './ReservedPerson';

export const ReservationPage = (props: any) => {
  const isFetching = useIsFetching();
  const data = usePersons();

  const reservedPerson = useReservedPerson();


  const [value, setValue] = React.useState(['']);

  if (isFetching) {
    return <Loading color='primary' />
  }

  const basicColumns = [data.filter(i => !i.isSystem)
    .map(i => i.name)]

  const handleSelect = () => {
    Dialog.show({
      content: `Do you confirm that your name is ${value[0]} and you agree to generate your gift recipient name? This action cannot be undone.`,
      closeOnAction: true,
      actions: [
        {
          key: 'yes',
          text: 'Yes',
        },
        {
          key: 'cancel',
          text: 'Cancel',
        },
      ],
      onAction: (action) => {

        if (action.key === 'yes') {
          generateFx(value[0]);
        }
      }
    })
  }

  if (reservedPerson) {
    return (
      <ReservedPerson person={reservedPerson} />
    )
  }

  return (
    <>
      <HeaderBar />
      <div style={{ paddingLeft: 15, paddingRight: 15, height: 'calc(100vh - 120px)', overflow: 'scroll' }}>
        <p style={{ textAlign: 'center', fontSize: '120%' }}>
          Select <b>your name</b> so that the system excludes you from this random generation session.
        </p>
        <p style={{ textAlign: 'center' }}>
          This is necessary in order not to&nbsp;give a&nbsp;gift to&nbsp; yourself&nbsp;:)
        </p>

        <div>
          <PickerView
            style={{ marginBottom: 25 }}
            columns={basicColumns}
            value={value}
            onChange={(val, extend) => {
              setValue(val)

            }}
          />
        </div>



        <Button
          block
          color='primary'
          onClick={handleSelect}
        >
          Go!
        </Button>

      </div>

    </>
  )
}



