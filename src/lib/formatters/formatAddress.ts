export function formatAddress(
  address: string,
  number: string,
) {
  const firstCommaIndex = address.indexOf(',')

  if (firstCommaIndex === -1) {
    return `${address}, ${number}`
  }

  const street = address.slice(0, firstCommaIndex)
  const rest = address.slice(firstCommaIndex + 1)

  return `${street}, ${number},${rest}`
}