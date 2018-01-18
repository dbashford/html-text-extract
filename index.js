'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

function handleAttributes(element) {
	return element.getAttribute('alt') ? element.getAttribute('alt') : null
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

				attributeText = handleAttributes(child)
				if (attributeText) {
					if (child.previousSibling
						&& child.previousSibling.nodeType === Node.TEXT_NODE) {
						newText = newText + ' '
					}
					newText = newText + attributeText
					if (child.nextSibling
						&& child.nextSibling.nodeType === Node.TEXT_NODE) {
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
