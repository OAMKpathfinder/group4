export default function ({ store, redirect, req }) {
  // Check if middleware is on client side
  if (req) { return null }
  const token = window.localStorage.getItem('token')
  store.commit('SET_TOKEN', token)
}
