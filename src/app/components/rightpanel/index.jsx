import React from 'react'
import InputDetail from './components/inputdetail'
class RightPanel extends React.Component{
    render(){
      return (
         <div className="wf-panel wf-settingpanel open">
           <InputDetail/>
         </div>
      )
    }
}
export default RightPanel