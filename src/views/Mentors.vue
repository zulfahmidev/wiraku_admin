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
                    <div class="btn btn-default btn-block" @click="deleteMentor(i)">HAPUS</div>
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
                        <input v-model="create.email_user" @keydown.enter="createMentor" type="text" id="email" class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.add.email_user" :key="i">{{ v }}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="createMentor" class="btn btn-primary">Tambah</button>
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
                email_user: '',
                modal: null,
            },
            errors: {
                add: {
                    email_user: []
                }
            }
        }
    },
    methods: {
        showModalAdd() {
            this.create.modal.show();
        },
        deleteMentor(i) {
            event.preventDefault();
            let conf = confirm('Apakah anda yakin ingin mengahapus mentor ini?')
            if (conf) {
                let mentor = this.mentors[i];
                axios.delete(`/user/remove_mentor/${mentor.id}`).then(() => {
                    this.mentors.splice(i,1);
                    swal({
                        title: "Berhasil",
                        text: "Mentor berhasil dihapus!",
                        icon: "success",
                        button: "Baik",
                    });
                })
                .catch(e => {
                    console.dir(e);
                })
            }
        },
        createMentor() {
            axios.post('/user/set_mentor', {
                email_user: this.create.email_user,
            }).then((r) => {
                this.mentors.push(r.data.body)
                this.create.modal.hide();
                this.create.email_user = '';
                swal({
                    title: "Berhasil",
                    text: "Mentor berhasil ditambahkan!",
                    icon: "success",
                    button: "Baik",
                });
            }).catch(e => {
                console.dir(e)
                let r = e.response;
                this.errors.add = {
                    email_user: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    console.log(data);
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors.add[key] = val;
                        }
                    }
                }
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