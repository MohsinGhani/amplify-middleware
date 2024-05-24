import credentials from "./credentials";

const awsConfig = {
  Auth: {
    Cognito: {
      identityPoolId: credentials.cognito.identityPoolId,
      //  Amazon Cognito User Pool ID
      userPoolId: credentials.cognito.userPoolId,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: credentials.cognito.userPoolClientId,
      allowGuestAccess: credentials.cognito.allowGuestAccess,
    },
  },
  Storage: {
    S3: {
      bucket: credentials.S3.bucket,
      region: credentials.S3.region,
    },
  },
};

export default awsConfig;
