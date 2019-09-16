import React from "react";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import Logo from "assets/img/upb-logo-1422010671195.png";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  // login form
  const [required, setrequired] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [loginPasswordState, setloginPasswordState] = React.useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={e => e.preventDefault() && false}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="danger"
              >
                <img src={Logo} />
                <br />
                <br />
                <h4>
                  <b>SisLab</b>
                </h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  success={requiredState === "success"}
                  error={requiredState === "error"}
                  id="required"
                  labelText="Usuario"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => {
                      if (verifyLength(event.target.value, 0)) {
                        setrequiredState("success");
                      } else {
                        setrequiredState("error");
                      }
                      setrequired(event.target.value);
                    },
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  success={loginPasswordState === "success"}
                  error={loginPasswordState === "error"}
                  labelText="Contraseña"
                  id="loginpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => {
                      if (verifyLength(event.target.value, 1)) {
                        setloginPasswordState("success");
                      } else {
                        setloginPasswordState("error");
                      }
                      setloginPassword(event.target.value);
                    },
                    type: "password",
                    autoComplete: "off",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  onClick={login}
                  color="danger"
                  simple
                  size="lg"
                  block
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
  function login() {
    if (requiredState === "") {
      setrequiredState("error");
    }
    if (loginPasswordState === "") {
      setloginPasswordState("error");
      return;
    }
    if (loginPasswordState === "error") {
      return;
    }
    props.history.replace("/admin");
  }
}

export default withRouter(LoginPage)