const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain'
const DATA_URL_DEFAULT_CHARSET = 'us-ascii'

const normalizeDataURL = (urlString: string) => {
	const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString)

	if (!match) throw new Error(`Invalid URL: ${urlString}`)
	if (!match.groups) throw new Error(`Invalid URL: ${urlString}`)

	const { type, data, hash } = match.groups
	const mediaType = type.split(';')

	let isBase64 = false
	if (mediaType[mediaType.length - 1] === 'base64') {
		mediaType.pop()
		isBase64 = true
	}

	// Lowercase MIME type
	const mimeType = (mediaType.shift() || '').toLowerCase()
	const attributes = mediaType
		.map((attribute) => {
			const val = attribute.split('=').map((string) => string.trim())
			const key = val[0]
			let value = val[1] ?? ''
			if (key === 'charset') {
				value = value.toLowerCase()
				if (value === DATA_URL_DEFAULT_CHARSET) return ''
			}
			return `${key}${value ? `=${value}` : ''}`
		})
		.filter(Boolean)

	const normalizedMediaType = [...attributes]
	if (isBase64) normalizedMediaType.push('base64')
	if (normalizedMediaType.length > 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE))
		normalizedMediaType.unshift(mimeType)
	return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`
}

export const normalizeUrl = (urlString: string) => {
	urlString = urlString.trim()

	if (/^data:/i.test(urlString)) return normalizeDataURL(urlString)
	if (/^view-source:/i.test(urlString))
		throw new Error('`view-source:` is not supported as it is a non-standard protocol')

	const hasRelativeProtocol = urlString.startsWith('//')
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString)
	if (!isRelativeUrl) urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, 'http:')

	const urlObject = new URL(urlString)
	urlObject.username = urlObject.password = ''
	urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, '')

	if (urlObject.pathname) {
		const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g

		let lastIndex = 0
		let result = ''
		while (protocolRegex.exec(urlObject.pathname)) {
			const match = protocolRegex.exec(urlObject.pathname)!
			const protocol = match[0]
			const protocolAtIndex = match.index
			const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex)

			result += intermediate.replace(/\/{2,}/g, '/')
			result += protocol
			lastIndex = protocolAtIndex + protocol.length
		}

		const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length)
		result += remnant.replace(/\/{2,}/g, '/')

		urlObject.pathname = result
	}

	// Decode URI octets
	if (urlObject.pathname) urlObject.pathname = decodeURI(urlObject.pathname)
	if (urlObject.hostname) urlObject.hostname = urlObject.hostname.replace(/\.$/, '')
	urlObject.pathname = urlObject.pathname.replace(/\/$/, '')

	const oldUrlString = urlString
	urlString = urlObject.toString()

	if (urlObject.pathname === '/' && !oldUrlString.endsWith('/') && urlObject.hash === '')
		urlString = urlString.replace(/\/$/, '')
	if (urlObject.pathname === '/' && urlObject.hash === '') urlString = urlString.replace(/\/$/, '')

	return urlString
}
