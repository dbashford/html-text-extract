'use strict'
const hte = require('./')

describe('simple text extraction', () => {
	it('extracts text from a single paragraph', () => {
		expect(hte('<p>Hello, world!</p>')).toEqual('Hello, world!')
	})

	it('extracts text from a single paragraph with embedded span', () => {
		expect(hte('<p>Hello <span>there</span>, world!</p>'))
			.toEqual('Hello there, world!')
	})

	describe('spacing with text', () => {
		it('adds a space between heading and paragraph', () => {
			expect(hte('<h1>Welcome</h1><p>Hello, world!</p>'))
				.toEqual('Welcome Hello, world!')
		})

		it('adds a space between two headings', () => {
			expect(hte('<h1>moo1</h1><h2>moo2</h2>'))
				.toEqual('moo1 moo2')
		})

		it('adds a space between two headings and a paragraph', () => {
			expect(hte('<h1>moo1</h1><h2>moo2</h2><p>moop</p>'))
				.toEqual('moo1 moo2 moop')
		})
	})

	describe('decodes character entities', () => {
		test('ellipsis', () => {
			expect(hte('<p>Well now&hellip;</p>'))
				.toEqual('Well now…')
		})

		test('mdash', () => {
			expect(hte('When we found the melon&mdash;not an easy task'))
				.toEqual('When we found the melon—not an easy task')
		})
	})
})

describe('alt text', () => {
	it('extracts alt text from images', () => {
		expect(hte('<img alt="description" src="...">'))
			.toEqual('description')
	})

	describe('spacing extracted alt text correctly', () => {
		test('when the image has text preceeding it', () => {
			expect(hte('<p>Image:<img alt="description" src="..."></p>'))
				.toEqual('Image: description')
		})

		test('when the image has text after it', () => {
			expect(hte('<p><img alt="description" src="...">Yeah!</p>'))
				.toEqual('description Yeah!')
		})
	})
})

describe('other attributes', () => {
	test('aria-label', () => {
		expect(hte('<button id="save" aria-label="Save"></button>'))
			.toEqual('Save')
	})

	test('title', () => {
		expect(hte('<a href="..." title="link title">link content</a>'))
			.toEqual('link title link content')
	})

	test('placeholder', () => {
		expect(hte('<input placeholder="Sample input" type="text">'))
			.toEqual('Sample input')
	})

	test('label (optgroup)', () => {
		expect(hte('<optgroup label="Option Group">'))
			.toEqual('Option Group')
	})
})
