import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

export default function Permissions() {
  const [data, setData] = React.useState(
    dataTable.dataRows.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3]
      };
    })
  );
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="danger" icon>
            <CardIcon color="danger">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Permisos</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={data}
              filterable
              columns={[
                {
                  Header: "Nombre vista",
                  accessor: "name"
                },
                {
                  Header: "Nombre link",
                  accessor: "position"
                },
                {
                  Header: "Controlador",
                  accessor: "office"
                },
                {
                  Header: "Icono",
                  accessor: "age"
                },
                {
                  Header: "Menu",
                  accessor: "age"
                },
                {
                  Header: "Fecha de creación",
                  headerStyle: { textAlign: "left" },
                  accessor: "age"
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
