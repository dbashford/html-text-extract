'use strict'
const hte = require('./')

it('extracts text', () => {
	expect(hte('<p>Hello, world!</p>')).toEqual('Hello, world!')
})
