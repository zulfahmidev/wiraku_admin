<template>
    <div class="inner">
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

<style lang="scss">

    .setting-item {
        text-decoration: none;

        .icon {
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

        .h5 {
            color: #000000;
            opacity: .5;
        }
        
        &:hover {
            .icon {
            //    background-color: rgba(13,110,253,.25) !important;
            }
            .h5 {
                opacity: .8;
            }
        }
    }

</style>