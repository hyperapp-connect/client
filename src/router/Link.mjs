import { h } from '../app'

export const getOrigin = loc =>
  loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '')

// Location.origin and HTMLAnchorElement.origin are not
// supported by IE and Safari.
export const isExternal = anchorElement => getOrigin(location) !== getOrigin(anchorElement)

export const Link = (props, children) => ({ state, actions }) => {
  var to = props.to
  var location = state.location
  var onclick = props.onclick
  delete props.to
  delete props.location

  props.href = to
  props.onclick = e => {
    if (onclick) {
      onclick(e)
    }

    if (
      !(
        e.defaultPrevented ||
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === '_blank' ||
        isExternal(e.currentTarget)
      )
    ) {
      e.preventDefault()

      if (to !== location.pathname) {
        history.pushState(location.pathname, '', to)
      }
    }
  }

  return h('a', props, children)
}
