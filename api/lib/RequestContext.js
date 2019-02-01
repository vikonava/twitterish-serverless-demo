import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18' });

export default class RequestContext {
  constructor(context) {
    this.context = context;
  }

  async getUserAttributes() {
    const provider = this.context.identity.cognitoAuthenticationProvider;
    const sub = provider.split(':')[2];
    const userPoolId = provider.split(':')[0].split('/')[2];

    try {
      const user = (await cognito.listUsers({
        UserPoolId: userPoolId,
        Filter: `sub='${sub}'`,
        Limit: 1,
      }).promise()).Users[0];

      return Object.assign({}, user.Attributes, { Username: user.Username });
    } catch(e) {
      console.log(e);
    }

    return null;
  }
};
