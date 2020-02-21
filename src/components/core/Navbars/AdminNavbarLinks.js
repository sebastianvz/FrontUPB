import React from "react";
import {withRouter} from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "../CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
	const [openProfile, setOpenProfile] = React.useState(null);
	const handleClickProfile = event => {
		if (openProfile && openProfile.contains(event.target)) {
			setOpenProfile(null);
		} else {
			setOpenProfile(event.currentTarget);
		}
	};
	const handleCloseProfile = () => {
		localStorage.clear();
		props.history.replace("/Login");
		window.location.reload(true) 
		setOpenProfile(null);
	};
	const classes = useStyles();
	const {rtlActive} = props;
	const dropdownItem = classNames(classes.dropdownItem, classes.dangerHover, {
		[classes.dropdownItemRTL]: rtlActive
	});
	const wrapper = classNames({
		[classes.wrapperRTL]: rtlActive
	});
	const managerClasses = classNames({
		[classes.managerClasses]: true
	});
	return (
		<div className={wrapper}>
			<div className={managerClasses}>
				<Button
					color="transparent"
					aria-label="Person"
					justIcon
					aria-owns={openProfile ? "profile-menu-list" : null}
					aria-haspopup="true"
					onClick={handleClickProfile}
					className={classes.buttonLink}
					muiClasses={{
						label: rtlActive ? classes.labelRTL : ""
					}}
				>
					<Person
						className={
							classes.headerLinksSvg +
							" " +
							(rtlActive
								? classes.links + " " + classes.linksRTL
								: classes.links)
						}
					/>
					<Hidden mdUp implementation="css">
						<span onClick={handleClickProfile} className={classes.linkText}>
							Perfil
						</span>
					</Hidden>
				</Button>
				<Popper
					open={Boolean(openProfile)}
					anchorEl={openProfile}
					transition
					disablePortal
					placement="bottom"
					className={classNames({
						[classes.popperClose]: !openProfile,
						[classes.popperResponsive]: true,
						[classes.popperNav]: true
					})}
				>
					{({TransitionProps}) => (
						<Grow
							{...TransitionProps}
							id="profile-menu-list"
							style={{transformOrigin: "0 0 0"}}
						>
							<Paper className={classes.dropdown}>
								<ClickAwayListener
									onClickAway={() => {
										setOpenProfile(null);
									}}
								>
									<MenuList role="menu">
										<MenuItem
											onClick={handleCloseProfile}
											className={dropdownItem}
										>
											Cerrar sesión
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}

export default withRouter(HeaderLinks);
