import React from 'react';

import { FaHome } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { RiTeamFill } from 'react-icons/ri';

//

import { Badge, TabBar } from 'antd-mobile'


import { useCurrentTab, usePersons, useReservationCounts } from 'src/model';
import { useHistory } from 'react-router-dom';

const tabs = [
  {
    key: 'home',
    title: 'Home',
    icon: <FaHome />,

  },
  {
    key: 'participants',
    title: 'Participants',
    icon: <RiTeamFill />,

  },
  {
    key: 'statistics',
    title: 'Statistics',
    icon: <GoGraph />,
    badge: '',
  }
]

// < HistogramOutline />


export const NavigationBar = (props: any) => {

  const history = useHistory()
  const currentTab = useCurrentTab();
  const counts = useReservationCounts();

  if (counts > 0) {
    tabs[2].badge = counts.toString();
  }

  const handleChange = (key: string) => {
    history.push(`/${key === 'home' ? '' : key}`)
  }

  return (

    <div style={{
      position: 'absolute',
      bottom: 0,
      width: '100%'
    }}>
      <TabBar activeKey={currentTab.key} onChange={handleChange}>
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </div>


  )
}