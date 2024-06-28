import { ComponentWithCustomHtmlTagProps } from './definitions';

import styles from './styles.module.scss';

function ComponentWithCustomHtmlTag(props: ComponentWithCustomHtmlTagProps) {
  const { children, className, label } = props;

  return (
    <section className={styles['component-with-custom-html-tag']}></section>
  );
}

export default ComponentWithCustomHtmlTag;
