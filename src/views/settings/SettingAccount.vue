<template>
    <div class="inner">
        <h2>Pengaturan Akun</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                    <router-link :to="{name: 'Settings', params: {}}">Pengaturan</router-link>
                </li>
                <li class="breadcrumb-item" aria-current="page">Akun</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-lg-6">
                <div class="wf-container">
                    <h4># Ubah Password</h4>
                    <div class="form-group my-2">
                        <label for="">Password Lama: </label>
                        <input type="password" v-model="change_password_form.old_password" class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Password Baru: </label>
                        <input type="password" v-model="change_password_form.new_password" class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Konfirmasi Password Baru: </label>
                        <input type="password" v-model="change_password_form.confirm_new_password" class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <button class="btn btn-default btn-block w-100" @click="saveChangePassword">SIMPAN</button>
                    </div>
                </div>
                
            </div>
            <div class="col-lg-6">
                <div class="wf-container">
                    <h4># Profil</h4>
                    
                    <label for="">Foto Profil:</label>
                    <div class="input-group">
                        <input type="file" @change="handleprofile_image" ref="profile_image" placeholder="Ketik disini..." class="form-control">
                        <button class="btn btn-outline-primary" @click="updateprofile_image" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                    
                    <div class="form-group my-2">
                        <label for="">Nama: </label>
                        <input type="password" v-model="change_password_form.old_password" class="form-control">
                    </div>

                    <div class="form-group mb-2">
                        <button class="btn btn-default btn-block w-100" @click="saveChangePassword">SIMPAN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    data() {
        return {
            change_password_form: {
                old_password: '',
                new_password: '',
                confirm_new_password: '',
            },
            profile_image:null
            
        }
    },
    methods: {
        saveChangePassword() {
            axios.post('/user/changepassword', this.change_password_form)
            .then(r => {
                console.dir(r);
                this.change_password_form = {
                    old_password: '',
                    new_password: '',
                    confirm_new_password: '',
                }
                swal({
                    title: "Berhasil",
                    text: r.data.message,
                    icon: "success",
                    button: "Baik",
                });
            })
            .catch(e => {
                console.dir(e);
                swal({
                    title: "Gagal",
                    text: e.response.data.message,
                    icon: "danger",
                    button: "Baik",
                });
            })
        },
        handleprofile_image() {
            this.profile_image = this.$refs.profile_image.files[0];
        },
        updateprofile_image() {
            console.log('simpan boss')
            var userInfo = JSON.parse(localStorage.getItem('user'));
            let form = new FormData();
            console.log('profile image ',this.profile_image)
            form.append('profile_image', this.profile_image);

            axios.post(`/user/profile_image/${userInfo.user.id}`, form)
            .then(() => {
                swal({
                    title: "Berhasil",
                    text: "photo Profil berhasil diubah!",
                    icon: "success",
                    button: "Baik",
                });
            })
            .catch((e) => {
                let r = e.response;
                this.errors.profile_image = [];
                if (r.status == 403) {
                    let data = e.response.data.body;
                    this.errors.profile_image = data;
                }else {
                    swal({
                        title: "Gagal Upload",
                        text: "Telah terjadi sesuatu kesalahan!",
                        icon: "error",
                        button: "Baik",
                    });
                }
            })
        },
    },
    mounted() {
    },
}
</script>

<style>

    .setting-item {
        text-decoration: none;
    }
    .setting-item .icon {
        font-size: 40px;
        border-radius: 50%;
        background-color: #605dff !important;
        width: 80px;
        height: 80px;
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: center;
        margin: 1rem auto;
    }

    .setting-item .h5 {
        color: #000000;
        opacity: .5;
    }
        
    .setting-item :hover .h5 {
        
        opacity: .8;
        
    }
    

</style>
