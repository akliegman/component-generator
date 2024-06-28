import { ComponentWithCamelCaseStyleDefinitionsProps } from './definitions';

import styles from './styles.module.scss';

function ComponentWithCamelCaseStyleDefinitions(
  props: ComponentWithCamelCaseStyleDefinitionsProps,
) {
  const { children, className, label } = props;

  return (
    <div className={styles['componentWithCamelCaseStyleDefinitions']}></div>
  );
}

export default ComponentWithCamelCaseStyleDefinitions;
