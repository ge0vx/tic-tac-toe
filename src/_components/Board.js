import React from 'react';
import ReactDom from "react-dom";
class Board extends React.Component {
    render() {
        const  arrayData = Array.apply(null, Array(this.props.grid_size));
        return (
            <div className="board">
                <table>
                    <tbody>
                    {
                      arrayData.map((value, row_index) => {
                        return (
                            <tr key={row_index}>
                                {
                                  arrayData.map((value, column_index) => {
                                    return (
                                        <td key={column_index} className={this.props.data[row_index + '' + column_index]}>
                                            {this.props.data[row_index + '' + column_index]}
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