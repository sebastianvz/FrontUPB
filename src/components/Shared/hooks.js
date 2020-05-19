import React, { useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStylesAlerts = makeStyles(stylesForAlerts);

export default function useAlerta() {
	const [Alerta, setAlerta] = useState('');
	const classesAlerts = useStylesAlerts();

	let alerta = {
		show(message, {
			confirm = () => { },
			cancel = () => { },
		} = {}) {
			const onCancel = () => {
				cancel();
				alerta.hide()
			}, onConfirm = () => {
				confirm();
				alerta.hide()
			}
			setAlerta(
				<SweetAlert
					style={{ display: "block", marginTop: "-100px" }}
					onConfirm={onConfirm}
					onCancel={onCancel}
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
		}
	};

	return { Alerta, alerta };
}