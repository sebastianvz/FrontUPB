/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function ValidationForms() {
  // type validation
  const [required, setrequired] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");
  const [typeEmail, settypeEmail] = React.useState("");
  const [typeEmailState, settypeEmailState] = React.useState("");
  const [number, setnumber] = React.useState("");
  const [numberState, setnumberState] = React.useState("");
  const [url, seturl] = React.useState("");
  const [urlState, seturlState] = React.useState("");
  const [equalTo, setequalTo] = React.useState("");
  const [whichEqualTo, setwhichEqualTo] = React.useState("");
  const [equalToState, setequalToState] = React.useState("");

  // function that returns true if value is email, false otherwise
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const typeClick = () => {
    if (requiredState === "") {
      setrequiredState("error");
    }
    if (typeEmailState === "") {
      settypeEmailState("error");
    }
    if (numberState === "") {
      setnumberState("error");
    }
    if (equalToState === "") {
      setequalToState("error");
    }
  };
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger" text>
            <CardText color="danger">
              <h4 className={classes.cardTitle}>Usuarios</h4>
            </CardText>
          </CardHeader>
          <CardBody>
          <h4>Datos personales</h4>
            <form>
              <GridContainer>
              <GridItem xs={4} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tipo de identificacíon
                  </FormLabel>
                </GridItem>             
                <GridItem xs={2} sm={2}>
                    <CustomDropdown
                      buttonText="Seleccione"
                      hoverColor="warning"
                      dropPlacement="bottom-start"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"                       
                      }}
                      dropdownList={[
                        "CC Cédula de ciudadanía",
                        "PASS Pasaporte",
                      ]}
                    />
                </GridItem>
                <GridItem xs={1} sm={1}>
                  <FormLabel className={classes.labelHorizontal}>
                    Número de identificacíon
                  </FormLabel>
                </GridItem>
                <GridItem xs={6} sm={4}>
                  <CustomInput
                    success={numberState === "success"}
                    error={numberState === "error"}
                    id="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyNumber(event.target.value)) {
                          setnumberState("success");
                        } else {
                          setnumberState("error");
                        }
                        setnumber(event.target.value);
                      },
                      type: "number",
                      endAdornment:
                        numberState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Nombre completo
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="required"
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
                      endAdornment:
                        requiredState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Email Personal
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <CustomInput
                    success={typeEmailState === "success"}
                    error={typeEmailState === "error"}
                    id="typeemail"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyEmail(event.target.value)) {
                          settypeEmailState("success");
                        } else {
                          settypeEmailState("error");
                        }
                        settypeEmail(event.target.value);
                      },
                      type: "email",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={1}>
                  <FormLabel className={classes.labelLeftHorizontal}>
                    <code>opcional</code>
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={1}>
                  <FormLabel className={classes.labelHorizontal}>
                    Email UPB
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    success={typeEmailState === "success"}
                    error={typeEmailState === "error"}
                    id="typeemail"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyEmail(event.target.value)) {
                          settypeEmailState("success");
                        } else {
                          settypeEmailState("error");
                        }
                        settypeEmail(event.target.value);
                      },
                      type: "email",
                      endAdornment:
                        typeEmailState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Celular
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <CustomInput
                    success={numberState === "success"}
                    error={numberState === "error"}
                    id="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyNumber(event.target.value)) {
                          setnumberState("success");
                        } else {
                          setnumberState("error");
                        }
                        setnumber(event.target.value);
                      },
                      type: "number",
                      endAdornment:
                        numberState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    ID UPB
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    success={numberState === "success"}
                    error={numberState === "error"}
                    id="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyNumber(event.target.value)) {
                          setnumberState("success");
                        } else {
                          setnumberState("error");
                        }
                        setnumber(event.target.value);
                      },
                      type: "number",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelLeftHorizontal}>
                    <code>opcional</code>
                  </FormLabel>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Profesión
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="required"
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
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelLeftHorizontal}>
                    <code>opcional</code>
                  </FormLabel>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Programas
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="required"
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
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelLeftHorizontal}>
                    <code>opcional</code>
                  </FormLabel>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Otros trabajos
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="required"
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
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelLeftHorizontal}>
                    <code>opcional</code>
                  </FormLabel>
                </GridItem>
              </GridContainer>
              <h4>Datos login</h4>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Usuario
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="required"
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
                      endAdornment:
                        requiredState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Contraseña
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    success={equalToState === "success"}
                    error={equalToState === "error"}
                    id="equalto"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => setequalTo(event.target.value),
                      type: "password",
                      endAdornment:
                        equalToState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={1} sm={1}>
                  <FormLabel className={classes.labelHorizontal}>
                    Confirmar contraseña 
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    success={equalToState === "success"}
                    error={equalToState === "error"}
                    id="whichequalto"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (equalTo === event.target.value) {
                          setequalToState("success");
                        } else {
                          setequalToState("error");
                        }
                        setwhichEqualTo(event.target.value);
                      },
                      type: "password",
                      endAdornment:
                        equalToState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="danger" onClick={typeClick}>
              Guardar
            </Button>
            <Button color="primary" onClick={}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
