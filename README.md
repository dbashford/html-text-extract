html-text-extract
=================

[![Build Status](https://travis-ci.org/matatk/html-text-extract.svg?branch=master)](https://travis-ci.org/matatk/html-text-extract)

This is a simple tool to extract the text from HTML fragments.

```javascript
const hte = require('html-text-extract')
hte('<h1>Welcome</h1><p>Hello, world!</p>')  // => 'Welcome Hello, world!'
```

The `hte()` function takes two parameters:

* `html` (string) containing the HTML code.
* `ignoreCodeElements` (optional Boolean) controlling whether the contents of `<code>` tags are omitted from the extracted text.

It returns a string that is the text extracted from the HTML.  The following attributes' values are also included:

* `alt`
* `aria-label`
* `title`
* `placeholder`
* `label` (as used on an `<optgroup>`)

Development
-----------

### Set-up

* Check out the code.
* `npm install`

### Useful scripts

* `npm test`&mdash;runs the tests (which also happens on pre-commit).
