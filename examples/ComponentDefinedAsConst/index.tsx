import { ComponentDefinedAsConstProps } from './definitions';

import styles from './styles.module.scss';

export const ComponentDefinedAsConst: React.FC<ComponentDefinedAsConstProps> = (
  props,
) => {
  const { children, className, label } = props;

  return <div className={styles['component-defined-as-const']}></div>;
};
