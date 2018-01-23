import React from "react";
import ReactDom from "react-dom";
import Board from "../_components/Board.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.moves = 0;
        this.state = {
            grid_size: 3,
            data: {},
            currentPlayer: ""
        };

        this.play = this.play.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
    }

    reset() {
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

    determineDraw(){
        //if all the grid is filled
        return (this.moves == Math.pow(this.state.grid_size, 2));
    }

    determineWinner(player) {
        //determinating a winner counting the number of filled player's mark ('X' or 'O') horizontally, vertically or diagonally. And compatiring this with the size of the grid
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

    changeBoard(e){
            this.setState({
                grid_size: parseInt(e.target.value)
            });
            this.reset();
    }

    render() {
        const nextPlayer = this.moves % 2 === 1 ? 'O' : 'X';
        const cPlayer = this.state.currentPlayer;
        let gameEnd = false;
        let gameOptions = <div>
                            <div className="subtitles">
                                <span>Board Size: </span>
                                <select className={"select-style"} value={this.state.grid_size} onChange={this.changeBoard}>
                                    <option value="3">
                                        3 X 3
                                    </option>
                                    <option value="4">
                                        4 X 4
                                    </option>
                                    <option value="5">
                                        5 X 5
                                    </option>
                                    <option value="10">
                                        10 X 10
                                    </option>
                                </select>
                            </div>
                            <div className="subtitles">
                                Next Player: <span className={nextPlayer}>{nextPlayer}</span>
                            </div>
                        </div>;
        
        if (this.determineWinner(cPlayer)) {
            gameEnd = true;
            gameOptions = <div>
                            <div className="subtitles">
                                Winner: <span className={cPlayer}>{cPlayer}</span>
                            </div>
                            <div className="subtitles">
                                <button className="btn" onClick={this.reset.bind(this)}>
                                    Reset
                                </button>
                            </div>
                        </div>;

        }else if (this.determineDraw()) {
            gameEnd = true;
            gameOptions = <div>
                            <div className="subtitles">
                                <span>Draw!</span>
                            </div>
                            <div className="subtitles">
                                <button className="btn" onClick={this.reset.bind(this)}>
                                    Reset
                                </button>
                            </div>
                        </div>;
        }
        
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                {gameOptions}
                <Board 
                    data={this.state.data}
                    grid_size={this.state.grid_size} 
                    play={this.play}
                    gameEnd={gameEnd}
                />
            </div>
        );
    }

}

export {App};