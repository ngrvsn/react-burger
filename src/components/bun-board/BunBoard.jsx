import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addItemConstructor } from '../../services/actions/items-constructor';

const BunBoard = ({ board, title, type, classBun, items }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.ingredients);

  const handleDrop = item => {
    const ingredient = ingredients.find(ingredient => ingredient._id === item.id);
    if (ingredient) {
      dispatch(addItemConstructor(ingredient));
    }
  };

  const [{ isHover, canDrop }, drop] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: item => {
      handleDrop(item);
    },
  });

  const useBordStyle = () => {
    if (isHover) {
      if (canDrop) {
        return '3px solid';
      } else {
        return '1px solid transparent';
      }
    } else {
      return '';
    }
  };

  const renderItems = () => {
    if (items.length === 0) {
      return <div className={classBun}>Выберите булку</div>;
    }
    return items.map(item => (
      <ConstructorElement
        key={item.id}
        data={item}
        type={type}
        isLocked={true}
        text={item.name + title}
        price={item.price}
        thumbnail={item.image}
        id={item._id}
      />
    ));
  };

  return (
    <div ref={drop} board={board} style={{ border: useBordStyle() }}>
      {renderItems()}
    </div>
  );
};

BunBoard.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  board: PropTypes.string.isRequired,
  classBun: PropTypes.string
};

export default BunBoard;
