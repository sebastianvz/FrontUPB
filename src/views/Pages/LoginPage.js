import React from "react";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import SweetAlert from "react-bootstrap-sweetalert";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";

import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import Logo from "assets/img/upb-logo-1422010671195.png";

import GlobalVariables from "../../variables/globalVariables.js";

const useStyles = makeStyles(styles);
const useStylesAlerts = makeStyles(stylesForAlerts);

function LoginPage(props) {
  // login form
  const [required, setrequired] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [loginPasswordState, setloginPasswordState] = React.useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [alert, setAlert] = React.useState(null);

  // function that verifies if a string has a given length or not

  const variables = new GlobalVariables();
  const url = variables.Url+"LoginAuth/Authenticate";

  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const ErrorLogin = () => {
    setAlert(
      <SweetAlert
        title=""
        danger
        style={{ display: "block", marginTop: "-100px" }}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesAlerts.button + " " + classesAlerts.danger}
      >
        <p style={{ color: "black" }}>
          El nombre de usuario o la contraseña son incorrectos
        </p>
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classesAlerts = useStylesAlerts();

  let auth;

  let onSubmit = e => {
    e.preventDefault();
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

    axios
      .post(url, {
        username: required,
        contrasena: loginPassword
      })
      .then(function(response) {
        localStorage.setItem("auth", response.data.data.token);
        localStorage.setItem("id", response.data.data.id);
        let arrayPermmisionNames = [];

        if (response.data.data.role !== null) {
          for (let i = 0; i < response.data.data.role.length; i++) {
            for (
              let j = 0;
              j < response.data.data.role[i].permmisionRole.length;
              j++
            ) {
              arrayPermmisionNames.push(
                response.data.data.role[i].permmisionRole[j].permmisionName
              );
            }
          }
        }

        let uniqueArrayPermmisionNames = new Set(arrayPermmisionNames);
        let arrayAgainPermmisionNames = [...uniqueArrayPermmisionNames];

        localStorage.setItem("arrayPermmision", arrayAgainPermmisionNames);

        console.log(localStorage.getItem("auth"));

        if (response.data.data.token === null) {
          auth = JSON.parse(localStorage.getItem("auth"));
        } else {
          auth = localStorage.getItem("auth");
        }

        if (auth === null) {
          let inputs = document.getElementsByTagName("input");
          for (var i = 0; i < inputs.length; i++) {
            switch (inputs[i].type) {
              // case 'hidden':
              case "text":
                inputs[i].value = "";
                break;
              case "password":
                inputs[i].value = "";
                break;
            }
          }
          setrequiredState("error");
          setloginPasswordState("error");
          ErrorLogin();
          return;
        } else {
          props.history.replace("/admin");
        }
      })
      .catch(function(error) {
        console.log(error);
        return;
      });
  };

  return (
    <div className={classes.container}>
      {alert}
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={onSubmit}>
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
                <Button color="danger" simple size="lg" block type="submit">
                  Iniciar sesión
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withRouter(LoginPage);
