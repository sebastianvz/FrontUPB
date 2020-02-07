import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Close from "@material-ui/icons/Close";
import Plus from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "../../../components/core/Grid/GridContainer.js";
import GridItem from "../../../components/core/Grid/GridItem.js";
import CustomInput from "../../../components/core/CustomInput/CustomInput.js";
import Button from "../../../components/core/CustomButtons/Button.js";
import Card from "../../../components/core/Card/Card.js";
import CardHeader from "../../../components/core/Card/CardHeader.js";
import CardText from "../../../components/core/Card/CardText.js";
import CardIcon from "../../../components/core/Card/CardIcon.js";
import CardBody from "../../../components/core/Card/CardBody.js";
import Table from "../../../components/core/Table/Table.js";
import FileUpload from "../../../components/core/CustomUpload/FileUpload";

import styles from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const useStyles = makeStyles(styles);

const FormDetails = ({
  title,
  labelList,
  list,
}) => {
  const [listValue, setListValue] = useState("");
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const classes = useStyles();

  const handlres = {
    changeListValue(e) {
      setListValue(e.target.value);
    },
    changeQuantity: (e) => {
      setQuantity(e.target.value);
    },
    add: () => {
      setData([{
        key: data.length,
        label: (list.find(x => x.key === listValue) || { value: '' }).value,
        quantity: quantity
      },
      ...data
      ]);
    },
    remove: key => {
      setData(data.filter(x => x.key !== key));
    }
  };

  return (
    <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <MailOutline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>{title}</h4>
        </CardHeader>
        <CardBody>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={5} lg={5}>
                <InputLabel
                  htmlFor={labelList}
                  className={classes.selectLabel}
                >
                  {labelList}
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={listValue}
                  onChange={handlres.changeListValue}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: labelList,
                    id: labelList
                  }}
                >
                  {list && list.map(x => (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={x.key}
                    >
                      {x.value}
                    </MenuItem>
                  ))}
                </Select>

              </GridItem>
              <GridItem xs={12} sm={5} lg={5}>
                <CustomInput
                  labelText="Cantidad"
                  id="Cantidad"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={handlres.changeQuantity}
                  value={quantity}
                  inputProps={{
                    type: "number"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={2} lg={2}>
                <Button
                  color="info"
                  className={classes.actionButton}
                  onClick={handlres.add}
                >
                  <Plus className={classes.icon} />
                </Button>
              </GridItem>
            </GridContainer>
          </form>
          <GridContainer>
            {
              data
              && data.length > 0
              && <GridItem>
                <Table
                  tableHead={[
                    "#",
                    labelList,
                    "Cantidad",
                    "Acciones"
                  ]}
                  tableData={data.map(x => ([
                    x.key, x.label, x.quantity,
                    <Button
                      color="danger"
                      className={classes.actionButton}
                      onClick={() => { handlres.remove(x.key) }}
                    >
                      <Close className={classes.icon} />
                    </Button>
                  ]))}
                  customCellClasses={[classes.center, classes.right, classes.right]}
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
                />
              </GridItem>
            }
          </GridContainer>
        </CardBody>
      </Card>
    </GridItem>
  );
}

FormDetails.propTypes = {
  title: PropTypes.string,
  labelList: PropTypes.string,
}

const Form = () => {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  const filesHandlers = {
    remove: key => {
      setFiles(files.filter(x => x.key === key));
    },
    add: (file) => {
      setFiles([{
        key: files.length,
        name: file.name,
        tipo: file.tipo
      }, ...files]);
    },
  };


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Practicas</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Nombre Parctica
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="NombrePractica"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    descripción
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Autores
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="Autores"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tiempo Estimado
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="tiempoEstimado"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Competencia
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="competencia"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Criterio de competencia
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="criterioCompetencia"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={5} lg={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Objetivo
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7} lg={4}>
                  <CustomInput
                    id="objetivo"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <FormDetails
        title="Equipos"
        labelList="Equipo"
        list={[
          {
            key: 1,
            value: 'cosa'
          },
          {
            key: 2,
            value: 'otra cosa'
          }
        ]}
      />
      <FormDetails
        title="Simuladores"
        labelList="Simulador"
        list={[
          {
            key: 1,
            value: 'cosa'
          },
          {
            key: 2,
            value: 'otra cosa'
          }
        ]}
      />
      <FormDetails
        title="Insumos"
        labelList="Insumo"
        list={[
          {
            key: 1,
            value: 'cosa'
          },
          {
            key: 2,
            value: 'otra cosa'
          }
        ]}
      />
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Observaciones</h4>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} lg={12}>
                  <InputLabel
                    htmlFor={'observaciones'}
                    className={classes.FormControlLabel}
                  >
                    Observaciones
                  </InputLabel>
                  <CustomInput
                    id="observaciones"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Adjuntos</h4>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} lg={12}>
                  <InputLabel
                    htmlFor={'evaluacionFile'}
                    className={classes.FormControlLabel}
                  >
                    Evaluación
                  </InputLabel>
                  <FileUpload
                    defaultImage={null}
                    id={'evaluacionFile'}
                    multiple={false}
                  />
                </GridItem>
              </GridContainer>
              <hr />
              <GridContainer>
                <GridItem xs={12} sm={12} lg={12}>
                  <InputLabel
                    htmlFor={'recursosFile'}
                    className={classes.FormControlLabel}
                  >
                    Recursos
                  </InputLabel>
                  <FileUpload
                    defaultImage={null}
                    id={'recursosFile'}
                    onChange={filesHandlers.add}
                    multiple
                  />
                </GridItem>
              </GridContainer>
            </form>
            <GridContainer>
              {
                files
                && files.length > 0
                && <GridItem xs={12} sm={12} lg={12}>
                  <Table
                    tableHead={[
                      "Nombre del recurso",
                      "Tipo",
                      "Acciones"
                    ]}
                    tableData={files.map(x => ([
                      x.name, x.tipo,
                      <Button
                        color="danger"
                        className={classes.actionButton}
                        onClick={() => { filesHandlers.remove(x.key) }}
                      >
                        <Close className={classes.icon} />
                      </Button>
                    ]))}
                    customCellClasses={[classes.center, classes.right, classes.right]}
                    customClassesForCells={[0, 4, 5]}
                    customHeadCellClasses={[
                      classes.center,
                      classes.right,
                      classes.right
                    ]}
                    customHeadClassesForCells={[0, 4, 5]}
                  />
                </GridItem>
              }
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Form;


// {
//   NombrePractica: "",
//   descripcion: "",
//   Autores: [1,2,3],
//   TiempoEstimado: 0,
//   Competencia: "",
//   CriterioCompetencia: "",
//   Objetivo: "",
//   Equipos: [
//     {
//       equipo: 1,
//       cantidad: "",
//     }
//   ],
//   Simuladores: [
//     {
//       simulador: 1,
//       cantidad: "",
//     }
//   ],
//   Insumos: [
//     {
//       insumo: 1,
//       cantidad: "",
//     }
//   ],
//   Adjuntos: {
//     Evaluacion: {
//       fileName: "",
//       url: "",
//       tipo: "",
//     },
//     Recursos: [
//       {
//         fileName: "",
//         url: "",
//         tipo: "",
//       }
//     ]
//   }
// }