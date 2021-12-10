import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  Toast
} from 'antd-mobile'

import React from 'react';
import { updatePersonFx, useIsFetching } from 'src/model';
import { Person, updatePerson } from 'src/model/repositories';





export const ParticipantDetails = (props: any) => {

  const { email, phone, address, preferences } = props.person;

  const [fields, setFields] = React.useState({
    email: '',
    phone: '',
    address: '',
    preferences: ''
  })

  React.useEffect(() => {
    setFields({ ...props.person })
  }, [props.person])

  const handleChange = (name: string, value: string) => {
    setFields({
      ...fields,
      [name]: value
    })
  }


  const isFetching = useIsFetching();


  const onFinish = async (values: any) => {
    const newPerson = {
      ...props.person,
      ...values,
      preferences: values.preferences || ''
    }

    //console.log('newPerson', newPerson)

    await updatePersonFx(newPerson);

    if (props.callback) {
      props.callback();
    }

    Toast.show({
      content: 'Updated',
    })


  }

  return (

    <>

      <Form
        onFinish={onFinish}
        initialValues={{
          email,
          phone,
          address,
          preferences
        }
        }
        footer={
          <Button
            disabled={isFetching}
            block type='submit' color='primary'>
            Save
          </Button>
        }
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please provide a value' }]}
        >
          <Input placeholder='Email'
          />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Mobile phone (started with +)'
          rules={[{ required: true, message: 'Please provide a value' }]}
        >
          <Input placeholder='+1 123 123 12 34' />
        </Form.Item>

        <Form.Item
          name='address'
          label='Delivery postal address'
          rules={[{ required: true, message: 'Please provide a value' }]}
        >
          <TextArea rows={7} placeholder='SDEK or home address' />
        </Form.Item>

        <Form.Item
          name='preferences'
          label='My gift preferences'

        >
          <TextArea rows={4} placeholder='I whish...' />
        </Form.Item>

      </Form>
    </>
  )
}