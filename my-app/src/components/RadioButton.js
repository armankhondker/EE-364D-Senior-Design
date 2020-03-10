import React from "react";
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import '../styling/custom.scss';

function RadioButton(props) {
    return(
        <ButtonToolbar>
            <ToggleButtonGroup type="radio" name={props.name}>
                <ToggleButton value={1}>1</ToggleButton>
                <ToggleButton value={2}>2</ToggleButton>
                <ToggleButton value={3}>3</ToggleButton>
                <ToggleButton value={4}>4</ToggleButton>
                <ToggleButton value={5}>5</ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>
    );
}

export default RadioButton;