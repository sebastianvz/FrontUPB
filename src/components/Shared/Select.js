import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridItem from "components/core/Grid/GridItem.js";

const styles = {
	cardIconTitle: {
		marginTop: "15px",
		marginBottom: "0px"
	}
};

const useStyles = makeStyles(styles);

const ComboBox = (props) => {
	const {
		label,
		data,
		value,
		onChange,
		id,
		width = {
			xs: 12,
			sm: 6,
			lg: 6,
		}
	} = props;
	const classes = useStyles();
	return (
		<GridItem {...width}>
			<TextField
				id={id}
				select
				label={label}
				value={value}
				onChange={onChange}
				fullWidth
				{...props}
			>
				<MenuItem
					classes={{
						root: classes.selectMenuItem,
						selected: classes.selectMenuItemSelectedMultiple
					}}
					value="-1"
				>
					Seleccione
                    </MenuItem>
				{data && data.map(x =>
					<MenuItem
						classes={{
							root: classes.selectMenuItem,
							selected: classes.selectMenuItemSelectedMultiple
						}}
						value={x.key}
						key={x.key}
					>
						{x.label}
					</MenuItem>
				)}
			</TextField>
		</GridItem>
	);
}

export default ComboBox;