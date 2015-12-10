## Laravel Elixir SVGStore

A Laravel Elixir extension wrapping [gulp-svgstore](https://github.com/w0rm/gulp-svgstore)

## Installation

```
npm install --save-dev laravel-elixir-svgstore
```

Add it to your Elixir-based Gulpfile:

```js
var elixir = require('laravel-elixir');

require('laravel-elixir-svgstore');

elixir(function(mix) {
  mix.svgstore();
});
```

## Usage

By default, it will look for .svg files within ```resources/assets/svg/``` and outputs
```sprites.svg``` to ```public/svg/```.

You can optionally pass a source directory and an output directory:

```js
...

elixir(function(mix) {
  mix.svgstore('resources/assets/icons', 'public/icons');
});
```

## In Your Blade Templates

```html
<svg style="width: .75em; height: .75em">
  <use xlink:href="svg/sprites.svg"/>
</svg>
```

For older browsers you will need to use something like [svg4everybody](https://github.com/jonathantneal/svg4everybody) to polyfill svg support.

## Contributions

This plugin is very bare bones at the moment. Pull requests for extra features are welcome!
