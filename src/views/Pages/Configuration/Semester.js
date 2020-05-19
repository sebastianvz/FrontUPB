import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/core/Grid/GridContainer.js";
import GridItem from "components/core/Grid/GridItem.js";
import Button from "components/core/CustomButtons/Button.js";
import Card from "components/core/Card/Card.js";
import CardBody from "components/core/Card/CardBody.js";
import CardIcon from "components/core/Card/CardIcon.js";
import CardHeader from "components/core/Card/CardHeader.js";

import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import { useSemester } from 'components/Masters';

import { useAlerta } from 'components/Shared';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStylesAlerts = makeStyles(stylesForAlerts);
const useStyles = makeStyles(styles);
let selectedPrograms = [];

const Semester = ({ list, programList }) => {
  const [form, setForm] = useState(null);
  const [data, setData] = useState([]);

  const CRUD = useSemester();
  const { Alerta, alerta } = useAlerta();
  const handlers = {
    cancel() {
      setForm('');
    },
    change: (event) =>
      selectedPrograms = event.target.checked ?
        [...selectedPrograms, event.target.value]
        : selectedPrograms.filter(e => e != event.target.value),
    delete(item) {
      CRUD.remove(item, (e) => {
        CRUD.loadList();
        handlers.cancel();
      });
    },
    loadList() {
      setData(list.map((e, key) => ({
        key: key,
        name: e.nombreSemestre,
        programs: e.programs && e.programs.map(x => x.nombrePrograma).join(', '),
        actions:
          <div className="actions-right">
            <Button
              justIcon
              round
              simple
              onClick={() => handlers.showModal(e)}
              color="warning"
              className="edit"
            >
              <Create />
            </Button>
            &nbsp;
            <Button
              justIcon
              round
              simple
              onClick={() => handlers.delete(e)}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>
          </div>
      })));
      alerta.hide();
    },
    save(item) {
      if (selectedPrograms.length === 0) {
        alerta.show('Selecione al menos un dato');        
        return;
      }
      CRUD.save({
        ...item,
        programs: selectedPrograms.map(x => ({ id: x }))
      }, (e) => {
        CRUD.loadList();
        handlers.cancel();
        alerta.show('Información almacenada correctamente');        
      });
    },
    showModal: (item) => {
      if (item.programs && item.programs.length > 0) {
        selectedPrograms = item.programs.map(e => e.id);
      }
      setForm(
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          confirmBtnText="Guardar"
          cancelBtnText="Cancelar"
          title="Ingrese el nombre del programa"
          required
          validationMsg="Debe digitar el nombre del Semestre/Curso"
          defaultValue={item && item.nombreSemestre}
          onConfirm={name => handlers.save({ id: item.id, nombreSemestre: name })}
          onCancel={handlers.cancel}
          confirmBtnCssClass={
            classesAlerts.button + " " + classesAlerts.default
          }
          cancelBtnCssClass={
            classesAlerts.button + " " + classesAlerts.danger
          }
        >
          {
            programList && programList.map(x => (
              <FormControlLabel
                key={x.id}
                control={
                  <Checkbox
                    onChange={handlers.change}
                    value={x.id}
                    defaultChecked={item.programs
                      && item.programs.find(e => e.id === x.id)}
                  />
                }
                label={x.nombrePrograma}
              />
            ))
          }
        </SweetAlert>
      );
    }
  }

  useEffect(() => {
    if (list && list.length > 0) {
      handlers.loadList();
    }
  }, [list]);

  useEffect(() => {
    CRUD.loadList();
    alerta.show('Cargando Información');
  }, []);

  const classesAlerts = useStylesAlerts();
  const classes = useStyles();
  return (
    <div>
      {Alerta}
      {form}
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <SettingsApplications />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Semestre/Curso</h4>
              <br />
              <Button onClick={handlers.showModal}>
                <Add
                  style={{
                    marginTop: 0 + "px",
                    marginLeft: 0 + "px",
                    marginRight: 7 + "px",
                    marginBottom: 2 + "px"
                  }}
                />
								Agregar Semestre/Curso
							</Button>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
                filterable
                columns={[
                  {
                    Header: "Nombre",
                    accessor: "name"
                  },
                  {
                    Header: "Programas",
                    accessor: "programs",
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
  list: state.masters.semesters,
  programList: state.masters.programs,
}), mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Semester);