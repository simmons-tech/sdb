import React, { useEffect, useState } from "react";

import BasePage from "../BasePage";
import LoungeDetail from "../../components/LoungeDetail";

const MyLounge = (props) => {
  if (props.user.lounge_pk != null) {
    return (
      <LoungeDetail lounge_pk={props.user.lounge_pk} {...props}></LoungeDetail>
    );
  } else {
    return (
      <BasePage loading={false}>
        <p>You're not part of a lounge yet!</p>
      </BasePage>
    );
  }
};

export default MyLounge;
