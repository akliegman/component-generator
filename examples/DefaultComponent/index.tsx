import { DefaultComponentProps } from './definitions';

import styles from './styles.module.scss';

function DefaultComponent(props: DefaultComponentProps) {
  return <div className={styles['default-component']}></div>;
}

export default DefaultComponent;
