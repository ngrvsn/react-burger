import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import { Contacts } from "../../components/contacts/Contacts";
import styles from "./home.module.scss";

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
      <div className={styles.contacts}>
        <Contacts />
      </div>
    </main>
  );
};
