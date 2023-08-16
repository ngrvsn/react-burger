import notFoundImage from '../../images/page not found.png'; 

import styles from './not-found.module.css';

export function NotFoundPage(): JSX.Element {
  return (
    <main className={styles.main}>
      <img src={notFoundImage} alt="Not Found" className={styles.image} />
    </main>
  );
}