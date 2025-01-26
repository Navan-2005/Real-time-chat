import { Client ,Databases,Account} from 'appwrite';

export const PROJECT_ID='67951c5c0039c78b706b';
export const DATABASE_ID='67951d9b0015802782dd';
export const COLLECTION_ID='67951da800136a3fcbdf';



const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('67951c5c0039c78b706b');

export const account=new Account(client);      
export const databases=new Databases(client);
export default client