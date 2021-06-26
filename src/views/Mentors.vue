<template>
    <div class="inner">
        <h2>Mentors</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Mentors</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        <ul class="nav nav-pills categories">
            <li class="nav-item active">
                <a href="" class="nav-link">All</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Bisnis</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Programming</a>
            </li>
        </ul>
        <div class="row mentors mt-4">
            <div v-for="(v,i) in mentors" :key="i" class="col-md-4">
                <div class="mentor text-center wf-container mb-4">
                    <img :src="`/upload/mentor/profile/${v.profile}`" class="wf-avatar" alt="Course Image">
                    <h5 class="name">{{ v.name }}</h5>
                    <p class="desc">{{ v.profesion }}</p>
                    <div class="btn btn-default btn-block">EDIT</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="add wf-container" @click="showModalAdd">
                    <div class="icon"><i class="fa fa-plus"></i></div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" ref="ModalAddMentor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledref="ModalAddMentorLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" ref="ModalAddMentorLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group mb-2">
                        <label for="email">Email:</label>
                        <input v-model="create.email" type="text" id="email" class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <label for="email">Kategori:</label>
                        <select class="form-select" v-model="create.category_id" aria-label="Default select example">
                            <option v-for="(v,i) in categories" :key="i" :value="v.id">{{ v.name }}</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label for="biography">Biografi:</label>
                        <textarea id="biography" v-model="create.biography"  class="form-control"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="createMentor" class="btn btn-primary">Buat Kelas</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
let bootstrap = require('bootstrap');
axios.defaults.baseURL = 'http://localhost:8000/api';
export default {
    data() {
        return {
            mentors: [],
            categories: [],
            create: {
                email: '',
                category_id: 0,
                biography: '',
                modal: null,
            },
        }
    },
    methods: {
        showModalAdd() {
            this.create.modal.show();
        },
        createMentor() {
            axios.post('/user/set_mentor', {
                email_user: this.create.email,
                category_id: this.create.category_id,
                biography: this.create.biography,
            }).then(r => {
                console.log(r)
                this.mentors.push(r.data.body)
                swal({
                    title: "Berhasil",
                    text: "Lesson Berhasil Dibuat!",
                    icon: "success",
                    button: "Baik",
                });
            }).catch(e => {
                console.dir(e);
            })
        }
    },
    mounted() {
        axios.get('/mentor')
        .then(r => {
            this.mentors = r.data.body;
        })
        .catch(e => {
            console.dir(e);
        })
        axios.get('/category')
        .then(r => {
            this.categories = r.data.data;
        })
        .catch(e => {
            console.dir(e);
        })
        this.create.modal = new bootstrap.Modal(this.$refs.ModalAddMentor, {
            keyboard: false
        })
    },
}
</script>