<template>
    <div id="wrapper" v-if="isLogged">
        <Sidebar></Sidebar>
        <Content></Content>
    </div>
    <Login v-if="!isLogged" @success="loginSuccess"></Login>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';
import Login from './views/Login.vue';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

export default {
    data() {
        return {
            isLogged: false,
        }
    },
    components: {
        Sidebar, Content, Login
    },
    methods: {
        loginSuccess() {
            this.checkLogged();
        },
        checkLogged() {
            const userInfo = localStorage.getItem('user')
            if (userInfo) {
                const userData = JSON.parse(userInfo)
                let date = new Date();
                let time = parseInt(`${date.getTime()}`.split('').slice(0,10).join(''));
                this.$store.commit('setUserData', userData)
                this.isLogged = true;
                if (time >= parseInt(userData.expired_at)) {
                    this.$store.dispatch('logout')
                }
                axios.interceptors.response.use(
                    response => response,
                    error => {
                    if (error.response.status === 401) {
                        this.$store.dispatch('logout')
                    }
                        return Promise.reject(error)
                    }
                )

            }
        },
    },
    mounted() {
        this.checkLogged();
    },
}
</script>