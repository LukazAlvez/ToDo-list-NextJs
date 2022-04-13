import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAF6G4JAO7KknRXYLjq_NnMUQe_2f3_NQw",
    authDomain: "todo-list-e4d0f.firebaseapp.com",
    databaseURL: "https://todo-list-e4d0f-default-rtdb.firebaseio.com",
    projectId: "todo-list-e4d0f",
    storageBucket: "todo-list-e4d0f.appspot.com",
    messagingSenderId: "748898752465",
    appId: "1:748898752465:web:6703342009b4e0ba9332f0"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

