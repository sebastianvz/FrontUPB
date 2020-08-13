import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/core/Grid/GridContainer.js";
import GridItem from "components/core/Grid/GridItem.js";
import Card from "components/core/Card/Card.js";
import CardBody from "components/core/Card/CardBody.js";
import CardIcon from "components/core/Card/CardIcon.js";
import CardHeader from "components/core/Card/CardHeader.js";

import {dataTable} from "variables/general.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";

import GlobalVariables from "../../../variables/globalVariables.js";
import { Watchful } from 'components/Shared';
import { PERMISSIONS } from 'config/constants';

const variables = new GlobalVariables();
const baseUrl = variables.Url;

const styles = {
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	}
};

const useStyles = makeStyles(styles);

const Permissions = ({token}) => {
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

	let auth = token;

	useEffect(() => {
		const URL =baseUrl+"Permission";
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
									Header: "Menú",
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

const mapState = state => ({
	token: state.auth.token
}), mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Permissions);