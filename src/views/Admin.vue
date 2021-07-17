<template>
    <div class="inner">
        <h2>Admin</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Admin</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        <div class="wf-container mt-4">
            <div class="row">
                <div class="col-lg-9">
                    <!-- <h4>Daftar Admin</h4> -->
                    <button class="btn btn-primary btn-sm" @click="showModal()"><i class="fa fa-plus fa-fw"></i> Tambah</button>
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
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in getAdmins()" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ v.name }}</td>
                        <td>{{ v.email }}</td>
                        <td>
                            <button @click="remove(i)" :class="`btn btn-danger btn-sm`"><i class="fa fa-trash"></i></button>
                        </td>
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

        <!-- Modal -->
        <div class="modal fade" ref="ModalAddAdmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledref="ModalAddAdminLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ref="ModalAddAdminLabel">Tambah Admin</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group mb-2">
                            <label for="email">Email:</label>
                            <input v-model="form.email" @keydown.enter="addAdmin" type="text" id="email" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.email" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="addAdmin" class="btn btn-primary">Tambah</button>
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
export default {
    data() {
        return {
            users: [],
            pagination: {
                page: 0,
                count: 5,
                pages: 0,
            },
            form: {
                modal: null,
                email: '',
            },
            errors: {
                email: [],
            },
            searchKey: '',
        };
    },
    methods: {
        setPage(page) {
            event.preventDefault();
            this.pagination.page = page;
        },
        getAdmins() {
            let users = this.users;
            if (this.searchKey.trim().length > 0) {
                users = users.filter((v) => {
                    if (v.name.includes(this.searchKey.trim()) || v.email.includes(this.searchKey.trim())) {
                        return v;
                    }
                }); 
            }
            return users;
        },
        addAdmin() {
            axios.post('/user/changerole', {
                email: this.form.email,
                role: 'admin',
            })
            .then(r => {
                this.users.push(r.data.body);
                this.form.email = '';
                swal({
                    title: "Berhasil",
                    text: "Admin berhasil ditambah",
                    icon: "success",
                    button: "Baik",
                });
                this.form.modal.hide();
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
        showModal() {
            this.form.modal.show();
        },
        remove(i) {
            let conf = confirm('Apakah anda yakin ingin menghapus?');
            if (conf) {
                axios.post('/user/changerole', {
                    email: this.getAdmins()[i].email,
                    role: 'user',
                })
                .then(() => {
                    this.users.splice(i,1);
                    swal({
                        title: "Berhasil",
                        text: "Admin berhasil dihapus",
                        icon: "success",
                        button: "Baik",
                    });
                    this.form.modal.hide();
                })
                .catch(e => {
                    console.dir(e);
                    swal({
                        title: "Gagal",
                        text: "Admin gagal dihapus",
                        icon: "danger",
                        button: "Baik",
                    });
                })
            }
        }
    },
    async mounted() {
        await axios.get(`/user?role=admin`)
        .then((r) => {
            this.users = r.data.body;
        })
        this.form.modal = new bootstrap.Modal(this.$refs.ModalAddAdmin, {
            keyboard: false
        })
    }
}
</script>