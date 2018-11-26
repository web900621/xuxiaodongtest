import React from 'react'
class InputDetail extends React.Component{
    render(){
        return (
            <div>
                <div className="wf-sidepanel-head">单行输入框</div>
                <div className="wf-settings-pane">
                 <div className="wf-form wf-widgetsettings">
                   <div className="wf-setter-field wf-setting-label">
                     <div className="fieldname">标题
                       <span className="fieldinfo">最多20字</span>
                     </div>
                     <div className="fieldblock">
                       <input type="text"  defaultValue="单行输入框4345635635"/>
                     </div>
                     <div className="wf-setter-field wf-setting-placeholder">
                        <div className="fieldname">
                        提示文字<span className="fieldinfo ">最多50字</span>
                        </div>
                        <div className="fieldblock"> 
                          <input type="text"  defaultValue="请输入"/>
                          <div className="fieldtips">内容最多可填写1000个字</div>
                        </div>
                     </div>
                     <div className="wf-setter-field wf-setting-required">
                       <div className="fieldname">验证</div>
                       <label className="fieldblock">
                          <label className="ant-checkbox-wrapper">
                             <span className="ant-checkbox" ref="span">
                                <input type="checkbox" className="ant-checkbox-input"  data-spm-anchor-id="0.0.0.i39.42024490wefppO" onClick={this.onClick.bind(this)} ref="checkBox"/>
                                <span className="ant-checkbox-inner"></span>
                             </span>
                             <span>（必填）</span>
                          </label>
                        </label>
                     </div>
                   </div>
                 </div>
                </div>
            </div>
        )
    }
    onClick(){
       this.refs.span.classList.toggle('ant-checkbox-checked')
    }
    
}
export default InputDetail