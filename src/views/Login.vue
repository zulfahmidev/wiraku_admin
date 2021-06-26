<template>
    <div id="login">
        <div class="banner" style="background-image: url('/img/637982.jpg');"></div>
        <div class="main">
            <div class="logo"></div>
            <h2>Let's Begin</h2>
            <div class="wf-container">
                <div v-if="error" class="alert alert-danger">
                    Email atau Password anda salah!
                </div>
                <div class="form-group">
                    <label for="email">Your Email</label>
                    <input type="email" v-model="email" id="email" class="form-control">
                    <small class="text-danger" @keydown.enter="login"  v-for="(v,i) in errors.email" :key="i">{{ v }}</small>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" @keydown.enter="login" v-model="password" id="password" class="form-control">
                    <small class="text-danger" v-for="(v,i) in errors.password" :key="i">{{ v }}</small>
                </div>
                <button @click="login" class="btn btn-default btn-block">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import swal from 'sweetalert';
// import {bootstrap} from 'bootstrap';
// axios.defaults.baseURL = 'http://localhost:8000/api';

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: {
                email: [],
                password: [],
            },
            error: false,
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then(() => {
                this.$emit('success');
            }).catch(e => {
                let r = e.response;
                this.errors = {
                    email: [],
                    password: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors[key] = val;
                        }
                    }
                } else {
                    this.error = true;
                }
            });
        }
    },
}
</script>