#!/usr/bin/env node

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

import { HTML_TAGS } from './constants.js';
import {
  generateComponentTemplate,
  generateStyleTemplate,
  generateTypeTemplate,
  getComponentFileName,
  getStyleFileName,
  getTypeFileName,
} from './utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    description: 'The name of the component to generate',
    type: 'string',
    demandOption: true,
  })
  .option('format', {
    alias: 'f',
    description:
      'The format of the files, either named (e.g. ComponentName.tsx and ComponentName.module.scss) or default (e.g. index.tsx or styles.module.scss)',
    type: 'string',
    choices: ['named', 'default'],
    default: 'default',
  })
  .option('props', {
    alias: 'p',
    description: 'Comma-separated list of prop names for the component',
    type: 'string',
    default: '',
  })
  .option('propTypes', {
    alias: 'pt',
    description:
      'Comma-separated list of prop types for the component. Must match the order of props',
    type: 'string',
    default: '',
  })
  .option('target', {
    alias: 't',
    description: 'Target directory for the component',
    type: 'string',
    default: 'src/components',
  })
  .option('htmlTag', {
    alias: 'html',
    description: 'HTML tag for the component (default: "div")',
    type: 'string',
    choices: HTML_TAGS,
    default: 'div',
  })
  .option('componentType', {
    alias: 'ct',
    description: 'Type of component to generate (const, function)',
    type: 'string',
    choices: ['const', 'function'],
    default: 'function',
  })
  .option('printReactImportStatement', {
    description: 'Print the import statement for React',
    type: 'boolean',
    default: false,
  })
  .option('skipStyles', {
    alias: 'ss',
    description: 'Skip generating a css file',
    type: 'boolean',
    default: false,
  })
  .option('styleType', {
    alias: 'st',
    description: 'Type of stylesheet to generate (css, scss, less, sass)',
    type: 'string',
    choices: ['css', 'scss', 'less', 'sass'],
    default: 'scss',
  })
  .option('styleCase', {
    alias: 'sc',
    description:
      'Naming convention for the stylesheet (camel, kebab, snake, default - same a function name)',
    type: 'string',
    choices: ['camel', 'kebab', 'snake', 'default'],
    default: 'kebab',
  })
  .help()
  .alias('help', 'h').argv;

async function generateComponent(argv) {
  const { name: componentName, target, skipStyles } = argv;

  const componentFileName = getComponentFileName(argv);
  const typeFileName = getTypeFileName(argv);
  const styleFileName = getStyleFileName(argv);

  const targetDir = path.resolve(__dirname, target);
  const componentDir = path.join(targetDir, componentName);

  try {
    await fs.mkdir(componentDir, { recursive: true });

    const componentTemplate = generateComponentTemplate(argv);
    const typeTemplate = generateTypeTemplate(argv);

    await fs.writeFile(
      path.join(componentDir, `${componentFileName}.tsx`),
      componentTemplate.trim(),
    );

    await fs.writeFile(
      path.join(componentDir, `${typeFileName}.ts`),
      typeTemplate.trim(),
    );

    if (!skipStyles) {
      const styleTemplate = generateStyleTemplate(argv);

      await fs.writeFile(
        path.join(componentDir, `${styleFileName}`),
        styleTemplate.trim(),
      );
    }

    const filesToFormat = [
      path.join(componentDir, `${componentFileName}.tsx`),
      !skipStyles && path.join(componentDir, `${styleFileName}`),
      path.join(componentDir, `${typeFileName}.ts`),
    ].filter(Boolean);

    filesToFormat.forEach((file) => {
      try {
        exec(`npx prettier --write ${file}`, { stdio: 'inherit' });
      } catch (error) {
        console.error(
          `Warning: Failed to run prettier on ${file}. Please ensure Prettier is installed.`,
        );
      }
    });

    console.log(
      `Component ${componentName} created and prettified successfully in ${componentDir}!`,
    );
  } catch (error) {
    console.error('Error creating component:', error);
  }
}

generateComponent(argv);
