import NotificationContext from "@/store/notificationContext";
import React, { useContext } from "react";
import Notification from "../notification/notification";
import MainHeader from "./mainHeader";

const Layout = (props) => {
  const notificationCntxt = useContext(NotificationContext);

  const activeNotification = notificationCntxt.notification;
  return (
    <>
      <MainHeader></MainHeader>
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
