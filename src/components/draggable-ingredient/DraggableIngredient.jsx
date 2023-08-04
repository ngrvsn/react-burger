import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ingredientType } from '../../utils/types.js';
import PropTypes from 'prop-types';
import { Counter, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const DraggableItem = ({ children, item, dragItem, isSortable, updateIngredientCounter }) => {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [count, setCount] = useState(item.count || 0);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: isSortable ? 'sort' : item.type,
      item: () => item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item, isSortable],
  );

  const [, drop] = useDrop(
    () => ({
      accept: isSortable ? 'sort' : item.type,
      collect: (monitor) => ({
        isHover: monitor.isOver(),
      }),
      drop: (draggedItem, monitor) => {
        if (isSortable && draggedItem.item.id !== item.id && monitor.isOver({ shallow: true })) {
          dragItem(draggedItem.item.id, item.id);
        }
      },
    }),
    [isSortable, dragItem],
  );

  drag(drop(ref));

  const opacity = isDragging ? 0.3 : 1;
  const filter = isHover ? '2px solid' : 'none';

  const handleIncrement = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    updateIngredientCounter(item.id, updatedCount);
  };

  const handleDecrement = () => {
    if (count > 0) {
      const updatedCount = count - 1;
      setCount(updatedCount);
      updateIngredientCounter(item.id, updatedCount); 
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity, filter }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >

      {children}
    </div>
  );
};

DraggableItem.propTypes = {
  children: PropTypes.node.isRequired,
  item: ingredientType.isRequired,
  dragItem: PropTypes.func,
  isSortable: PropTypes.bool,
  count: PropTypes.number,
  updateIngredientCounter: PropTypes.func 
};

export default DraggableItem;