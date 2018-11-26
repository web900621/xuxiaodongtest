import React from "react";
// import dragImg from "../../../../../assets/imgs/input/drag.png";
class InputIns extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      left: 0,
      startX: 0,
      startY: 0,
      top: 0,
      hover: false,
      dragStart: false
    };
  }
  render() {
    const { active } = this.props;
    const { hover, dragStart } = this.state;
    return (
      <div
        className={`wf-component wf-component-textfield ${
          active ? "active" : ""
        } ${hover ? "hover" : ""} ${dragStart ? "drag-start" : ""}`}
        draggable
        onClick={this.handleClick.bind(this)}
        onMouseEnter={this.hanleMouseEnter.bind(this)}
        onMouseLeave={this.hanleMouseLeave.bind(this)}
        onDragStart={this.handleDragStart.bind(this)}
        onDrag={this.handleDrag.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}
      >
        <div
          className="wf-remove icon icon-close"
          onClick={this.onDelete.bind(this)}
        />
        <div className="wf-overlay wf-drag" />
        <div className="wf-view">
          <div className="wf-field">
            <label className="wf-field-label">
              单行输入框{this.props.index === 0 ? "" : this.props.index + 1}
            </label>
            {true ? (
              <span className="wf-field-placeholder">请输入</span>
            ) : (
              <span className="wf-field-placeholder">请输入（必填）</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
  handleClick() {
    this.props.selectedInput(this.props.index);
  }
  hanleMouseEnter() {
    this.setState({
      hover: true
    });
  }
  hanleMouseLeave() {
    this.setState({
      hover: false
    });
  }
  onDelete() {
    this.props.del(this.props.index);
  }
  handleDragStart(e) {
    // var img = new Image();
    // img.src = `${dragImg}`;
    // img.width = "20px";
    // e.dataTransfer.setDragImage(img, -10, -10);
    e.dataTransfer.setData(
      "tag",
      JSON.stringify({ tag: "move", type: "input" })
    );
    window.sessionStorage.setItem("tag", "move");
    window.sessionStorage.setItem("moveIndex", this.props.index);
    this.setState({
      startX: e.nativeEvent.offsetX,
      startY: e.nativeEvent.offsetY,
      dragStart: true
    });
    let x = e.pageX;
    let y = e.pageY;
    x -=  e.nativeEvent.offsetX;
    y -=  e.nativeEvent.offsetY;
    window.sessionStorage.setItem('movestart',y)
  }
  handleDrag(e) {
    let x = e.pageX;
    let y = e.pageY;
    x -= this.state.startX;
    y -= this.state.startY;
    this.setState(prevState=>{
    window.sessionStorage.setItem("movetop", y);
      return {
        left: x,
        top: y
      }
    });
  }
  handleDragEnd(e) {
    this.setState({
      dragStart: false,
      index: null
    });
    window.sessionStorage.setItem("movetop", this.state.top);
  }
}
export default InputIns;
