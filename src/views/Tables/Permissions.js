import React, {useState, useEffect} from "react";
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import {dataTable} from "variables/general.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";

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
				permmisionName: prop[1],
				description: prop[1],
				controller: prop[2],
				menu: prop[3],
				icon: prop[3],
				creationDate: prop[3]
			};
		})
	);

	let auth = localStorage.getItem("auth");

	useEffect(() => {
		const URL =
			"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Permission";
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
							permmisionName: prop.permmisionName,
							description: prop.description,
							controller: prop.controller,
							menu: prop.menu,
							icon: prop.icon,
							creationDate: prop.creationDate
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
									accessor: "permmisionName"
								},
								{
									Header: "Nombre link",
									accessor: "description"
								},
								{
									Header: "Controlador",
									accessor: "controller"
								},
								{
									Header: "Icono",
									accessor: "icon"
								},
								{
									Header: "Menu",
									accessor: "menu"
								},
								{
									Header: "Fecha de creación",
									headerStyle: {textAlign: "left"},
									accessor: "creationDate"
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
