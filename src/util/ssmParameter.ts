// import aws from 'aws-sdk'
// import { AWS_REGION, FIRBASE_API_KEY, FIRBASE_APP_ID, FIRBASE_AUTH_DOMAIN, FIRBASE_PROJECT_ID, FIRBASE_SENDER_ID, FIRBASE_STORAGE_BUCKET } from '../constants/constants';


// const profileName = "default";
// const credentials = new aws.SharedIniFileCredentials({ profile: profileName });
// aws.config.credentials = credentials;
// const ssmClient = new aws.SSM({
//   region: AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const databaseConnection = [
//   { parameter: FIRBASE_API_KEY, redableConfigName: "firbaseApiKey" },
//   { parameter: FIRBASE_AUTH_DOMAIN, redableConfigName: "firebaseAuthDomain" },
//   { parameter: FIRBASE_STORAGE_BUCKET, redableConfigName: "firebaseStorageBucket" },
//   { parameter: FIRBASE_PROJECT_ID, redableConfigName: "firebaseProjectId" },
//   { parameter: FIRBASE_SENDER_ID, redableConfigName: "firebaseSenderId" },
//   { parameter: FIRBASE_APP_ID, redableConfigName: "firebaseAppId" }
// ];

// const paramValues = {};

// export const getSsmParameter = async (key:any) => {
//   const params = {
//     Names: databaseConnection.map(({ parameter }) => parameter),
//     WithDecryption: true,
//   };

  
//   const response = await ssmClient.getParameters(params).promise();

//   response.Parameters.forEach(({ Name, Value }) => {
//     const { redableConfigName } = databaseConnection.find(
//       ({ parameter }) => parameter === Name
//     );
//     paramValues[redableConfigName] = Value;
//   });

//   if (paramValues[key]) {
//     return paramValues[key];
//   }
// };


import aws, { SSM } from 'aws-sdk';
import {
  AWS_REGION,
  FIRBASE_API_KEY,
  FIRBASE_APP_ID,
  FIRBASE_AUTH_DOMAIN,
  FIRBASE_PROJECT_ID,
  FIRBASE_SENDER_ID,
  FIRBASE_STORAGE_BUCKET,
} from '../constants/constants';

const profileName = 'default';
const credentials = new aws.SharedIniFileCredentials({ profile: profileName });
aws.config.credentials = credentials;
const ssmClient = new SSM({
  region: AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface DatabaseConnection {
  parameter: string;
  redableConfigName: string;
}

const databaseConnection: DatabaseConnection[] = [
  { parameter: FIRBASE_API_KEY, redableConfigName: 'firbaseApiKey' },
  { parameter: FIRBASE_AUTH_DOMAIN, redableConfigName: 'firebaseAuthDomain' },
  { parameter: FIRBASE_STORAGE_BUCKET, redableConfigName: 'firebaseStorageBucket' },
  { parameter: FIRBASE_PROJECT_ID, redableConfigName: 'firebaseProjectId' },
  { parameter: FIRBASE_SENDER_ID, redableConfigName: 'firebaseSenderId' },
  { parameter: FIRBASE_APP_ID, redableConfigName: 'firebaseAppId' },
];

const paramValues: Record<string, string> = {};

export const getSsmParameter = async (key: string): Promise<string | undefined> => {
  const params: SSM.GetParametersRequest = {
    Names: databaseConnection.map(({ parameter }) => parameter),
    WithDecryption: true,
  };

  const response: SSM.GetParametersResult = await ssmClient.getParameters(params).promise();

  response.Parameters?.forEach(({ Name, Value }) => {
    const { redableConfigName } = databaseConnection.find(({ parameter }) => parameter === Name)!;
    paramValues[redableConfigName] = Value!;
  });

  return paramValues[key];
};
