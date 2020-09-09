import React from 'react';
import { Square } from './Square';
import { Button } from './Button';

export class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'isWhite':true,
      'grid':Array(19).fill().map(x => Array(19).fill(null)),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(){
    let newGrid = Array(19).fill().map(x => Array(19).fill(null));
    this.setState({'grid':newGrid});
  }

  handleClick(x, y){
    if (this.state.grid[x][y] === null){
      const g = this.state.grid;
      g[x][y] = this.state.isWhite === true ? 'w':'b';
      this.setState({'grid':g, 'isWhite':!this.state.isWhite})
    }
  }
  render(){
    const style={
             textAlign: "center",
             margin:"auto",
             height: "auto",
             width:"500px",
             border:"1px solid black",
             tableLayout:'fixed',
           };
    const g = this.state.grid;
    let turn = "White"
    if(!this.state.isWhite) {turn = "Black"}

    const board = g.map((row, i) => { return (
      <tr key={"row_"+i}>
        {row.map((col, j) => {
          const color_ = g[i][j] === null ? 'gray': g[i][j] === 'w' ? 'white':'black';
          return (
            <Square handleClick={()=>this.handleClick(i,j)} color={color_} key={i+"_"+j} />
              )
            }
          )
        }
      </tr>)
    });

    return (
      <div style={{ textAlign:'center'}}>
      <h2>Go Online</h2>
      <h4>{turn} Turn</h4>
      <div style={{margin: 'auto', width:"40%"}}>
      <table cellSpacing="0" style={style}>
        <tbody>
          {board}
        </tbody>
      </table>
      </div>
      <br />
      <Button onClick={this.handleReset} />
      </div>
    )
  }
}

export default Board;