import React from 'react'
import InputComponent from './components/input'
import './style.scss'
class LeftPanel extends React.Component{
    render() {
      return (
         <div className="ant-tabs-content ant-tabs-content-animated">
            <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
              <div className="wf-panel">
                <InputComponent/>
              </div>   
            </div>
         </div>
         )
    }
}
export default LeftPanel