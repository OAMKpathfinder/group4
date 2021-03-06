import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const http = axios.create({
  baseURL: '/api/'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    tables: undefined
  },
  mutations: {
    ADD_USER(state, user) {
      state.user = user
    },
    ADD_TABLES(state, tables) {
      state.tables = tables
    }
  },
  actions: {
    async authenticate({ commit }, credentials) {
      try {
        const response = await http.post('/users/auth/login', {
          username: credentials.username,
          password: credentials.password
        })

        if (response.status >= 200 && response.status < 300) {
          commit('ADD_USER', response.data)
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async fetchTables({ commit }) {
      try {
        const response = await http.get('/admins/models')
        if (response.status >= 200 && response.status < 300) {
          commit('ADD_TABLES', response.data)
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async fetchTableData({ commit }, path) {
      try {
        const response = await http.get(`/admins/models/${path}`)
        if (response.status >= 200 && response.status < 300) {
          return response.data
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteTableRow({ commit }, { id, path }) {
      try {
        await http.delete(`/admins/models/${path}/${id}`)
        return true
      } catch (error) {
        throw new Error(error)
      }
    },

    async create({ commit }, { resource, data }) {
      try {
        const response = await http.post(`/admins/models/${resource}`, data)
        return response
      } catch (error) {
        throw new Error(error)
      }
    },

    async fetchFiles() {
      try {
        const files = await http.get(`/admins/files`)
        return files.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async upload(_, { data }) {
      try {
        const files = await http.post(`/admins/files`, data)
        return files.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async get({ commit }, { resource, id }) {
      try {
        const response = await http.get(`/admins/models/${resource}/${id}`)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async update({ commit }, { resource, id, data }) {
      try {
        const response = await http.put(
          `/admins/models/${resource}/${id}`,
          data
        )
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  modules: {}
})
