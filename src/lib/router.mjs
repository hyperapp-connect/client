// @hypercnt/client/router

// get the origin, working in ie and safari
export const getOrigin = loc =>
  loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '')

// is link an external link?
export const isExternal = href => getOrigin(location) !== getOrigin(href)

const pathname = typeof location !== 'undefined' ? location.pathname : '/'
export const state = {
  pathname,
  previous: pathname,
}

export const actions = {
  go: ({ e, to }) => state => {
    e.preventDefault()

    if (typeof history !== 'undefined') {
      history.pushState(state.pathname, '', to)
    }

    return {
      pathname: to,
      previous: state.pathname,
    }
  },
}

export const router = {
  state,
  actions,
}
