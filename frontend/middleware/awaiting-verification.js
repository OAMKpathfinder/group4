export default function ({ store, redirect }) {
  try {
    if (window) {
      const verification = window.localStorage.getItem('verification')
      if (!verification) {
        return redirect('/auth/signin')
      }
      store.commit('SET_VERIFICATION', verification)
    }
  } catch (err) {}
}
