export const getFullUrlToResource = (
  url: string | null,
  resourceBaseUrl: string
) => {
  if (!url) {
    return ''
  }

  return `${resourceBaseUrl}${url}`
}
