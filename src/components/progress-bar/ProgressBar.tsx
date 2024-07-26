"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarComponent = () => {
  return (
    <ProgressBar
      height="10px"
      color="#5779F1"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBarComponent;
