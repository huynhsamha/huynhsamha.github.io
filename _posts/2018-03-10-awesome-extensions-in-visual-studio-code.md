---
layout: post
title: Awesome Extenstions in Visual Studio Code
description: "Visual Studio Code (VS Code) is an IDE that I feel comfortable with in both the backend and frontend development, and it is supported on both linux, windows and macOS. VS Code also integrates many useful extensions that we can not ignore."
headline:
modified: 2018-03-10
category: ide
tags: [VS Code, extensions]
imagefeature: cover/pattern/004.jpg
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Visual Studio Code (VS Code) is an IDE that I feel comfortable with in both the backend and frontend development, and it is supported on both linux, windows and macOS. VS Code also integrates many useful extensions that we can not ignore.

In this article, I'm using Ubuntu 16.04, and the extensions I use for backend development with Node.js, the frontend with AngularJS, React. To install the extensions I will say the following, you can go to extensions in VS Code, search and install easily.

<!-- /#table-of-contents -->
<section id="table-of-contents" class="toc">
  <header>
    <h3 >Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

## Linter Extensions
### EditorConfig for VS Code
> EditorConfig Support for Visual Studio Code

You can see [marketplace here](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

#### What is EditorConfig?
*EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.*

#### How to use?
Create a `.editorconfig` file at the root of the project. You can then follow the instructions on [he EditorConfig home page](http://editorconfig.org/) for the structure of this file.

This is the file `.editorconfig` I usually use for the Node.js, AngularJS and React projects


```bash
root = true

# Unix-style newlines with a newline ending every file
[**]
end_of_line = lf
insert_final_newline = true

# Standard at: https://github.com/felixge/node-style-guide
[**.{js,json,jsx}]
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
quote_type = single
curly_bracket_next_line = false
spaces_around_operators = true
space_after_control_statements = true
space_after_anonymous_functions = true
spaces_in_brackets = false

# No Standard.  Please document a standard if different from .js
[**.{yml,css,scss}]
trim_trailing_whitespace = true
indent_style = tab
indent_size = 2

[**.html]
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

# No standard.  Please document a standard if different from .js
[**.md]
indent_style = tab

# Standard at:
[Makefile]
indent_style = tab

# The indentation in package.json will always need to be 2 spaces
# https://github.com/npm/npm/issues/4718
[{package, bower}.json]
indent_style = space
indent_size = 2
```

### ESLint
> Integrates ESLint into VS Code.

You can see [marketplace here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### What is ESLint?
*ESLint is an open source project provide a pluggable linting utility for JavaScript. ESLint requires Node.js and works on Windows, Mac and Linux*

#### How to use?
##### Configuration
You should follow the instructions on [ESLint's home page](https://eslint.org/). After you have followed these instructions, you can create the `.eslintrc.js` file and the `.eslintignore` file as I used to.

This is the file `.eslintrc.js` I usually use for the Node.js, AngularJS and React projects

```js
module.exports = {
    "extends": [
      "airbnb",
      "plugin:jsx-a11y/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 9,
      "sourceType": "module",
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "allowImportExportEverywhere": true,
        "jsx": true
      }
    },
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "env": {
      browser: true,
      node: true,
      node: true,
      es6: true,
      browser: true,
      jasmine: true,
      mocha: true,
      jquery: true
    },
    "rules": {
      'camelcase': 0,
      'comma-dangle': [2, 'never'],
      'comma-spacing': [2, { before: false, after: true }],
      'consistent-return': 0,
      'curly': 0,
      'default-case': 0,
      'eqeqeq': [2, 'smart'],
      'func-names': 0,
      'guard-for-in': 2,
      'indent': [2, 2, { SwitchCase: 1 }],
      'key-spacing': [2, { beforeColon: false, afterColon: true }],
      'keyword-spacing': [2, { before: true, after: true }],
      'max-len': 0,
      'new-cap': 0,
      'no-bitwise': 0,
      'no-caller': 2,
      'no-console': 0,
      'no-else-return': 0,
      'no-empty-class': 0,
      'no-multi-spaces': 2,
      'no-param-reassign': 0,
      'no-shadow': 0,
      'no-spaced-func': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-unneeded-ternary': 2,
      'no-unreachable': 2,
      'no-underscore-dangle': 0,
      'no-unused-expressions': 0,
      'no-unused-vars': 0,
      'no-use-before-define': [1, 'nofunc'],
      'no-var': 0,
      'no-loop-func': 0,
      'object-curly-spacing': [2, 'always'],
      'one-var': [0, 'never'],
      'one-var-declaration-per-line': [2, 'always'],
      'padded-blocks': 0,
      'space-before-function-paren': [2, {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'space-in-parens': [2, 'never'],
      'spaced-comment': [2, 'always'],
      'strict': 0,
      'quote-props': 0,
      'quotes': [1, 'single'],
      'wrap-iife': [2, 'outside'],
      'vars-on-top': 0,
      'global-require': 0,
      'no-plusplus': 0,
      'eqeqeq': 0,
      'no-case-declarations': 0,
      'class-methods-use-this': 0,
      'prefer-destructuring': 0,
      'no-alert': 0,
      'no-mixed-operators': 0,
      'object-property-newline': 0,
      'no-nested-ternary': 0,
      // import plugin
      'import/no-mutable-exports': 0,
      'import/extensions': 0,
      'import/first': 0,
      'import/no-named-as-default': 0,
      // react plugin
      'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
      'react/prefer-stateless-function': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-max-props-per-line': 0,
      // jsx-a11y plugin
      'jsx-a11y/href-no-hash': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/img-redundant-alt': 0,
      'jsx-a11y/label-has-for': 0
    },
    'globals': {
      by: true,
      browser: true,
      element: true,
      angular: true,
      inject: true,
      io: true,
      moment: true,
      Modernizr: true,
      Promise: true,
      __TESTING__: true,
      _: false,
      ApplicationConfiguration: true
    }
  };
```

And this is file `.eslintignore`:
```bash
node_modules/*
coverage/*
dist/*
dll/*
build/*
```

##### Usage
Before you use, make sure to install some eslint packages with dev-dependencies.  I use the following dev-dependencies by run `npm` or `yarn`

```bash
npm install eslint --save-dev
npm install eslint-config-airbnb --save-dev
npm install eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

# you can also use yarn such as
yarn add eslint --dev
yarn add eslint-config-airbnb --dev
yarn add eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --dev
```

Next, we will add to file `package.json` some scripts such as following lines:
```json
{
    "scripts": {
        "eslint": "eslint index.js server scripts/*/*.js",
        "eslint:fix": "eslint index.js server scripts/*/*.js --fix",
    }
}
```

In terminal, you can run:
```bash
# use npm
npm run eslint
# use yarn
yarn run eslint

# it will auto fix errors detected
npm run eslint:fix
# also use
yarn run eslint:fix
```

##### Advanced usage with Visual Studio Code
However, with VS Code, everything will get better with bug detect and auto fixes in the process of writing your code, which speeds up and reduces your errors.

+ `Ctrl + Shift + P` to open `Command Palatte`
+ Search `User Settings`, choose option `Preferences: Open User Settings`
+ Search `eslint` or `editor` to change your settings, the following is my configs:
```json
{
    "eslint.autoFixOnSave": true,
    "tslint.autoFixOnSave": true,
    "editor.formatOnSave": false,
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    }
}
```
You can see, `eslint`, `tslint` (if you use `TypeScript`) will auto fix on save, and `editor` also format code on save (suggest). You can also get suggestions not only on `code`, but also on `comments` and `strings`.

Now when have error, VS Code will underline errors, warnings and auto fix when you save file. That is awesome.

### TSLint
> TSLint for Visual Studio Code

You can see [marketplace here](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

You maybe add TSLint such as `ESLint` if you use `TypeScript` language




## Git Extensions
### GitLens - Git supercharged
Supercharge the Git capabilities built into Visual Studio Code 

You can see [marketplace here](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

If you work on `git`, you maybe use with others and more branchs. The `GitLens` maybe good for your working.

Install it and see wizards.




## NPM Extensions
### npm
> npm support for VS Code

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

### npm Intellisense
> Visual Studio Code plugin that autocompletes npm modules in import statements

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

### Path Intellisence
> Visual Studio Code plugin that autocompletes filenames

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

### vscode-icons
> Icons for Visual Studio Code

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)




## HTML/CSS/SASS Extensions
### Auto Close Tag
> Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

### Auto Rename Tag
> Auto rename paired HTML/XML tag

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

### HTML Snippets
> Full HTML tags including HTML5 Snippets

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)

### HTML CSS Support
> CSS support for HTML documents

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)

### IntelliSense for CSS class names in HTML
> CSS class name completion for the HTML class attribute based on the definitions found in your workspace.

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)

### Sass
> Indented Sass syntax highlighting, autocomplete & snippets

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)

### SCSS IntelliSence
> Advanced autocompletion and refactoring support for SCSS

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)






## Beautifier Extensions
### Bracket Pair Colorizer
> A customizable extension for colorizing matching brackets

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)


### indent-rainbow
> Makes indentation easier to read

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)



### DotENV
> Support for dotenv file syntax

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)






## Snippets Extensions
### ES7 React/Redux/GraphQL/React-Native Snippets
> Simple extensions for React, Redux and Graphql in JS/TS with ES7 syntax

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### Angular v6 Snippets
> Angular v6 snippets by John Papa

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

### Angular Language Service
> Editor services for Angular templates

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

### JavaScript (ES6) code snippets
> Code snippets for JavaScript in ES6 syntax

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

### Beautify css/sass/scss/less
> Beautify css, sass and less code (extension for Visual Studio Code)

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=michelemelluso.code-beautifier)

### Bootstrap 3 Snippets
> Bootstrap 3 Snippets for VS Code

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets)

### Bootstrap 4, Font awesome 4, 5
> Bootstrap 4 snippets based on documentation + Font awesome 4 + Font Awesome 5 Free & Pro snippets

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=thekalinga.bootstrap4-vscode)

### Font-awesome codes for css (snippets)
> Get font-awesome shortcuts quickly

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=medzhidov.font-awesome-codes-html)

### Font-awesome codes for html (snippets)
> Just snippet for create font-awesome codes in html

You can see demo for features [here](https://marketplace.visualstudio.com/items?itemName=medzhidov.font-awesome-codes-html)



# Conclusion

I just mentioned some of the extensions in VS Code that I found useful in backend development with Node.js, the frontend with the AngularJS, the React, as well as the application development process.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!