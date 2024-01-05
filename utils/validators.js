const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return pattern.test(email)
}

const validatePassword = (password) => {
  return password.length >= 8
}

const validateConfirmPassword = (field1, field2) => {
  if (field1 === '' || field2 === '') return false
  return field1 === field2
}

export { validateEmail, validatePassword, validateConfirmPassword }