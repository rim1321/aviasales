export default {
  init,
}


function init () {
  fixOutline()
}


function fixOutline () {
  const style = document.createElement('style')
  document.head.appendChild(style)

  // disable outline on mouse-down
  document.addEventListener('mousedown', () => {
    style.innerHTML = ':focus { outline: 0 }'
  })

  // enable outline on tab key-down
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) { return }
    style.innerHTML = ''
  })
}
