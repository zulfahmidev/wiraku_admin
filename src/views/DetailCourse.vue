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
                    <div class="input-group">
                        <input type="file" @change="handleThumbnail" ref="thumbnail" placeholder="Ketik disini..." class="form-control">
                        <button class="btn btn-outline-primary" @click="updateThumbnail" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                    <div class="small text-danger" v-for="(v,i) in errors.thumbnail.thumbnail" :key="i">{{ v }}</div>
                    <label for="" class="mt-2">Sertifikat:</label>
                    <div class="input-group">
                        <input type="file" ref="certificate" @change="handleCertificate" placeholder="Ketik disini..." class="form-control">
                        <button class="btn btn-outline-primary" @click="updateCertificate" type="button" id="inputGroupFileAddon04">Simpan</button>
                    </div>
                        <div class="small text-danger" v-for="(v,i) in errors.certificate.certificate" :key="i">{{ v }}</div>
                    <hr>
                    <div class="form-group my-2">
                        <label for="">Nama:</label>
                        <input type="text" v-model="result.name" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.name" :key="i">{{ v }}</div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Harga:</label>
                        <input type="number" v-model="result.price" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.price" :key="i">{{ v }}</div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Deskripsi:</label>
                        <textarea class="form-control" v-model="result.description" placeholder="Ketik disini..."></textarea>
                        <div class="small text-danger" v-for="(v,i) in errors.detail.description" :key="i">{{ v }}</div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Email Mentor:</label>
                        <input type="text" v-model="emailMentor" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.email_mentor" :key="i">{{ v }}</div>
                    </div>
                    <div class="btn btn-default mt-2 btn-block" @click="saveChange">Simpan Perubahan</div>
                    <div class="btn btn-default mt-2 btn-block" @click="deleteCourse">Hapus Kelas</div>
                </div>
                <div class="row mt-4">

                    <!-- Coupons -->
                    
                    <div class="col-xl-6">
                        <h4 class="mb-3">Kupon</h4>
                        <div class="wf-items">
                            <div class="item" v-for="(v,i) in result.coupons" :key="i">
                                <div class="row">
                                    <div class="col-10">
                                        <div class="title">{{ v.name }}</div>
                                        <div class="d-flex">
                                            <div class="small text-black-50">Rp. {{ parseInt(result.price)*(parseInt(v.discount)/100) }}</div>
                                            <div class="mx-1 small text-black-50">|</div>
                                            <div class="small text-black-50">{{ v.expired_at }}</div>
                                        </div>
                                    </div>
                                    <div class="col-2" style="justify-content: flex-end;display: flex;align-items:center;">
                                        <a href="" class="text-danger" style="padding-right: 1.2rem;" @click="deleteCoupon(i)"><i class="fa fa-trash"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="item add" @click="showModalCoupon">
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
                                <div class="row">
                                    <div class="col-10">
                                        <div class="title">{{ v.name }}</div>
                                    </div>
                                    <div class="col-2" style="justify-content: flex-end;display: flex;align-items:center;">
                                        <a href="" class="text-danger" style="padding-right: 1.2rem;" @click="deleteCategory(i)"><i class="fa fa-trash"></i></a>
                                    </div>
                                </div>
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
                    <button type="button" class="btn btn-primary btn-block" style="width: 100%;" @click="showModalChapter">
                        <i class="fa fa-plus fa-fw"></i>
                    </button>
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

                    <button type="button" class="btn btn-primary btn-block" @click="showModalMA(i)" style="width: 100%;" aria-expanded="false">
                        <i class="fa fa-plus fa-fw"></i>
                    </button>

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
                            <input type="text" v-model="chapterForm.name" @keydown.enter="createChapter" id="chapterName" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.chapter.name" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="createChapter" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- End Modal Chapter -->

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
                            <div class="small text-danger" v-for="(v,i) in errors.lesson.name" :key="i">{{ v }}</div>
                        </div>
                        <div class="form-group">
                            <label for="urlVideo">Vedeo Url:</label>
                            <input type="url" v-model="lessonForm.url" @keydown.enter="createLesson" id="urlVideo" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.lesson.url" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="createLesson" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- End Modal Lesson -->

        <!-- Modal Category -->

        <div class="modal fade" ref="addCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCLLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCLLabel">Tambah Kategori</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <select class="form-select" v-model="categoryForm.id" aria-label="Default select example">
                                <option v-for="(v,i) in categories" :value="v.id" :key="i">{{ v.name }}</option>
                            </select>
                            <div class="small text-danger" v-if="errors.category != ''">{{ errors.category }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="addCategory" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- End Modal Category -->

        
        <!-- Modal Category -->

        <div class="modal fade" ref="addCoupon" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCLLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCLLabel">Tambah Kupon</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form">
                            <label for="coupon_name">Name:</label>
                            <input type="text" id="coupon_name" v-model="couponForm.name" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.coupon.name" :key="i">{{ v }}</div>
                        </div>
                        <div class="form">
                            <label for="coupon_discount">Diskon:</label>
                            <input type="number" id="coupon_discount" min="0" max="100" v-model="couponForm.discount" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.coupon.discount" :key="i">{{ v }}</div>
                        </div>
                        <div class="form">
                            <label for="coupon_expired_at">Tanggal Kadaluarsa:</label>
                            <input type="date" id="coupon_expired_at" v-model="couponForm.expired_at" class="form-control">
                            <div class="small text-danger" v-for="(v,i) in errors.coupon.expired_at" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="addCoupon" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- End Modal Category -->
        
        <!-- Modal Category -->

        <div class="modal fade" ref="menuAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="menuAdd" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title small" id="menuAdd">Pilih yang ingin ditambahkan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-primary w-100 btn-sm" @click="showModalChapter">Chapter</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary w-100 btn-sm" @click="showModalLesson">Lesson</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- End Modal Category -->

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
            couponForm: {
                name: '',
                discount: 0,
                expired_at: '',
            },
            emailMentor: '',
            modalChapter: null,
            modalLesson: null,
            modalAC: null,
            modalCoupon: null,
            chapterEmpty: true,
            thumbnail: null,
            certificate: null,
            categories: [],
            courseCategories: [],
            errors: {
                chapter: {
                    name: [],
                },
                thumbnail: [],
                certificate: [],
                lesson: {
                    name: [],
                    url: [],
                },
                detail: {
                    name: [],
                    price: [],
                    description: [],
                    email_mentor: [],
                },
                category: '',
                coupon: {
                    name: [],
                    discount: [],
                    expired_at: [],
                },
            }
        }
    },
    methods: {
        addCategory() {
            axios.post(`/course/${this.id}/category/${this.categoryForm.id}`)
            .then(r => {
                this.result.categories.push(r.data.data);
                this.modalAC.hide();
                swal({
                    title: "Berhasil",
                    text: "Kategori berhasil ditambahkan!",
                    icon: "success",
                    button: "Baik",
                });
            })
            .catch(e => {
                let r = e.response;
                this.errors.category = '';
                if (r.status == 403) {
                    let data = r.data.message;
                    this.errors.category = data;
                }
            })
        },
        deleteCategory(i) {
            event.preventDefault();
            let conf = confirm('Apakah anda yakin ingin mengahapus Kupon ini?')
            if (conf) {
                let category = this.result.categories[i];
                axios.delete(`/course/${this.id}/category/${category.id}`).then(() => {
                    this.result.categories.splice(i,1);
                    swal({
                        title: "Berhasil",
                        text: "Kategori berhasil dihapus!",
                        icon: "success",
                        button: "Baik",
                    });
                })
            }
        },
        deleteCourse() {
            let conf = confirm('Apakah anda yakin ingin mengahapus Kelas ini?')
            if (conf) {
                axios.delete(`/course/${this.id}`).then(() => {
                    swal({
                        title: "Berhasil",
                        text: "Kategori berhasil dihapus!",
                        icon: "success",
                        button: "Baik",
                    });
                    this.$router.push({name: 'Courses'});
                })
                .catch(e => {
                    swal({
                        title: "Gagal",
                        text: "Telah terjadi kesalahan",
                        icon: "danger",
                        button: "Baik",
                    });
                    console.dir(e);
                })
            }
        },
        addCoupon() {
            axios.post(`/coupon`, {
                ...this.couponForm,
                course_id: this.id,
            })
            .then(r => {
                this.result.coupons.push(r.data.data);
                swal({
                    title: "Berhasil",
                    text: "Kupon berhasil ditambahkan!",
                    icon: "success",
                    button: "Baik",
                });
                this.modalCoupon.hide();
            })
            .catch(e => {
                let r = e.response;
                this.errors.coupon = {
                    name: [],
                    discount: [],
                    expired_at: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors.coupon[key] = val;
                        }
                    }
                }
            })
        },
        handleThumbnail() {
            this.thumbnail = this.$refs.thumbnail.files[0];
        },
        handleCertificate() {
            this.certificate = this.$refs.certificate.files[0];
        },
        updateThumbnail() {
            let form = new FormData();
            form.append('thumbnail', this.thumbnail);

            axios.post(`/course/${this.id}/thumbnail`, form)
            .then(() => {
                swal({
                    title: "Berhasil",
                    text: "Thumbnail berhasil diubah!",
                    icon: "success",
                    button: "Baik",
                });
            })
            .catch((e) => {
                let r = e.response;
                this.errors.thumbnail = [];
                if (r.status == 403) {
                    let data = e.response.data.body;
                    this.errors.thumbnail = data;
                }else {
                    swal({
                        title: "Gagal Upload",
                        text: "Telah terjadi sesuatu kesalahan!",
                        icon: "error",
                        button: "Baik",
                    });
                }
            })
        },
        updateCertificate() {
            let form = new FormData();
            form.append('certificate', this.certificate);

            axios.post(`/course/${this.id}/certificate`, form)
            .then(() => {
                swal({
                    title: "Berhasil",
                    text: "Certificate berhasil diubah!",
                    icon: "success",
                    button: "Baik",
                });
            })
            .catch((e) => {
                let r = e.response;
                this.errors.certificate = [];
                if (r.status == 403) {
                    let data = e.response.data.body;
                    this.errors.certificate = data;
                }else {
                    swal({
                        title: "Gagal Upload",
                        text: "Telah terjadi sesuatu kesalahan!",
                        icon: "error",
                        button: "Baik",
                    });
                }
            })
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
                let r = e.response;
                this.errors.chapter = {
                    name: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors.chapter[key] = val;
                        }
                    }
                }
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
                .catch(e => {
                    console.dir(e)
                })
            }
        },
        deleteCoupon(i) {
            event.preventDefault();
            let conf = confirm('Apakah anda yakin ingin mengahapus Kupon ini?')
            if (conf) {
                let coupon = this.result.coupons[i];
                axios.delete(`/coupon/${coupon.id}`).then(() => {
                    this.result.coupons.splice(i,1);
                    swal({
                        title: "Berhasil",
                        text: "Kupon berhasil dihapus!",
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
            .catch(e => {
                let r = e.response;
                console.dir(e);
                this.errors.lesson = {
                    name: [],
                    url: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors.lesson[key] = val;
                        }
                    }
                }else {
                    // this.modalLesson.hide();
                    swal({
                        title: "ERROR",
                        text: "Something went wrong!",
                        icon: "error",
                        button: "Close",
                    });
                }
            })
        },
        showModalLesson() {
            let chapter = this.result.chapter[this.lessonForm.index];
            console.log(this.lessonForm);
            this.lessonForm.chapter_id = chapter.id;
            this.lessonChapter = new bootstrap.Modal(this.$refs.lessonChapter, {
                keyboard: false
            })
            this.modalMenuAdd.hide();
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
                let r = e.response;
                this.errors.detail = {
                    name: [],
                    price: [],
                    description: [],
                    email_mentor: [],
                };
                if (r.status == 403) {
                    let data = e.response.data.body;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const val = data[key];
                            this.errors.detail[key] = val;
                        }
                    }
                }
            })
        },
        showModalChapter() {
            this.modalChapter = new bootstrap.Modal(this.$refs.modalChapter, {
                keyboard: false
            })
            this.modalMenuAdd.hide();
            this.modalChapter.show();
        },
        showModalAC() {
            this.modalAC = new bootstrap.Modal(this.$refs.addCategory, {
                keyboard: false
            })
            axios.get('/category')
            .then(r => {
                this.categories = r.data.body;
                this.categoryForm.id = this.categories[0].id;
            })
            this.modalAC.show();
        },
        showModalCoupon() {
            // console.log('a');
            this.modalCoupon = new bootstrap.Modal(this.$refs.addCoupon, {
                keyboard: false
            })
            this.modalCoupon.show();
        },
        showModalMA(i = -1) {
            this.lessonForm.index = i;
            this.modalMenuAdd = new bootstrap.Modal(this.$refs.menuAdd, {
                keyboard: false
            })
            this.modalMenuAdd.show();
        }
    },
    async mounted() {
        await axios.get(`/course/${this.id}`)
        .then(r => {
            this.emailMentor = r.data.data.mentor.email;
            this.result = r.data.data;
            this.chapterEmpty = this.result.chapter.length == 0;
        })
        .catch((r) => {
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