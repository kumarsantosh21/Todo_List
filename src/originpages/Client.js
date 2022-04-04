import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import APP_ID from "../auth_mongoconfig.json";

export const app = new Realm.App(APP_ID.appid);
// For login already exist user
export async function getValidAccessToken(username, pass) {
  try {
    if (!app.currentUser) {
      await app.logIn(Realm.Credentials.emailPassword(username, pass));
    } else {
      // An already logged in user's access token might be stale. To guarantee that the token is
      // valid, we refresh the user's custom data which also refreshes their access token.
      await app.currentUser.refreshCustomData();
      console.log(app.currentUser.accessToken);
      console.log(app.currentUser._profile.data.email);

      return app.currentUser.accessToken;
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
}
// creating new user
export async function register(username, pass) {
  try {
    await app.emailPasswordAuth.registerUser(username, pass);
    return "success";
  } catch (error) {
    console.log(error);
    const err = JSON.stringify(error);
    const errors = err.includes("name already in use");
    if (errors === true) {
      return "exists";
    }

    return "error";
  }
}
// Mail Confirmation
export async function mailconfirmation(token, tokenId) {
  try {
    await app.emailPasswordAuth.confirmUser(token, tokenId);
    console.log("success");
    return "success";
  } catch (error) {
    console.log(error);
    const err = JSON.stringify(error);
    const expired = err.includes("expired");
    if (expired === true) {
      return "expired";
    }

    return "error";
  }
}

// Resend Mail for Confirmation
export async function resendmail(email) {
  try {
    await app.emailPasswordAuth.resendConfirmationEmail(email);
    console.log("success");
    return "success";
  } catch (error) {
    console.log(error);
    const err = JSON.stringify(error);
    const user = err.includes("not found");
    const userconf = err.includes("already confirmed");
    console.log(userconf);
    if (user === true) {
      return "not found";
    }
    if (userconf === true) {
      return "already";
    }

    return "error";
  }
}
// sending mail for resetting password
export async function reset(username) {
  try {
    await app.emailPasswordAuth.sendResetPasswordEmail(username);
    return "success";
  } catch (error) {
    console.log(error);
    const err = JSON.stringify(error);
    const errors = err.includes("user not found");
    if (errors === true) {
      return "notfound";
    }
    return "error";
  }
}
// resetting password
export async function completepasswordreset(pass, token, tokenId) {
  try {
    await app.emailPasswordAuth.resetPassword({
      password: pass,
      token,
      tokenId,
    });
    return "success";
  } catch (error) {
    console.log(error);
    const err = JSON.stringify(error);
    const errors = err.includes("token is expired");
    if (errors === true) {
      return "expired";
    }

    return "error";
  }
}

// google function
export function gclick() {
  const redirectUri = "https://testingdb-cxxuf.mongodbstitch.com/googleauth";
  const credentials = Realm.Credentials.google(redirectUri);
  // Calling logIn() opens a Google authentication screen in a new window.
  app
    .logIn(credentials)
    .then((user) => {
      // The logIn() promise will not resolve until you call `handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      // console.log(`Logged in with id: ${user.id}`);
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
}

const Client = new ApolloClient({
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

export default Client;
