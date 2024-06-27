# Component Generator

A CLI tool to generate React components with TypeScript and SCSS, including customizable prop types and Prettier formatting.

## Installation

### Global Installation

To install the package globally, run:

```bash
npm install -g component-generator
```

### Local Installation

To install the package as a dev dependency in a project, run:

```bash
npm install --save-dev component-generator
```

## Usage

After installing, you can use the `generate-component` command to generate a new component.

### Command Syntax

```bash
generate-component -n <ComponentName> [-p <props>] [-pt <propTypes>] [-t <targetDirectory>]
```

### Options

- `-n, --name` (required): The name of the component.
- `-p, --props`: Comma-separated list of prop names for the component.
- `-pt, --propTypes`: Comma-separated list of prop types for the component.
- `-t, --target`: The target directory where the component will be created. Default is `src/components`.

### Examples

#### Generating a Component with Props and Prop Types

```bash
generate-component -n MyComponent -p "children,className" -pt "React.ReactNode,string" -t "src/custom-components"
```

This command will create a `MyComponent` directory inside `src/custom-components` with the following files:

- `MyComponent.tsx`
- `MyComponent.module.scss`
- `MyComponent.d.ts`

#### Generating a Component without Props

```bash
generate-component -n MyComponent -t "src/custom-components"
```

This command will create a `MyComponent` directory inside `src/custom-components` with the following files:

- `MyComponent.tsx`
- `MyComponent.module.scss`
- `MyComponent.d.ts`

## Development

### Running Locally

If you want to run the generator script locally without installing it globally, you can use:

```bash
node generateComponent.js -n <ComponentName> [-p <props>] [-pt <propTypes>] [-t <targetDirectory>]
```

### Prettier

This tool uses Prettier to format the generated files. Ensure you have a `.prettierrc` file in the root of your project to define your Prettier configuration.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

### Notes:

- Adjust the installation and usage sections based on whether your package will be published to npm or if users will install it directly from a repository.
- Ensure the provided examples align with the exact command structure and options in your script.
