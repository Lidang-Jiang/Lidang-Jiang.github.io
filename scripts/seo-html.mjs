// 按标签和属性解析构建后的 head，避免依赖属性顺序或引号风格。
function decodeAttribute(value) {
  return value.replace(/&(?:#(x[0-9a-f]+|\d+)|(amp|quot|apos|lt|gt));/gi, (_entity, code, name) => {
    if (code) {
      const point = code[0].toLowerCase() === 'x'
        ? Number.parseInt(code.slice(1), 16) : Number.parseInt(code, 10)
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '\ufffd'
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[name.toLowerCase()]
  })
}

function attributes(tag) {
  const values = new Map()
  const source = tag.replace(/^<\s*[\w:-]+/, '').replace(/\/?\s*>$/, '')
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  for (const match of source.matchAll(pattern)) {
    const name = match[1].toLowerCase()
    if (values.has(name)) throw new Error(`HTML 重复属性：${name}`)
    values.set(name, decodeAttribute(match[2] ?? match[3] ?? match[4] ?? ''))
  }
  return values
}

export function readHeadTags(html) {
  const tags = []
  let insideHead = false
  let ignoredElement = ''
  const tokens = /<!--[\s\S]*?-->|<(?:[^>"']|"[^"]*"|'[^']*')*>/g
  for (const match of html.matchAll(tokens)) {
    const token = match[0]
    const element = /^<\s*(\/?)\s*([\w:-]+)/.exec(token)
    if (!element) continue
    const [, closing, rawName] = element
    const name = rawName.toLowerCase()
    if (ignoredElement) {
      if (closing && name === ignoredElement) ignoredElement = ''
      continue
    }
    if (name === 'head') {
      if (closing) break
      insideHead = true
      continue
    }
    if (!insideHead || closing) continue
    if (['script', 'style', 'title', 'textarea', 'template'].includes(name)) {
      ignoredElement = name
      continue
    }
    if (name === 'link' || name === 'meta') tags.push({ name, attributes: attributes(token) })
  }
  return tags
}

export function parseCanonical(html) {
  const canonical = readHeadTags(html).filter(({ name, attributes: values }) => (
    name === 'link' && values.get('rel')?.toLowerCase().split(/\s+/).includes('canonical')
  ))
  if (canonical.length !== 1 || !canonical[0].attributes.get('href')) {
    throw new Error('HTML 必须有且仅有一个有效的 canonical')
  }
  return canonical[0].attributes.get('href')
}

export function blocksIndexing(directives, { header = false } = {}) {
  return directives.toLowerCase().split(',').some((directive) => {
    const value = header ? directive.trim().replace(/^(?:bingbot|\*)\s*:\s*/, '') : directive.trim()
    return value === 'noindex' || value === 'none'
  })
}

export function hasNoindex(html) {
  return readHeadTags(html).some(({ name, attributes: values }) => (
    name === 'meta' && ['robots', 'bingbot'].includes(values.get('name')?.toLowerCase())
      && blocksIndexing(values.get('content') ?? '')
  ))
}
