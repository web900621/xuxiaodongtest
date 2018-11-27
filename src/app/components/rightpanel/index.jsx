import React from "react";
import InputDetail from "./components/inputdetail";
class RightPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { type } = this.props.currentControl;
    return (
      <div className="wf-panel wf-settingpanel open">
        <p>{this.props.msg}</p>
        <InputDetail
          show = {type === 'input' ? true : false}
          {...this.props}
        />
      </div>
    );
  }
}
export default RightPanel;
