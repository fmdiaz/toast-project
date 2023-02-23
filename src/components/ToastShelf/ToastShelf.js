import React from 'react';

import styles from './ToastShelf.module.css';

function ToastShelf({children}) {
  return (
    <ol
      className={styles.wrapper}
      role='region'
      aria-live='assertive'
      aria-label='Notification'
    >
      {children}
    </ol>
  );
}

export default ToastShelf;
