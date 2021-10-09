<template>
    <div class="inner" id="settings">
        <h2>Pengaturan</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Pengaturan</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-lg-4 mb-2">
                <router-link :to="{name: 'Setting Account', params: []}" class="setting-item">
                    <div class="wf-container text-center">
                        <div class="icon"><i class="fa fa-user"></i></div>
                        <div class="h5">AKUN</div>
                    </div>
                </router-link>
            </div>
            <div class="col-lg-4 mb-2">
                <router-link :to="{name: 'Setting Category', params: []}" class="setting-item">
                    <div class="wf-container text-center">
                        <div class="icon"><i class="fa fa-heart"></i></div>
                        <div class="h5">KATEGORI</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import swal from 'sweetalert';
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>