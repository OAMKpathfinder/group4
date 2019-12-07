export default function({ store, redirect, req }) {
  try {
    if (!window) {
      return
    }
    const token = window.localStorage.getItem('token')
    store.commit('SET_TOKEN', token)
  } catch (err) {}
}
