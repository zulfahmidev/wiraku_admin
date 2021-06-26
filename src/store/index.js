import {createStore} from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

export default createStore({
    state: {
        user: null,
    },

    mutations: {
        setUserData (state, userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
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