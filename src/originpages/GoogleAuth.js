import React from "react";
import * as Realm from "realm-web";
export default function GoogleAuth() {
  Realm.handleAuthRedirect();
  return <div>Google Authentication in progress</div>;
}
