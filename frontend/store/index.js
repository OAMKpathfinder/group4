export const state = () => ({
  user: undefined,
  token: undefined,
  verification: undefined
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_VERIFICATION (state, id) {
    state.verification = id
  }
}

export const actions = {
  async SIGN_IN ({ commit }, credentials) {
    try {
      const token = await this.$axios.$post('/users/auth/login', credentials)
      // TODO: Store Token in LocalStorage
      // eslint-disable-next-line no-console
      window.localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
      return token
    } catch (err) {
      throw new Error(err)
    }
  },
  async SIGN_UP ({ commit }, credentials) {
    try {
      const user = await this.$axios.$post('/users/auth/signup', credentials)
      // eslint-disable-next-line no-console
      console.log(user)
      commit('SET_VERIFICATION', user.id)
      window.localStorage.setItem('verification', user.id)
      return user
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw new Error(err)
    }
  },
  async RESEND_VERIFICATION ({ state, commit }) {
    try {
      await this.$axios.$get(`users/regenerateCode/${state.verification}`)
      return true
    } catch (err) {
      // eslint-disable-next-line no-console
      throw new Error(err.response.data)
    }
  },
  async GET_USER ({ state, commit }) {
    try {
      if (!state.token) { return this.$router.push('/auth/signin') }

      const user = await this.$axios.$get(`users`, {
        headers: { 'x-access-token': state.token }
      })

      commit('SET_USER', user)
    } catch (err) {
      throw new Error(err.response.data)
    }
  }
}
