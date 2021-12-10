import { combine, createEffect, createEvent, createStore, guard, sample } from 'effector';
import { useStore } from 'effector-react';
import { getConcurrent, getPersons, getReservations, Person, Reservation, updateConcurrent, updatePerson, updateReservation } from './repositories';

import { pending } from 'patronum/pending';

export const getPersonsFx = createEffect<void, Person[]>(async () => {
  return await getPersons();
})

export const getReservationsFx = createEffect<void, Reservation[]>(async () => {
  return await getReservations();
})


export const updatePersonFx = createEffect<Person, void>(async (data: Person) => {
  return await updatePerson(data);
})

const $persons = createStore<Person[]>([])
  .on(getPersonsFx.done, (state, payload) => {
    return payload.result;
  })

const generate = async (name: string) => {

  const data = await getPersonsFx();
  const reservations = await getReservationsFx();

  const mapIds: any = {}

  reservations.forEach(r => {
    mapIds[r.personId] = r
  })

  const persons = data.filter(i => i.name !== name
    && !mapIds[i.id].isReserved);

  //console.log('persons', persons)

  const person = persons[Math.floor(Math.random() * persons.length)];
  //console.log(person)

  if (person) {
    await updateReservation({
      id: mapIds[person.id].id,
      personId: person.id,
      isReserved: true
    })
  }

  await updateConcurrent(
    false,
    new Date().getTime()
  )

  getReservationsFx();

  //console.log('person', person)

  return person;
}

export const generateFx = createEffect<string, Person>(async (name) => {

  return new Promise(function (resolve, reject) {
    const timer = setInterval(async () => {
      const concurrent = await getConcurrent();
      console.log(concurrent)

      if (!concurrent.isBusy) {
        clearInterval(timer);
        await updateConcurrent(
          true,
          new Date().getTime()
        )

        resolve(generate(name))
      }
    }, 500)
  })



})

const $reservedPerson = createStore<Person>(null)
  .on(generateFx.done, (state, payload) => {
    return payload.result;
  });

const $reservationCounts = createStore<number>(0)
  .on(getReservationsFx.done, (state, payload) => {

    return payload.result.filter(i => i.isReserved).length;
  });

updatePersonFx.done.watch(() => {
  getPersonsFx()
})


const $isFetching = pending({
  effects: [
    getPersonsFx,
    updatePersonFx,
    generateFx
  ]
});

export const useIsFetching = () => useStore($isFetching)

export const usePersons = () => useStore($persons);

export const useReservedPerson = () => useStore($reservedPerson)

export const useReservationCounts = () => useStore($reservationCounts)

