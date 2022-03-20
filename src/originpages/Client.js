import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import APP_ID from "../auth_mongoconfig.json";

export const app = new Realm.App(APP_ID.appid);

export async function getValidAccessToken(username, pass) {
  try {
    if (!app.currentUser) {
      await app.logIn(Realm.Credentials.emailPassword(username, pass));
    } else {
      // An already logged in user's access token might be stale. To guarantee that the token is
      // valid, we refresh the user's custom data which also refreshes their access token.
      await app.currentUser.refreshCustomData();
      console.log(app.currentUser.accessToken);
      console.log(app.currentUser);

      return app.currentUser.accessToken;
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
}

export async function register(username, pass) {
  try {
    await app.emailPasswordAuth.registerUser(username, pass);
    return "success";
  } catch (error) {
    const err = JSON.stringify(error);
    const errors = err.includes("name already in use");
    if (errors === true) {
      return "exists";
    }
    console.log(error);
    return "error";
  }
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID.appid}/graphql`,

    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
