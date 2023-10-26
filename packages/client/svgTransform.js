export default {
  process() {
    return { code: 'module.exports = {};' }
  },
  getCacheKey() {
    return 'svgTransform'
  },
}
