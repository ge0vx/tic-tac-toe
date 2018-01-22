import React from "react";
import ReactDom from "react-dom";
import Board from "../_components/Board.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid_size: 3
        };
    }

    init() {
        // Saves numbers of moves made
        this.moves = 0;

        this.setState({
            data: {}
        });
    }

    render() {
        return (
            <div>
                <Board data={this.state.data} grid_size={this.state.grid_size} />
            </div>
        );
    }

    componentWillMount() {
        this.init();
    }
}

export {App};