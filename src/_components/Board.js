import React from 'react';
import ReactDom from "react-dom";
class Board extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const _this = this;
        const  arrayData = Array.apply(null, Array(_this.props.grid_size));
        const isGameEnded = this.props.gameEnd;
        
        return (
            <div className="board">
                <table>
                    <tbody>
                    {
                      arrayData.map(function(value, row_index){
                        return (
                            <tr key={row_index}>
                                {
                                  arrayData.map(function(value, column_index){
                                    return (
                                        !isGameEnded?
                                        <td key={column_index} 
                                            className={_this.props.data[row_index + '' + column_index]}
                                            onClick={function(){ _this.props.play(row_index, column_index)}}
                                        >
                                            {_this.props.data[row_index + '' + column_index]}
                                        </td>
                                        :
                                        <td key={column_index} 
                                            className={_this.props.data[row_index + '' + column_index]}
                                        >
                                            {_this.props.data[row_index + '' + column_index]}
                                        </td>
                                    )
                                  })
                                }
                            </tr>
                        )
                      })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Board;