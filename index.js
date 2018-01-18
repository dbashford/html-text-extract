'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

function walkTextCore(node, Node, text) {
	let newText = ''
	for (const child of node.childNodes) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE:
				if (newText
					&& child !== node.firstChild
					&& child.previousSibling.nodeType !== Node.TEXT_NODE) {
					newText = newText + ' '
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
