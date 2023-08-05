import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types.js'
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ children, item, dragItem }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'ingredient',
            item: () => ({ item }),
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        }),
        [item, dragItem],
    )

    const [, drop] = useDrop(
        () => ({
            accept: 'ingredient',
            drop: (draggedItem) => {
                if (draggedItem.item.dateValue !== item.dateValue) {
                    dragItem(draggedItem.item.dateValue, item.dateValue);
                }
            },
        }),
        [dragItem],
    )




    return (
        <section
            ref={(node) => drag(drop(node))}
        >
            {children}
        </section>
    );
}

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    item: ingredientType.isRequired,
    dragItem: PropTypes.func.isRequired
};

export default DraggableItem;
