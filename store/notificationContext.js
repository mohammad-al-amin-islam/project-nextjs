const { createContext, useState, useEffect } = require("react");

const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationProvider(props) {
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    if (
      notifications && (notifications.status === "success" ||
      notifications.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotifications(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notifications]);

  const showNotificationHandler = (data) => {
    setNotifications(data);
  };
  const hideNotificationHandler = () => {
    setNotifications(null);
  };
  const context = {
    notification: notifications,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
