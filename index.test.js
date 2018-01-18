'use strict'
const hte = require('./')

it('extracts text from a single paragraph', () => {
	expect(hte('<p>Hello, world!</p>')).toEqual('Hello, world!')
})

it('extracts text from a single paragraph with embedded span', () => {
	expect(hte('<p>Hello <span>there</span>, world!</p>'))
		.toEqual('Hello there, world!')
})

it('adds a space when necessary', () => {
	expect(hte('<h1>Welcome</h1><p>Hello <span>there</span>, world!</p>'))
		.toEqual('Welcome Hello there, world!')
})
