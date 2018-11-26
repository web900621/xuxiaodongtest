import React from 'react'
import inputImg from '../../../../../assets/imgs/input/input.png'

class InputComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
                left:0,
                startX:0,
                startY:0,
                top:0,
                dragStart:false   
        }
    }
    render(){
        const {dragStart} = this.state
       return  ( 
            <div className={`wf-widgetsitem ${dragStart ? 'drag-start':''}`} data-spm-anchor-id="0.0.0.i16.42024490wefppO" ref="input" draggable 
            onDragStart={this.handleDragStart.bind(this)}
            onDrag={this.handleDrag.bind(this)}
            onDragEnd={this.handleDragEnd.bind(this)}>
                <label>单行输入框</label>
                <img className="widgeticon" src={ inputImg } alt="dd"/>
            </div>
       )      
    }
    componentDidMount(){}
    handleDragStart(e){
      e.dataTransfer.setData('tag',JSON.stringify({tag:'new',type:'input'}))
      window.sessionStorage.setItem('tag','new');
      this.setState({
            startX:e.nativeEvent.offsetX,
            startY:e.nativeEvent.offsetY,
            dragStart:true
      }) 
    }
    handleDrag(e){
        let x = e.pageX;
        let y = e.pageY;
        x -= this.state.startX;
        y -= this.state.startY;
        this.setState({
            left:x,
            top:y
        }) 
        window.sessionStorage.setItem('newtop',this.state.top);     
    }
    handleDragEnd(e){
        this.setState({
            dragStart:false
        })
          
    }
}
export default InputComponent