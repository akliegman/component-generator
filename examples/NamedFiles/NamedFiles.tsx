import { NamedFilesProps } from './NamedFiles.d';

import styles from './NamedFiles.module.scss';

function NamedFiles(props: NamedFilesProps) {
  const { children, className, label } = props;

  return <div className={styles['named-files']}></div>;
}

export default NamedFiles;
