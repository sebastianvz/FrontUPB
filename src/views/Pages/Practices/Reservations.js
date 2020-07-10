import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moement from 'moment';
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";


// core components
import GridContainer from "components/core/Grid/GridContainer.js";
import GridItem from "components/core/Grid/GridItem.js";
import Button from "components/core/CustomButtons/Button.js";
import Card from "components/core/Card/Card.js";
import CardText from "components/core/Card/CardText.js";
import CardBody from "components/core/Card/CardBody.js";
import CardIcon from "components/core/Card/CardIcon.js";
import CardHeader from "components/core/Card/CardHeader.js";
import CustomInput from "components/core/CustomInput/CustomInput.js";

//shared Components
import { ComboBox } from "components/Shared";

import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import GlobalVariables from "../../../variables/globalVariables.js";
import { useCRUD } from '../../../components/Reservations';
import { useAlerta } from 'components/Shared';
import { Autocomplete } from '../../../components/Shared';

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
const ROLES = {
	admin: 'SUPER-ADMIN',
	laboratorio: 'Laboratorio1',
};
const INVALID_VALUES = [null, '', '-1', -1, undefined];
const ESTADO_RESERVA = {
	abierta: 1,
	aprobada: 2,
	rechazada: 3,
	modificada: 4,
	cerrada: 5,
};
const REQUIRED_FIELDS = [
	'idPractica',
	'cantidadEstaciones',
	'cantidadEstudiantes',
	'fechaInicio',
	'fechaFin',
];

const ChangerState = ({ onSaved }) => {
	const { Alerta, alerta } = useAlerta();
	const handlers = {
		accept() {
			onSaved({
				idEstado: ESTADO_RESERVA.aprobada,
				description: '',
			});
		},
		refuse() {
			alerta.show('Motivo por el cual se rechaza la reserva', {
				validationMsg: "El campo es obligatorio",
				input: true,
				confirmBtnText: "Confirmar",
				required: true,
				confirm: (e) => {
					onSaved({
						idEstado: ESTADO_RESERVA.rechazada,
						description: e,
					});
				},
				cancel: () => { }
			})
		},
	};
	return (
		<GridContainer>
			{Alerta}
			<GridItem xs={12} sm={12} lg={12}>
				<div style={{ 'textAlign': 'center' }}>
					<Button
						color="primary"
						onClick={handlers.refuse}
					>Rechazar</Button>
					<Button
						color="danger"
						onClick={handlers.accept}
					>Aprobar</Button>
				</div>
			</GridItem>
		</GridContainer>
	);
};
ChangerState.propTypes = {

};

const Form = ({
	data,
	onSave = () => { },
	practicesList,
	onCancel,
	userId,
	role,
}) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});

	const classes = useStyles();
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
				debugger;
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
					type: 'danger',
					confirm: () => {},
				});
				return;
			}

			onSave(values);
		}
	}
	return (
		<GridItem xs={12} sm={12} md={12}>
			{Alerta}
			<form>
				<GridContainer style={{ padding: '13px 0px 0px 0px' }}>
					<GridItem xs={12} sm={12} lg={12}>
						<InputLabel
							htmlFor="multiple-select"
							className={classes.selectLabel}
							style={{ fontSize: '13px' }}
						>
							Prácticas
						</InputLabel>
					</GridItem>
					<GridItem xs={12} sm={12} lg={12}>
						<Autocomplete
							name="idPractica"
							minFilter={3}
							suggestions={practicesList.map(e => ({
								id: e.key,
								name: e.label,
							}))}
							defaultValue={values.idPractica}
							onChange={handlers.change}
						/>
					</GridItem>
				</GridContainer>
				{/* <GridContainer>
					<ComboBox
						id="idPractica"
						name="idPractica"
						label="Prácticas"
						value={values.idPractica}
						onChange={handlers.change}
						error={errors.idPractica}
						style={{ margin: 8 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
						width={{
							xs: 12,
							sm: 12,
							lg: 12,
						}}
						data={practicesList}
					/>
				</GridContainer> */}
				<GridContainer>
					<GridItem xs={12} sm={6} lg={6}>
						<TextField
							id="cantidadEstaciones"
							label="Cantidad de Estaciones"
							name="cantidadEstaciones"
							type="number"
							value={values.cantidadEstaciones}
							onChange={handlers.change}
							error={errors.cantidadEstaciones}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={6} lg={6}>
						<TextField
							id="cantidadEstudiantes"
							label="Cantidad de Estudiantes"
							name="cantidadEstudiantes"
							type="number"
							value={values.cantidadEstudiantes}
							onChange={handlers.change}
							error={errors.cantidadEstudiantes}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={6} lg={6}>
						<TextField
							id="fechaInicio"
							name="fechaInicio"
							label="Fecha de Inicio"
							type="datetime-local"
							value={values.fechaInicio}
							onChange={handlers.change}
							error={errors.fechaInicio}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={6} lg={6}>
						<TextField
							id="fechaFin"
							name="fechaFin"
							label="Fecha de Inicio"
							type="datetime-local"
							value={values.fechaFin}
							onChange={handlers.change}
							error={errors.fechaFin}
							style={{ margin: 8 }}
							fullWidth
							margin="dense"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={12} lg={12}>
						<TextField
							id="observaciones"
							name="observaciones"
							label="Observaciones"
							multiline
							value={values.observaciones}
							onChange={handlers.change}
							error={errors.observaciones}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							rowsMax={3}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<div style={{ 'textAlign': 'right' }}>
							<Button
								color="primary"
								onClick={onCancel}
							>Cancelar</Button>
							<Button
								color="danger"
								onClick={handlers.save}
							>Guardar</Button>
						</div>
					</GridItem>
				</GridContainer>
			</form>
		</GridItem>
	);
};

Form.propTypes = {
	data: PropTypes.object,
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	practicesList: PropTypes.array,
};

const AsociateToPractice = ({
	token,
	userId,
	role,
	history,
	programsList,
	semestersList,
	getSemesters,
	practicesList,
}) => {
	const [program, setProgram] = useState();
	const [semester, setSemester] = useState();
	const [reservationsList, setReservationsList] = useState();
	const [showForm, setShowForm] = useState(false);
	const [current, setCurrent] = useState();

	const CRUD = useCRUD();
	const { Alerta, alerta } = useAlerta();

	useEffect(() => {
		alerta.show('Cargando información...', {
			loading: true,
		});
		CRUD.loadList(() => {
			alerta.hide();
		});
	}, []);
	useEffect(() => { setReservationsList(null) }, [program, semester]);

	const Actions = ({ item }) => {
		switch (item.idEstado) {
			case ESTADO_RESERVA.abierta:
				return role === ROLES.laboratorio
					&& item.idUsuario === userId
					? <>
						<Button
							justIcon
							round
							simple
							onClick={() => handlers.edit({
								...item,
								idEstado: ESTADO_RESERVA.abierta
							})}
							color="warning"
							className="edit"
						>
							<Create />
						</Button>&nbsp;
						<Button
							justIcon
							round
							simple
							onClick={() => handlers.delete(item)}
							color="danger"
							className="remove"
						>
							<Delete />
						</Button>
					</>
					: role === ROLES.admin
					&& (item.idAprobador == null || item.idAprobador === userId)
					&& <Button
						justIcon
						round
						simple
						onClick={() => handlers.showAcceprOrRefuse(item)}
						color="warning"
						className="edit"
					>
						<SettingsApplications />
					</Button>
			case ESTADO_RESERVA.aprobada:
				return item.idUsuario === userId
					&& <Button
						justIcon
						round
						simple
						onClick={() => handlers.showChangerState(item, ESTADO_RESERVA.cerrada)}
						color="danger"
						className="remove"
					>
						<Close />
					</Button>
			case ESTADO_RESERVA.rechazada:
				return item.idUsuario === userId
					&& <Button
						justIcon
						round
						simple
						onClick={() => handlers.edit({
							...item,
							idEstado: ESTADO_RESERVA.abierta
						})}
						color="warning"
						className="edit"
					>
						<Create />
					</Button>
			default:
				return '';
		};
	};

	const handlers = {
		changeProgrm(e) {
			setProgram(e.target.value);
			if (INVALID_VALUES.indexOf(e.target.value) === -1) {
				getSemesters(e.target.value);
			}
		},
		changeSemester: (e) => {
			setSemester(e.target.value);
			if (INVALID_VALUES.indexOf(e.target.value) === -1) {
				alerta.show('Cargando información...', {
					loading: true,
				});
				CRUD.list(e.target.value, (x) => {
					handlers.fillData(x);
					alerta.hide();
				});
				CRUD.loadPracticesList(e.target.value);
			}
		},
		changeState: (item, onSucced, idSemester) => {
			idSemester = idSemester || semester;
			onSucced && onSucced();

			alerta.show('Cargando información...', {
				loading: true,
			});
			CRUD.changeState(item, () => {
				CRUD.list(idSemester, (x) => {
					handlers.fillData(x);
					handlers.hideForm();
					alerta.hide();
				});
			})
		},
		showAcceprOrRefuse(current) {
			const _userId = userId;
			alerta.show(<ChangerState
				onSaved={(item) => {
					handlers.changeState({
						...current,
						...item,
						idAprobador: _userId,
					}, alerta.hide);
				}}
			/>)
		},
		showChangerState(item, newEstado) {
			alerta.show('Motivo por el cual se cierra ra reserva', {
				validationMsg: "El campo es obligatorio",
				input: true,
				showCancel: true,
				confirmBtnText: "Confirmar",
				required: true,
				confirm: (e) => {
					handlers.changeState({
						...item,
						idEstado: newEstado,
						description: e,
					});
				}
			})
		},
		delete(item) {
			const idSemester = semester;
			alerta.show('¿Esta Seguro de que quiere eliminar el registro?', {
				showCancel: true,
				cancelBtnText: "No",
				confirmBtnText: "Sí",
				confirm: () => {
					CRUD.remove(item.id, () => {
						CRUD.list(semester, (x) => {
							handlers.fillData(x);
							alerta.hide();
						});
					});
				},
				cancel: alert.hide
			})
		},
		edit(item) {
			setCurrent(item);
			handlers.showForm();
		},
		fillData: ({ data = [] }) =>
			data && setReservationsList(data.map(e => ({
				id: e.id,
				nombreEstado: e.nombreEstado,
				nombrePractica: e.nombrePractica,
				cantidadEstaciones: e.cantidadEstaciones,
				cantidadEstudiantes: e.cantidadEstudiantes,
				fechaInicio: moement(e.fechaInicio).format("DD-MM-YYYY HH:mm"),
				fechaFin: moement(e.fechaFin).format("DD-MM-YYYY HH:mm"),
				observaciones: e.observaciones,
				actions: <Actions item={e} />
			}))),
		hideForm() {
			setShowForm(false);
		},
		save(values) {
			alerta.show('Almacenando Información...', {
				loading: true,
			});
			CRUD.save({
				idProgramaSemestre: semester,
				idUsuario: userId,
				idEstado: 1,
				...values,
			}, () => {
				CRUD.list(semester, (x) => {
					handlers.fillData(x);
					alerta.hide();
					handlers.hideForm();
				});
			});
		},
		showForm() {
			setShowForm(true);
		},
	}

	const classesAlerts = useStylesAlerts();
	const classes = useStyles();
	return (
		<div>
			{Alerta}
			<GridContainer>
				<GridItem xs={12}>
					<Card>
						<CardHeader color="danger" icon>
							<CardIcon color="danger">
								<SettingsApplications />
							</CardIcon>
							<h4 className={classes.cardIconTitle}>Gestión de reservas</h4>
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
							{showForm ? (
								<Form
									data={current}
									onSave={handlers.save}
									onCancel={handlers.hideForm}
									practicesList={practicesList}
								/>
							) : (reservationsList
								&& <>
									<GridItem xs={12} sm={12} md={12}>
										<div style={{ 'textAlign': 'right' }}>
											<Button
												color="danger"
												onClick={handlers.showForm}
											>Crear Reserva</Button>
										</div>
									</GridItem>
									<hr />
									<ReactTable
										data={reservationsList}
										filterable
										columns={[
											{
												Header: "Práctica",
												accessor: "nombrePractica"
											},
											{
												Header: "Estado",
												accessor: "nombreEstado"
											},
											{
												Header: "# Estaciones",
												accessor: "cantidadEstaciones"
											},
											{
												Header: "# Estudiantes",
												accessor: "cantidadEstudiantes"
											},
											{
												Header: "Inicio",
												accessor: "fechaInicio"
											},
											{
												Header: "Fin",
												accessor: "fechaFin"
											},
											{
												Header: "Observaciones",
												accessor: "observaciones"
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
								</>
								)}
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
	role: state.auth.user.role,
	programsList: state.masters.programs,
	semestersList: state.masters.semesters,
	practicesList: state.masters.practices,
}), mapDispatch = dispatch => ({
	getSemesters: programId => dispatch.masters.getSemestersByProgram({ programId }),
});

export default connect(mapState, mapDispatch)(AsociateToPractice);