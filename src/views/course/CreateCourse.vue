<template>
    <div class="inner">
        <h2>Courses</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Kelas</li>
                <li class="breadcrumb-item active" aria-current="page">Buat Kelas</li>
            </ol>
        </nav>
        <div class="row courses mt-6">
            <div class="col-lg-7">
                <div class="wf-container">
                    <div class="form-group">
                        <label for="name">Nama: </label>
                        <input type="text" id="name" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label for="mentor">Mentor: </label>
                        <input type="text" id="mentor" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label for="category">Kategori: </label>
                        <input type="text" id="category" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label for="description">Deskripsi: </label>
                        <textarea id="description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
// import swal from 'sweetalert';
// import {bootstrap} from 'bootstrap';
axios.defaults.baseURL = 'http://localhost:8000/api';
export default {
    data() {
        return {
            courses: [],
        }
    },
    mounted() {
        axios.get('/course')
        .then(r => {
            // console.log(r.data.data);
            
            this.courses = r.data.data;
        })
        .catch(e => {
            console.dir(e);
        })
    },
}
</script>