import React from 'react'
import LeftPanel from '../components/leftpanel'
import Main from '../containers/main'
import RightPanel from '../components/rightpanel'
class App extends React.Component{
    constructor(props,context){
      super(props,context);
      this.state = {
         controlCol:{
             type:'',
             title:'',
             tipmsg:'',
             required:false
         }
      }
    } 
    control({type,title,tipmsg,required}){
      this.setState({
          controlCol:{
              type:type,
              title:title,
              tipmsg:tipmsg,
              required:required
          }
      })
    }
    render(){
        return (
          <div>
              <LeftPanel/>
              <Main funControl={(val) => this.control(val)} currentControlValue={this.state.controlCol}/>
              <RightPanel currentControl = {this.state.controlCol} transferTitle = { val => this.transferTitle(val)} transferTipMsg = {val => this.transferTipMsg(val)} transferRequired={val => this.transferRequired(val)}/>
          </div>
        )
    }
    transferTitle( title ){
        this.setState( preState => {
            return {
                controlCol:{
                   type:preState.controlCol.type,
                   title: title,
                   tipmsg:preState.controlCol.tipmsg,
                   required:preState.controlCol.required,
               }
            }
        })
    }
    transferTipMsg(tipmsg){
        this.setState( preState => {
            return {
                controlCol:{
                   type: preState.controlCol.type,
                   title: preState.controlCol.title,
                   tipmsg: tipmsg,
                   required: preState.controlCol.required,
               }
            }
        })
    }
    transferRequired(required){
        this.setState( preState => {
            return {
                controlCol:{
                   type: preState.controlCol.type,
                   title: preState.controlCol.title,
                   tipmsg:preState.controlCol.tipmsg,
                   required: required,
               }
            }
        })
    }
}
export default App