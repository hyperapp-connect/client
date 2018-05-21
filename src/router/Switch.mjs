export const Switch = (props, children) => ({ state, actions }) => {
  let child
  let i = 0
  while (!(child = children[i] && children[i](state, actions)) && i < children.length) {
    i++
  }

  return child
}
