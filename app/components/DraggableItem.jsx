import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableItem = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? '#e0e0e0' : '#ffffff', // Change color when dragging
          }}
          className='text-xs px-2 py-2 w-[298px] h-[48px] rounded-[12px] text-stone-600 shadow-lg'
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
