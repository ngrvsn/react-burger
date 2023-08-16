import { FC, HTMLAttributes } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { TIngredientProps } from '../../utils/types';

type TDraggableProps = {
    item: TIngredientProps;
    dragItem: Function;
} & HTMLAttributes<HTMLHtmlElement>;

const DraggableItem: FC<TDraggableProps> = ({ children, item, dragItem, className,  }) => {
    const [, drag] = useDrag(
        () => ({
            type: 'ingredient',
            item: { item },
        }),
        [item]
    );

    const [, drop] = useDrop(
        () => ({
            accept: 'ingredient',
            drop: (draggedItem: { item: TIngredientProps }) => {
                if (draggedItem.item.dateValue !== item.dateValue) {
                    dragItem(draggedItem.item.dateValue, item.dateValue);
                }
            },
        }),
        [dragItem]
    );

    return (
        <section
            ref={(node) => drag(drop(node))}
        >
            {children}
        </section>
    );
}

export default DraggableItem;
