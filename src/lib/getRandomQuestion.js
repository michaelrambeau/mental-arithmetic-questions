const math = require('mathjs')
const times = require('lodash.times')
const flatten = require('lodash.flatten')

function format (value) {
  return math.round(value, 8)
}

function getRandomElement (array) {
  const x = Math.random()
  const i = Math.floor(x * array.length)
  return array[i]
}

function getRandomOperand ({digits = 3, power}) {
  const number = math.round(math.random(), digits)
  const result = math.chain(number)
    .multiply(math.pow(10, power))
  return format(result.value)
}

// 12.345 => ['12', '345']
function splitDecimals (value) {
  const parts = format(value).toString().split('.')
  const integerPart = parts[0]
  const decimalsPart = parts.length > 1 ? parts[1] : '0'
  return [integerPart, decimalsPart]
}

const adjustDecimals = (reference, digits) => value => {
  const parts = splitDecimals(value)
  // console.log('parts', parts);
  const referenceParts = splitDecimals(reference)
  // console.log('reference parts', referenceParts);
  const numberOfDecimals = referenceParts[1].length
  const decimals = parts[1].slice(0, numberOfDecimals - 1)
  // console.log('decimals', numberOfDecimals, parts[1]);
  const lastDecimal = referenceParts[1].slice(referenceParts[1].length - 1)
  const result = math.eval(`${parts[0]}.${decimals}${lastDecimal}`)
  // console.log('Adjust', value, reference, lastDecimal, ' => ', result)
  return result
}

function getCoefficients (count) {
  const coefficients = flatten(
    times(Math.floor((count + 1) / 2))
    .map(i => i === 0 ? [0] : [-i, i])
  )
  .sort((a, b) => a > b ? 1 : -1)
  const shift = getRandomElement(coefficients)
  const shiftedCoefficients = coefficients.map(coefficient => coefficient + shift)
  return shiftedCoefficients
}

function getAllOptions (value, { count = 5, step = 0.1, digits = 3 } = {}) {
  const shiftedCoefficients = getCoefficients(count)
  return shiftedCoefficients
    .map(x => value * (1 + x * step))
    .map(adjustDecimals(value, digits))
    .map(format)
}

export default function getRandomQuestion () {
  const digits = getRandomElement([3])
  const power = getRandomElement([-1, 0, 1, 2, 3])
  const operands = [
    getRandomOperand({digits, power}),
    getRandomOperand({digits, power})
  ]
  const operator = getRandomElement(['+', '-', '*'])
  const result = format(math.eval(`${operands[0]} ${operator} ${operands[1]}`))
  const options = getAllOptions(result, {digits})
  const correct = options.findIndex(x => x === result)
  return {
    operands,
    operator,
    result,
    options,
    correct
  }
}
