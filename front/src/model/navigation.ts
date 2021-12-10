import { combine, createEffect, createEvent, createStore, guard, sample } from 'effector';
import { useStore } from 'effector-react';
import { getPersonsFx, getReservationsFx } from './data';

export interface ICurrentTab {
  key: string,
  title: string
}

export const homeTabSelected = createEvent()
export const participantsTabSelected = createEvent()
export const statisticsTabSelected = createEvent()
export const unknownTabSelected = createEvent()

const $currentTab = createStore<ICurrentTab>({
  key: 'home',
  title: ''
})
  .on(homeTabSelected, ((state, payload) => {
    return {
      key: 'home',
      title: state.title
    }
  }))
  .on(participantsTabSelected, ((state, payload) => {

    return {
      key: 'participants',
      title: 'Edit participants info'
    }
  }))
  .on(statisticsTabSelected, ((state, payload) => {
    return {
      key: 'statistics',
      title: 'Statistics'
    }
  }))
  .on(unknownTabSelected, ((state, payload) => {
    return {
      key: '',
      title: 'Select your name'
    }
  }))

homeTabSelected.watch(() => {
  getPersonsFx();
  getReservationsFx();
})

participantsTabSelected.watch(() => {
  getPersonsFx();
  getReservationsFx();
})

statisticsTabSelected.watch(() => {
  getPersonsFx();
  getReservationsFx();
})

unknownTabSelected.watch(() => {
  getPersonsFx();
})


export const useCurrentTab = () => useStore($currentTab)