import React from 'react';

import {Badge} from "react-bootstrap";
import utils from "../utils/utils";

export default class RiskBadge extends React.Component {
    render() {
        const risk = this.props.risk_level
        let red, green
        if (risk >= .5) {
            red = 255
            green = Math.round(2 * (1 - risk) * 204)
        } else {
            red = Math.round(2 * risk * 255)
            green = 204
        }
        const badgeStyle = {
            color: "white",
            backgroundColor: "rgb(" + red + ", " + green + ", 0)"
        }
        return (
            <h5><Badge pill style={badgeStyle}>Estimated Risk: {utils.makePercentage(this.props.risk_level, 0)}</Badge></h5>
        )
    }
}
