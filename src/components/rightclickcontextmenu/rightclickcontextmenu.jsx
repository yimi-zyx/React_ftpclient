import React, { Component } from 'react';
import './rightclickcontextmenu.less'
class RightClickContextMenu extends Component {
    state = {
        visible: false,
    }
    componentDidMount() {
        // 添加右键点击、点击事件监听
        document.addEventListener('contextmenu', this.handleContextMenu);
        document.addEventListener('click', this.handleClick);
        document.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        // 移除事件监听
        document.removeEventListener('contextmenu', this.handleContextMenu);
        document.removeEventListener('click', this.handleClick);
        document.addEventListener('scroll', this._handleScroll);
    }
     // 右键菜单事件
    handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({ visible: true });

        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const clickX = event.clientX
        const clickY = event.clientY
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW = window.innerWidth
        const screenH = window.innerHeight
        // 获取自定义菜单的宽度/高度
        const rootW = this.root.offsetWidth
        const rootH = this.root.offsetHeight

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right = (screenW - clickX) > rootW
        const left = !right
        const bottom = (screenH - clickY) > rootH
        const top = !bottom

        if (right) {
        this.root.style.left = `${clickX}px`
        }

        if (left) {
        this.root.style.left = `${clickX - rootW}px`
        }

        if (bottom) {
        this.root.style.top = `${clickY}px`
        }
        if (top) {
        this.root.style.top = `${clickY - rootH}px`
        }
    };

    //鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示
    handleClick = () => {
        const { visible } = this.state
        if (visible) {
        this.setState({ visible: false })
        }
    }
    render() {
        const { visible } = this.state;
        const vi=({...this.props}.visible)
        return (vi && visible ) &&(
            <div ref={(ref) => { this.root = ref }} className="contextMenu-wrap">
                <div className="contextMenu-option" role="button" onClick={this.props.onClickopen}>打开</div>
                <div className="contextMenu-option" role="button" onClick={this.props.onClickload}>下载</div>
                <div className="contextMenu-option" role="button" onClick={this.props.onClickmove}>移动到</div>
                <div className="contextMenu-option" role="button" onClick={this.props.onClickcopy}>复制到</div>
                <div className="contextMenu-separator"/>
                <div className="contextMenu-option" role="button" onClick={this.props.onClickrename}>重命名</div>
                <div className="contextMenu-option" role="button" onClick={this.props.onClickdelete}>删除</div>
            </div>
        );
    }
}

export default RightClickContextMenu;
