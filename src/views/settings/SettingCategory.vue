<template>
    <div class="inner">
        <h2>Pengaturan Kategori</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                    <router-link :to="{name: 'Settings', params: {}}">Pengaturan</router-link>
                </li>
                <li class="breadcrumb-item" aria-current="page">Kategori</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-lg-6">
                <div class="wf-container">
                    <label for="">Kategori: </label>
                    <div class="input-group">
                        <input type="text" class="form-control" @keydown.enter="addCategory" v-model="forms.category.name">
                        <button class="btn btn-outline-primary" @click="addCategory" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                    <div class="categories-badge">
                        <div class="item" v-for="(v,i) in categories" :key="i">
                            <div class="name">{{ v.name }}</div>
                            <div class="delete" @click="deleteCategory(i)"><i class="fa fa-times"></i></div>
                        </div>
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
            forms: {
                category: {
                    name: '',
                }
            },
            categories: [],
        }
    },
    methods: {
        deleteCategory(i) {
            let category = this.categories[i];
            let conf = confirm("Apakah anda yakin ingin menghapus kategori ini?");
            if (conf) {
                axios.delete(`/category/${category.id}`)
                .then(() => {
                    this.categories.splice(i,1);
                this.forms.category.name = '';
                swal({
                    title: "Berhasil",
                    text: "Kategori berhasil dihapus!",
                    icon: "success",
                    button: "Baik",
                });
                })
            }
        },
        addCategory() {
            axios.post('/category', {
                name: this.forms.category.name,
            })
            .then(r => {
                this.categories.push(r.data.body);
                this.forms.category.name = '';
                swal({
                    title: "Berhasil",
                    text: "Kategori berhasil ditambah!",
                    icon: "success",
                    button: "Baik",
                });
            })

        }
    },
    mounted() {
        axios.get('/category')
        .then(r => {
            this.categories = r.data.body;
        })
    },
}
</script>

<style>

.categories-badge {
    display: flex;
    flex-flow: wrap;
}
.categories-badge .item {
    display: flex;
    width: fit-content;
    padding: 0.4rem .8rem;
    margin-top: .5rem;
    margin-right: .5rem;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    background: #73abff;
}
.categories-badge .item .name {
    margin-right: .8rem;
}
.categories-badge .item .delete {
    cursor: pointer;
    opacity: .75;
}
.categories-badge .item .delete:hover {
    opacity: 1;
}
</style>