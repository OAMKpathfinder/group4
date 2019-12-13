export const state = () => ({
  user: undefined,
  token: undefined,
  verification: undefined,
  houses: []
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_VERIFICATION(state, id) {
    state.verification = id
  },
  SET_HOUSES(state, houses) {
    state.houses = houses
  }
}

export const actions = {
  async SIGN_IN({ commit }, credentials) {
    try {
      const token = await this.$axios.$post('/users/auth/login', credentials)
      window.localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
      return token
    } catch (err) {
      throw new Error(err)
    }
  },
  async SIGN_UP({ commit }, credentials) {
    try {
      const user = await this.$axios.$post('/users/auth/signup', credentials)
      commit('SET_VERIFICATION', user.id)
      window.localStorage.setItem('verification', user.id)
      return user
    } catch (err) {
      throw new Error(err)
    }
  },
  async RESEND_VERIFICATION({ state }) {
    try {
      await this.$axios.$get(`users/regenerateCode/${state.verification}`)
      return true
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_USER({ commit }, token) {
    try {
      commit('SET_TOKEN', token)
      const user = await this.$axios.$get('users', {
        headers: { 'x-access-token': `${token}` }
      })
      commit('SET_USER', user)
      return user
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_PARTS({ state }) {
    try {
      return await this.$axios.$get(`house-parts`, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_MATERIALS({ state }) {
    try {
      return await this.$axios.$get(`materials`, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_LOCATIONS({ state }) {
    try {
      return await this.$axios.$get(`locations`, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_HEATING_SYSTEMS({ state }) {
    try {
      return await this.$axios.$get(`heating-systems`, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_DEFAULTS({ state }) {
    try {
      return await this.$axios.$get(`defaults`, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async POST_HOUSE({ state }, data) {
    try {
      return await this.$axios.$post(`houses`, data, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async POST_HOUSE_DETAILS({ state }, data) {
    try {
      return await this.$axios.$post(`houses-details`, data, {
        headers: { 'x-access-token': state.token }
      })
    } catch (err) {
      throw new Error(err.response.data)
    }
  },
  async GET_HOUSES({ state, commit }) {
    try {
      const data = await this.$axios.$get('houses/user', {
        headers: { 'x-access-token': state.token }
      })
      commit('SET_HOUSES', data)
    } catch (err) {
      throw new Error(err.response.data)
    }
  }
}
