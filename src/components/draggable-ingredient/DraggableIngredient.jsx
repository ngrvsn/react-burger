import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { deleteConstructorItem, sortConstructorItems } from '../../services/actions/items-constructor';
import styles from './DraggableIngredient.module.css'; 

const DragIngredient = ({ id, item, index, count }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const clickDelete = () => {
    dispatch(deleteConstructorItem(index));
  };

  const handleSort = (fromIndex, toIndex) => {
    return (dispatch) => {
      dispatch(sortConstructorItems(fromIndex, toIndex));
    };
  };

  const [, dragRef] = useDrag({
    type: 'sortItems',
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: 'sortItems',
    hover(item) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      setTimeout(() => {
        dispatch(handleSort(dragIndex, hoverIndex));
      }, 0);

      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <div ref={ref} className={styles.drag} style={{ cursor: 'move' }} id={id}>
      <DragIcon type='primary' />
      <ConstructorElement
        index={index}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        count={count}
        handleClose={clickDelete}
      />
    </div>
  );
};

DragIngredient.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default DragIngredient;
