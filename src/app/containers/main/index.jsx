import React from "react";
import InputIns from "./subpage/inputins";
import "./style.scss";
class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      containers: [],
      dragEnter: false,
      index: null
    };
  }
  render() {
    const { dragEnter, index } = this.state;
    const _this_ = this;
    return (
      <div className="wf-main">
        <div className="wf-formcanvas">
          <div
            className={`wf-formcanvas-inner ${dragEnter ? "drag-enter" : ""}`}
            ref="dropbody"
            onDragEnter={this.handleDragEnter.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            onDragLeave={this.handleDragLeave.bind(this)}
            onDrop={this.handleDrop.bind(this)}
          >
            <div className="wf-formcanvas-body dropbody" ref="container">
              {index === -1 ? <div className="wf-dragging-mark" /> : ""}
              {this.state.containers.map((val, i) => {
                return (
                  <div key={i}>
                    <InputIns
                      del={_this_.handleDelete.bind(_this_)}
                      index={i}
                      active={val.active}
                      selectedInput={_this_.selectedInput.bind(_this_)}
                    />
                    {index === i ? <div className="wf-dragging-mark" /> : ""}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // window.debounce = function(fun,delay){
    //   var timer = null;
    //   return function(){
    //     var context = this;
    //     var args = [].slice.call(arguments);
    //     if(timer){clearTimeout(timer)}
    //     var doNow = !timer
    //     timer = setTimeout(function(){
    //        timer = null;
    //     },delay)
    //     if(doNow){
    //       fun.apply(context,args)
    //     }
    //   }
    // }
  }
  selectedInput(index) {
    this.setState(preState => {
      preState.containers.forEach((val, i, arr) => {
        if (index === i) {
          arr[i].active = true;
        } else {
          arr[i].active = false;
        }
      });
      return { containers: preState.containers };
    });
  }
  handleDelete(index) {
    this.setState(preState => {
      return { continers: preState.containers.splice(index, 1) };
    });
  }
  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      dragEnter: true
    });
  }
  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    // alert(e.dataTransfer.getData('tag'))
    // const { tag: tag, type: type } = JSON.parse(e.dataTransfer.getData("tag"));
    const tag = window.sessionStorage.getItem("tag");
    switch (tag) {
      case "new":
        
        this.doNewAction();
        break;
      case "move":
        this.doMoveAction();
    }
  }
  doNewAction() {
    this.checkNewBoundary();
  }
  doMoveAction() {
    switch (this.isUpOrDown()) {
      case "up":
        this.checkMoveUpBoundary();
        return;
      case "down":
        this.checkMoveDownBoundary();
    }
  }
  isUpOrDown() {
    const topStart = this.getMoveStartTop();
    const moveTop = this.getMoveTop();
    return moveTop < topStart ? "up" : "down";
  }
  getMoveStartTop() {
    return window.sessionStorage.getItem("movestart");
  }
  checkMoveUpBoundary() {
    //1 获取movetag
    const dragoffsetTop = this.getMoveTop();
    const parentOffsetTop = this.refs.dropbody.offsetTop;
    const children = this.refs.container.children;
    const _this_ = this;
    [].forEach.call(children, (elem, index) => {
      const offsetTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;
      const uplevel = parentOffsetTop + offsetTop + elemHeight / 2;
      const downlevel = parentOffsetTop + offsetTop + elemHeight;
      if (index === 0 && dragoffsetTop < uplevel) {
        _this_.setState({
          index: -1
        });
        return;
      }
      if (dragoffsetTop > uplevel && dragoffsetTop < downlevel) {
        _this_.setState({
          index: index
        });
        // return
      }
    });
  }
  checkMoveDownBoundary() {
    //1 获取movetag
    const dragoffsetTop = this.getMoveTop();
    const parentOffsetTop = this.refs.dropbody.offsetTop;
    const children = this.refs.container.children;
    const _this_ = this;
    [].forEach.call(children, (elem, index) => {
      const offsetTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;
      const uplevel = parentOffsetTop + offsetTop + elemHeight / 2;
      const downlevel = parentOffsetTop + offsetTop + elemHeight;
      if (index === 0 && dragoffsetTop < uplevel) {
        _this_.setState({
          index: -1
        });
        return;
      }
      if (dragoffsetTop > uplevel && dragoffsetTop < downlevel) {
        _this_.setState({
          index: index
        });
        // return
      }
    });
  }
  getNewTop() {
    return window.sessionStorage.getItem("newtop");
  }
  getMoveTop() {
    return window.sessionStorage.getItem("movetop");
  }
  checkNewBoundary() {
    if (!this.isHasChildren()) {
      this.setState(preState => {
        return { index: -1 };
      });
      return;
    }
    const dragoffsetTop = this.getNewTop();
    const parentOffsetTop = this.refs.dropbody.offsetTop;
    const children = this.refs.container.children;
    const _this_ = this;
    [].forEach.call(children, (elem, index) => {
      //获取元素的offsetTop = 15
      const offsetTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;
      const uplevel = parentOffsetTop + offsetTop + elemHeight / 2;
      const downlevel = parentOffsetTop + offsetTop + elemHeight;
      if (index === 0 && dragoffsetTop < uplevel) {
        _this_.setState({
          index: -1
        });
        return;
      }
      if (dragoffsetTop > uplevel && dragoffsetTop < downlevel) {
        _this_.setState({
          index: index
        });
        return;
      }
    });
  }
  isHasChildren() {
    return this.refs.container.children.length > 0 ? true : false;
  }
  handleDragLeave() {
    this.setState({
      dragEnter: false,
      index: null
    });
  }
  handleDrop(e) {
    let dragIndex = this.state.index;
    const { tag: tag, type: type } = JSON.parse(e.dataTransfer.getData("tag"));
    switch (tag) {
      case "new":
        this.setState(preState => {
          preState.containers.forEach((val, i, arr) => {
            arr[i].active = false;
          });
          const containers = preState.containers.splice(dragIndex, 0, {
            type: type,
            active: true
          });
          return {
            containers: preState.containers
          };
        });
        break;
      case "move":
        const moveIndex = window.sessionStorage.getItem("moveIndex") * 1;
        switch (this.isUpOrDown()) {
          case "up":
            this.moveUp(dragIndex,moveIndex);
            break;
          case 'down':
            this.moveDown(dragIndex,moveIndex);
        }
        break;
    }
    this.setState({
      dragEnter: false,
      index: null
    });
  }
  moveUp(dragIndex,moveIndex){
    this.setState( preState => {
      (dragIndex === -1 || dragIndex == null) && (dragIndex = 0);
      if (moveIndex !== dragIndex) {
       const movetarget = preState.containers.splice(moveIndex, 1);
       preState.containers.splice(dragIndex+1,0,...movetarget)
      }
      return {
        containers: preState.containers
      };
     });
  }
  moveDown(dragIndex,moveIndex){
    this.setState(preState => {
      (dragIndex === -1 || dragIndex == null) && (dragIndex = 0);
      let move = this.deepClone(preState.containers[moveIndex]);
      let target = this.deepClone(preState.containers[dragIndex]);
      if (moveIndex !== dragIndex) {
        preState.containers.splice(moveIndex, 1, target);
        preState.containers.splice(dragIndex, 1, move);
      }
      return {
        containers: preState.containers
      };
    });
  }
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

}
export default Main;
