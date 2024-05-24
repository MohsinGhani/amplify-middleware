const awsConfig = {
  Auth: {
    Cognito: {
      identityPoolId: "eu-north-1:872c7524-cc10-4397-b114-6591e53f3a1d",
      //  Amazon Cognito User Pool ID
      userPoolId: "eu-north-1_9RRRY08r1",
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: "4ue9gc726vhjeius9tis57aql1",
      allowGuestAccess: true,
    },
  },
  Storage: {
    S3: {
      bucket: "noire-tv-dev",
      region: "us-east-1",
    },
  },
};

export default awsConfig;
