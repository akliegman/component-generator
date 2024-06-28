import { NoStyleFileProps } from './definitions';

function NoStyleFile(props: NoStyleFileProps) {
  const { children, className, label } = props;

  return <div></div>;
}

export default NoStyleFile;
