import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';


const DroppableArea = ({ droppableId, items}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='text-center space-y-2'
        >

          {items.map((item, index) => (
            <DraggableItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableArea;
