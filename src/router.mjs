export const getOrigin = loc =>
  loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '')

export const isExternal = anchorElement => getOrigin(location) !== getOrigin(anchorElement)

const pathname = typeof location !== 'undefined' ? location.pathname : '/'
export const state = {
  location: {
    pathname,
    previous: pathname,
  },
}

export const actions = {
  go: ({ to, e }) => state => {
    e.preventDefault()

    const { location } = state

    if (typeof history !== 'undefined') {
      history.pushState(location.pathname, '', to)
    }

    return {
      location: {
        pathname: to,
        previous: location.pathname,
      },
    }
  },
}

export const router = {
  state,
  actions,
}
