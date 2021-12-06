import React from "react";
import Tile from "./Tile";
import domain from "../../../utils/site-domain";
import googleDomain from "../../../utils/google-drive-domain";

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
