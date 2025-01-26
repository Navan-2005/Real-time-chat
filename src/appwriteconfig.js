import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(PROJECT_ID);

export const account = new Account(client);      
export const databases = new Databases(client);
export default client;