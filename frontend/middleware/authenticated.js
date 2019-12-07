export default function({ store, redirect }) {
  try {
    if (window) {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return redirect('/auth/signin')
      }
      return store.commit('SET_TOKEN', token)
    }
  } catch (err) {}
}
