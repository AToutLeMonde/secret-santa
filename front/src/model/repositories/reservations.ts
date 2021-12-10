import { db } from 'src/firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'reservations'

const reservationsCollection = collection(db, COLLECTION_NAME)

export const getReservations = async (): Promise<Reservation[]> => {
  const repo = await getDocs(reservationsCollection);

  return repo.docs.map(doc => {
    const { personId, isReserved
    } = doc.data();

    return {
      id: doc.id,
      personId,
      isReserved
    }
  })
}

export const clearAllReservations = async () => {
  const reservations = await getReservations();
  for (let index = 0; index < reservations.length; index++) {
    const reservation = reservations[index];
    updateReservation({ ...reservation, isReserved: false });
  }
}

export const updateReservation = async (data: Reservation) => {
  const myDoc = doc(db, COLLECTION_NAME, data.id)
  const newFields: Record<string, string> = {};
  for (let key in data) {
    if (key !== 'id') newFields[key] = data[key];
  }
  await updateDoc(myDoc, newFields);
}


export interface Reservation {
  id?: string,
  personId: string,
  isReserved?: boolean
}