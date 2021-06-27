<template>
    <div class="inner">
        <h2>Kelas</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Kelas</li>
                <li class="breadcrumb-item active" aria-current="page"></li>
            </ol>
        </nav>
        <ul class="nav nav-pills categories">
            <li class="nav-item active">
                <a href="" class="nav-link">Semua</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Bisnis</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Pemrograman</a>
            </li>
        </ul>
        <div class="row courses mt-4">
            <div class="col-md-4" v-for="(v,i) in courses" :key="i">
                <div class="course wf-container mb-4 text-center">
                    <img v-if="v.thumbnail && v.thumbnail != ''" :src="`${server_url}upload/course/thumbnail/${v.thumbnail}`" class="wf-media" alt="Course Image">
                    <h5 class="title">{{ v.name }}</h5>
                    <router-link :to="{name:'EditCourse', params: {id: v.id}}" class="btn btn-default mt-2">Edit</router-link>
                </div>
            </div>
            <div class="col-md-4">
                <div class="add wf-container" @click="showAddModal">
                    <div class="icon"><i class="fa fa-plus"></i></div>
                </div>
            </div>
        </div>

        <!-- Modal Tambah Course -->

        <div class="modal fade" ref="ModalAddCourse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledref="ModalAddCourseLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" ref="ModalAddCourseLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Nama:</label>
                        <input v-model="create.name" @keydown.enter="createCourse" type="text" id="name" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="createCourse" class="btn btn-primary">Buat Kelas</button>
                </div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';
let bootstrap = require('bootstrap');
export default {
    data() {
        return {
            create: {
                name: '',
                modal: null,
            },
            server_url: process.env.VUE_APP_SERVER_URL,
            courses: [],
        }
    },
    methods: {
        showAddModal() {
            this.create.modal.show();
        },
        createCourse() {
            axios.post('/course', {
                name: this.create.name,
            }).then(r => {
                let v = r.data.data;
                this.courses.push(v);
                this.create.modal.hide();
                this.$router.push({
                    name: 'EditCourse',
                    params: {id: v.id}
                });
            })
        }
    },
    mounted() {
        axios.get('/course')
        .then(r => {
            this.courses = r.data.data;
        })
        .catch(e => {
            console.dir(e);
        })
        this.create.modal = new bootstrap.Modal(this.$refs.ModalAddCourse, {
            keyboard: false
        })
    },
}
</script>