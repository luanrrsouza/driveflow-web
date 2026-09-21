const firstDigitWeights = [
  5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
]

const secondDigitWeights = [
  6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
]

function calculateDigit(
  value: string,
  weights: number[],
): number {
  const sum = weights.reduce(
    (total, weight, index) =>
      total + Number(value[index]) * weight,
    0,
  )

  const remainder = sum % 11

  return remainder < 2
    ? 0
    : 11 - remainder
}

export function isValidCnpj(
  value: string,
): boolean {
  const cnpj = value.replace(/\D/g, '')

  if (cnpj.length !== 14) {
    return false
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false
  }

  const base = cnpj.slice(0, 12)

  const firstDigit = calculateDigit(
    base,
    firstDigitWeights,
  )

  const secondDigit = calculateDigit(
    `${base}${firstDigit}`,
    secondDigitWeights,
  )

  const calculatedCnpj =
    `${base}${firstDigit}${secondDigit}`

  return cnpj === calculatedCnpj
}