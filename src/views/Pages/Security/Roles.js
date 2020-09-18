import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moement from 'moment';
// react component for creating dynamic tables

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';


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
import Table from "components/core/Table/Table.js";



import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import { useCRUD } from '../../../components/Role';
//shared Components
import { useAlerta, Autocomplete, Watchful, ComboBox, Table as ReactTable } from 'components/Shared';
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
const INVALID_VALUES = [null, '', '-1', -1, undefined, 0];

const Form = ({
	item,
	onSave = () => { },
	menuesList,
	permissionsList,
	onCancel
}) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [data, setData] = useState([]);

	const classes = useStyles();
	const { Alerta, alerta } = useAlerta();

	useEffect(() => {
		if (item) {
			setValues({
				id: item.id,
				role: item.roleName
			});
			setData(item.menues);
		}
	}, []);

	const handlers = {
		add() {
			if (!handlers.validate()) return;

			const datos = {
				id: values.menu,
				permisssions: values.permissions.map(e => ({ id: e })),
				name: menuesList.find(e => e.id == values.menu).name,
				permissionsName: permissionsList
					.filter(e => values.permissions.indexOf(e.id) >= 0)
					.map(e => e.name)
					.join(', ')
			};

			setData([
				datos,
				...data
			]);
			setValues({
				...values,
				permissions: [],
				menu: -1,
			})
		},
		change(e, prop) {
			if (e.target) {
				const { name, value } = e.target;
				setValues({ ...values, [name]: value });
			} else {
				setValues({ ...values, [prop]: e });
			}
		},
		remove(menuId) {
			setData(data.filter(e => e.id !== menuId));
		},
		save(e) {
			values.menues = data;
			onSave(values);
		},
		validate() {
			const _errors = {};
			if (INVALID_VALUES.indexOf(values.menu) >= 0) {
				_errors.menu = true;
			}
			if ((values.permissions || { length: 0 }).length === 0) {
				_errors.permissions = true;
			}
			setErrors(_errors);
			if (Object.keys(_errors).length > 0) {
				alerta.show('Hay campos sin llenar!!', {
					type: 'danger',
					confirm: () => { },
				});
				return false;
			}
			return true;
		},
	}
	return (
		<GridItem xs={12} sm={12} md={12}>
			{Alerta}
			<form>
				<GridContainer style={{ padding: '13px 0px 0px 0px' }}>
					<GridItem xs={12} sm={6} lg={6}>
						<TextField
							id="roleName"
							label="Nombre del Rol"
							name="roleName"
							value={values.role}
							onChange={handlers.change}
							error={errors.role}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</GridItem>
				</GridContainer>
				<hr />
				<GridContainer>
					<ComboBox
						label="Menú"
						onChange={handlers.change}
						name={"menu"}
						value={values.menu}
						data={menuesList && menuesList.map(e => ({
							key: e.id,
							label: e.name
						}))}
					/>
					<GridItem tem xs={12} sm={6} lg={6}>
						<FormControl
							fullWidth
							className={classes.selectFormControl}
						>
							<InputLabel
								htmlFor="multiple-select"
								className={classes.selectLabel}
							>
								Permisos
                        		</InputLabel>
							<Select
								multiple
								error={errors.permissions}
								value={values.permissions || []}
								onChange={handlers.change}
								MenuProps={{ className: classes.selectMenu }}
								classes={{ select: classes.select }}
								inputProps={{
									name: "permissions",
									id: "permissions",
								}}
							>
								{permissionsList && permissionsList.map(x => (
									<MenuItem
										classes={{
											root: classes.selectMenuItem,
											selected: classes.selectMenuItemSelectedMultiple
										}}
										value={x.id}
									>
										{x.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<div style={{ 'textAlign': 'right' }}>
							<Watchful
								action={PERMISSIONS.add}
								menu="Reservas">
								<Button
									color="danger"
									onClick={handlers.add}
								>Agregar Menú</Button>
							</Watchful>
						</div>
					</GridItem>
				</GridContainer>
			</form>
			<GridContainer>
				{
					data
					&& data.length > 0
					&& <GridItem xs={12} sm={12} lg={12}>
						<Table
							tableHead={[
								"Menú",
								"Permisos",
								"Acciones"
							]}
							tableData={data.map(x => [
								x.name,
								x.permissionsName,
								<Watchful
									action={PERMISSIONS.delete}
									menu="Roles">
									<Button
										color="danger"
										className={classes.actionButton}
										onClick={() => { handlers.remove(x.id) }}
									>
										<Close className={classes.icon} />
									</Button>
								</Watchful>
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
			<hr />
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<div style={{ 'textAlign': 'right' }}>
						<Button
							color="primary"
							onClick={onCancel}
						>Cancelar</Button>
						{data
							&& data.length > 0
							&&
							<Watchful
								action={PERMISSIONS.add}
								menu="Reservas">
								<Button
									color="danger"
									onClick={handlers.save}
								>Guardar</Button>
							</Watchful>
						}
					</div>
				</GridItem>
			</GridContainer>
		</GridItem>
	);
};

Form.propTypes = {
	data: PropTypes.object,
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	practicesList: PropTypes.array,
};

const Roles = ({
	menuesList,
	permissionsList,
	userId,
}) => {

	const [showForm, setShowForm] = useState(false);
	const [current, setCurrent] = useState(false);
	const [roleList, setRoleList] = useState(false);

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
		fillData: ({ data = [] }) => {
			setRoleList(data.map(e => ({
				id: e.id,
				roleName: e.roleName,
				menues: e.menues && e.menues.map(x => x.name).join(', '),
				actions:
					<div className="actions-right">
						<Watchful
							action={PERMISSIONS.edit}
							menu="Roles"
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
							menu="Roles"
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
			})))
		},
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
				CRUD.loadList(() => {
					alerta.hide();
				});
			});
		},
		save(values) {
			alerta.show('Almacenando Información...', {
				loading: true,
			});
			CRUD.save({
				IdUserSender: userId,
				...values,
			}, () => {
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
							<h4 className={classes.cardIconTitle}>Roles</h4>
							<br />
						</CardHeader>
						<CardBody>
							{showForm ? (
								<Form
									item={current}
									onSave={handlers.save}
									onCancel={handlers.hideForm}
									menuesList={menuesList}
									permissionsList={permissionsList}
								/>
							) : (roleList
								&& <>

									<Watchful
										action={PERMISSIONS.add}
										menu="Roles">
										<Button
											onClick={handlers.showForm}
										>
											<Add
												style={{
													marginTop: 0 + "px",
													marginLeft: 0 + "px",
													marginRight: 7 + "px",
													marginBottom: 2 + "px"
												}}
											/>Agregar Rol</Button>
									</Watchful>
									<ReactTable
										data={roleList}
										loadTable={handlers.loadTable}
										columns={[
											{
												Header: "Rol",
												accessor: "roleName"
											},
											{
												Header: "Menus",
												accessor: "menues"
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
	menuesList: state.masters.menues,
	permissionsList: state.masters.permissions,
	userId: state.auth.user.id,
}), mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Roles);