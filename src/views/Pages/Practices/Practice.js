import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons

import Close from "@material-ui/icons/Close";
import Plus from "@material-ui/icons/Add";

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

import { useCRUD } from '../../../components/Practices';

import styles from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { Autocomplete } from '../../../components/Shared';
import { useAlerta } from 'components/Shared';

const useStyles = makeStyles(styles);

const FormObjetives = ({
	setData,
	data,
	disabledPractice,
}) => {
	const [objetivo, setObjetivo] = useState("");
	const [disabledButton, setDisabledButton] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		setDisabledButton(false);
	}, [data])

	const handlres = {
		changeObjetivo: (e) => {
			setObjetivo(e.target.value);
		},
		add: () => {
			if (objetivo.length === 0) return;
			setData([{
				id: data.length,
				name: objetivo,
			},
			...data
			]);
			setObjetivo('');
		},
		remove: id => {
			setData(data.filter(x => x.id !== id));
		}
	};

	return (
		<GridItem xs={12} sm={12} md={12}>
			<Card>
				<CardHeader color="danger" icon>
					<CardIcon color="danger">
						<i class="material-icons">track_changes</i>
					</CardIcon>
					<h4 className={classes.cardIconTitle}>Objetivos</h4>
				</CardHeader>
				<CardBody>
					{!disabledPractice &&
						<form id='form-header'>
							<GridContainer>
								<GridItem xs={12} sm={10} lg={10}>
									<GridContainer>
										<CustomInput
											labelText={"Objetivo"}
											id={"Objetivo"}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												onChange: handlres.changeObjetivo,
												value: objetivo,
												multiline: true,
												disabled: disabledPractice,
												rows: "3"
											}}
										/>
									</GridContainer>
								</GridItem>
								<GridItem xs={12} sm={2} lg={2}>
									{!disabledPractice && <Button
										color="info"
										className={classes.actionButton}
										disabled={disabledButton}
										onClick={() => { setDisabledButton(true); handlres.add(); }}
									>
										<Plus className={classes.icon} />
									</Button>}
								</GridItem>
							</GridContainer>
						</form>
					}
					<GridContainer>
						{
							data
							&& data.length > 0
							&& <GridItem xs={12} sm={12} lg={12}>
								<Table
									tableHead={["Objetivo", "acciones"]}
									tableData={data.map(x => [
										x.name,
										<Button
											color="danger"
											className={classes.actionButton}
											disabled={disabledPractice}
											onClick={() => { handlres.remove(x.id) }}
										>
											<Close className={classes.icon} />
										</Button>
									])}
									customCellClasses={[classes.center, classes.right]}
									customClassesForCells={[0, 4, 5]}
									customHeadCellClasses={[
										classes.center,
										classes.left,
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

FormObjetives.propTypes = {
	setData: PropTypes.func,
	data: PropTypes.array,
	disabledPractice: PropTypes.bool,
}

const FormDetails = ({
	title,
	labelList,
	list,
	setData,
	data,
	icon,
	disabledPractice
}) => {
	const [listValue, setListValue] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [disponible, setDisponibilidad] = useState(0);

	const classes = useStyles();

	const handlres = {
		changeListValue(e) {
			setListValue(e);
		},
		changeQuantity: (e) => {
			if (parseInt(e.target.value) < 0)
				setQuantity(0);
			else
				setQuantity(e.target.value);
		},
		changeDisponibilidad: (e) => {
			setDisponibilidad(e.target.value)
		},
		add: () => {
			if (listValue == null || listValue == '') return;
			setData([{
				id: listValue,
				name: (list.find(x => x.id === listValue) || { name: '' }).name,
				cantidad: quantity,
				disponibilidad: disponible,
			},
			...data
			]);
			setListValue(null);
			setQuantity('');
		},
		remove: id => {
			setData(data.filter(x => x.id !== id));
		}
	};

	return (
		<GridItem xs={12} sm={12} md={12}>
			<Card>
				<CardHeader color="danger" icon>
					<CardIcon color="danger">
						<i class="material-icons">{icon}</i>
					</CardIcon>
					<h4 className={classes.cardIconTitle}>{title}</h4>
				</CardHeader>
				<CardBody>
					{!disabledPractice &&
						<form id='form-header'>
							<GridContainer>
								<GridItem xs={12} sm={4} lg={4}>
									<GridContainer style={{ padding: '13px 0px 0px 0px' }}>
										<GridItem xs={12} sm={12} lg={12}>
											<InputLabel
												htmlFor="multiple-select"
												className={classes.selectLabel}
												style={{ fontSize: '13px' }}
											>
												{labelList}
											</InputLabel>
										</GridItem>
										<GridItem xs={12} sm={12} lg={12}>
											{list && <Autocomplete
												minFilter={3}
												suggestions={list}
												defaultValue={listValue}
												onChange={handlres.changeListValue}
											/>}
										</GridItem>
									</GridContainer>
									{/* <Select
										MenuProps={{
											className: classes.selectLabel
										}}
										classes={{
											select: classes.Select
										}}
										value={listValue}
										onChange={handlres.changeListValue}
										formControlProps={{
											fullWidth: false
										}}
										inputProps={{
											name: labelList,
											id: labelList,
										}}
										style={{ 'maxWidth': '100%' }}
									>
										{list && list.map(x => (
											<MenuItem
												classes={{
													root: classes.selectMenuItem,
													selected: classes.selectMenuItemSelected
												}}
												value={x.id}
											>
												{x.name}
											</MenuItem>
										))}
									</Select> */}
								</GridItem>
								<GridItem xs={12} sm={3} lg={3}>
									<CustomInput
										labelText="Cantidad"
										id="Cantidad"
										disable={disabledPractice}
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: handlres.changeQuantity,
											type: "number",
											disabled: disabledPractice,
											value: quantity,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={3} lg={3}>
									<GridContainer>
										<FormControl
											fullWidth
											className={classes.selectFormControl}
											style={{ paddingTop: '11px' }}
										>
											<InputLabel
												htmlFor="multiple-select"
												className={classes.selectLabel}
												style={{ paddingTop: '18px' }}
											>
												Sujeto a disponibilidad
                        </InputLabel>
											<Select
												disabled={disabledPractice}
												MenuProps={{
													className: classes.selectLabel
												}}
												classes={{
													select: classes.Select
												}}
												value={disponible}
												onChange={handlres.changeDisponibilidad}
												formControlProps={{
													fullWidth: false
												}}
												inputProps={{
													name: 'disponibilidad',
													id: 'disponibilidad',
												}}
												style={{ 'maxWidth': '100%' }}
											>
												{[
													{ id: 1, name: 'Si' },
													{ id: 0, name: 'No' }
												].map(x => (
													<MenuItem
														classes={{
															root: classes.selectMenuItem,
															selected: classes.selectMenuItemSelected
														}}
														value={x.id}
													>
														{x.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</GridContainer>
								</GridItem>
								<GridItem xs={12} sm={2} lg={2}>
									<Button
										color="info"
										disabled={disabledPractice}
										className={classes.actionButton}
										onClick={handlres.add}
									>
										<Plus className={classes.icon} />
									</Button>
								</GridItem>
							</GridContainer>
						</form>
					}
					<GridContainer>
						{
							data
							&& data.length > 0
							&& <GridItem xs={12} sm={12} lg={12}>
								<Table
									tableHead={[
										labelList,
										"Cantidad",
										"Disponibilidad",
										"Acciones"
									]}
									tableData={data.map(x => [
										x.name,
										x.cantidad,
										x.disponibilidad == 1 ? 'Si' : 'No',
										<Button
											color="danger"
											disabled={disabledPractice}
											className={classes.actionButton}
											onClick={() => { handlres.remove(x.id) }}
										>
											<Close className={classes.icon} />
										</Button>
									])}
									customCellClasses={[classes.center, classes.right, classes.right, classes.left]}
									customClassesForCells={[0, 4, 5]}
									customHeadCellClasses={[
										classes.center,
										classes.left,
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
	list: PropTypes.array,
	setData: PropTypes.func,
	data: PropTypes.array,
	hideAutocomplete: PropTypes.bool,
	icon: PropTypes.string,
	disabledPractice: PropTypes.bool,
}

const REQUIRED_FIELDS = [
	'autores',
	'nombrePractica',
	'descripcion',
	'tiempoEstimado',
	'competencia',
	'competencia',
	'criteriosCompetencia',
	'obejtivo',
];

const useStylesAlerts = makeStyles(stylesForAlerts);

const Form = ({
	devicesList,
	suppliestList,
	simulatorsList,
	autorsList,
	history,
	userId,
	practiceID,
	disabledPractice,
	datos
}) => {
	const [files, setFiles] = useState([]);
	const [evaluationFile, setEvaluationFile] = useState(null);
	const [_ID, setID] = useState(0);
	const [equipos, setEquipos] = useState([]);
	const [simuladores, setSimuladores] = useState([]);
	const [insumos, setInsumos] = useState([]);
	const [objetivos, setObjetivos] = useState([]);
	const [autors, setAutors] = useState([]);
	const [errors, setErrors] = useState({});
	const [tiempoEstimadoState, setTiempoEstimadoState] = useState(null);

	const refHeaderForm = useRef();
	const refObservationForm = useRef();
	const CRUD = useCRUD();
	const { Alerta, alerta } = useAlerta();
	const classes = useStyles();
	const classesAlerts = useStylesAlerts();

	useEffect(() => {
		CRUD.loadList();
		alerta.show('Cargando información');
	}, []);

	useEffect(() => {
		if (disabledPractice && typeof (datos) === 'object' && datos.hasOwnProperty('id')) {
			handlres.loadFields(datos);
		} else if (practiceID > 0) {
			CRUD.getById(practiceID, handlres.loadFields);
		} else {
			alerta.hide();
		}
	}, [autorsList]);

	const handlres = {
		save: (e) => {
			e.preventDefault();
			const headerForm = refHeaderForm.current;
			const ObonForm = refObservationForm.current;

			const data = {
				id: _ID,
				idUserSender: userId,
				activo: true,
				nombrePractica: headerForm.elements.nombrePractica.value,
				descripcion: headerForm.elements.descripcion.value,
				tiempoEstimado: tiempoEstimadoState,
				competencia: headerForm.elements.competencia.value,
				criteriosCompetencia: headerForm.elements.criteriosCompetencia.value,
				obejtivo: headerForm.elements.obejtivo.value,
				observaciones: ObonForm.elements.observaciones.value,
				autores: autors.length > 0 ? autors.map(e => ({ id: e })) : '',
				archivos: {
					evaluacion: [evaluationFile],
					recursos: files,
				},
				objetivos,
				equipos,
				insumos,
				simuladores,
			};

			let exit = false;
			const _errors = {};
			REQUIRED_FIELDS.forEach(name => {
				const item = headerForm.elements[name] || ObonForm.elements[name];
				if (data[name] == '') {
					_errors[name] = true;
					item.style = "background: #ffe4e4";
					exit = true;
				} else {
					_errors[name] = false;
					item.style = "background: none";
				}
			});

			if (exit) {
				setErrors(_errors);
				alerta.show("¡Hay campos sin llenar!");
				return;
			}

			setErrors({});

			CRUD.save(data, () => {
				history.push('/practicas');
			});
		},
		changeAutors: (e) => {
			console.log('e.target.value', e.target.value);
			setAutors(e.target.value)
		},
		changeTiempoEstimado: (e) => {
			if (parseInt(e.target.value) < 0)
				setTiempoEstimadoState(0);
			else
				setTiempoEstimadoState(e.target.value);
		},
		loadFields: (data) => {
			const headerForm = refHeaderForm.current;
			const ObonForm = refObservationForm.current;
			headerForm.elements.nombrePractica.value = data.nombrePractica;
			headerForm.elements.descripcion.value = data.descripcion
			setTiempoEstimadoState(data.tiempoEstimado);
			headerForm.elements.competencia.value = data.competencia;
			headerForm.elements.criteriosCompetencia.value = data.criteriosCompetencia;
			headerForm.elements.obejtivo.value = data.obejtivo;
			ObonForm.elements.observaciones.value = data.observaciones;
			setID(data.id);
			setFiles(data.archivos.recursos);
			setEvaluationFile((data.archivos.evaluacion || [null])[0]);
			setEquipos(data.equipos);
			setSimuladores(data.simuladores);
			setInsumos(data.insumos);
			setObjetivos(data.objetivos);
			if (data.autores.length > 0) {
				setAutors(data.autores.map(e => e.id));
			}
			alerta.hide();
		}
	};

	const filesHandlers = {
		remove: uid => {
			if (uid > 0) {
				CRUD.removeFile(uid, 'recurso', () => {
					setFiles(files.filter(x => x.uid === uid));
				});
				return;
			}
			setFiles(files.filter(x => x.uid === uid));
		},
		add: (data) => {
			if (data.attachment.uid == 0) {
				data.attachment.uid = files.length * -1;
			}
			setFiles([data.attachment, ...files]);
		},
	};

	return (
		<>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="danger" text>
							<CardText color="danger">
								<h4 className={classes.cardTitle}>Prácticas</h4>
							</CardText>
						</CardHeader>
						<CardBody>
							<form ref={refHeaderForm}>
								<GridContainer>
									<GridItem xs={12} sm={5} lg={2}>
										<FormLabel className={classes.labelHorizontal}>
											Nombre Práctica
                  </FormLabel>
									</GridItem>
									<GridItem xs={12} sm={7} lg={4}>
										<CustomInput
											id="nombrePractica"
											name="nombrePractica"
											error={errors.nombrePractica}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												disabled: disabledPractice,
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
											id="descripcion"
											name="descripcion"
											error={errors.descripcion}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												multiline: true,
												disabled: disabledPractice,
												rows: "3"
											}}
										/>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<GridItem xs={12} sm={6} lg={6}>
										<FormControl
											fullWidth
											className={classes.selectFormControl}
										>
											<InputLabel
												htmlFor="multiple-select"
												className={classes.selectLabel}
											>
												Autores
                        </InputLabel>
											<Select
												multiple
												error={errors.autors}
												value={autors}
												onChange={handlres.changeAutors}
												MenuProps={{ className: classes.selectMenu }}
												classes={{ select: classes.select }}
												inputProps={{
													name: "autores",
													id: "autores",
													disabled: disabledPractice,
												}}
											>
												{autorsList && autorsList.map(x => (
													<MenuItem
														classes={{
															root: classes.selectMenuItem,
															selected: classes.selectMenuItemSelectedMultiple
														}}
														value={x.id}
													>
														{x.showFullName}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</GridItem>
									<GridItem xs={12} sm={5} lg={2}>
										<FormLabel className={classes.labelHorizontal}>
											Tiempo Estimado
                  </FormLabel>
									</GridItem>
									<GridItem xs={12} sm={7} lg={4}>
										<CustomInput
											id="tiempoEstimado"
											name="tiempoEstimado"
											error={errors.tiempoEstimado}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												placeholder: "Minutos",
												type: "number",
												value: tiempoEstimadoState,
												onChange: handlres.changeTiempoEstimado,
												disabled: disabledPractice,
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
											name="competencia"
											error={errors.competencia}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												disabled: disabledPractice,
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
											id="criteriosCompetencia"
											name="criteriosCompetencia"
											error={errors.criteriosCompetencia}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												disabled: disabledPractice,
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
											id="obejtivo"
											name="obejtivo"
											error={errors.obejtivo}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												multiline: true,
												disabled: disabledPractice,
												rows: "3"
											}}
										/>
									</GridItem>
								</GridContainer>
							</form>
						</CardBody>
					</Card>
				</GridItem>
				<FormObjetives
					setData={setObjetivos}
					data={objetivos}
					disabledPractice={disabledPractice}
				/>
				<FormDetails
					setData={setSimuladores}
					title="Simuladores"
					labelList="Simulador"
					data={simuladores}
					list={simulatorsList}
					disabledPractice={disabledPractice}
					icon="airline_seat_flat_angled"
				/>
				<FormDetails
					title="Equipos"
					labelList="Equipo"
					setData={setEquipos}
					data={equipos}
					list={devicesList}
					disabledPractice={disabledPractice}
					icon="video_label"
				/>
				<FormDetails
					title="Insumos"
					labelList="Insumo"
					setData={setInsumos}
					data={insumos}
					list={suppliestList}
					disabledPractice={disabledPractice}
					icon="local_pharmacy"
				/>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="danger" icon>
							<CardIcon color="danger">
								<i class="material-icons">chrome_reader_mode</i>
							</CardIcon>
							<h4 className={classes.cardIconTitle}>Observaciones</h4>
						</CardHeader>
						<CardBody>
							<form ref={refObservationForm}>
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
											name="observaciones"
											error={errors.observaciones}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: "text",
												disabled: disabledPractice,
												multiline: true,
												rows: "3"
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
						<CardHeader color="danger" icon>
							<CardIcon color="danger">
								<i class="material-icons">attach_file</i>
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
										{!disabledPractice && <FileUpload
											defaultImage={null}
											id={'evaluacionFile'}
											onChange={({ attachment = null }) => setEvaluationFile(attachment)}
											multiple={false}
										/>}
									</GridItem>
									<GridItem xs={12} sm={6} lg={6}>
										{evaluationFile
											&& <>
												<a href={evaluationFile.url} download>{evaluationFile.name}</a>&nbsp;
												<a
													href="jabascript:void(0)"
													style={{ color: 'red', textDecoration: 'none' }}
													onClick={
														() => CRUD.removeFile(evaluationFile.uid, 'Evaluacion', () => {
															setEvaluationFile(null);
														})
													}>[Eliminar]</a>
											</>}
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
										{!disabledPractice && <FileUpload
											defaultImage={null}
											disable={disabledPractice}
											id={'recursosFile'}
											onChange={filesHandlers.add}
											multiple={false}
										/>}
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
												<a href={x.url} download>{x.name}</a>,
												x.extention,
												<Button
													color="danger"
													disabled={disabledPractice}
													className={classes.actionButton}
													onClick={() => { filesHandlers.remove(x.uid) }}
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
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						{!disabledPractice && <div style={{ 'textAlign': 'right' }}>
							<Button
								color="primary"
								onClick={() => history.goBack()}
							>Cancelar</Button>
							<Button
								color="danger"
								onClick={handlres.save}
							>Guardar</Button>
						</div>}
					</GridItem>
				</GridContainer>
			</GridContainer>
			{Alerta}
		</>
	);
};

const mapState = state => ({
	devicesList: state.masters.devices,
	suppliestList: state.masters.supplies,
	simulatorsList: state.masters.simulators,
	autorsList: state.masters.autors,
	userId: state.auth.user.id,
	practiceID: state.practices.data.id,
	datos: state.practices.data,
	disabledPractice: state.practices.disabled,
}),
	mapDispatch = dispatch => ({});

export default connect(
	mapState,
	mapDispatch,
)(Form);
