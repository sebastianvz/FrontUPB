import React, {useState, useEffect} from "react";
import axios from "axios";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Modal} from "@material-ui/core";
// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
import Create from "@material-ui/icons/Create";
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import ValidationFormsUsers from "views/Forms/ValidationForms.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import {dataTable} from "variables/general.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	}
};

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(styles);

export default function Users() {
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	let deleteUser = () => {
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

	let addUser = () => {
		const url = `pendiente`;
		const requestBody = this.state.body;
		axios
			.post(url, requestBody)
			.then(result => {
				alert("Exito en la creación del usuario");
				console.log(result.response.data);
			})
			.catch(err => {
				console.log(err.response.data);
			});
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [data, setData] = React.useState(
		dataTable.dataRows.map((prop, key) => {
			return {
				id: key,
				username: prop[0],
				typeAndNumberId: prop[0],
				nombreCompleto: prop[0],
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
									"You've clicked LIKE button on \n{ \nusername: " +
										obj.username +
										", \nusername: " +
										obj.typeAndNumberIdn +
										", \ntypeAndNumberIdn: " +
										obj.nombreCompleto +
										", \nnombreCompletoe: "
								);
							}}
							color="info"
							className="like"
						>
							<Assignment />
						</Button>{" "}
						{/* use this button to add a edit kind of action */}
						<Button
							justIcon
							round
							simple
							onClick={() => {
								let obj = data.find(o => o.id === key);
								console.log(data);
								alert(
									"You've clicked EDIT button on \n{ \nusername: " +
										obj.username +
										", \nusername: " +
										obj.typeAndNumberIdn +
										", \ntypeAndNumberIdn: " +
										obj.nombreCompleto +
										", \nnombreCompletoe: "
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
			"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/User";
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
							username: prop.username,
							typeAndNumberId: `${prop.nameTipoIdentificacion} ${prop.numeroIdentificacion}`,
							nombreCompleto: prop.nombreCompleto,
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
												"You've clicked EDIT button on \n{ \nusername: " +
													obj.username +
													", \nnombreCompletoe: " +
													obj.nombreCompleto
											);
										}}
										color="info"
										className="like"
									>
										<Assignment />
									</Button>{" "}
									{/* use this button to add a edit kind of action */}
									<Button
										justIcon
										round
										simple
										onClick={() => {
											let obj = response.data.data.find(o => o.id - 1 === key);
											console.log(obj);
											alert(
												"You've clicked EDIT button on \n{ \nusername: " +
													obj.username +
													", \nnombreCompletoe: " +
													obj.nombreCompleto
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
												if (o.id - 1 === key) {
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

	const classes = useStyles();
	return (
		<GridContainer>
			<GridItem xs={12}>
				<Card>
					<CardHeader color="danger" icon>
						<CardIcon color="danger">
							<AccountBox />
						</CardIcon>
						<h4 className={classes.cardIconTitle}>Usuarios</h4>
						<br />
						<Button onClick={handleOpen}>
							<Add
								style={{
									marginTop: 0 + "px",
									marginLeft: 0 + "px",
									marginRight: 7 + "px",
									marginBottom: 2 + "px"
								}}
							/>
							Agregar Usuario
						</Button>
						<Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={open}
							onClose={handleClose}
						>
							<ValidationFormsUsers style={modalStyle}></ValidationFormsUsers>
						</Modal>
					</CardHeader>
					<CardBody>
						<ReactTable
							data={data}
							filterable
							columns={[
								{
									Header: "Nombre completo",
									accessor: "nombreCompleto"
								},
								{
									Header: "Usuario",
									accessor: "username"
								},
								{
									Header: "Identificación",
									accessor: "typeAndNumberId"
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
	);
}
