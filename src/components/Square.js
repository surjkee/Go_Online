import React from 'react';

export class Square extends React.Component{
  render(){
    const color_ = this.props.color;
    return (
      <td
        style={{
          overflow:'hidden',
          width:'auto',
          height:'auto',
          backgroundColor:'gray',
          color:'red',
          boarderColor: 'black',
          border:".5px solid black"
        }}
      onClick={this.props.handleClick} >
        <div
          style={{color:color_,
                  border:"1px solid",
                  backgroundColor: color_,
                  borderRadius: "50%",
                  borderColor: color_,
                  height:'100%'}} >
        </div>
      </td>
    )
  }
}