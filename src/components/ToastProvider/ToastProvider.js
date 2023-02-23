import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({children}) {

  const [toasts, setToasts] = React.useState([]);

  console.info('ToastContext render')

  function addToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      content: message,
      variant: variant,
    };
    const nextToasts = [...toasts, newToast];
    //console.log({nextNotifications});
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast)=>{
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  function dismissAllToasts() {
    setToasts([]);
  }

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      dismissToast,
      dismissAllToasts,
    }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
