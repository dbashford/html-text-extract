'use strict'
const hte = require('./')

it('extracts text from a single paragraph', () => {
	expect(hte('<p>Hello, world!</p>')).toEqual('Hello, world!')
})

it('extracts text from a single paragraph with embedded span', () => {
	expect(hte('<p>Hello <span>there</span>, world!</p>'))
		.toEqual('Hello there, world!')
})

it('adds a space between heading and paragraph', () => {
	expect(hte('<h1>Welcome</h1><p>Hello <span>there</span>, world!</p>'))
		.toEqual('Welcome Hello there, world!')
})

it('adds a space between two headings', () => {
	expect(hte('<h1>moo1</h1><h2>moo2</h2>'))
		.toEqual('moo1 moo2')
})

it('adds a space between two headings and a paragraph', () => {
	expect(hte('<h1>moo1</h1><h2>moo2</h2><p>moop</p>'))
		.toEqual('moo1 moo2 moop')
})
