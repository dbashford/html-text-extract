html-text-extract
=================

[![Build Status](https://travis-ci.org/matatk/html-text-extract.svg?branch=master)](https://travis-ci.org/matatk/html-text-extract)

This is a simple tool to extract the text from HTML fragments.

```javascript
const hte = require('html-text-extract')
hte('<h1>Welcome</h1><p>Hello, world!</p>')  // => 'Welcome Hello, world!'
```

Development
-----------

### Set-up

* Check out the code.
* `npm install`

### Useful scripts

* `npm test`&mdash;runs the tests (which also happens on pre-commit).
