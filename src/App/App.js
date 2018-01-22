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
            data: {},
            currentPlayer: ""
        });
    }

    play(row_index, col_index) {
        if (this.state.data[row_index + '' + col_index]) {
            return;
        }

        //number of moves
        this.moves++;

        // Determinate player's turn
        const playerType = this.moves % 2 === 1 ? 'X' : 'O';

        this.setState({
            data:{
                ...this.state.data,
                [row_index + '' + col_index]: playerType
            },
            currentPlayer: playerType
        });
        
    }

    determineWinner(player) {
        const grid_size = this.state.grid_size;
        const currentData = this.state.data;
        let vertical_count = 0, horizontal_count = 0, right_to_left_count = 0, left_to_right_count = 0;

        for (let i = 0; i < grid_size; i++) {
            vertical_count = 0;
            horizontal_count = 0;

            for (let j = 0; j < grid_size; j++) {
                if (currentData[i + '' + j] == player) {
                    horizontal_count++;
                }
                if (currentData[j + '' + i] == player) {
                    vertical_count++;
                }
            }

            if (currentData[i + '' + i] == player) {
                left_to_right_count++;
            }

            if (currentData[(grid_size - 1 - i) + '' + i] == player) {
                right_to_left_count++;
            }

            if (horizontal_count == grid_size || vertical_count == grid_size) {
                return true;
            }

        }

        if (left_to_right_count == grid_size || right_to_left_count == grid_size) {
            return true;
        }

        return false;
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

    componentDidUpdate(){
        console.log(this.state);

        const cPlayer = this.state.currentPlayer;
        
        if (this.determineWinner(cPlayer)) {
            window.alert(cPlayer + " has won");
        }
    }
}

export {App};