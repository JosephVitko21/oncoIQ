import React from "react";
import Tile from "./Tile";
import domain from "../../../utils/site-domain";
import googleDomain from "../../../utils/google-drive-domain";
import SwitchSelector from "react-switch-selector";
import {faArrowsAltH, faExclamationTriangle, faImage, faPercentage, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class TileGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 1
        }
    }
    renderGrid(numRows, numCols) {
        console.log('rendering tiles')
        let rows = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push(this.renderTile(i * numCols + j))
            }
            rows.push(
                <div className="card-group">{row}</div>
            )
        }
        return(<div className="custom-card" style={{backgroundImage: `url(${this.props.image_url})`, backgroundSize: 'cover'}}>{rows}</div>)
    }
    renderTile(i) {
        let image;
        let riskScore;
        if (!this.props.tiles || !this.props.tiles[i]) {
            // load placeholder
            image = "https://2rri712hg8ztbbaed491mw10-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/placeholder-square.png"
            riskScore = 0
        } else {
            image = googleDomain + this.props.tiles[i].id
            riskScore = this.props.tiles[i].risk_level
        }

        return <Tile
            image={image}
            riskScore={riskScore}
            mode={this.state.mode}
        />
    }
    renderSlider() {
        const options = [
            {
                label: <FontAwesomeIcon icon={faImage} className='mt-2' color='white'/>,
                value: 0,
                selectedBackgroundColor: "var(--chakra-colors-darkPrimary)",
            },
            {
                label: <FontAwesomeIcon icon={faArrowsAltH} className='mt-2' color='white'/>,
                value: 1,
                selectedBackgroundColor: "var(--chakra-colors-darkPrimary)"
            },
            {
                label: <FontAwesomeIcon icon={faExclamationTriangle} className='mt-2' color='white'/>,
                value: 2,
                selectedBackgroundColor: "var(--chakra-colors-darkPrimary)"
            }
        ]
        const onChange = (newValue) => {
            this.setState({
                mode: newValue
            })
        }

        const initialSelectedIndex = options.findIndex(({value}) => value === 1)

        return (
            <div className="your-required-wrapper mt-2" style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', marginRight: '33%', marginLeft: '33%'}}>
                <SwitchSelector
                    onChange={onChange}
                    options={options}
                    initialSelectedIndex={initialSelectedIndex}
                    backgroundColor={"var(--chakra-colors-primary)"}
                    fontColor={"#ffffff"}
                />
            </div>
        );
    }
    render() {
        console.log('rendering tile grid')
        return (
            <div className='mb-4'>
                {this.renderGrid(this.props.num_rows, this.props.num_cols)}
                {this.props.showSlider ? this.renderSlider() : <></>}
            </div>

        )
    }
}
