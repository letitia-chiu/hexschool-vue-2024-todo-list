const cookie = {
  set: (token, exp) => {
    document.cookie = `hexschoolTodoToken=${token};expires=${exp}`
  },
  get: () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolTodoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  },
  delete: () => document.cookie = 'hexschoolTodoToken='
}

export default cookie