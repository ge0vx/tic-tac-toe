import React from "react";
import ReactDom from "react-dom";
import Board from "../_components/Board.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid_size: 3
        };

        this.play = this.play.bind(this);
    }

    init() {
        //number of moves
        this.moves = 0;

        this.setState({
            data: {}
        });
    }

    play(row_index, col_index) {
        console.log(row_index);
        console.log(col_index);
        //number of moves
        this.moves++;

        // Determinate player's turn
        const playerType = this.moves % 2 === 1 ? 'X' : 'O';

        this.setState({
            data:{
                ...this.state.data,
                [row_index + '' + col_index]: playerType
            }
        });
        
    }

    render() {
        return (
            <div>
                <Board 
                    data={this.state.data} 
                    grid_size={this.state.grid_size} 
                    play={this.play}
                />
            </div>
        );
    }

    componentWillMount() {
        this.init();
    }
}

export {App};