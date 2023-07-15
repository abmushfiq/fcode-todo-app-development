// import { initializeApp } from 'firebase/app';
// import 'firebase/firestore';
// import { getFirestore } from 'firebase/firestore/lite';
// import { getSsmParameter } from '../util/ssmParameter';


// const firebaseConfig = {
//     apiKey: getSsmParameter("firbaseApiKey") ,
//     authDomain: getSsmParameter("firebaseAuthDomain"),
//     projectId: getSsmParameter("firebaseProjectId"),
//     storageBucket: getSsmParameter("firebaseStorageBucket"),
//     messagingSenderId: getSsmParameter("firebaseSenderId"),
//     appId: getSsmParameter("firebaseAppId")

// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db;

import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, Firestore } from 'firebase/firestore/lite';
import { getSsmParameter } from '../util/ssmParameter';

const initializeFirebase = async (): Promise<Firestore> => {
  const apiKey = await getSsmParameter('firbaseApiKey');
  const authDomain = await getSsmParameter('firebaseAuthDomain');
  const projectId = await getSsmParameter('firebaseProjectId');
  const storageBucket = await getSsmParameter('firebaseStorageBucket');
  const messagingSenderId = await getSsmParameter('firebaseSenderId');
  const appId = await getSsmParameter('firebaseAppId');

  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return db;
};

export default initializeFirebase;
