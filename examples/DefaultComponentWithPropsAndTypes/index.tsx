import { DefaultComponentWithPropsAndTypesProps } from './definitions';

import styles from './styles.module.scss';

function DefaultComponentWithPropsAndTypes(
  props: DefaultComponentWithPropsAndTypesProps,
) {
  const { children, className, label } = props;

  return (
    <div className={styles['default-component-with-props-and-types']}></div>
  );
}

export default DefaultComponentWithPropsAndTypes;
