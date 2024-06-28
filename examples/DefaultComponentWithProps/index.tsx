import { DefaultComponentWithPropsProps } from './definitions';

import styles from './styles.module.scss';

function DefaultComponentWithProps(props: DefaultComponentWithPropsProps) {
  const { children, className, label } = props;

  return <div className={styles['default-component-with-props']}></div>;
}

export default DefaultComponentWithProps;
