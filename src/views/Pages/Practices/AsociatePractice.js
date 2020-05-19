import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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

//shared Components
import { ComboBox } from "components/Shared";

import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import GlobalVariables from "../../../variables/globalVariables.js";
import { useCRUD } from '../../../components/AsociatePractice';

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
const INVALID_VALUES = [null, '', '-1', -1, undefined];
let selectedPractices = [];

const AsociateToPractice = ({
	token,
	userId,
	history,
	programsList,
	semestersList,
	getSemesters
}) => {
	const [alerta, setAlerta] = useState();
	const [program, setProgram] = useState();
	const [semester, setSemester] = useState();
	const [practicesList, setPracticesList] = useState();

	const CRUD = useCRUD();

	useEffect(() => {
		CRUD.loadList();
	}, []);
	useEffect(() => { setPracticesList(null) }, [program, semester]);
	useEffect(() => {
		if (practicesList && practicesList.length > 0)
			selectedPractices = (practicesList
				.filter(e => e.asociated)
				.map(e => e.id));
		else
			selectedPractices = [];
	}, [practicesList]);

	const handlers = {
		changeAsociated: (event) =>
			selectedPractices = event.target.checked ?
				[...selectedPractices, event.target.value]
				: selectedPractices.filter(e => e != event.target.value),
		changeProgrm(e) {
			setProgram(e.target.value);
			if (INVALID_VALUES.indexOf(e.target.value) === -1) {
				getSemesters(e.target.value);
			}
		},
		changeSemester: (e) => {
			setSemester(e.target.value);
			if (INVALID_VALUES.indexOf(e.target.value) === -1) {
				CRUD.list(e.target.value, (x) => {
					handlers.fillData(x);
				});
			}
		},
		fillData: ({ data = [] }) =>
			data && setPracticesList(data.map(e => ({
				id: e.id,
				nombrePractica: e.nombrePractica,
				descripcion: e.descripcion,
				asociated: e.asociated,
				actions: (
					<div style={{ textAlign: 'right' }}>
						<Checkbox
							onChange={handlers.changeAsociated}
							value={e.id}
							defaultChecked={e.asociated}
						/>
					</div>
				)
			}))),
		save() {
			if (selectedPractices.length === 0) {
				alert.show('Selecione al menos un dato');
				return;
			}
			CRUD.save({
				id: semester,
				practicesId: selectedPractices
			}, () => { alert.show('Guardado Exitoso!!') });
		}
	}

	const alert = {
		show(message) {
			setAlerta(
				<SweetAlert
					style={{ display: "block", marginTop: "-100px" }}
					onConfirm={alert.hide}
					onCancel={alert.hide}
					confirmBtnCssClass={
						classesAlerts.button + " " + classesAlerts.default
					}
					title={
						<p>
							<b>{message}</b>
						</p>
					}
				/>
			);
		},
		hide() {
			setAlerta('');
		},
	}

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
							<h4 className={classes.cardIconTitle}>Asociar prácticas a semestre/curso</h4>
							<br />
						</CardHeader>
						<CardBody>
							<GridContainer>
								<ComboBox
									label="Programa"
									onChange={handlers.changeProgrm}
									value={program}
									data={programsList && programsList.map(e => ({
										key: e.id,
										label: e.nombrePrograma
									}))}
								/>
								<ComboBox
									label="Semestre/curso"
									onChange={handlers.changeSemester}
									value={semester}
									data={semestersList && semestersList.map(e => ({
										key: e.id,
										label: e.nombreSemestre
									}))}
								/>
							</GridContainer>
							<hr />
							{practicesList
								&& <>
									<ReactTable
										data={practicesList}
										filterable
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
									<GridItem xs={12} sm={12} md={12}>
										<div style={{ 'textAlign': 'right' }}>
											<Button
												color="danger"
												onClick={handlers.save}
											>Guardar</Button>
										</div>
									</GridItem>
								</>
							}
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div >
	);
}


const mapState = state => ({
	token: state.auth.token,
	userId: state.auth.user.id,
	programsList: state.masters.programs,
	semestersList: state.masters.semesters,
}), mapDispatch = dispatch => ({
	getSemesters: programId => dispatch.masters.getSemestersByProgram({ programId }),
});

export default connect(mapState, mapDispatch)(AsociateToPractice);