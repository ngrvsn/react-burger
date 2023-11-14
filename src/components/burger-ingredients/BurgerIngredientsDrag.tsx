import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredientProps } from '../../utils/types';

type TDraggableItemProps = {
  children: React.ReactNode;
  item: TIngredientProps; 
  className: string;
}

const DraggableItem: React.FC<TDraggableItemProps> = ({ children, item, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  const [, drop] = useDrop(
    () => ({
      accept: item.type,
      collect: (monitor) => ({
        isHover: monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: item.type,
      item: () => item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  drag(drop(ref));

  const opacity = isDragging ? 0.3 : 1;
  const filter = isHover ? '2px solid' : 'none';

  return (
    <div
      ref={ref}
      style={{ opacity, filter }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
    >
      {children}
    </div>
  );
};


export default DraggableItem;
