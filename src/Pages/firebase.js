import {initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";

import firebaseConfig from "../services/firebaseConfig";


const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);