import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Contacts } from "../../components/contacts/Contacts";
import axios from "axios";
import styles from "./connect-form.module.scss";

interface IFormState {
  name: string;
  email: string;
  problem: string;
}

export const ConnectForm: React.FC = () => {
  const initialFormState: IFormState = {
    name: "",
    email: "",
    problem: "",
  };
  const [formState, setFormState] = useState<IFormState>(initialFormState);
  const [message, setMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const { name, email, problem } = formState;
    setIsDisabled(!(name && email && problem));
  }, [formState]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValidEmail = validateEmail(formState.email);
    if (!isValidEmail) {
      setMessage("Некорректный e-mail");
      return;
    }

    try {
      const response = await axios.post("/awahawjnawejawhawh", formState, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Ваш вопрос отправлен");
        setFormState(initialFormState);
      } else {
        setMessage("Ошибка отправки вопроса");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setMessage("Ошибка отправки вопроса");
    }
  };

  const validateEmail = (email: string): boolean => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.header}>
        Если у вас есть какой-то вопрос, задайте его нам!
      </h2>
      <form className={styles.inputs} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="name"
          type="text"
          placeholder="Как вас зовут?"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="email"
          type="text"
          placeholder="Ваш E-mail для связи"
          value={formState.email}
          onChange={handleChange}
        />
        <textarea
          className={styles.descriptionProblem}
          name="problem"
          placeholder="Опишите вашу проблему"
          value={formState.problem}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit" disabled={isDisabled}>
          <span className={styles.buttonText}>Отправить</span>
        </button>
        {message && <p className={styles.messageRequest}>{message}</p>}
      </form>
      <div className={styles.contactBlock}>
        <Contacts />
      </div>
    </main>
  );
};
