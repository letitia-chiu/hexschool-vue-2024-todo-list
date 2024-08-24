/**
 * validate email or password
 * @param {string} value 
 * @param {'email' | 'password'} type 
 * @returns {boolean} validate result
 */
const validator = (value, type) => {
  let regex

  if (type === 'email') {
    regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  } else if (type === 'password') {
    regex = /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?`~-]{8,12}$/
  } else {
    throw new Error('invalid type for validator')
  }

  return regex.test(value)
}

export default validator