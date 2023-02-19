module.exports = str => {
  try {
    const result = JSON.parse(str)
    return result
  } catch (err) {
    return false
  }
}