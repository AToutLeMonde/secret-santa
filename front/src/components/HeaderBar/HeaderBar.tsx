import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar, Space, Toast } from 'antd-mobile'
import { useCurrentTab } from 'src/model';

export const HeaderBar = (props: any) => {
  const history = useHistory()

  const currentTab = useCurrentTab();

  const onBack = () => {
    history.push("/")
  }

  return (
    <NavBar onBack={onBack}>{currentTab.title}</NavBar>
  )
}