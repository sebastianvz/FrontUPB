import React, {useState, useEffect} from "react";
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Create from "@material-ui/icons/Create";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import roleModel from "../../models/roles.js";

import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import {dataTable} from "variables/general.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	}
};

const useStylesAlerts = makeStyles(stylesForAlerts);
const useStyles = makeStyles(styles);

export default function Roles() {
	const [alerta, setAlerta] = React.useState(null);
	const [checkboxState, setCheckboxState] = useState({});
	let arrayIdPermits = [];

	const handleChange = name => event => {
		console.log(name);
		console.log(arrayIdPermits);
		debugger;

		arrayIdPermits.push({id: event.target.value});

		if (event.target.checked === false) {
			
		}
		setCheckboxState({...checkboxState, [name]: event.target.value});
	};

	const inputAlert = () => {
		const URL =
			"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Permission";
		axios
			.get(URL, {
				headers: {
					Authorization: "Bearer " + auth
				}
			})
			.then(function(response) {
				console.log(response);
				console.log(checkboxState);
				setAlerta(
					<SweetAlert
						input
						showCancel
						style={{display: "block", marginTop: "-100px"}}
						confirmBtnText="Guardar"
						cancelBtnText="Cancelar"
						title="Ingrese el nombre del rol"
						required
						validationMsg="Debe digitar el nombre del rol"
						onConfirm={e => {
							const URL_ROLE_POST =
								"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role";
							let newRole = new roleModel(e);
							newRole = JSON.stringify(newRole);
							axios
								.post(URL_ROLE_POST, newRole, {
									headers: {
										"Content-Type": "application/json",
										Authorization: "Bearer " + auth
									}
								})
								.then(function(response) {
									console.log(response);
									console.log(newRole);
									inputConfirmAlertNext(e);
								})
								.catch(function(error) {
									console.log(error);
									return;
								});
						}}
						onCancel={() => hideAlert()}
						confirmBtnCssClass={
							classesAlerts.button + " " + classesAlerts.default
						}
						cancelBtnCssClass={
							classesAlerts.button + " " + classesAlerts.danger
						}
					>
						<b>Seleccione los permisos</b>
						<br />
						<br />
						{response.data.data.map(x => (
							<FormControlLabel
								key={x.id}
								control={
									<Checkbox
										onChange={handleChange(x.permmisionName)}
										value={x.id}
									/>
								}
								label={x.permmisionName}
							/>
						))}
						<br />
						<br />
					</SweetAlert>
				);
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	const inputConfirmAlertNext = e => {
		setAlerta(e);
		setTimeout(() => {
			setAlerta(
				<SweetAlert
					style={{display: "block", marginTop: "-100px"}}
					onConfirm={() => hideAlert()}
					onCancel={() => hideAlert()}
					confirmBtnCssClass={
						classesAlerts.button + " " + classesAlerts.default
					}
					title={
						<p>
							Nombre del rol: <b>{e}</b>
						</p>
					}
				/>
			);
		}, 200);
	};
	const hideAlert = () => {
		setAlerta(null);
	};

	let deleteRol = () => {
		const url = `pendiente`;
		axios
			.delete(url)
			.then(result => {
				console.log(result.response.data);
			})
			.catch(err => {
				console.log(err.response.data);
			});
	};

	const [data, setData] = React.useState(
		dataTable.dataRows.map((prop, key) => {
			return {
				id: key,
				roleName: prop[0],
				actions: (
					// we've added some custom button actions
					<div className="actions-right">
						{/* use this button to add a like kind of action */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								let obj = data.find(o => o.id === key);
								alert(
									"You've clicked LIKE button on \n{ \nName: " +
										obj.name +
										", \nposition: " +
										obj.position +
										", \noffice: " +
										obj.office +
										", \nage: " +
										obj.age +
										"\n}."
								);
							}}
							color="info"
							className="like"
						>
							<RemoveRedEye />
						</Button>{" "}
						{/* use this button to add a edit kind of action */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								let obj = data.find(o => o.id === key);
								alert(
									"You've clicked EDIT button on \n{ \nName: " +
										obj.name +
										", \nposition: " +
										obj.position +
										", \noffice: " +
										obj.office +
										", \nage: " +
										obj.age +
										"\n}."
								);
							}}
							color="warning"
							className="edit"
						>
							<Create />
						</Button>{" "}
						{/* use this button to remove the data row */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								var newData = data;
								newData.find((o, i) => {
									if (o.id === key) {
										// here you should add some custom code so you can delete the data
										// from this component and from your server as well
										newData.splice(i, 1);
										return true;
									}
									return false;
								});
								setData([...newData]);
							}}
							color="danger"
							className="remove"
						>
							<Close />
						</Button>{" "}
					</div>
				)
			};
		})
	);

	let auth = localStorage.getItem("auth");

	useEffect(() => {
		const URL =
			"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role";
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
							roleName: prop.roleName,
							actions: (
								// we've added some custom button actions
								<div className="actions-right">
									{/* use this button to add a like kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											let obj = response.data.data.find(o => o.id - 1 === key);
											alert(
												"You've clicked LIKE button on \n{ \nName: " +
													obj.name +
													", \nposition: " +
													obj.position +
													", \noffice: " +
													obj.office +
													", \nage: " +
													obj.age +
													"\n}."
											);
										}}
										color="info"
										className="like"
									>
										<RemoveRedEye />
									</Button>{" "}
									{/* use this button to add a edit kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											let obj = response.data.data.find(o => o.id - 1 === key);
											alert(
												"You've clicked EDIT button on \n{ \nName: " +
													obj.name +
													", \nposition: " +
													obj.position +
													", \noffice: " +
													obj.office +
													", \nage: " +
													obj.age +
													"\n}."
											);
										}}
										color="warning"
										className="edit"
									>
										<Create />
									</Button>{" "}
									{/* use this button to remove the data row */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											var newData = response.data.data;
											newData.find((o, i) => {
												if (o.id === key) {
													// here you should add some custom code so you can delete the data
													// from this component and from your server as well
													newData.splice(i, 1);
													return true;
												}
												return false;
											});
											setData([...newData]);
										}}
										color="danger"
										className="remove"
									>
										<Close />
									</Button>{" "}
								</div>
							)
						};
					})
				);
				console.log(response.data.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

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
							<h4 className={classes.cardIconTitle}>Roles</h4>
							<br />
							<Button onClick={inputAlert}>
								<Add
									style={{
										marginTop: 0 + "px",
										marginLeft: 0 + "px",
										marginRight: 7 + "px",
										marginBottom: 2 + "px"
									}}
								/>
								Agregar Rol
							</Button>
						</CardHeader>
						<CardBody>
							<ReactTable
								data={data}
								filterable
								columns={[
									{
										Header: "Nombre",
										accessor: "roleName"
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
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
