import React, { Component } from 'react'
import utils from "../../../utils/utils";
import {Card} from "react-bootstrap";

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.calculateBaseColor()
    }

    calculateBaseColor() {
        let opacity
        let color
        if (this.props.mode === 0) {
            opacity = 0
            color = "rgb(255, 0, 0)"
        } else if (this.props.mode === 2) {
            opacity = 1
            color = `rgb(255, ${255 * (1-this.props.riskScore)}, ${255 * (1-this.props.riskScore)})`
        } else {
            opacity = this.props.riskScore * .9
            color = "rgb(255, 0, 0)"
        }

        this.state = {
            hover: false,
            opacity: opacity,
            color: color,
        }
    }

    render() {
        if (!this.state.hover) {
            this.calculateBaseColor()
        }
        const overlayStyle = {
            opacity: this.state.opacity,
            backgroundColor: this.state.color,
        }
        const textStyle = {
            opacity: (this.state.hover ? 1 : 0)
        }

        return (
            <Card className="risk-card">
                <img src='https://www.halberesford.com/content/images/2018/07/null.png'  alt='risk-tile'/>
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
            hover: false
        })
        this.calculateBaseColor()
    }
}
