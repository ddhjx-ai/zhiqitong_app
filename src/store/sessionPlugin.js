const sessionStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.sessionStorage.setItem('state', JSON.stringify(state))
  })
}

export default [sessionStoragePlugin]