import React from 'react';
import {useEscapeKey} from '../../hooks/hooks';
import {ToastContext} from '../ToastProvider';
import Button from '../Button';
import ToastShelf from '../ToastShelf';
import Toast from '../Toast';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [message, setMessage] = React.useState('');
  const [messageVariant, setMessageVariant] = React.useState('notice');
  
  const {toasts, addToast, dismissToast, dismissAllToasts} = React.useContext(ToastContext);

  useEscapeKey(dismissAllToasts);

  function handleSubmit(event) {
    event.preventDefault();
    addToast(message, messageVariant);
    setMessage('');
    setMessageVariant('notice');
  }

  function handleDismiss(id) {
    dismissToast(id);
  }


  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf>
        { toasts.map(({id, content, variant}) => (
            <li key={id}>
              <Toast variant={variant} id={id} handleDismiss={handleDismiss}>
                {content}
              </Toast>
            </li>
        ))}
      </ToastShelf>
      
      <form
      className={styles.controlsWrapper}
      onSubmit={(event)=>handleSubmit(event)}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event)=>(setMessage(event.target.value))}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variant)=>(
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type='radio'
                  name='variant'
                  checked={messageVariant === variant}
                  value={variant}
                  onChange={event => {
                    setMessageVariant(event.target.value);
                  }}
                />
                {variant}
              </label>
            ))}
            
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
