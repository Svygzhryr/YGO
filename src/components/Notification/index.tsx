import { FC } from 'react';
import styles from './Notification.module.scss';

interface INotificationProps {
  active: boolean;
}

export const Notification: FC<INotificationProps> = ({ active }) => {
  return <div className={`${styles.wrapper} ${active && styles.active}`}>Data changed!</div>;
};
