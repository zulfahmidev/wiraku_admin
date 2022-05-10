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
        login({commit}, request) {
            return axios
            .post('/auth/login', request.credentials)
            .then(({ data }) => {
                if (data.user.roles != 'user') {
                    commit('setUserData', data)
                    request.callback({
                        status: 200,
                        data,
                    }) 
                }
                request.callback({
                    status: 403,
                    data,
                }) 
            });
        },
        checklogged({commit}) {
            const userInfo = localStorage.getItem('user')
            if (userInfo) {
                const userData = JSON.parse(userInfo)
                let date = new Date();
                let time = parseInt(`${date.getTime()}`.split('').slice(0,10).join(''));
                commit('setUserData', userData)
                this.login = true;
                if (time >= parseInt(userData.expired_at)) {
                    this.dispatch('logout')
                }
                axios.interceptors.response.use(
                    response => response,
                    error => {
                        if (error.response.status === 401) {
                        this.dispatch('logout')
                        }
                        return Promise.reject(error)
                    }
                )
            }
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