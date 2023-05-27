async function run() {
  const config = {
    auth: {
      clientId: '',
      authority: 'https://login.microsoftonline.com/<tenant id>/',
      redirectUri: 'http://localhost:8080',
    },
  };
  const client = new msal.PublicClientApplication(config);

  const options = {
    authProvider:
      new MSGraphAuthCodeMSALBrowserAuthProvider.AuthCodeMSALBrowserAuthenticationProvider(
        client,
        {
          account: {},
          scopes: ['user.read', 'tasks.readwrite'],
          interactionType: msal.InteractionType.Popup,
        }
      ),
  };

  const graphClient = MicrosoftGraph.Client.initWithMiddleware(options);

  let list = {
    displayName: 'MSUSDEV Awesome Webinar',
  };

  let response = await graphClient.api('/me/todo/lists').post(list);
  console.dir(response);
  document.querySelector('#output').innerHTML = JSON.stringify(
    response,
    null,
    4
  );

  hljs.highlightAll();
}
