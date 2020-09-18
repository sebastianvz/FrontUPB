import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from "axios";
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

import GlobalVariables from "../../../variables/globalVariables.js";

import { useAlerta, Watchful, Table } from 'components/Shared';
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

const useStylesAlerts = makeStyles(stylesForAlerts);
const useStyles = makeStyles(styles);

const Practices = ({
	token,
	userId,
	history,
	setID
}) => {
	const [modal, setModal] = React.useState(null);
	const [checkboxState, setCheckboxState] = useState([]);
	const { Alerta, alerta } = useAlerta();
	let arrayIdPermits = [];

	const handleChange = name => event => {
		if (!event.target.checked) {
			for (let i = 0; i < arrayIdPermits.length; i++) {
				if (arrayIdPermits[i].id == event.target.value) {
					arrayIdPermits.splice(i, 1);
				}
			}
		} else {
			arrayIdPermits.push({ id: event.target.value });
		}
		setCheckboxState([...checkboxState, arrayIdPermits]);
	};

	const inputAlert = () => {
		history.push("/practica");
	};
	const responseConfirmAlertNext = e => {
		arrayIdPermits = [];
		setModal(e);
		setTimeout(() => {
			setModal(
				<SweetAlert
					style={{ display: "block", marginTop: "-100px" }}
					onConfirm={() => hideAlert()}
					onCancel={() => hideAlert()}
					confirmBtnCssClass={
						classesAlerts.button + " " + classesAlerts.default
					}
					title={
						<p>
							Nombre de la parctica: <b>{e}</b>
						</p>
					}
				/>
			);
		}, 200);
	};

	const hideAlert = () => {
		arrayIdPermits = [];
		setModal(null);
	};

	const [data, setData] = React.useState([]);

	let liableID = userId;//JSON.parse(localStorage.getItem("id"));
	let auth = token;	//localStorage.getItem("auth");

	const loadGrid = () => {
		const URL = baseUrl + "Practics";
		axios
			.get(URL, {
				headers: {
					Authorization: "Bearer " + auth
				}
			})
			.then(function (response) {
				const resultActive = response.data.data.filter(x => x.activo === true);
				setData(
					resultActive.map((prop, key) => {
						return {
							id: key,
							nombrePractica: prop.nombrePractica,
							descripcion: prop.descripcion,
							tiempoEstimado: prop.tiempoEstimado,
							competencia: prop.competencia,
							criteriosCompetencia: prop.criteriosCompetencia,
							obejtivo: prop.obejtivo,
							actions: (
								// we've added some custom button actions
								<div className="actions-right">
									{/* use this button to add a edit kind of action */}
									<Watchful
										action={PERMISSIONS.edit}
										menu="Practicas"
									>
										<Button
											justIcon
											round
											simple
											onClick={() =>
												setID(prop.id, () =>
													history.push(`/practica`)
												)
											}
											color="warning"
											className="edit"
										>
											<Create />
										</Button>
									</Watchful>{" "}
									{/* use this button to remove the data row */}
									<Watchful
										action={PERMISSIONS.delete}
										menu="Practicas"
									>
										<Button
											justIcon
											round
											simple
											onClick={() => {
												const URL_DeleteUser = baseUrl + "Practics";
												const obj = {
													id: prop.id,
													idUserSender: liableID
												};
												axios
													.delete(URL_DeleteUser, {
														headers: {
															"Content-Type": "application/json",
															Authorization: "Bearer " + auth
														},
														data: obj
													})
													.then(response => {
														loadGrid();
														responseConfirmAlertNext(
															response.data.data.error.message
														);
														hideAlert();
													})
													.catch(function (error) {
														console.log(error);
														responseConfirmAlertNext(
															error.data.data.error.message
														);
														hideAlert();
														return;
													});
											}}
											color="danger"
											className="remove"
										>
											<Close />
										</Button>{" "}
									</Watchful>
								</div>
							)
						};
					})
				);
				alerta.hide();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		loadGrid();
		alerta.show('Cargando Información...', {
			loading: true,
		});
	}, []);

	const classesAlerts = useStylesAlerts();
	const classes = useStyles();
	return (
		<div>
			{Alerta}
			{modal}
			<GridContainer>
				<GridItem xs={12}>
					<Card>
						<CardHeader color="danger" icon>
							<CardIcon color="danger">
								<SettingsApplications />
							</CardIcon>
							<h4 className={classes.cardIconTitle}>Prácticas</h4>
							<br />
							<Watchful
								action={PERMISSIONS.add}
								menu="Practicas">
								<Button onClick={inputAlert}>
									<Add
										style={{
											marginTop: 0 + "px",
											marginLeft: 0 + "px",
											marginRight: 7 + "px",
											marginBottom: 2 + "px"
										}}
									/>
								Agregar Práctica
							</Button>
							</Watchful>
						</CardHeader>
						<CardBody>
							<Table
								data={data}
								loadTable={loadGrid}
								columns={[
									{
										Header: "Nombre",
										accessor: "nombrePractica"
									},
									{
										Header: "Descripción",
										accessor: "descripcion"
									},
									{
										Header: "Tiempo Estimado",
										accessor: "tiempoEstimado"
									},
									{
										Header: "Competencia",
										accessor: "competencia"
									},
									{
										Header: "Criterios de Competencia",
										accessor: "criteriosCompetencia"
									},
									{
										Header: "Objetivo",
										accessor: "obejtivo"
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
	token: state.auth.token,
	userId: state.auth.user.id,
}), mapDispatch = dispatch => ({
	setID: (id, onSucced) => dispatch.practices.setID({ id, onSucced }),
});

export default connect(mapState, mapDispatch)(Practices);