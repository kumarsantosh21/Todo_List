import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import ResetConfirmation from "./ResetConfirmation";
import GoogleAuth from "./GoogleAuth";
import EmailConfirmation from "./EmailConfirmation";
import Client, {
  getValidAccessToken,
  register,
  reset,
  completepasswordreset,
  gclick,
  app,
  mailconfirmation,
  resendmail,
} from "./Client";
export {
  Login,
  Register,
  Reset,
  ResetConfirmation,
  Client,
  getValidAccessToken,
  register,
  reset,
  completepasswordreset,
  gclick,
  app,
  GoogleAuth,
  EmailConfirmation,
  mailconfirmation,
  resendmail,
};
