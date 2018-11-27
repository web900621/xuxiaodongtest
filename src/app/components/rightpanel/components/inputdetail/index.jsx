import React from "react";
class InputDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { show } = this.props;
    const {title,required} = this.props.currentControl;
    return (
      <div style={{ display: show ? "block" : "none" }}>
        <p>{this.props.msg}</p>
        <div className="wf-sidepanel-head">单行输入框</div>
        <div className="wf-settings-pane">
          <div className="wf-form wf-widgetsettings">
            <div className="wf-setter-field wf-setting-label">
              <div className="fieldname">
                标题
                <span className="fieldinfo">最多20字</span>
              </div>
              <div className="fieldblock">
                <input
                  type="text"
                  defaultValue={title}
                  onChange={() => this.handleTitleChange()}
                  ref='title'
                />
              </div>
              <div className="wf-setter-field wf-setting-placeholder">
                <div className="fieldname">
                  提示文字<span className="fieldinfo ">最多50字</span>
                </div>
                <div className="fieldblock">
                  <input type="text" defaultValue="请输入" ref="tipmsg"  onChange={() => this.handleTipMsg()}/>
                  <div className="fieldtips">内容最多可填写1000个字</div>
                </div>
              </div>
              <div className="wf-setter-field wf-setting-required">
                <div className="fieldname">验证</div>
                <label className="fieldblock">
                  <label
                    className={`ant-checkbox-wrapper`}
                  >
                    <span className={`ant-checkbox ${required ? 'ant-checkbox-checked':''}`}>
                      <input
                        type="checkbox"
                        className="ant-checkbox-input"
                        data-spm-anchor-id="0.0.0.i39.42024490wefppO"
                        onChange={() => this.handleRequired()}
                        ref="required"
                      />
                      <span className="ant-checkbox-inner" />
                    </span>
                    <span>（必填）</span>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleClick() {
    this.setState({
      required: !this.state.required
    });
  }
  handleTitleChange() {
    this.props.transferTitle(this.refs.title.value);
  }
  handleRequired(){
    this.props.transferRequired(this.refs.required.checked);
  }
  handleTipMsg(){
    this.props.transferTipMsg(this.refs.tipmsg.value);
  }
}
export default InputDetail;
