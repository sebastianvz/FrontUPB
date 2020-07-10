import React, { useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import stylesForAlerts from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStylesAlerts = makeStyles(stylesForAlerts);

export default function useAlerta() {
	const [Alerta, setAlerta] = useState('');
	const classesAlerts = useStylesAlerts();

	let alerta = {
		show(message, _props) {
			const props = {
				style: { display: "block", marginTop: "-100px" },
				showCancel: false,
				showConfirm: false,
				..._props,
			}
			if(props.confirm){
				props.showConfirm = true;
				props.onConfirm = () => {
					props.confirm();
					alerta.hide()
				}
			}
			if(props.cancel){
				props.showCancel = true;
				props.onCancel = () => {
					props.cancel();
					alerta.hide()
				}
			}		
			if(props.onConfirm == null) {
				props.onConfirm = () => {};			
			}			
			if(props.loading) {
				props.type = 'custom';
				props.customIcon = <CircularProgress />;
			}	
			setAlerta(
				<SweetAlert
					confirmBtnCssClass={
						classesAlerts.button + " " + classesAlerts.default
					}
					{...props}
				>{message}</SweetAlert>
			);
		},
		hide() {
			setAlerta('');
		}
	};

	return { Alerta, alerta };
}