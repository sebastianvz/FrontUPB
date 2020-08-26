import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
// react component for creating dynamic tables
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

import { useProgram } from 'components/Masters';
import { Watchful, Table } from 'components/Shared';
import { PERMISSIONS } from 'config/constants';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStylesAlerts = makeStyles(stylesForAlerts);
const useStyles = makeStyles(styles);

const Programs = ({ programList, programsCount }) => {
  const [alerta, setAlerta] = useState(null);
  const [data, setData] = useState([]);

  const CRUD = useProgram();

  const handlers = {
    cancel() {
      setAlerta('');
    },
    delete(item) {
      CRUD.remove(item, (e) => {
        CRUD.loadList();
        handlers.cancel();
      });
    },
    loadList() {
      setData(programList.map((e, key) => ({
        key: key,
        name: e.nombrePrograma,
        actions:
          <div className="actions-right">
            <Watchful
              action={PERMISSIONS.edit}
              menu="Programas"
            >
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
            </Watchful>
            &nbsp;
            <Watchful
              action={PERMISSIONS.delete}
              menu="Programas"
            > <Button
              justIcon
              round
              simple
              onClick={() => handlers.delete(e)}
              color="danger"
              className="remove"
            >
                <Close />
              </Button>
            </Watchful>
          </div>
      })));
    },
    save(item) {
      CRUD.save(item, (e) => {
        CRUD.loadList();
        handlers.cancel();
      });
    },
    showModal: (item) => {
      setAlerta(
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          confirmBtnText="Guardar"
          cancelBtnText="Cancelar"
          title="Ingrese el nombre del programa"
          required
          validationMsg="Debe digitar el nombre del programa"
          defaultValue={item && item.nombrePrograma}
          onConfirm={name => handlers.save({ id: item.id, nombrePrograma: name })}
          onCancel={handlers.cancel}
          confirmBtnCssClass={
            classesAlerts.button + " " + classesAlerts.default
          }
          cancelBtnCssClass={
            classesAlerts.button + " " + classesAlerts.danger
          }
        >
        </SweetAlert>
      );
    }
  }

  useEffect(() => {
    if (programList && programList.length > 0) {
      handlers.loadList();
    }
  }, [programList]);

  useEffect(() => {
    CRUD.loadList();
  }, []);

  const classesAlerts = useStylesAlerts();
  const classes = useStyles();
  return (
    <div>
      {alerta}
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <SettingsApplications />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Programas</h4>
              <br />
              <Watchful
                action={PERMISSIONS.add}
                menu="Programas"
              >
                <Button onClick={handlers.showModal}>
                  <Add
                    style={{
                      marginTop: 0 + "px",
                      marginLeft: 0 + "px",
                      marginRight: 7 + "px",
                      marginBottom: 2 + "px"
                    }}
                  />
								Agregar Programa
							</Button>
              </Watchful>
            </CardHeader>
            <CardBody>
              <Table
                data={data}
                loadTable={CRUD.loadList}
                columns={[
                  {
                    Header: "Nombre",
                    accessor: "name"
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
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


const mapState = state => ({
  programList: state.masters.programs,
  programsCount: state.masters.programsCount,
}), mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Programs);