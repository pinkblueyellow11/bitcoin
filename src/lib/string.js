/**
 *
 * @param {String} phone
 */
export const isValidTaiwanPhone = (phone) => {
  const pattern = /^09\d{8}$/
  return pattern.test(phone)
}

/**
 * Not strict
 * @param {String} phone
 */
export const isValidTaiwanPhone2 = (phone) => {
  const pattern = /^0\d{9}$/
  return pattern.test(phone)
}

export const isValidChainPhone = (phone) => {
  const pattern = /^\d{11}$/
  return pattern.test(phone)
}

/**
 *
 * @param {String} email
 */
export const isValidEmail = (email) => {
  // eslint-disable-next-line max-len
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(String(email).toLowerCase())
}
