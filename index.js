'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const attributes = ['alt', 'aria-label', 'title', 'placeholder', 'label']

function extractAttributes(element) {
	const found = []
	for (const attribute of attributes) {
		const value = element.getAttribute(attribute)
		if (value) {
			found.push(value)
		}
	}
	return found.join(' ')
}

function walkTextCore(element, Node, text) {
	let newText = ''
	for (const child of element.childNodes) {
		let attributeText = null
		switch (child.nodeType) {
			case Node.ELEMENT_NODE:
				if (newText
					&& child !== element.firstChild
					&& child.previousSibling.nodeType !== Node.TEXT_NODE) {
					newText = newText + ' '
				}

				attributeText = extractAttributes(child)
				if (attributeText) {
					if (child.previousSibling) {
						newText = newText + ' '
					}
					newText = newText + attributeText
					if (child.nextSibling || child.childNodes.length > 0) {
						newText = newText + ' '
					}
				}

				newText = newText + walkTextCore(child, Node, text)
				break
			case Node.TEXT_NODE:
				newText = newText + child.textContent
				break
		}
	}
	return text + newText
}

function walkText(dom) {
	const body = dom.window.document.body
	const text = walkTextCore(body, dom.window.Node, '')
	return text
}

module.exports = function(html) {
	const dom = new JSDOM(html)
	return walkText(dom)
}
