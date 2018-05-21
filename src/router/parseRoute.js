const createMatch = (isExact, path, url, params) => ({
  isExact: isExact,
  path: path,
  url: url,
  params: params,
})

const urlLen = url => {
  for (let len = url.length; "/" === url[--len]; )
  return len + 1
}

const trimTrailingSlash = url => url.slice(0, urlLen(url))

const decodeParam = val => {
  try {
    return decodeURIComponent(val)
  } catch (e) {
    return val
  }
}

export const parseRoute = (path, url, options) => {
  if (path === url || !path) {
    return createMatch(path === url, path, url)
  }

  const exact = options && options.exact
  const paths = trimTrailingSlash(path).split("/")
  const urls = trimTrailingSlash(url).split("/")

  if (paths.length > urls.length || (exact && paths.length < urls.length)) {
    return
  }

  for (let i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i])
    } else if (paths[i] !== urls[i]) {
      return
    }
    url += urls[i] + "/"
  }

  return createMatch(false, path, url.slice(0, -1), params)
}
