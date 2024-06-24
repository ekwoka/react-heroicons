[<img src="https://img.shields.io/npm/v/preact-heroicons?label=%20&style=for-the-badge&logo=pnpm&logoColor=white">](https://www.npmjs.com/package/preact-heroicons)
<img src="https://img.shields.io/npm/types/preact-heroicons?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/preact-heroicons?style=for-the-badge&logo=npm&logoColor=white&logo=npm&logoColor=white&logo=npm&logoColor=white" >
[<img src="https://img.shields.io/bundlephobia/minzip/preact-heroicons?style=for-the-badge&logo=esbuild&logoColor=white">](https://bundlephobia.com/package/preact-heroicons)

# Preact Heroicons

> A set of free MIT-licensed high-quality SVG icons for you to use in your web projects.

This package wraps up all of the wonderful [Heroicons](https://heroicons.com/) into Preact components, with appropriate TypeScript typings. This package is fully treeshakable, so each icon imported is just 200 bytes gzipped! That's practically free!!!

> Note: The official Heroicons package is [here](https://www.npmjs.com/package/@heroicons/react). These work well, but will have conflicts when using Preact and TypeScript.

This package will version match the official `Heroicons` package and documentation. `Preact Heroicons` specific patches will be handled as `rc` releases one patch version ahead of the official package.

## Previewing the Icons

Preview the icons at [heroicons.com](https://heroicons.com/).

## Installation & Usage

First, install this library with your package manager of choice!

```zsh
npm add preact-heroicons
pnpm add preact-heroicons
yarn add preact-heroicons
bun install preact-heroicons
deno add npm:preact-heroicons
```

Now you have access to the entire `heroicons` library! They are formatted as [pascal case](https://techterms.com/definition/pascalcase) and have `Solid` (solid format) or `Outline` (outline format) appended at the end based on type.

Mini Icons (Heroicons v2.0) are accessible by appending `MiniSolid` to the name provided on HeroIcons.

```tsx
import { ArchiveBoxSolid } from "preact-heroicons";
import { ArchiveBoxOutline } from "preact-heroicons";
import { ArchiveBoxMiniSolid } from "preact-heroicons";

export const SomeComponent = () => {
  return (
    ...
    <ArchiveBoxSolid className="h-6 w-6 text-gray-500" />
    <ArchiveBoxOutline className="h-6 w-6 text-gray-500" />
    <ArchiveBoxminiSolid className="h-4 w-4 text-gray-500" />
    ...
  )
}
```

> Note: Coloring the icon is done by setting the `color` property with CSS

## Types

The types used to define the Icons come from `preact/jsx`.

As a convenience, the type of the components is provided by importing `HeroIcon` from the main package.

```js
import { HeroIcon } from 'preact-heroicons';

const Icons: HeroIcon[] = [];
```

This can be useful when you want to construct objects containing HeroIcons and want to ensure strict typing.

## Use with other JSX Factories

To ensure compatibility with automated bundler systems, these icons will, use preact.h as their JSX factory. To use your own JSX factory, you'll need to alias `preact` to something else that exports a jsx function as `h` in your bundlers settings.

## Thanks

This package is a form of the work done by [@graywolftech/react-heroicons](https://github.com/graywolftech/react-heroicons). A lot of the package was written and retooled for Preact, but that package was was got me started on this.
