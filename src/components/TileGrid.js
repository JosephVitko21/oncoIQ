import React from "react";
import Tile from "./Tile";
import domain from "../utils/site-domain";
import googleDomain from "../utils/google-drive-domain";

export default class TileGrid extends React.Component {
    renderGrid(numRows, numCols) {
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
        console.log("props to render:", this.props)
        return <Tile
            image={googleDomain + this.props.tiles[i].id}
            riskScore={this.props.tiles[i].risk_level}
        />
    }
    render() {
        return (
            <>
                {this.renderGrid(this.props.num_rows, this.props.num_cols)}
            </>

        )
    }
}
