import React, {useEffect} from "react";
import { connect } from 'react-redux';
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Modal} from "@material-ui/core";
// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/core/Grid/GridContainer.js";
import GridItem from "components/core/Grid/GridItem.js";
import CustomInput from "components/core/CustomInput/CustomInput.js";
import Button from "components/core/CustomButtons/Button.js";
import Card from "components/core/Card/Card.js";
import CardBody from "components/core/Card/CardBody.js";
import CardIcon from "components/core/Card/CardIcon.js";
import CardHeader from "components/core/Card/CardHeader.js";
import CardText from "components/core/Card/CardText.js";
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import FormLabel from "@material-ui/core/FormLabel";
import CardFooter from "components/core/Card/CardFooter.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import userModel from "../../../dto/user.js";
import Select from '@material-ui/core/Select';
import {dataTable} from "variables/general.js";
import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import GlobalVariables from "../../../variables/globalVariables.js";

const variables = new GlobalVariables();
const baseUrl = variables.Url;

const useStylesAlerts = makeStyles(stylesForAlerts);

const useStyles = makeStyles(styles);

const useStylesDrop = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginTop: "26px",
    minWidth: 230,
    maxWidth: 3000,
  }
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const Users = ({token, userId}) => {
	const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [alerta, setAlerta] = React.useState(null);
  const [openModified, setOpenModified] = React.useState(false);


  const handleChangeMultiSelect = event => {
    setDataState({...dataState, programs: event.target.value});
    console.log(dataState)
  };

  const handleChangeMultiSelectRoles = event => {
    setDataState({...dataState, roles: event.target.value});
    console.log(dataState)
  };

  const handleChangeID = event => {
    setDataState({...dataState, id_type: event.target.value});
    console.log(dataState)
  };

  const [dataState, setDataState] = React.useState(
    {
      id_type: 0,
      id_number: 0,
      name: "",
      last_name: "",
      email: null,
      email_UPB: "",
      phone: "",
      idUPB: "",
      job:null,
      programs:[],
      other_job:null,
      user:"",
      password:"",
      roles:[]
    }
    );

  const [requireName, setrequireName] = React.useState("");
  const [requireLastName, setrequireLastName] = React.useState("");
  const [requireIdentification, setrequireIdentification] = React.useState("");
  const [requireEmail2, setrequireEmail2] = React.useState("");
  const [requireCell, setrequireCell] = React.useState("");
  const [requireIdUpb, setrequireIdUpb] = React.useState("");
  const [requireUserName, setrequireUserName] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");
  const [typeEmailState, settypeEmailState] = React.useState("");
  const [numberState, setnumberState] = React.useState("");
  const [equalTo, setequalTo] = React.useState("");
  const [equalToState, setequalToState] = React.useState("");
  const [programsArray, setProgramsArray] = React.useState([]);
  const [idType, setIdType] = React.useState([]);
  const [rolesPerUser, setRolesPerUser] = React.useState([]);


  const hideAlert = () => {
		setAlerta(null);
	};
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

  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let auth = token;
  let liableID = userId; //JSON.parse(localStorage.getItem("id"));

  const responseConfirmAlertNext = e => {
		setAlerta(e);
		setTimeout(() => {
			setAlerta(
				<SweetAlert
					style={{display: "block", marginTop: "-100px"}}
					onConfirm={() => hideAlert()}
					onCancel={() => hideAlert()}
					confirmBtnCssClass={
						classesAlerts.button + " " + classesAlerts.default
					}
					title={
						<p>
							<b>{e}</b>
						</p>
					}
				/>
			);
		}, 200);
	};

  const addUser = (username, contrasena, idTipoIdentificacion, numeroIdentificacion, nombreCompleto, apellidos, emailUpb, arrayRoles, arrayProgramas, celular, otrosTrabajos = null, idUpb, emailPersonal = null, profesion = null, idUserSender = liableID) => 
  {
      if (idTipoIdentificacion <=0) {
        responseConfirmAlertNext("Faltan campos por llenar Tipo identificacion");
      }
      if (arrayRoles.length <= 0) {
        responseConfirmAlertNext("Faltan campos por llenar Rol");
      }
      if (arrayProgramas.length <= 0 ) {
        responseConfirmAlertNext("Faltan campos por llenar programa");
      }
      if (requireName === "" || requireName === "error" ) {
        setrequireName("error");
        responseConfirmAlertNext("Faltan campos por llenar nombre");
      }
      if (requireLastName === "" || requireLastName === "error" ) {
        setrequireLastName("error");
        responseConfirmAlertNext("Faltan campos por llenar apellido");
      }
      if (requireIdentification === "" || requireIdentification === "error" ) {
        setrequireIdentification("error");
        responseConfirmAlertNext("Faltan campos por llenar identificacion");
      }
      if (requireEmail2 === "" || requireEmail2 === "error" ) {
        setrequireEmail2("error");
        responseConfirmAlertNext("Faltan campos por llenar email upb");
      }
      if (requireCell === "" || requireCell === "error" ) {
        setrequireCell("error");
        responseConfirmAlertNext("Faltan campos por llenar celular");
      }   
      if (requireIdUpb === "" || requireIdUpb === "error" ) {
        setrequireIdUpb("error");
        responseConfirmAlertNext("Faltan campos por llenar id upb");
      }
      if (requireUserName === "" || requireUserName === "error" ) {
        setrequireUserName("error");
        responseConfirmAlertNext("Faltan campos por llenar username");
      }
      if (equalToState === "" || equalToState === "error" ) {
        setequalToState("error");
        responseConfirmAlertNext("Las contraseñas no son iguales");
      }

      if(requireLastName==="success" && requireName=== "success" && requireIdentification=== "success" && requireEmail2=== "success" && requireIdUpb=== "success" && requireUserName=== "success" &&equalToState=== "success" && idTipoIdentificacion >0 && arrayRoles.length > 0 && arrayProgramas.length>0 )
      {
        const URL_USER_POST = baseUrl+"User";
        let programsArrayObject = arrayProgramas.map(x => {return({id:x})})
        let rolesArrayObject = arrayRoles.map(x => {return({id:x})})
    
        let newUser = new userModel(username, contrasena, idTipoIdentificacion, numeroIdentificacion, nombreCompleto, apellidos, emailUpb, rolesArrayObject,programsArrayObject, celular, otrosTrabajos,idUpb, emailPersonal, profesion, idUserSender);
    
        newUser = JSON.stringify(newUser);
        axios
          .post(URL_USER_POST, newUser, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth
            }
          })
          .then(function(response) {
            console.log(response);
            console.log(newUser);
            setDataState({
              id_type: "",
              id_number: 0,
              name: "",
              last_name: "",
              email: null,
              email_UPB: "",
              phone: null,
              idUPB: null,
              job:null,
              programs:[],
              other_job:null,
              user:"",
              password:"",
              roles:[]
            })
            responseConfirmAlertNext(
              response.data.data.error.message
            );
            setOpen(false);
            loadData();
          })
          .catch(function(error) {
            console.log(error);
            responseConfirmAlertNext(
              error.data.data.error.message
            );
            setOpen(false);
            return;
          });
      }

    
  };

  const changeDataUser = (idDataBase, username, contrasena, idTipoIdentificacion, numeroIdentificacion, nombreCompleto, apellidos, emailUpb, arrayRoles, arrayProgramas, celular = null, otrosTrabajos = null, idUpb = null, emailPersonal = null, profesion = null, idUserSender = liableID) => {
    const URL_USER_PUT = baseUrl+"User";
    let programsArrayObject = arrayProgramas.map(x => {return({id:x})})
    let rolesArrayObject = arrayRoles.map(x => {return({id:x})})

    let newUser = new userModel(username, contrasena, idTipoIdentificacion, numeroIdentificacion, nombreCompleto, apellidos, emailUpb, rolesArrayObject,programsArrayObject, celular, otrosTrabajos,idUpb, emailPersonal, profesion, idUserSender);
    newUser.id = dataState.id
    newUser = JSON.stringify(newUser);
    axios
      .put(URL_USER_PUT, newUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth
        }
      })
      .then(function(response) {
        console.log(response);
        console.log(newUser);
        setDataState({
          id_type: "",
          id_number: 0,
          name: "",
          last_name: "",
          email: null,
          email_UPB: "",
          phone: null,
          idUPB: null,
          job:null,
          programs:[],
          other_job:null,
          user:"",
          password:"",
          roles:[]
        })
        responseConfirmAlertNext(
          response.data.data.error.message
        );
        setOpenModified(false);
        loadData();
      })
      .catch(function(error) {
        console.log(error);
        console.log(newUser);
        responseConfirmAlertNext(
          error.data.data.error.message
        );
        setOpenModified(false);
        return;
      });
  };

	const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenModified = () => {
    setOpenModified(true);
  };
  const handleCloseModified = () => {
    console.log(dataState);
		setOpenModified(false);
  };

	const handleClose = () => {
    console.log(dataState);
		setOpen(false);
  };

	const [data, setData] = React.useState(
		dataTable.dataRows.map((prop, key) => {
			return {
				id: key,
				username: prop[0],
				typeAndNumberId: prop[0],
				nombreCompleto: prop[0]
			};
		})
  );

  const loadData = () => 
  {
    const URL_GetUser = baseUrl+"User";
    const URL_GetDocuments = baseUrl+"Master/GetDocuments"
    const URL_GetPrograms = baseUrl+"Master/GetPrograms"
    const URL_GetRole = baseUrl+"Role"

      const requestGetUser = axios.get(URL_GetUser, {
        headers: {
          Authorization: "Bearer " + auth
        }
      });
      const requestGetDocuments = axios.get(URL_GetDocuments, {
        headers: {
          Authorization: "Bearer " + auth
        }
      });
      const requestGetPrograms = axios.get(URL_GetPrograms, {
        headers: {
          Authorization: "Bearer " + auth
        }
      });
      const requestGetRole = axios.get(URL_GetRole, {
        headers: {
          Authorization: "Bearer " + auth
        }
      });

      axios.all([requestGetUser, requestGetDocuments, requestGetPrograms, requestGetRole]).then(axios.spread((...responses) => {
        const responseGetUser = responses[0]
        const responseGetDocuments = responses[1]
        const responesGetPrograms = responses[2]
        const responesGetRole = responses[3]
        let programsArrayAxios = [];
        let idTypeArrayAxios = [];
        let rolesArrayAxios = [];

        for(let i=0; i < responesGetPrograms.data.data.length; i++){
          let idProgram = responesGetPrograms.data.data[i].id;
          let nameProgram = responesGetPrograms.data.data[i].nombrePrograma;
          programsArrayAxios.push({id:idProgram,name:nameProgram})
        }

        for(let i=0; i < responseGetDocuments.data.data.length; i++){
          let idDocument = responseGetDocuments.data.data[i].id;
          let nameDocument = responseGetDocuments.data.data[i].nombreDocumento;
          idTypeArrayAxios.push({id:idDocument,name:nameDocument});
        }

        for(let i=0; i < responesGetRole.data.data.length; i++){
          let idRoles = responesGetRole.data.data[i].id;
          let nameRoles = responesGetRole.data.data[i].roleName;
          rolesArrayAxios.push({id:idRoles,name:nameRoles});
        }

        setIdType(idTypeArrayAxios)
        setProgramsArray(programsArrayAxios)
        setRolesPerUser(rolesArrayAxios)
        const resultActive = responseGetUser.data.data.filter(x => x.activo === true);

        setData(
					resultActive.map((prop, key) => {
						return {
							id: key,
							username: prop.username,
							typeAndNumberId: `${prop.nameTipoIdentificacion} ${prop.numeroIdentificacion}`,
              nombreCompleto: `${prop.nombreCompleto} ${prop.apellidos}`,
							actions: (
								// we've added some custom button actions
								<div className="actions-right">
									{/* use this button to add a edit kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
                      let obj = resultActive.find(o => o.username === prop.username);
                      debugger;
                      const arrayInPutRoles = obj.role.map(x => {return(x.id)})
                      const arrayInPutPrograms = obj.programa.map(x => {return(x.id)})
                      setDataState({...dataState, name: obj.nombreCompleto, job:obj.profesion, last_name: obj.apellidos, email: obj.emailPersonal,
                        other_job: obj.otrosTrabajos, phone: obj.celular, id_number: obj.numeroIdentificacion, email_UPB: obj.emailUpb,
                        user: obj.username, password: obj.contrasena, id_type:obj.idTipoIdentificacion, id: obj.id, idUPB: obj.idUpb, roles: arrayInPutRoles,
                        programs: arrayInPutPrograms
                      })
                      handleOpenModified();
										}}
										color="warning"
										className="edit"
									>
										<Create />
									</Button>{" "}
									{/* use this button to remove the data row */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
                      let obj = resultActive.find(o => o.username === prop.username);
                      const URL_DeleteUser = baseUrl+"User";
                      obj = {
                        id:obj.id,
                        username:obj.username,
                        activo:false,
                        idUserSender:liableID
                      }
                      axios.delete(URL_DeleteUser, {headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + auth
                      }, data:obj}).then(response => {
                        console.log(response);
                        responseConfirmAlertNext(
                          response.data.data.error.message
                        );
                        loadData();
                      })
                      .catch(function(error) {
                        console.log(error);
                        alert("Error al eliminar el usuario, vuelva a intentarlo");
                        return;
                      })
										}}
										color="danger"
										className="remove"
									>
										<Close />
									</Button>{" "}
								</div>
							)
						};
					})
				);
        // use/access the results
      })).catch(errors => {
        // react on errors.
      })
  } 

	useEffect(() => {
		loadData();
	}, []);

  const classesAlerts = useStylesAlerts();
  const classes = useStyles();
  const classesDrop = useStylesDrop();
	return (
    <div>
    {alerta}
  <GridContainer>
			<GridItem xs={12}>
				<Card>
					<CardHeader color="danger" icon>
						<CardIcon color="danger">
							<AccountBox />
						</CardIcon>
						<h4 className={classes.cardIconTitle}>Usuarios</h4>
						<br />
						<Button onClick={handleOpen}>
							<Add
								style={{
									marginTop: 0 + "px",
									marginLeft: 0 + "px",
									marginRight: 7 + "px",
									marginBottom: 2 + "px"
								}}
							/>
							Agregar Usuario
						</Button>
            {/* Edit Modal */}
            <Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={openModified}
							onClose={handleCloseModified}
						>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="danger" text>
                      <CardText color="danger">
                        <h4 className={classes.cardTitle}>Modificar usuario</h4>
                      </CardText>
                    </CardHeader>
                    <CardBody>
                    <h4 style={{margin: "25px 0px"}}><b>Datos personales</b></h4>
                      <form>
                        <GridContainer>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Nombre
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
                            <CustomInput
                              success={requiredState === "success"}
                              error={requiredState === "error"}
                              id="required"
                              defaultValue="Default Value"
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
                                  setDataState({...dataState, name: event.target.value})
                                },
                                type: "text",
                                defaultValue:dataState.name,
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
                              Apellidos
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
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
                                  setDataState({...dataState, last_name: event.target.value})
                                },
                                type: "text",
                                defaultValue:dataState.last_name,
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
                              Roles
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
                            <FormControl className={classesDrop.formControl}>
                              <Select
                                id="demo-mutiple-role"
                                multiple
                                value={dataState.roles}
                                onChange={handleChangeMultiSelectRoles}
                                input={<Input />}
                                MenuProps={MenuProps}
                              >
                                {rolesPerUser.map(n => (
                                  <MenuItem key={n.id} value={n.id} style={getStyles(n, dataState.roles, theme)}>
                                    {n.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                          </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Email Personal
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
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
                                  setDataState({...dataState, email: event.target.value})
                                },
                                type: "email",
                                defaultValue:dataState.email
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
                          <GridItem xs={12} sm={8}>
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
                                  setDataState({...dataState, phone: event.target.value})
                                },
                                type: "number",
                                defaultValue:dataState.phone,
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
                              Programas
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
                            <FormControl className={classesDrop.formControl}>
                              <Select
                                id="demo-mutiple-name"
                                multiple
                                value={dataState.programs}
                                onChange={handleChangeMultiSelect}
                                input={<Input />}
                                MenuProps={MenuProps}
                              >
                                {programsArray.map(n => (
                                  <MenuItem key={n.id} value={n.id} style={getStyles(n, dataState.programs, theme)}>
                                    {n.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                      </form>
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button color="primary" onClick={handleCloseModified}>
                        Cancelar
                      </Button>
                      <Button color="danger" onClick={()=>changeDataUser(data.idDataBase, dataState.user, dataState.password, dataState.id_type, dataState.id_number, dataState.name, dataState.last_name, dataState.email_UPB, dataState.roles, dataState.programs, dataState.phone, dataState.other_job, dataState.idUPB, dataState.email,dataState.job)}>
                        Modificar
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>

            </Modal>
						{/* Create modal */}
            <Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={open}
							onClose={handleClose}
						>
              <GridContainer style={{maxHeight: "600px", overflow: "auto"}}>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="danger" text>
                      <CardText color="danger">
                        <h4 className={classes.cardTitle}>Usuarios</h4>
                      </CardText>
                    </CardHeader>
                    <CardBody>
                    <h4 style={{margin: "25px 0px"}}><b>Datos personales</b></h4>
                      <form>
                        <GridContainer>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Tipo de identificacíon
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                          <FormControl className={classesDrop.formControl}>
                            <Select
                              id="demo-simple-select"
                              value={dataState.id_type}
                              onChange={handleChangeID}
                            >
                              {idType.map(n => (
                                            <MenuItem key={n.id} value={n.id} >
                                              {n.name}
                                            </MenuItem>
                                          ))}
                            </Select>
                          </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              # Identificación
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requireIdentification === "success"}
                              error={requireIdentification === "error"}
                              id="Identification"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyNumber(event.target.value)) {
                                    setrequireIdentification("success");
                                  } else {
                                    setrequireIdentification("error");
                                  }
                                  setDataState({...dataState, id_number: event.target.value})
                                },
                                type: "number",
                                endAdornment:
                                requireIdentification === "error" ? (
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
                              Nombre
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requireName === "success"}
                              error={requireName === "error"}
                              id="name"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyLength(event.target.value, 0)) {
                                    setrequireName("success");
                                  } else {
                                    setrequireName("error");
                                  }
                                  setDataState({...dataState, name: event.target.value})
                                },
                                type: "text",
                                endAdornment:
                                requireName === "error" ? (
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
                              Apellidos
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requireLastName === "success"}
                              error={requireLastName === "error"}
                              id="lastName"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyLength(event.target.value, 0)) {
                                    setrequireLastName("success");
                                  } else {
                                    setrequireLastName("error");
                                  }
                                  setDataState({...dataState, last_name: event.target.value})
                                },
                                type: "text",
                                endAdornment:
                                requireLastName === "error" ? (
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
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={typeEmailState === "success"}
                              error={typeEmailState === "error"}
                              id="Email1"
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
                                  setDataState({...dataState, email: event.target.value})
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
                              success={requireEmail2 === "success"}
                              error={requireEmail2 === "error"}
                              id="Email2"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyEmail(event.target.value)) {
                                    setrequireEmail2("success");
                                  } else {
                                    setrequireEmail2("error");
                                  }
                                  setDataState({...dataState, email_UPB: event.target.value})
                                },
                                type: "email",
                                endAdornment:
                                requireEmail2 === "error" ? (
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
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requireCell === "success"}
                              error={requireCell === "error"}
                              id="Cellphone"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyNumber(event.target.value)) {
                                    setrequireCell("success");
                                  } else {
                                    setrequireCell("error");
                                  }
                                  setDataState({...dataState, phone: event.target.value})
                                },
                                type: "number",
                                endAdornment:
                                requireCell === "error" ? (
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
                              success={requireIdUpb === "success"}
                              error={requireIdUpb === "error"}
                              id="IdUPB"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyNumber(event.target.value)) {
                                    setrequireIdUpb("success");
                                  } else {
                                    setrequireIdUpb("error");
                                  }
                                  setDataState({...dataState, idUPB: event.target.value})
                                },
                                type: "number",
                                endAdornment:
                                requireIdUpb === "error" ? (
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
                              Roles
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <FormControl className={classesDrop.formControl}>
                              <Select
                                id="demo-mutiple-role"
                                multiple
                                value={dataState.roles}
                                onChange={handleChangeMultiSelectRoles}
                                input={<Input />}
                                MenuProps={MenuProps}
                              >
                                {rolesPerUser.map(n => (
                                  <MenuItem key={n.id} value={n.id} style={getStyles(n, dataState.roles, theme)}>
                                    {n.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Programas
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <FormControl className={classesDrop.formControl}>
                              <Select
                                id="demo-mutiple-name"
                                multiple
                                value={dataState.programs}
                                onChange={handleChangeMultiSelect}
                                input={<Input />}
                                MenuProps={MenuProps}
                              >
                                {programsArray.map(n => (
                                  <MenuItem key={n.id} value={n.id} style={getStyles(n, dataState.programs, theme)}>
                                    {n.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Profesión
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requiredState === "success"}
                              error={requiredState === "error"}
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
                                  setDataState({...dataState, job: event.target.value})
                                },
                                type: "text",
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
                              Otros trabajos
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3}>
                            <CustomInput
                              success={requiredState === "success"}
                              error={requiredState === "error"}
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
                                  setDataState({...dataState, other_job: event.target.value})
                                },
                                type: "text",
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={1}>
                            <FormLabel className={classes.labelLeftHorizontal}>
                              <code>opcional</code>
                            </FormLabel>
                          </GridItem>
                        </GridContainer>
                        <h4 style={{margin: "25px 0px"}}><b>Datos login</b></h4>
                        <GridContainer>
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Usuario
                            </FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={8}>
                            <CustomInput
                              success={requireUserName === "success"}
                              error={requireUserName === "error"}
                              id="Username"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => {
                                  if (verifyLength(event.target.value, 0)) {
                                    setrequireUserName("success");
                                  } else {
                                    setrequireUserName("error");
                                  }
                                  setDataState({...dataState, user: event.target.value})
                                },
                                type: "text",
                                endAdornment:
                                requireUserName === "error" ? (
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
                          <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Confirmar
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
                                  setDataState({...dataState, password: event.target.value});
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
                      <Button color="primary" onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button color="danger" onClick={()=>addUser(dataState.user, dataState.password, dataState.id_type, dataState.id_number, dataState.name, dataState.last_name, dataState.email_UPB, dataState.roles, dataState.programs, dataState.phone, dataState.other_job, dataState.idUPB, dataState.email,dataState.job)}>
                        Guardar
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
						</Modal>
					</CardHeader>
					<CardBody>
						<ReactTable
							data={data}
							filterable
							columns={[
								{
									Header: "Nombre completo",
									accessor: "nombreCompleto"
								},
								{
									Header: "Usuario",
									accessor: "username"
								},
								{
									Header: "Identificación",
									accessor: "typeAndNumberId"
								},
								{
									Header: "",
									accessor: "actions",
									sortable: false,
									filterable: false
								}
							]}
							defaultPageSize={10}
							showPaginationTop
							previousText="Anterior"
							nextText="Siguiente"
							loadingText="Cargando..."
							noDataText="No se encontraron filas"
							pageText="Página"
							ofText="de"
							rowsText="filas"
							showPaginationBottom={false}
							className="-striped -highlight"
						/>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
    </div>
	);
}

const mapState = state => ({
  token: state.auth.token,
  userId: state.auth.user.id,
}), mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Users);