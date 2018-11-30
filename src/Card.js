import React, { Component } from 'react';
import { compose } from 'ramda';
import { DragSource, DropTarget } from 'react-dnd';

const Types = {
    CARD: 'card'
}

const itemSource = {
    beginDrag(props) {
     return props
    },
    endDrag(props) {
        return props
    }
}  
const itemTarget = {
    drop(props, monitor) {
        const sourceObj = monitor.getItem();
        props.onDrop(props.children, sourceObj.children);
        return props
    },
} 

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Card extends Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget} = this.props;
    return connectDragSource(connectDropTarget(
        <li style={{ opacity: isDragging ? 0 : 1}} className="Card">
            {this.props.children}
        </li>
    ));
  }
}

export default compose(
    DragSource(Types.CARD, itemSource, collectSource),
    DropTarget(Types.CARD, itemTarget, collectTarget)
)(Card);