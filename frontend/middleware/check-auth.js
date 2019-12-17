export default function({ store, redirect, route }) {
  if (!store.state.user) {
    return redirect(`/auth/authorizing?to=${route.path}`)
  }
}
