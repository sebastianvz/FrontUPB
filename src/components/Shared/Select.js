import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridItem from "components/core/Grid/GridItem.js";

const styles = {
    cardIconTitle: {
        marginTop: "15px",
        marginBottom: "0px"
    }
};

const useStyles = makeStyles(styles);

const ComboBox = ({ label }) => {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={4} lg={4}>
            <FormControl
                fullWidth
                className={classes.selectFormControl}
            >
                <InputLabel
                    htmlFor="multiple-select"
                    className={classes.selectLabel}
                >
                    {label}
                </InputLabel>
                <Select
                    // value={null}
                    // onChange={handleMultiple}
                    MenuProps={{ className: classes.selectMenu }}
                    classes={{ select: classes.select }}
                    inputProps={{
                        name: "multipleSelect",
                        id: "multiple-select"
                    }}
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
                </Select>
            </FormControl>
        </GridItem>
    );
}

export default ComboBox;