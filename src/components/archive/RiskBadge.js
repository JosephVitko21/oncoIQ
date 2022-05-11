import React from 'react';
import { Badge } from '@chakra-ui/react'

import utils from "../../utils/utils";

export default function RiskBadge(props) {
    const risk = props.risk_level;
    let red, green;
    if (risk >= .5) {
        red = 255
        green = Math.round(2 * (1 - risk) * 204)
    } else {
        red = Math.round(2 * risk * 255)
        green = 204
    }

    return <Badge color="white" bg={"rgb(" + red + ", " + green + ", 0)"} {...props}>Estimated Risk: {utils.makePercentage(props.risk_level, 0)}</Badge>;
}
