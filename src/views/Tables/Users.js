import React, {useEffect} from "react";
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Modal} from "@material-ui/core";
// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
import Create from "@material-ui/icons/Create";
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardFooter from "components/Card/CardFooter.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import userModel from "../../models/user.js";


import {dataTable} from "variables/general.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	}
};

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(styles);

export default function Users() {
	const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [dataState, setDataState] = React.useState(
    {
      id_type: "",
      id_number: 0,
      name: "",
      last_name: "",
      email: "",
      email_UPB: "",
      phone: "",
      idUPB: "",
      job:"",
      programs:[],
      other_job:"",
      user:"",
      password:""     
    }
    );

	const [required, setrequired] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");
  const [typeEmailState, settypeEmailState] = React.useState("");
  const [number, setnumber] = React.useState("");
  const [numberState, setnumberState] = React.useState("");
  const [url, seturl] = React.useState("");
  const [urlState, seturlState] = React.useState("");
  const [equalTo, setequalTo] = React.useState("");
  const [whichEqualTo, setwhichEqualTo] = React.useState("");
	const [equalToState, setequalToState] = React.useState("");
	
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

	let deleteUser = () => {
		const url = `pendiente`;
		axios
			.delete(url)
			.then(result => {
				console.log(result.response.data);
			})
			.catch(err => {
				console.log(err.response.data);
			});
  };

	let addUser = (
    username,
		contrasena,
		idTipoIdentificacion,
		numeroIdentificacion,
		nombreCompleto,
		apellidos,
		emailUpb,
		idUserSender,
		arrayRoles,
		arrayProgramas,
		celular = null,
		otrosTrabajos = null,
		idUpb = null,
		emailPersonal = null,
    profesion = null
    ) => {
		const URL_USER_POST =
      "http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/User";
    let newUser = new userModel(
      username,
      contrasena,
      idTipoIdentificacion,
      numeroIdentificacion,
      nombreCompleto,
      apellidos,
      emailUpb,
      idUserSender,
      arrayRoles,
      arrayProgramas,
      celular,
      otrosTrabajos,
      idUpb,
      emailPersonal,
      profesion
      );
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
      })
      .catch(function(error) {
        console.log(error);
        return;
      });
  };
  
	const handleOpen = () => {
    setOpen(true);
    const URL_GetDocuments = "http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Master/GetDocuments"
    const URL_GetPrograms = "http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Master/GetPrograms"
    const URL_GetRole = "http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role"

    const requestOne = axios.get(URL_GetDocuments, {
      headers: {
        Authorization: "Bearer " + auth
      }
    });
    const requestTwo = axios.get(URL_GetPrograms, {
      headers: {
        Authorization: "Bearer " + auth
      }
    });
    const requestThree = axios.get(URL_GetRole, {
      headers: {
        Authorization: "Bearer " + auth
      }
    });

    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responesThree = responses[2]
      console.log(responseOne);
      console.log(responseTwo);
      console.log(responesThree);

      // use/access the results 
    })).catch(errors => {
      // react on errors.
    })
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
				nombreCompleto: prop[0],
				actions: (
					// we've added some custom button actions
					<div className="actions-right">
						{/* use this button to add a like kind of action */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								let obj = data.find(o => o.id === key);
								alert(
									"You've clicked LIKE button on \n{ \nusername: " +
										obj.username +
										", \nusername: " +
										obj.typeAndNumberIdn +
										", \ntypeAndNumberIdn: " +
										obj.nombreCompleto +
										", \nnombreCompletoe: "
								);
							}}
							color="info"
							className="like"
						>
							<Assignment />
						</Button>{" "}
						{/* use this button to add a edit kind of action */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								let obj = data.find(o => o.id === key);
								console.log(data);
								alert(
									"You've clicked EDIT button on \n{ \nusername: " +
										obj.username +
										", \nusername: " +
										obj.typeAndNumberIdn +
										", \ntypeAndNumberIdn: " +
										obj.nombreCompleto +
										", \nnombreCompletoe: "
								);
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
								var newData = data;
								newData.find((o, i) => {
									if (o.id === key) {
										// here you should add some custom code so you can delete the data
										// from this component and from your server as well
										newData.splice(i, 1);
										return true;
									}
									return false;
								});
								setData([...newData]);
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

  let auth = localStorage.getItem("auth");
  let liableID = JSON.parse(localStorage.getItem("id"));


	useEffect(() => {
		const URL =
			"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/User";
		axios
			.get(URL, {
				headers: {
					Authorization: "Bearer " + auth
				}
			})
			.then(function(response) {
				setData(
					response.data.data.map((prop, key) => {
						return {
							id: key,
							username: prop.username,
							typeAndNumberId: `${prop.nameTipoIdentificacion} ${prop.numeroIdentificacion}`,
							nombreCompleto: prop.nombreCompleto,
							actions: (
								// we've added some custom button actions
								<div className="actions-right">
									{/* use this button to add a like kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											let obj = response.data.data.find(o => o.id - 1 === key);
											alert(
												"You've clicked EDIT button on \n{ \nusername: " +
													obj.username +
													", \nnombreCompletoe: " +
													obj.nombreCompleto
											);
										}}
										color="info"
										className="like"
									>
										<Assignment />
									</Button>{" "}
									{/* use this button to add a edit kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											let obj = response.data.data.find(o => o.id - 1 === key);
											console.log(obj);
											alert(
												"You've clicked EDIT button on \n{ \nusername: " +
													obj.username +
													", \nnombreCompletoe: " +
													obj.nombreCompleto
											);
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
											var newData = response.data.data;
											newData.find((o, i) => {
												if (o.id - 1 === key) {
													// here you should add some custom code so you can delete the data
													// from this component and from your server as well
													newData.splice(i, 1);
													return true;
												}
												return false;
											});
											setData([...newData]);
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
				console.log(response.data.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

	const classes = useStyles();
	return (
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
						<Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={open}
							onClose={handleClose}
						>
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
              <GridItem xs={1} sm={1}>
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
                    ID
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
                        setDataState({...dataState, id_number: event.target.value})
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
                    Nombre
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
                        setDataState({...dataState, name: event.target.value})
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
                        setDataState({...dataState, email_UPB: event.target.value})
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
                        setDataState({...dataState, phone: event.target.value})
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
                        setDataState({...dataState, idUPB: event.target.value})
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
                        setDataState({...dataState, job: event.target.value})
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
                        setDataState({...dataState, programs: event.target.value})
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
                        setDataState({...dataState, other_job: event.target.value})
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
                        setDataState({...dataState, user: event.target.value})
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
            <Button color="danger" onClick={handleClose}>
              Guardar
            </Button>
            <Button color="primary" onClick={handleClose}>
              Cancelar
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
	);
}
