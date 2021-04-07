import axios from 'axios'
import contentApi from '@/api/contentApi'

export const state = () => ({
    langs: [
        {id: 1, lang : 'ro', active: 1},
        {id: 2, lang : 'en', active: 0},
        {id: 3, lang : 'ru', active: 0}
    ],
    lang: {id: 1, lang : 'ro', active: 1},
    envAPI: {},
    pages: [],
    services: [],
    allServices: [],
    promotions: [],
    experts: [],
    translations: {},
    banners: [],
    drawer: true,

    user: {},
    room: false,
    changedEmployee: null,
})

export const mutations = {
    setUser(state, user){
        const data = this.$axios.$get('/create-user', user);
        state.user = data
    },
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    drawer(state, val) {
        state.drawer = val
    },
    SET_SERVICES(state, data){
      state.services = data.services
      state.allServices = data.servicesAll
      state.promotions = data.promotions
      state.pages = data.pages
      state.banners = data.banners
  },
    SET_DEFAULT_LANG(state, id){
        state.lang = state.langs.find((lang) => lang.id === id)
    },
    SET_TRANSALATIONS(state, data){
        state.translations = data.vars
    },
    SOCKET_refreshEmployeeStatus(state, employee){
        state.changedEmployee = employee
    },
    SET_ENV_API(state, env){
        state.envAPI = env
    },
    SET_EXPERTS(state, experts){
        state.experts = experts
    },
}

export const actions = {

    async nuxtServerInit({ state, commit }) {
        await contentApi.getTranslations(state.lang.lang, data => commit('SET_TRANSALATIONS', data))
        await contentApi.getInitData(state.lang.lang, data => commit('SET_SERVICES', data))
        commit('SET_ENV_API', process.env.API)
    },

    async changeLanguage({ state, commit }, id) {
        commit('SET_DEFAULT_LANG', id)
        await contentApi.getTranslations(state.lang.lang, (response) => commit('SET_TRANSALATIONS', response))
        await contentApi.getInitData(state.lang.lang, (response) => commit('SET_SERVICES', response))
    },

    async getExpertsList({ commit }){
        await contentApi.getExperts( data => commit('SET_EXPERTS', data))
    },

    banner({ state }){
        return 'ok'
    },

    setDefaultChangedEmployee({ commit }){
        commit('SOCKET_refreshEmployeeStatus', null)
    }
}

export const getters = {
    getServices: state => state.services,
    getAllServices: state => state.allServices,
    getLanguages: state => state.langs,
    getLanguage: state => state.lang,
    getTranslations: state => state.translations,
    getChangedEmployee: state => state.changedEmployee,
    getEnvAPI: state => state.envAPI,
    getPromotions: state => state.promotions,
    getPages: state => state.pages,
    getExperts: state => state.experts,
    getBanners: state => state.banners,
}
