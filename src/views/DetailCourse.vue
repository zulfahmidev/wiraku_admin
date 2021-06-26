<template>
    <div class="inner">
        <h2>Detail Kelas</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'Courses', params: {}}">Kelas</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Detail Kelas</li>
            </ol>
        </nav>
        <div class="row mt-4">
            <div class="col-xl-7">
                <div class="wf-container">
                    <label for="">Thumbnail:</label>
                    <div class="input-group mb-2">
                        <input type="file" @change="handleThumbnail" ref="thumbnail" placeholder="Ketik disini..." class="form-control">
                        <button class="btn btn-outline-secondary" @click="updateThumbnail" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                    <label for="">Sertifikat:</label>
                    <div class="input-group mb-2">
                        <input type="file" ref="certificate" @change="handleCertificate" placeholder="Ketik disini..." class="form-control">
                        <button class="btn btn-outline-secondary" @click="updateCertificate" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                    <hr>
                    <div class="form-group mb-2">
                        <label for="">Nama:</label>
                        <input type="text" v-model="result.name" placeholder="Ketik disini..." class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Harga:</label>
                        <input type="number" v-model="result.price" placeholder="Ketik disini..." class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Deskripsi:</label>
                        <textarea class="form-control" v-model="result.description" placeholder="Ketik disini..."></textarea>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Email Mentor:</label>
                        <input type="text" v-model="emailMentor" placeholder="Ketik disini..." class="form-control">
                    </div>
                    <div class="btn btn-default mt-2 btn-block" @click="saveChange">Simpan Perubahan</div>
                </div>
                <div class="row mt-4">

                    <!-- Coupons -->
                    
                    <div class="col-xl-6">
                        <h4 class="mb-3">Kupon</h4>
                        <div class="wf-items">
                            <div class="item">
                                <div class="title">WeJob</div>
                                <div class="desc text-black-50">Rp 15.000</div>
                            </div>
                            <div class="item">
                                <div class="title">WeJob</div>
                                <div class="desc text-black-50">Rp 15.000</div>
                            </div>
                            <div class="item">
                                <div class="title">WeJob</div>
                                <div class="desc text-black-50">Rp 15.000</div>
                            </div>
                            <div class="item">
                                <div class="title">WeJob</div>
                                <div class="desc text-black-50">Rp 15.000</div>
                            </div>
                            <div class="item add">
                                <div class="icon"><i class="fa fa-plus"></i></div>
                            </div>
                        </div>
                    </div>

                    <!-- End Coupons -->

                    <!-- Categories -->

                    <div class="col-xl-6">
                        <h4 class="mb-3">Kategori</h4>
                        <div class="wf-items">
                            <div class="item" v-for="(v,i) in result.categories" :key="i">
                                <div class="title">{{ v.name }}</div>
                            </div>
                            <div class="item add" @click="showModalAC">
                                <div class="icon"><i class="fa fa-plus"></i></div>
                            </div>
                        </div>
                    </div>

                    <!-- End Categories -->
                </div>
            </div>

            <!-- Chapters / Lessons -->
            <div class="col-xl-5">

                <!-- Main Button Add -->

                <div :class="`btn-group dropdown`" v-if="chapterEmpty" id="addBtn">
                    <button type="button" class="btn btn-primary btn-block dropdown-toggle" style="width: 100%;" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-plus fa-fw"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="showModalChapter" href="#"><i class="fa fa-plus fa-fw"></i> <b>Chapter</b></a></li>
                        <li><a class="dropdown-item" href="#"><i class="fa fa-plus fa-fw"></i> <b>Lesson</b></a></li>
                    </ul>
                </div>
                
                <!-- End Main Button Add -->

                <!-- Chapters -->

                <div class="chapter" v-for="(c,i) in result.chapter" :key="i">
                    <div class="row">
                        <div class="col-lg-8">
                            <h4 class="my-3">{{ c.name }}</h4>
                        </div>
                        <div class="col-lg-4" style="justify-content: flex-end;display: flex;align-items:center;">
                            <a href="" class="text-danger" style="padding-right: 1.2rem;" @click="deleteChapter(i)"><i class="fa fa-trash"></i></a>
                        </div>
                    </div>
                    <div class="wf-items lessons">

                        <!-- Lessons -->

                        <div class="item mb-2" v-for="(l,li) in c.lesson" :key="li">
                            <div class="icon"><i class="fa fa-play"></i></div>
                            <div class="text-black-50">
                                {{ l.name }}
                            </div>
                            <div style="text-align: right;">
                                <a href="" class="text-danger" @click="deleteLesson(i,li)"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>

                        <!-- End Lessons -->

                    </div>

                    <!-- Button Add -->

                    <div class="btn-group dropdown" id="addBtn">
                        <button type="button" class="btn btn-primary btn-block dropdown-toggle" style="width: 100%;" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-plus fa-fw"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" @click="showModalChapter" href="#"><i class="fa fa-plus fa-fw"></i> <b>Chapter</b></a></li>
                            <li><a class="dropdown-item" @click="showModalLesson(i)" href="#"><i class="fa fa-plus fa-fw"></i> <b>Lesson</b></a></li>
                        </ul>
                    </div>

                    <!-- End Button Add -->

                </div>

                <!-- End Chapters -->
            </div>
        </div>

        <!-- Modal Chapter -->
        
        <div class="modal fade" ref="modalChapter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCLLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCLLabel">Tambah Chapter</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="chapterName">Name:</label>
                            <input type="text" v-model="chapterForm.name" id="chapterName" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="createChapter" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Lesson -->

        <div class="modal fade" ref="lessonChapter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCLLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCLLabel">Tambah Lesson</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="lessoName">Name:</label>
                            <input type="text" v-model="lessonForm.name" id="lessoName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="urlVideo">Vedeo Url:</label>
                            <input type="url" v-model="lessonForm.url" id="urlVideo" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="createLesson" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal Lesson -->

        <div class="modal fade" ref="addCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCLLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCLLabel">Tambah Lesson</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <select class="form-select" v-model="categoryForm.id" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option v-for="(v,i) in categories" :value="v.id" :key="i">{{ v.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="addCategory" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import * as bootstrap from 'bootstrap';

axios.defaults.baseURL = 'http://localhost:8000/api';

export default {
    props: {
        id: String,
    },
    data() {
        return {
            result: {},
            chapterForm: {
                name: '',
            },
            categoryForm: {
                id: -1,
            },
            lessonForm: {
                index: -1,
                chapter_id: -1,
                name: '',
                url: '',
            },
            emailMentor: '',
            modalChapter: null,
            modalLesson: null,
            modalAC: null,
            chapterEmpty: true,
            thumbnail: null,
            certificate: null,
            categories: [],
            courseCategories: [],
            errors: {

            }
        }
    },
    methods: {
        addCategory() {
            axios.post(`/course/${this.id}/category/${this.categoryForm.id}`)
            .then(r => {
                console.log(r)
                this.courseCategories.push(r.data.data);
                    swal({
                        title: "Berhasil",
                        text: "Kategori Berhasil Ditambahkan!",
                        icon: "success",
                        button: "Baik",
                    });
            })
        },
        handleThumbnail() {
            this.thumbnail = this.$refs.thumbnail.files[0];
        },
        handleCertificate() {
            this.certificate = this.$refs.certificate.files[0];
        },
        updateThumbnail() {
            if (this.thumbnail != null) {
                let form = new FormData();
                form.append('thumbnail', this.thumbnail);
    
                axios.post(`/course/${this.id}/thumbnail`, form)
                .then(r => {
                    console.log(r)
                    swal({
                        title: "Berhasil",
                        text: "Chapter Berhasil Dibuat!",
                        icon: "success",
                        button: "Baik",
                    });
                })
                .catch(e => {
                    console.dir(e);
                    swal({
                        title: "Gagal",
                        text: "Terdapat sesuatu yang bermasalah",
                        icon: "error",
                        button: "Baik",
                    });
                })
                return true;
            }
            swal({
                title: "Gagal Upload",
                text: "Anda belum memasukan file!",
                icon: "error",
                button: "Baik",
            });
        },
        updateCertificate() {

        },
        createChapter() {
            this.chapterEmpty = false;
            axios.post('/chapter', {
                name: this.chapterForm.name,
                course_id: this.result.id,
            }).then(r => {
                console.dir(r);
                let chapter = r.data.data;
                chapter.lesson = [];
                this.result.chapter.push(chapter)
                this.modalChapter.hide();
                this.chapterForm.name = '';
                
                if (this.result.chapter.length > 0) this.chapterEmpty = false;
                // console.log()

                swal({
                    title: "Berhasil",
                    text: "Chapter Berhasil Dibuat!",
                    icon: "success",
                    button: "Baik",
                });
            }).catch(e => {
                console.dir(e);
            })
        },
        deleteLesson(ci, li) {
            event.preventDefault();
            let conf = confirm('Apakah anda yakin ingin mengahapus lesson ini?')
            if (conf) {
                let chapter = this.result.chapter[ci];
                let lesson = chapter.lesson[li];
                axios.delete('/lesson/'+lesson.id).then(() => {
                    this.result.chapter[ci].lesson.splice(li,1);
                    swal({
                        title: "Berhasil",
                        text: "Lesson Berhasil Dibuat!",
                        icon: "success",
                        button: "Baik",
                    });
                })
            }
        },
        deleteChapter(i) {
            event.preventDefault();
            let conf = confirm('Apakah anda yakin ingin mengahapus chapter ini?')
            let chapter = this.result.chapter[i];
            if (conf) {
                axios.delete('/chapter/'+chapter.id).then(() => {
                    this.result.chapter.splice(i,1);
                    this.chapterEmpty = this.result.chapter.length == 0;
                    swal({
                        title: "Berhasil",
                        text: "Chapter Berhasil Dibuat!",
                        icon: "success",
                        button: "Baik",
                    });
                })
            }
        },
        createLesson() {
            axios.post('/lesson', this.lessonForm).then(r => {
                let lesson = r.data.data;
                this.result.chapter[this.lessonForm.index].lesson.push(lesson);
                this.lessonChapter.hide();
                this.lessonForm.name = '';
                this.lessonForm.url = '';
                this.lessonForm.id = -1;

                swal({
                    title: "Berhasil",
                    text: "Lesson Berhasil Dibuat!",
                    icon: "success",
                    button: "Baik",
                });
            })
        },
        showModalLesson(i) {
            this.lessonForm.index = i;
            let chapter = this.result.chapter[i];
            this.lessonForm.chapter_id = chapter.id;
            this.lessonChapter = new bootstrap.Modal(this.$refs.lessonChapter, {
                keyboard: false
            })
            this.lessonChapter.show();
        },
        saveChange() {
            axios.put('/course/'+this.result.id, {
                name: this.result.name,
                price: this.result.price,
                description: this.result.description,
                email_mentor: this.emailMentor,
            }).then(() => {
                // Berhasil
                swal({
                    title: "Berhasil",
                    text: "Perubahan Telah Disimpan!",
                    icon: "success",
                    button: "Baik",
                });
            }).catch(e => {
                console.dir(e);
            })
        },
        showModalChapter() {
            this.modalChapter = new bootstrap.Modal(this.$refs.modalChapter, {
                keyboard: false
            })
            this.modalChapter.show();
        },
        showModalAC() {
            this.modalAC = new bootstrap.Modal(this.$refs.addCategory, {
                keyboard: false
            })
            axios.get('/category')
            .then(r => {
                console.log(r);
                this.categories = r.data.data;
            })
            this.modalAC.show();
        }
    },
    async mounted() {
        await axios.get(`/course/${this.id}`)
        .then(r => {
            this.emailMentor = r.data.data.mentor.email;
            this.result = r.data.data;
            this.chapterEmpty = this.result.chapter.length == 0;
        }).catch((r) => {
            console.dir(r);
            this.$router.back();
        })
    },
}
</script>

<style>

#addBtn {
    display: block;
    
}
#addBtn .dropdown-toggle::after {
    display: none;
}

#addBtn .dropdown-menu {
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 200% !important;
}
</style>