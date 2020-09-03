import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";

// @material-ui/core components
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
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
import { dataTable } from "variables/general.js";
import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import GlobalVariables from "../../../variables/globalVariables.js";
import { Watchful, Table, useAlerta, ComboBox } from 'components/Shared';
import { PERMISSIONS } from 'config/constants';
import Instance from '../../../services/instance';

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
const INVALID_VALUES = [null, '', '-1', -1, undefined];
const REQUIRED_FIELDS = [
  'apellidos',
  'celular',
  'emailUpb',
  'idTipoIdentificacion',
  'idUpb',
  'numeroIdentificacion',
  'username',
  'programa',
  'role',
  'nombreCompleto',
  'contrasena',
  'confirmPass'
];
const Form = ({
  idType,
  rolesPerUser,
  programsArray,
  data,
  onSave,
  onCancel,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const { Alerta, alerta } = useAlerta();
  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);
  const handlers = {
    change(e, prop) {
      if (e.target) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      } else {
        setValues({ ...values, [prop]: e });
      }
    },
    save(e) {
      const _errors = {};
      REQUIRED_FIELDS.forEach(name => {
        if (INVALID_VALUES.indexOf(values[name]) >= 0) {
          _errors[name] = true;
        }
      });
      setErrors(_errors);
      if (Object.keys(_errors).length > 0) {
        alerta.show('Hay campos sin llenar!!', {
          type: 'warning',
          confirm: () => {},
        });
        return;
      }

      onSave(values);
    }
  }

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
  const classesAlerts = useStylesAlerts();
  const classesDrop = useStylesDrop();
  const classes = useStyles();
  return (
    <GridContainer style={{ margin: "auto", width: "1000px" }}>
      {Alerta}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger" text>
            <CardText color="danger">
              <h4 className={classes.cardTitle}>Usuarios</h4>
            </CardText>
          </CardHeader>
          <CardBody style={{ maxHeight: "500px", overflow: "auto" }}>
            <h4 style={{ margin: "25px 0px" }}><b>Datos personales</b></h4>
            <form>
              <GridContainer>
                <ComboBox
                  label="Tipo de identificación"
                  onChange={handlers.change}
                  id={'idTipoIdentificacion'}
                  name={'idTipoIdentificacion'}
                  error={errors.idTipoIdentificacion}
                  value={values.idTipoIdentificacion}
                  data={idType}
                />
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="numeroIdentificacion"
                    label="# Identificación"
                    name="numeroIdentificacion"
                    type="number"
                    value={values.numeroIdentificacion}
                    onChange={handlers.change}
                    error={errors.numeroIdentificacion}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="nombreCompleto"
                    label="Nombre"
                    name="nombreCompleto"
                    type="text"
                    value={values.nombreCompleto}
                    onChange={handlers.change}
                    error={errors.nombreCompleto}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="apellidos"
                    label="Apellidos"
                    name="apellidos"
                    type="text"
                    value={values.apellidos}
                    onChange={handlers.change}
                    error={errors.apellidos}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="emailPersonal"
                    label="Email Personal"
                    name="emailPersonal"
                    type="text"
                    value={values.emailPersonal}
                    onChange={event => {
                      setErrors({
                        ...errors,
                        emailPersonal: !verifyEmail(event.target.value)
                      });                      
                      handlers.change(event);
                    }}
                    error={errors.emailPersonal}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="emailUpb"
                    label="Email Personal"
                    name="emailUpb"
                    type="text"
                    value={values.emailUpb}
                    onChange={event => {
                      setErrors({
                        ...errors,
                        emailUpb: !verifyEmail(event.target.value)
                      });                      
                      handlers.change(event);
                    }}
                    error={errors.emailUpb}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="celular"
                    label="Celular"
                    name="celular"
                    type="number"
                    value={values.celular}
                    onChange={event => {
                      setErrors({
                        ...errors,
                        celular: !verifyNumber(event.target.value)
                      });
                      handlers.change(event);
                    }}
                    error={errors.celular}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="idUpb"
                    label="ID UPB"
                    name="idUpb"
                    type="text"
                    value={values.idUpb}
                    onChange={event => {
                      setErrors({
                        ...errors,
                        idUpb: !verifyNumber(event.target.value)
                      });
                      handlers.change(event);
                    }}
                    error={errors.idUpb}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem tem xs={12} sm={6} lg={6}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel
                      htmlFor="multiple-select"
                      className={classes.selectLabel}
                    >
                      Roles
                        		</InputLabel>
                    <Select
                      multiple
                      error={errors.role}
                      value={values.role || []}
                      onChange={handlers.change}
                      MenuProps={{ className: classes.selectMenu }}
                      classes={{ select: classes.select }}
                      inputProps={{
                        name: "role",
                        id: "role",
                      }}
                    >
                      {rolesPerUser && rolesPerUser.map(x => (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelectedMultiple
                          }}
                          value={x.id}
                        >
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem tem xs={12} sm={6} lg={6}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel
                      htmlFor="multiple-select"
                      className={classes.selectLabel}
                    >
                      Programas
                        		</InputLabel>
                    <Select
                      multiple
                      error={errors.programa}
                      value={values.programa || []}
                      onChange={handlers.change}
                      MenuProps={{ className: classes.selectMenu }}
                      classes={{ select: classes.select }}
                      inputProps={{
                        name: "programa",
                        id: "programa",
                      }}
                    >
                      {programsArray && programsArray.map(x => (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelectedMultiple
                          }}
                          value={x.id}
                        >
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="profesion"
                    label="Profesión"
                    name="profesion"
                    type="text"
                    value={values.profesion}
                    onChange={handlers.change}
                    error={errors.profesion}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} lg={6}>
                  <TextField
                    id="otrosTrabajos"
                    label="Otros trabajos"
                    name="otrosTrabajos"
                    type="text"
                    value={values.otrosTrabajos}
                    onChange={handlers.change}
                    error={errors.otrosTrabajos}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <h4 style={{ margin: "25px 0px" }}><b>Datos login</b></h4>
              <GridContainer>
                <GridItem xs={12} sm={12} lg={12}>
                  <TextField
                    id="username"
                    label="Usuario"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handlers.change}
                    error={errors.username}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    inputProps={{
                      min: 0
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              {data
                && data.id
                && data.id > 0 ? ''
                : <GridContainer>
                  <GridItem xs={12} sm={6} lg={6}>
                    <TextField
                      id="contrasena"
                      label="Contraseña"
                      name="contrasena"
                      type="password"
                      value={values.contrasena}
                      onChange={event => {
                        setErrors({
                          ...errors,
                          contrasena: event.target.value !== values.confirmPass
                        });
                        handlers.change(event);
                      }}
                      error={errors.contrasena}
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      inputProps={{
                        min: 0
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} lg={6}>
                    <TextField
                      id="confirmPass"
                      label="Confirmar Contraseña"
                      name="confirmPass"
                      type="password"
                      value={values.confirmPass}
                      onChange={event => {
                        setErrors({
                          ...errors,
                          confirmPass: event.target.value !== values.contrasena,
                          contrasena: event.target.value !== values.contrasena
                        });
                        handlers.change(event);
                      }}
                      error={errors.confirmPass}
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      inputProps={{
                        min: 0
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              }
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="primary" onClick={onCancel}>
              Cancelar
          </Button>
            <Watchful
              action={PERMISSIONS.add}
              menu="Usuarios">
              <Button color="danger" onClick={handlers.save}>
                Guardar
          </Button>
            </Watchful>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

const Users = ({ token, userId }) => {
  const URL_GetUser = baseUrl + "User",
    URL_GetDocuments = baseUrl + "Master/GetDocuments",
    URL_GetPrograms = baseUrl + "Master/GetPrograms",
    URL_GetRole = baseUrl + "Role",
    headers = {
      headers: {
        Authorization: "Bearer " + auth
      }
    };

  const [current, setCurrent] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [roles, setRoles] = useState([]);
  const [idTypes, setIdTypes] = useState([]);

  const { Alerta, alerta } = useAlerta();

  useEffect(() => {
    handlers.loadData();
  }, []);


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

  const handlers = {
    delete(item) {
      alerta.show('¿Esta Seguro de que quiere eliminar el registro?', {
        showCancel: true,
        cancelBtnText: "No",
        confirmBtnText: "Sí",
        confirm: () => {
          const URL_DeleteUser = baseUrl + "User";
          const obj = {
            ...item,
            activo: false,
            idUserSender: liableID
          }
          Instance.delete(URL_DeleteUser, { 
            data: obj
          }).then(response => {
            alerta.hide();
            alerta.show(response.data.data.error.message);
            handlers.loadData();
          })
            .catch(function (error) {
              alerta.show("Error al eliminar el usuario, vuelva a intentarlo", {
                type: 'danger',
                confirm: () => { },
              });
              return;
            });
        },
        cancel: alerta.hide
      })
    },
    edit(item) {      
      setCurrent({
        ...item,
        programa: item.programa.map(x => x.id),
        role: item.role.map(x => x.id),
      });
      handlers.showForm();
    },
    hideForm() {
      setCurrent(null);
      setShowForm(false);
    },
    loadData: () => {
      handlers.hideForm();
      alerta.show('Cargando información...', {
				loading: true,
			});
      axios.all([
        Instance.get(URL_GetUser),
        Instance.get(URL_GetDocuments),
        Instance.get(URL_GetPrograms),
        Instance.get(URL_GetRole)
      ]).then(axios.spread((...responses) => {
        const responseGetUser = responses[0]
        const responseGetDocuments = responses[1]
        const responesGetPrograms = responses[2]
        const responesGetRole = responses[3]

        setIdTypes(responseGetDocuments.data.data != null ?     
          responseGetDocuments.data.data.map(e => ({ key: e.id, label: e.nombreDocumento })) : []
        );
        setPrograms(responesGetPrograms.data.data != null ?
          responesGetPrograms.data.data.map(e => ({ id: e.id, name: e.nombrePrograma })) : []
        );
        setRoles(responesGetRole.data.data != null ?
          responesGetRole.data.data.map(e => ({ id: e.id, name: e.roleName })) : []
        );

        setData(
          responseGetUser.data.data
            .filter(x => x.activo === true)
            .map(prop => ({
              id: prop.id,
              username: prop.username,
              typeAndNumberId: `${prop.nameTipoIdentificacion} ${prop.numeroIdentificacion}`,
              nombreCompleto: prop.showFullName,
              actions: (
                // we've added some custom button actions
                <div className="actions-right">
                  {/* use this button to add a edit kind of action */}
                  <Watchful
                    action={PERMISSIONS.edit}
                    menu="Usuarios">
                    <Button
                      justIcon
                      round
                      simple
                      onClick={() => handlers.edit(prop)}
                      color="warning"
                      className="edit"
                    >
                      <Create />
                    </Button>{" "}
                  </Watchful>
                  {/* use this button to remove the data row */}
                  <Watchful
                    action={PERMISSIONS.delete}
                    menu="Usuarios">
                    <Button
                      justIcon
                      round
                      simple
                      onClick={() => handlers.delete(prop)}
                      color="danger"
                      className="remove"
                    >
                      <Close />
                    </Button>{" "}
                  </Watchful>
                </div>
              )
            })));

          alerta.hide();
        // use/access the results
      })).catch(errors => {
        // react on errors.
      })
    },
    save(values) {
      alerta.show('Almacenando Información...', {
        loading: true,
      });
      const URL_USER_POST = baseUrl + "User";
      values = {
        ...values,
        programa: values.programa.map(x => ({ id: x })),
        role: values.role.map(x => ({ id: x }))
      };
      Instance
        .post(URL_USER_POST, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth
          }
        })
        .then((response) => {
          alerta.hide();
          alerta.show(response.data.data.error.message, {
            type: 'success',
            confirm: handlers.loadData,
          });
        })
        .catch(function (error) {
          alerta.show(error.data.data.error.message, {
            type: 'danger',
            confirm: () => { },
          });
          handlers.hideForm();
          return;
        });
    },
    showForm() {
      setShowForm(true);
    },
  }

  const classes = useStyles();
  return (
    <div>
      {Alerta}
      {showForm ? (
        <Form
          idType={idTypes}
          rolesPerUser={roles}
          programsArray={programs}
          data={current}
          onSave={handlers.save}
          onCancel={handlers.hideForm}
        />
      ) :
        (<GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <AccountBox />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Usuarios</h4>
                <br />
                <Watchful
                  action={PERMISSIONS.add}
                  menu="Usuarios">
                  <Button onClick={handlers.showForm}>
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
                </Watchful>
              </CardHeader >
              <CardBody>
                <Table
                  data={data}
                  loadTable={handlers.loadData}
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
                />
              </CardBody>
            </Card >
          </GridItem >
        </GridContainer >)}
    </div >
  );
}

const mapState = state => ({
  token: state.auth.token,
  userId: state.auth.user.id,
}), mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Users);