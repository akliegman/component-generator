import { kebabCase, camelCase, snakeCase } from 'change-case';

import { HTML_TAGS_SELF_CLOSING } from '../constants.js';

const getCase = (caseType, name) => {
  switch (caseType) {
    case 'camel':
      return camelCase(name);
    case 'kebab':
      return kebabCase(name);
    case 'snake':
      return snakeCase(name);
    default:
      return name;
  }
};

const getComponentFileName = (argv) => {
  const { name, format } = argv;
  return format === 'named' ? name : 'index';
};

const getPropsArray = (props) => {
  return props ? props.split(',').map((prop) => prop.trim()) : [];
};

const getStyleFileName = (argv) => {
  const { format, name, styleType } = argv;

  return format === 'named'
    ? `${name}.module.${styleType}`
    : `styles.module.${styleType}`;
};

const getTypeFileName = (argv) => {
  const { name, format } = argv;
  return format === 'named' ? `${name}.d` : 'definitions';
};

const generateComponentTemplate = (argv) => {
  const {
    name,
    props,
    printReactImportStatement,
    htmlTag,
    componentType,
    skipStyles,
    styleCase,
  } = argv;

  const typeFileName = getTypeFileName(argv);
  const styleName = getCase(styleCase, name);
  const styleFileName = getStyleFileName(argv);
  const propsArray = getPropsArray(props);
  const selfClosingTag = HTML_TAGS_SELF_CLOSING.includes(htmlTag);

  let importStatements = '';

  if (printReactImportStatement)
    importStatements += `import React from 'react';\n\n`;

  importStatements += `import { ${name}Props } from './${typeFileName}';\n\n`;

  if (!skipStyles)
    importStatements += `import styles from './${styleFileName}';\n\n`;

  const returnStatement = !skipStyles
    ? selfClosingTag
      ? `return <${htmlTag} className={styles['${styleName}']} />;`
      : `return <${htmlTag} className={styles['${styleName}']}></${htmlTag}>;`
    : selfClosingTag
      ? `return <${htmlTag} />;`
      : `return <${htmlTag}></${htmlTag}>;`;

  const spreadPropsStatement =
    propsArray.length > 0
      ? `const { ${propsArray.join(', ')} } = props;\n\n`
      : '\n\n';

  if (componentType === 'const') {
    return `${importStatements}
export const ${name}: React.FC<${name}Props> = (props) => {
  ${spreadPropsStatement}
  ${returnStatement}
};`;
  } else {
    return `${importStatements}
function ${name}(props: ${name}Props) {
  ${spreadPropsStatement}
  ${returnStatement}
}

export default ${name};`;
  }
};

const generateStyleTemplate = (argv) => {
  const { name, styleCase } = argv;

  const styleName = getCase(styleCase, name);
  return `.${styleName} {
  /* Add styles here */
}`;
};

const generateTypeTemplate = (argv) => {
  const { name, props, propTypes } = argv;

  const propsArray = getPropsArray(props);
  const propTypesArray = propTypes
    ? propTypes.split(',').map((type) => type.trim())
    : [];

  return `export interface ${name}Props {
  ${propsArray.map((prop, index) => `${prop}: ${propTypesArray[index] || 'any'};`).join('\n  ')}
}`;
};

export {
  getCase,
  getComponentFileName,
  getPropsArray,
  getStyleFileName,
  getTypeFileName,
  generateComponentTemplate,
  generateStyleTemplate,
  generateTypeTemplate,
};
