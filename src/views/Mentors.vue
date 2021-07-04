<template>
    <div class="inner">
        <h2>Mentor</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Mentor</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>

        <!--  -->

        <div class="wf-container mt-4">
            <div class="row">
                <div class="col-lg-9">
                    <button class="btn btn-primary btn-sm" @click="showModalAdd"><i class="fa fa-plus fa-fw"></i> Tambah</button>
                </div>
                <div class="col-lg-3" style="text-align: right">
                    <div class="input-group-sm">
                        <input type="text" placeholder="Search..." v-model="searchKey" class="form-control">
                    </div>
                </div>
            </div>
            <table id="transactions_table" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Kelas</th>
                        <th>Email</th>
                        <th>Profesi</th>
                        <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in getMentors()" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ v.name }}</td>
                        <td>{{ v.email }}</td>
                        <td>{{ (v.category != null) ? v.category.name : 'Tidak Punya' }}</td>
                        <td>
                            <div class="btn btn-danger btn-sm" @click="deleteMentor(i)"><i class="fa fa-fw fa-trash"></i></div>
                        </td>
                        <!-- <td>{{ date_format(v.created_at) }}</td> -->
                        <!-- <td>
                            <button v-if="v.status != null" @click="switchStatus(i)" :class="`btn btn-success btn-sm`"><i class="fa fa-check"></i></button>
                            <button v-if="v.status == null" @click="switchStatus(i)" :class="`btn btn-secondary btn-sm`"><i class="far fa-clock"></i></button>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li :class="`page-item ${pagination.page == 0 ? 'disabled' : ''}`">
                        <a class="page-link" @click="setPage(pagination.page-1)" href="#">Previous</a>
                    </li>
                    <li :class="`page-item ${i-1 == pagination.page ? 'active' : ''}`" v-for="i in pagination.pages" :key="i"><a @click="setPage(i-1)" class="page-link" href="#">{{ i }}</a></li>
                    <li :class="`page-item ${pagination.page+1 == pagination.pages ? 'disabled' : ''}`">
                        <a class="page-link" @click="setPage(pagination.page+1)" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>

        <!--  -->

        <!-- <div class="row mentors mt-4">
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
        </div> -->

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
            searchKey: '',
            pagination: {
                page: 0,
                count: 5,
                pages: 0,
            },
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
        getMentors() {
            let mentors = [...this.mentors];
            
            if (this.searchKey.trim() != '') {
                mentors = mentors.filter((v) => {
                    return (
                        v.name.toLowerCase().includes(this.searchKey.toLowerCase().trim()) ||
                        v.email.toLowerCase().includes(this.searchKey.toLowerCase().trim()) ||
                        v.category.name.toLowerCase().includes(this.searchKey.toLowerCase().trim())
                    );
                })
            }

            let rows = mentors.length;
            let pages = Math.ceil(rows/this.pagination.count);
            this.pagination.pages = pages;
            let start = this.pagination.page*this.pagination.count;
            mentors = mentors.splice(start, start+this.pagination.count);

            return mentors;
        },
        date_format(v) {
            let date = new Date(v);
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        },
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