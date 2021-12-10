import { db } from 'src/firebase'
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'concurrent'
const MARKER_ID = 'j7PH4DHpsSVYoHsDOyP4'

//const concurrentCollection = collection(db, COLLECTION_NAME)

export const getConcurrent = async (): Promise<Concurrent> => {

  const myDoc = doc(db, COLLECTION_NAME, MARKER_ID)
  const markerDoc = await getDoc(myDoc)


  const { isBusy, started } = markerDoc.data();

  return {
    id: markerDoc.id,
    isBusy,
    started
  }

}


export const updateConcurrent = async (isBusy: boolean, started: number) => {
  const myDoc = doc(db, COLLECTION_NAME, MARKER_ID)

  await updateDoc(myDoc, { isBusy, started });
}


export interface Concurrent {
  id?: string,
  isBusy?: boolean,
  started: number
}