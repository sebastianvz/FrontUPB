import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// react component for creating dynamic tables

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';
// @material-ui/icons
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';

//Wysywing
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'; 
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// core components
import GridContainer from "components/core/Grid/GridContainer.js";
import GridItem from "components/core/Grid/GridItem.js";
import Button from "components/core/CustomButtons/Button.js";
import Card from "components/core/Card/Card.js";
import CardBody from "components/core/Card/CardBody.js";
import CardIcon from "components/core/Card/CardIcon.js";
import CardHeader from "components/core/Card/CardHeader.js";
import CustomInput from "components/core/CustomInput/CustomInput.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import GlobalVariables from "../../../variables/globalVariables.js";
import { useParameter as useCRUD } from '../../../components/Masters';
import { useAlerta, Autocomplete, Watchful, Table } from 'components/Shared';
import { PERMISSIONS } from 'config/constants';
import { dataTable } from "variables/general.js";

const styles = {
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	}
};


const useStyles = makeStyles(styles);
const INVALID_VALUES = [null, '', '-1', -1, undefined];
const REQUIRED_FIELDS = [
	'nombre',
];
let sampleEditorContent = '';
const Form = ({
	data,
	onSave = () => { },
	onCancel,
}) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [editor, setEditor] = useState(EditorState.createEmpty());
	const { Alerta, alerta } = useAlerta();

	useEffect(() => {
		if (data) {
			setValues(data);
			setEditor(EditorState.createWithContent(
				ContentState.createFromBlockArray(
					convertFromHTML(data.template)
				)
			));
		}
	}, [data]);

	const handlers = {
		changeEditor(editorState) {
			setEditor(editorState);
		},
		change(e, prop) {
			if (e.target) {
				const { name, value } = e.target;
				setValues({ ...values, [name]: value });
			} else {
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
					confirm: () => { },
				});
				return;
			}
			values.template = draftToHtml(convertToRaw(editor.getCurrentContent()));

			onSave(values);
		}
	}
	return (
		<GridItem xs={12} sm={12} md={12}>
			{Alerta}
			<form>
				<GridContainer>
					<GridItem xs={12} sm={12} lg={12}>
						<TextField
							id="nombre"
							label="Nombre del Parametro"
							name="nombre"
							type="text"
							value={values.nombre}
							onChange={handlers.change}
							error={errors.nombre}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							inputProps={{
								min: 0
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} lg={12}>
						<Editor
							wrapperClassName="demo-wrapper"
							editorClassName="demo-editor"
							editorStyle={{ minHeight: '200px' }}
							editorState={editor}
							onEditorStateChange={handlers.changeEditor}
							defaultEditorState={sampleEditorContent}
							mention={{
								separator: ' ',
								trigger: '@',
								suggestions: [
									{ text: 'USUARIO', value: '[Usuario]', url: '' },
									{ text: 'FECHAINICIO', value: '[FechaInicio]', url: '' },
									{ text: 'FECHAFIN', value: '[FehaFin]', url: '' },
									{ text: 'PROGRAMA', value: '[Programa]', url: '' },
									{ text: 'SEMESTRE', value: '[Semestre]', url: '' },
									{ text: 'APROBADOR', value: '[Aprobador]', url: '' },
									{ text: 'DESCRIPCION', value: '[Descripcion]', url: '' },
								],
							}}
							hashtag={{}}
						>

						</Editor>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<div style={{ 'textAlign': 'right' }}>
							<Button
								color="primary"
								onClick={onCancel}
							>Cancelar</Button>
							<Watchful
								action={PERMISSIONS.add}
								menu="Parametros">
								<Button
									color="danger"
									onClick={handlers.save}
								>Guardar</Button>
							</Watchful>
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
};

const Atributes = ({
}) => {
	const [showForm, setShowForm] = useState(false);
	const [current, setCurrent] = useState();
	const [data, setData] = useState();

	const CRUD = useCRUD();
	const { Alerta, alerta } = useAlerta();

	useEffect(() => {
		handlers.loadTable();
	}, []);

	const handlers = {
		delete(item) {
			alerta.show('¿Esta Seguro de que quiere eliminar el registro?', {
				showCancel: true,
				cancelBtnText: "No",
				confirmBtnText: "Sí",
				confirm: () => {
					CRUD.remove(item, () => {
						CRUD.list((x) => {
							handlers.fillData(x);
							alerta.hide();
						});
					});
				},
				cancel: alerta.hide
			})
		},
		edit(item) {
			setCurrent(item);
			handlers.showForm();
		},
		fillData: items =>
			setData(items.map(e => ({
				...e,
				actions: (
					<div className="actions-right">
						<Watchful
							action={PERMISSIONS.edit}
							menu="Parametros"
						>
							<Button
								justIcon
								round
								simple
								onClick={() => handlers.edit(e)}
								color="warning"
								className="edit"
							>
								<Create />
							</Button>
						</Watchful>
					&nbsp;
						<Watchful
							action={PERMISSIONS.delete}
							menu="Semestres"
						>
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
						</Watchful>
					</div>
				)
			}))),
		hideForm() {
			setCurrent(null);
			setShowForm(false);
		},
		loadTable() {
			alerta.show('Cargando información...', {
				loading: true,
			});
			CRUD.list((x) => {
				handlers.fillData(x);
				alerta.hide();
			});
		},
		save(values) {
			alerta.show('Almacenando Información...', {
				loading: true,
			});
			CRUD.save(values, () => {
				CRUD.list((x) => {
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
							<h4 className={classes.cardIconTitle}>Gestión de Parametros</h4>
							<br />
						</CardHeader>
						<CardBody>
							{showForm ? (
								<Form
									data={current}
									onSave={handlers.save}
									onCancel={handlers.hideForm}
								/>
							) : (<>
								<GridItem xs={12} sm={12} md={12}>
									<div style={{ 'textAlign': 'right' }}>
										<Watchful
											action={PERMISSIONS.add}
											menu="Parametros">
											<Button
												color="danger"
												onClick={handlers.showForm}
											>Crear Parametro</Button>
										</Watchful>
									</div>
								</GridItem>
								<hr />
								<Table
									data={data}
									loadTable={handlers.loadTable}
									columns={[
										{
											Header: "Parametro",
											accessor: "nombre"
										},
										{
											Header: "",
											accessor: "actions",
											sortable: false,
											filterable: false
										}
									]}
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
}), mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Atributes);