import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addItemConstructor } from '../../services/actions/items-constructor';
import DraggableIngredient from '../draggable-ingredient/DraggableIngredient';

const IngredientsBoard = ({ board, classIngredients, items }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (itemId) => {
      const selectedIngredient = ingredients.reduce((selected, item) => {
        if (item._id === itemId.id) {
          return item;
        }
        return selected;
      }, null);
      if (selectedIngredient) {
        dispatch(addItemConstructor(selectedIngredient));
      }
    },
  });

  const border = isHover ? '3px solid' : '1px solid transparent';

  return (
    <div ref={drop} board={board} style={{ border }}>
      {(() => {
        if (items.length === 0) {
          return <div className={classIngredients}>Выберите ингредиенты</div>;
        } else {
          return items.map((elem, index) => (
            
            <DraggableIngredient
              key={elem.id}
              index={index}
              item={elem}
              id={elem._id}
              
            />
          ));
        }
      })()}
    </div>
  );
};

IngredientsBoard.propTypes = {
  items: PropTypes.array.isRequired,
  board: PropTypes.string.isRequired,
  classIngredients: PropTypes.string,
};

export default IngredientsBoard;
