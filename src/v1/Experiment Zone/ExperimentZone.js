import React from "react";
import { app } from "../../originpages/Client";
import { Alert } from "santosh-ui-components";
import checkundefinednull from "../validators/checkundefinednull";

export default function ExperimentZone() {
  document.title = "Todo - ExperimentZone";
  if (checkundefinednull(app?.currentUser?._profile?.data?.email)) {
    return (
      <Alert
        children="Something went Wrong"
        hasAction
        actionText="Reload"
        actionButtonFunciton={() => {
          window.location.reload();
        }}
      />
    );
  }

  return <div>Development in Progess ...</div>;
}
