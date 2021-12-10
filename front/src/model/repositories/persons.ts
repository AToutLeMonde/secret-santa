import { db } from 'src/firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'persons'

const personsCollection = collection(db, COLLECTION_NAME)

export const getPersons = async (): Promise<Person[]> => {
  const repo = await getDocs(personsCollection);

  const data = repo.docs.map(doc => {
    const { name, phone, email, address, preferences, isSystem
    } = doc.data();

    return {
      id: doc.id,
      name,
      phone,
      email,
      address,
      preferences,
      isSystem
    }
  })

  data.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  });

  return data;
}

// export const addPerson = async (data: Person) => {
//   await addDoc(personsCollection, data)
// }

export const updatePerson = async (data: Person) => {
  const myDoc = doc(db, COLLECTION_NAME, data.id)
  const newFields: Record<string, string> = {};
  for (let key in data) {
    if (key !== 'id') newFields[key] = data[key];
  }
  //console.log('updatePerson', newFields)
  await updateDoc(myDoc, newFields);
}

// export const deletePerson = async (id: string) => {
//   const myDoc = doc(db, COLLECTION_NAME, id)
//   deleteDoc(myDoc);
// }

export interface Person {
  id?: string,
  name?: string,
  phone?: string,
  email?: string,
  address?: string,
  preferences?: string,
  isSystem?: boolean
}