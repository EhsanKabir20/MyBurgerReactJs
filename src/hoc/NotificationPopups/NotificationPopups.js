import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "react-notifications/lib/notifications.css";
import "./NotificationPopups.css";


class NotificationPopups extends React.Component {
  createNotification = (type, message, title, timeOut, callback, priority) => {
    switch (type) {
      case 'info':
          NotificationManager.info(message, title, timeOut, callback, priority);
          break;
      case 'success':
          NotificationManager.success(message, title, timeOut, callback, priority);
          break;
      case 'warning':
          NotificationManager.warning(message, title, timeOut, callback, priority);
          break;
      case 'error':
          NotificationManager.error(message, title, timeOut, callback, priority);
          break;
      default:
          NotificationManager.info(message, title, timeOut, callback, priority);
          break;            
    }
  };

  componentDidUpdate(){
     if(this.props.notification){
      let notification = this.props.notification;
      this.createNotification( notification.type, notification.message, notification.title, notification.timeOut, notification.callback, notification.priority);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.notification == null || ( this.props.notification != null &&  this.props.notification.message !== nextProps.notification.message );
  }
 

  render() {
    return (
      <div>
          <NotificationContainer/>
      </div>   
    );;
  }
}
 
export default NotificationPopups;