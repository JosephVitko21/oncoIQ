import React, { Component } from 'react'
import utils from "../utils/utils";
import {Card} from "react-bootstrap";

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            opacity: this.props.riskScore * .9,
            color: "rgb(255, 0, 0)"
        }

    }

    render() {
        console.log(this.props)
        const overlayStyle = {
            opacity: this.state.opacity,
            backgroundColor: this.state.color,
        }
        const textStyle = {
            opacity: (this.state.hover ? 1 : 0)
        }

        return (
            <Card className="risk-card">
                <img src={ this.props.image }  alt='risk-tile'/>
                <div
                    className="risk-overlay"
                    style={ overlayStyle }
                    onMouseEnter={this.handleHoverOn}
                    onMouseLeave={this.handleHoverOff}
                >
                    <div className="risk-text" style={ textStyle }>
                        { utils.makePercentage(this.props.riskScore, 0) }
                    </div>
                </div>
            </Card>
        )
    }

    handleHoverOn = () => {
        let greenAndBlue = Math.round(255 * (1 - this.props.riskScore))
        this.setState({
            hover: true,
            opacity: 1,
            color: "rgb(255," + greenAndBlue + "," + greenAndBlue + ")",
        })
    }

    handleHoverOff = () => {
        this.setState({
            hover: false,
            opacity: this.props.riskScore * .9,
            color: "rgb(255, 0, 0)"
        })
    }
}
