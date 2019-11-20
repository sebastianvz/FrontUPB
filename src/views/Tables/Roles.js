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
	const [checkboxState, setCheckboxState] = useState([]);
	let arrayIdPermits = [];

	const handleChange = name => event => {
		if (event.target.checked === false) {
			for (let i = 0; i < arrayIdPermits.length; i++) {
				if (arrayIdPermits[i].id === event.target.value) {
					arrayIdPermits.splice(i, 1);
				}
			}
		} else {
			arrayIdPermits.push({id: event.target.value});
		}
		setCheckboxState([...checkboxState, arrayIdPermits]);
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
							let newRole = new roleModel(e, arrayIdPermits);
							newRole.activo = true;
							newRole.idUserSender = liableID;
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
		arrayIdPermits = [];
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
		arrayIdPermits = [];
		setAlerta(null);
	};

	const [data, setData] = React.useState(
		dataTable.dataRows.map((prop, key) => {
			return {
				id: key,
				roleName: prop[0],
				actions: (
					// we've added some custom button actions
					<div className="actions-right">
						{/* use this button to add a edit kind of action */}
						{/* <Button
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
						</Button>{" "} */}
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

	let liableID = JSON.parse(localStorage.getItem("id"));
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
				const resultActive = response.data.data.filter(x => x.activo === true);
				setData(
					resultActive.map((prop, key) => {
						return {
							id: key,
							roleName: prop.roleName,
							actions: (
								// we've added some custom button actions
								<div className="actions-right">
									{/* use this button to add a edit kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											console.log(resultActive);
											let obj = resultActive.find(
												o => o.roleName === prop.roleName
											);
											const URL_getSpecificRole = `http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role/${obj.id}`;
											const URL_getPermmision =
												"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Permission";

											axios
												.all([
													axios.get(URL_getSpecificRole, {
														headers: {
															Authorization: "Bearer " + auth
														}
													}),
													axios.get(URL_getPermmision, {
														headers: {
															Authorization: "Bearer " + auth
														}
													})
												])
												.then(responseArr => {
													//this will be executed only when all requests are complete
													console.log(
														"Date created: ",
														responseArr[0].data.data
													);
													console.log(
														"Date created: ",
														responseArr[1].data.data
													);
													setAlerta(
														<SweetAlert
															input
															showCancel
															style={{
																display: "block",
																marginTop: "-100px"
															}}
															confirmBtnText="Modificar"
															cancelBtnText="Cancelar"
															title="Cambie el nombre del rol y los permisos"
															required
															validationMsg="Debe digitar el nombre del rol"
															onConfirm={e => {
																const URL_ROLE_PUT =
																	"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role";
																let newRole = new roleModel(e, arrayIdPermits);
																newRole.idUserSender = liableID;
																newRole.id = obj.id;
																newRole.activo = true;
																newRole = JSON.stringify(newRole);
																axios
																	.put(URL_ROLE_PUT, newRole, {
																		headers: {
																			"Content-Type": "application/json",
																			Authorization: "Bearer " + auth
																		}
																	})
																	.then(function(response) {
																		alert("Exito al modificar el rol");
																		hideAlert();
																	})
																	.catch(function(error) {
																		alert("Error al modificar el rol");
																		console.log(error);
																		return;
																	});
															}}
															onCancel={() => hideAlert()}
															confirmBtnCssClass={
																classesAlerts.button +
																" " +
																classesAlerts.default
															}
															cancelBtnCssClass={
																classesAlerts.button +
																" " +
																classesAlerts.danger
															}
														>
															<b>Seleccione los permisos</b>
															<br />
															<br />
															{responseArr[1].data.data.map(x => (
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
													console.log(error[0]);
													console.log(error[1]);
												});
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
											let obj = resultActive.find(
												o => o.roleName === prop.roleName
											);
											const URL_DeleteUser =
												"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Role";
											obj = {
												id: obj.id,
												roleName: obj.roleName,
												activo: false,
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
													console.log(response);
													alert("Rol eliminado con exito");
												})
												.catch(function(error) {
													console.log(error);
													alert(
														"Error al eliminar el rol, vuelva a intentarlo"
													);
													return;
												});
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
