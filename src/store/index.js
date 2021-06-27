import {createStore} from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL + "api/";

export default createStore({
    state: {
        user: null,
    },

    mutations: {
        setUserData (state, userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
            this.state.user = userData.user;
        },

        clearUserData() {
            localStorage.removeItem('user');
            location.reload();
        }
    },

    actions: {
        login({commit}, credentials) {
            return axios
            .post('/auth/login', credentials)
            .then(({ data }) => {
                commit('setUserData', data)
            });
        },

        logout({commit}) {
            axios.post('logout');
            commit('clearUserData');
        },
    },

    getters: {
        isLogged: state => !!state.user,
    }
});