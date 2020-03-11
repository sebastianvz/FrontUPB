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

import { Autocomplete } from '../../../components/Shared';

const useStyles = makeStyles(styles);

const FormDetails = ({
	title,
	labelList,
	list,
	setData,
	data,
	hideAutocomplete,
	hideQuantity,
	icon,
}) => {
	const [listValue, setListValue] = useState("");
	const [quantity, setQuantity] = useState(0);

	const classes = useStyles();

	const handlres = {
		changeListValue(e) {
			setListValue(e.target ? e.target.value : e);
		},
		changeQuantity: (e) => {
			setQuantity(e.target.value);
		},
		add: () => {
			setData([{
				id: data.length,
				label: list ? (list.find(x => x.id === listValue) || { name: '' }).name : listValue,
				cantidad: quantity
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
					<form id='form-header'>
						<GridContainer>
							<GridItem xs={12} sm={hideQuantity ? 10 : 5} lg={hideQuantity ? 10 : 5}>
								<GridContainer>
									{hideAutocomplete ?
										<CustomInput
											labelText={labelList}
											id={labelList}
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												onChange: handlres.changeListValue,
												value: listValue,
											}}
										/>
										:
										<>
											<GridItem xs={12} sm={12} lg={12}>
												<InputLabel
													htmlFor="multiple-select"
													className={classes.selectLabel}
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
										</>}

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
							{hideQuantity ? ''
								: <GridItem xs={12} sm={5} lg={5}>
									<CustomInput
										labelText="Cantidad"
										id="Cantidad"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: handlres.changeQuantity,
											type: "number",
											value: quantity,
										}}
									/>
								</GridItem>
							}
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
							&& <GridItem xs={12} sm={12} lg={12}>
								<Table
									tableHead={hideQuantity ? [
										labelList,
										"Acciones"
									] : [
											labelList,
											"Cantidad",
											"Acciones"
										]}
									tableData={data.map(x => hideQuantity ? [
										x.label,
										<Button
											color="danger"
											className={classes.actionButton}
											onClick={() => { handlres.remove(x.id) }}
										>
											<Close className={classes.icon} />
										</Button>
									] : [
											x.label,
											x.cantidad,
											<Button
												color="danger"
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
	icon: PropTypes.string
}

const REQUIRED_FIELDS = [
	'nombrePractica',
	'descripcion',
	'tiempoEstimado',
	'competencia',
	'competencia',
	'criteriosCompetencia',
	'obejtivo',
	'observaciones'
];

const Form = ({
	devicesList,
	suppliestList,
	simulatorsList,
	autorsList,
	history,
}) => {
	const [files, setFiles] = useState(null);
	const [equipos, setEquipos] = useState([]);
	const [simuladores, setSimuladores] = useState([]);
	const [insumos, setInsumos] = useState([]);
	const [objetivos, setObjetivos] = useState([]);
	const [autors, setAutors] = useState([]);
	const refHeaderForm = useRef();
	const refObservationForm = useRef();
	const CRUD = useCRUD();
	const classes = useStyles();

	useEffect(() => {
		CRUD.loadList();
	}, [])

	const handlres = {
		save: (e) => {
			e.preventDefault();
			const headerForm = refHeaderForm.current;
			const ObonForm = refObservationForm.current;
			const data = {
				nombrePractica: headerForm.elements.nombrePractica.value,
				descripcion: headerForm.elements.descripcion.value,
				tiempoEstimado: headerForm.elements.tiempoEstimado.value,
				competencia: headerForm.elements.competencia.value,
				criteriosCompetencia: headerForm.elements.criteriosCompetencia.value,
				obejtivo: headerForm.elements.obejtivo.value,
				observaciones: ObonForm.elements.observaciones.value,
				autores: [],
				archivos: {
					evaluacion: null,
					recursos: files,
				},
				objetivos,
				equipos,
				insumos,
				simuladores,
			};

			let exit = false;
			REQUIRED_FIELDS.forEach(name => {				
				const item = headerForm.elements[name] || ObonForm.elements[name];
				if(data[name] == '') {
					item.style = "background: #ffe4e4";
					exit = true;
				} else {
					item.style = "background: none";
				}
			});
			
			if(exit){
				alert('faltan campos por llenar!');
				return;
			}


			CRUD.save(data, () => {
				history.push('/practicas');
			});
		},
		changeAutors: (e) => {
			console.log('e.target.value', e.target.value);
			setAutors(e.target.value)
		}
	}

	const filesHandlers = {
		remove: uid => {
			setFiles(files.filter(x => x.uid === uid));
		},
		add: (file) => {
			setFiles([{
				uid: files.length,
				name: file.name,
				extention: file.tipo,
				url: file.url,
			}, ...files]);
		},
	};

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="danger" text>
						<CardText color="danger">
							<h4 className={classes.cardTitle}>Practicas</h4>
						</CardText>
					</CardHeader>
					<CardBody>
						<form ref={refHeaderForm}>
							<GridContainer>
								<GridItem xs={12} sm={5} lg={2}>
									<FormLabel className={classes.labelHorizontal}>
										Nombre Parctica
                  </FormLabel>
								</GridItem>
								<GridItem xs={12} sm={7} lg={4}>
									<CustomInput
										id="nombrePractica"
										name="nombrePractica"
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
										id="descripcion"
										name="descripcion"
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
											value={autors}
											onChange={handlres.changeAutors}
											MenuProps={{ className: classes.selectMenu }}
											classes={{ select: classes.select }}
											inputProps={{
												name: "autores",
												id: "autores"
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
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											placeholder: "Minutos",
											type: "number",
											min: 0,
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
										id="criteriosCompetencia"
										name="criteriosCompetencia"
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
										id="obejtivo"
										name="obejtivo"
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
				title="Objetivos"
				labelList="Objetivos"
				setData={setObjetivos}
				data={objetivos}
				hideQuantity={true}
				hideAutocomplete={true}
				icon="track_changes"
			/>
			<FormDetails
				setData={setSimuladores}
				title="Simuladores"
				labelList="Simulador"
				data={simuladores}
				list={simulatorsList}
				icon="airline_seat_flat_angled"
			/>
			<FormDetails
				title="Equipos"
				labelList="Equipo"
				setData={setEquipos}
				data={equipos}
				list={devicesList}
				icon="video_label"
			/>
			<FormDetails
				title="Insumos"
				labelList="Insumo"
				setData={setInsumos}
				data={insumos}
				list={suppliestList}
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
											x.name, x.extention,
											<Button
												color="danger"
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
					<div style={{ 'textAlign': 'right' }}>
						<Button
							color="danger"
							onClick={handlres.save}
						>Guardar</Button>
					</div>
				</GridItem>
			</GridContainer>
		</GridContainer>
	);
};

const mapState = state => ({
	devicesList: state.masters.devices,
	suppliestList: state.masters.supplies,
	simulatorsList: state.masters.simulators,
	autorsList: state.masters.autors,
}),
	mapDispatch = dispatch => ({
	});

export default connect(
	mapState,
	mapDispatch,
)(Form);
