export default generateBemClass

// зачем это?
function generateBemClass (className, mods = {}) {
  const classList = [className]
  for (const modName in mods) {
    const modValue = mods[modName]
    if (modValue === undefined) { continue }
    if (modValue === null) { continue }
    if (modValue === true) {
      classList.push(`${className}_${modName}`)
    } else {
      classList.push(`${className}_${modName}_${modValue}`)
    }
  }
  return classList.join(' ')
}
