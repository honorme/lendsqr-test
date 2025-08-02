
export const fcase = (str?: string) => {
  if (!str) return ''
  const titleCase = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
  return titleCase.charAt(0).toUpperCase() + titleCase.slice(1).trim()
}
