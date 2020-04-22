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

const ComboBox = ({
    label,
    data,
    value,
    onChange,
    id
}) => {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={6} lg={6}>
            <FormControl
                fullWidth
                className={classes.selectFormControl}
            >
                <InputLabel
                    htmlFor={id}
                    className={classes.selectLabel}
                >
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    MenuProps={{ className: classes.selectMenu }}
                    classes={{ select: classes.select }}
                    inputProps={{
                        name: { id },
                        id: { id }
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
                    {data && data.map(x =>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                            }}
                            value={x.key}
                        >
                            {x.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </GridItem>
    );
}

export default ComboBox;