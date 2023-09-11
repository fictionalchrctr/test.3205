function generateAuthError(message) {
  switch (message) {
    case 'INVALID_DATA':
      return 'Данные введены некорректно'
    default:
      return 'Слишком много попыток входа, попробуйте позже'
  }
}

export default generateAuthError
