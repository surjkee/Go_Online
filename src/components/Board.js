import React from 'react';
import { Square } from './Square';
import { Button } from './Button';

const board_size = 9;
let move_details = "";

export class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'isWhite':true,
      'grid':Array(board_size).fill().map(x => Array(board_size).fill(null)),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(){
    let newGrid = Array(board_size).fill().map(x => Array(board_size).fill(null));
    this.setState({'isWhite':true});
    this.setState({'grid':newGrid});
  }

  handleClick(x, y){
    if (this.state.grid[x][y] === null){
      const g = this.state.grid;
      let current_color = this.state.isWhite === true ? 'w':'b';
      var neighbors = []; 
      if (x > 0)
          neighbors.push(g[x - 1][y]);
      if (y < board_size - 1)
          neighbors.push(g[x][y + 1]);
      if (x < board_size - 1)
          neighbors.push(g[x + 1][y]);
      if (y > 0)
          neighbors.push(g[x][y - 1]);
      
      if(!neighbors.includes(current_color) && !neighbors.includes(null)){
        console.log("Attempted suicide!");
        return;
      }
      
      console.log("Played at " + x + ", " + y);
      move_details = "Played at " + x + ", " + y;
      g[x][y] = this.state.isWhite === true ? 'w':'b';
      this.setState({'grid':g, 'isWhite':!this.state.isWhite});
      let check = 0;
      let visited_list = [];
      for(var i = 0; i<board_size; i++){
        for(var j = 0; j<board_size; j++){
          if(g[i][j] !== null){
            let queue = [[i, j]];
            while(queue.length > 0){
              let stone = queue.pop();
              if (g[stone[0]][stone[1]] !== null){
                visited_list.push([stone[0], stone[1]]);
                if (stone[0] > 0){
                  if(g[stone[0] - 1][stone[1]] === null){
                    visited_list = [];
                    break;
                  }
                  if(g[stone[0] - 1][stone[1]] === g[i][j] && visited_list.find(x=> (x[0] === (stone[0] - 1)) && (x[1] === stone[1])) === undefined)
                    queue.push([stone[0] - 1, stone[1]]);  
                }

                if (stone[1] < board_size - 1){
                  if(g[stone[0]][stone[1] + 1] === null){
                    visited_list = [];
                    break;
                  }
                  if(g[stone[0]][stone[1] + 1] === g[i][j] && visited_list.find(x=> (x[0] === stone[0]) && (x[1] ===  (stone[1] + 1))) === undefined)
                    queue.push([stone[0], stone[1] + 1]);
                }

                if (stone[0] < board_size - 1){
                  if(g[stone[0] + 1][stone[1]] === null){
                    visited_list = [];
                    break;
                  }
                  if(g[stone[0] + 1][stone[1]] === g[i][j] && visited_list.find(x=> (x[0] === (stone[0] + 1)) && (x[1] === stone[1])) === undefined)
                    queue.push([stone[0] + 1, stone[1]]);
                }

                if (stone[1] > 0){
                  if(g[stone[0]][stone[1] - 1] === null){
                    visited_list = [];
                    break;
                  }
                  if(g[stone[0]][stone[1] - 1] === g[i][j] && visited_list.find(x=> (x[0] === stone[0]) && (x[1] === (stone[1] - 1))) === undefined)
                    queue.push([stone[0], stone[1] - 1]);
                }
              }
            }
            while(visited_list.length > 0){
              let capture = visited_list.pop();
              g[capture[0]][capture[1]] = null;
            }
          }
        }
      }
    }
  }

  
  render(){
    const style={
             textAlign: "center",
             margin:"auto",
             height: "600px",
             width:"600px",
             border:"1px solid black",
             tableLayout:'fixed',
           };
    const g = this.state.grid;
    let turn = "White turn"
    if(!this.state.isWhite) {turn = "Black turn"}

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
      <h4>{turn}</h4>
      <div style={{margin: 'auto', width:"50%"}}>
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