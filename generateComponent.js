#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    description: 'The name of the component to generate',
    type: 'string',
    demandOption: true,
  })
  .option('props', {
    alias: 'p',
    description: 'Comma-separated list of prop names for the component',
    type: 'string',
    default: '',
  })
  .option('propTypes', {
    alias: 'pt',
    description: 'Comma-separated list of prop types for the component',
    type: 'string',
    default: '',
  })
  .option('target', {
    alias: 't',
    description: 'Target directory for the component',
    type: 'string',
    default: 'src/components',
  })
  .help()
  .alias('help', 'h').argv;

const componentName = argv.name;
const props = argv.props
  ? argv.props.split(',').map((prop) => prop.trim())
  : [];
const propTypes = argv.propTypes
  ? argv.propTypes.split(',').map((type) => type.trim())
  : [];
const targetDir = path.resolve(__dirname, argv.target);
const componentDir = path.join(targetDir, componentName);

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const typeDefinition =
  props.length > 0
    ? `
export interface ${componentName}Props {
  ${props.map((prop, index) => `${prop}: ${propTypes[index] || 'React.ReactNode'};`).join('\n  ')}
}
`
    : `
export interface ${componentName}Props {}
`;

const componentTemplate =
  props.length > 0
    ? `
import React from 'react';
import styles from './${componentName}.module.scss';
import { ${componentName}Props } from './${componentName}.d';

const ${componentName}: React.FC<${componentName}Props> = ({ ${props.join(', ')} }) => {
  return <div className={styles.${componentName}}>{${props.includes('children') ? 'children' : ''}}</div>;
};

export default ${componentName};
`
    : `
import React from 'react';
import styles from './${componentName}.module.scss';
import { ${componentName}Props } from './${componentName}.d';

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return <div className={styles.${componentName}}>{props.children}</div>;
};

export default ${componentName};
`;

const scssTemplate = `
.${componentName} {
  /* Add styles here */
}
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentTemplate.trim(),
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.scss`),
  scssTemplate.trim(),
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.d.ts`),
  typeDefinition.trim(),
);

const files = [
  path.join(componentDir, `${componentName}.tsx`),
  path.join(componentDir, `${componentName}.module.scss`),
  path.join(componentDir, `${componentName}.d.ts`),
];

files.forEach((file) => {
  execSync(`npx prettier --write ${file}`);
});

console.log(
  `Component ${componentName} created and prettified successfully in ${componentDir}!`,
);
