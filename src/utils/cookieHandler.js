const cookie = {
  set: (token) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000)
    document.cookie = `hexschoolTodoToken=${token};expires=${expires.toUTCString()}`
  },
  get: () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolTodoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  },
  delete: () => document.cookie = 'hexschoolTodoToken='
}

export default cookie