import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import LoginPage from "views/Pages/LoginPage.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";

import login from "assets/img/loginImageUPB.jpg";

const useStyles = makeStyles(styles);

export default function Pages() {
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  return (
    <div>
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + login + ")" }}
        >
          <LoginPage></LoginPage>
        </div>
      </div>
    </div>
  );
}
