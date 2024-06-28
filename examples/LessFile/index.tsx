import { LessFileProps } from './definitions';

import styles from './styles.module.less';

function LessFile(props: LessFileProps) {
  const { children, className, label } = props;

  return <div className={styles['less-file']}></div>;
}

export default LessFile;
