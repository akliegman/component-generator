# @akliegman/component-generator

[![npm version](https://badge.fury.io/js/%40akliegman%2Fcomponent-generator.svg)](https://www.npmjs.com/package/@akliegman/component-generator/v/0.0.3)

A CLI tool to generate React components with TypeScript, SCSS/CSS/LESS stylesheets, customizable prop types, and Prettier formatting.

## Installation

### Global Installation

To install the package globally, run:

```bash
npm install -g @akliegman/component-generator
```

### Local Installation

To install the package as a dev dependency in a project, run:

```bash
npm install --save-dev @akliegman/component-generator
```

## Usage

After installation, you can use the `generate-component` command to generate a new component.

### Command Syntax

```bash
generate-component -n <ComponentName> [-p <props>] [-pt <propTypes>] [-t <targetDirectory>] [--htmlTag <htmlTag>] [--skipStyles] [--styleType <styleType>] [--componentType <componentType>] [--printReactImportStatement]
```

### Options

-n, --name (required): The name of the component.
-f, --format: The format of the files, either named (e.g. ComponentName.tsx and ComponentName.module.scss) or default (e.g. index.tsx or styles.module.scss)'.
-p, --props: Comma-separated list of prop names for the component.
-t, --target: The target directory where the component will be created. Default is src/components.
--htmlTag, --html: HTML tag for the component (default: "div").
--componentType, --ct: Type of component to generate (const, function).
--printReactImportStatement: Print the import statement for React.
--propTypes, --pt: Comma-separated list of prop types for the component. Must match the order of the props.
--styleCase, --sc: Naming convention for the stylesheet (camel, kebab, snake, default - same a function name).
--skipStyles, --ss: Skip generating/importing styles.
--styleType, --st: Type of stylesheet to generate (css, scss, less).
-h, --help: View help message.

### Examples

#### Generating a Component with Props and Prop Types

```bash
generate-component -n MyComponent -p "children,className" -pt "React.ReactNode|string,string" -t "src/custom-components" -f "named"
```

This command will create a `MyComponent` directory inside `src/custom-components` with the following files:

- `MyComponent.tsx`
- `MyComponent.module.scss`
- `MyComponent.d.ts`

## Development

### Running Locally

If you want to run the generator script locally without installing it globally, you can use:

```bash
node index.js --n <ComponentName> [-p <props>] [-pt <propTypes>] [-t <targetDirectory>] [--htmlTag <htmlTag>] [--skipStyles] [--styleType <styleType>] [--componentType <componentType>] [--printReactImportStatement]
```

### Prettier

This tool uses Prettier to format the generated files. Ensure you have a `.prettierrc` file in the root of your project to define your Prettier configuration.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
