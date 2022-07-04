<template>
    <div class="inner">
        <h2>LAPORAN KEUANGAN</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Laporan Keuangan</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
      
        <div class="wf-container mt-4">
            <div class="row">
                <div class="col-lg-9">
                    <h4>Daftar Transaksi</h4>
                    <!-- <button class="btn btn-primary btn-sm"><i class="fa fa-plus fa-fw"></i> Tambah</button> -->
                </div>

                <div class="col-lg-3" style="text-align: right">
                    <div class="input-group-sm">
                        <input type="text" placeholder="Search..." v-model="searchKey" class="form-control">
                    </div>
                </div>
                
                 <div class="form-group">
                        <label for="name">Kode Kelas:</label>
                        <input type="text" v-model="change_data.course_id" class="form-control">
                    </div>
                      <div class="form-group mt-2">
                        <label for="mentor">Input Pengeluaran:   </label>
                        <input type="text" v-model="change_data.pengeluaran" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label for="mentor">Keterangan  </label>
                        <input type="text" v-model="change_data.ket" class="form-control">
                    </div>
                    <hr>
                    <div class="form-group mt-2">
                            <button class="btn btn-default btn-block w-100" @click="saveData">Tambah Pengeluaran</button>
                    </div>
                    
            </div>
            <table id="transactions_table" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                      
                        <th>Kode Kelas</th>
                        <th>Pengeluaran</th>
                        <th>Pemasukan</th>
                        <th>Saldo</th>
                        <th>Keterangan</th>
                        <th>Tanggal Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in getTransactions()" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ v.course.name }}</td>
                        <td>{{ v.user.email }}</td>
                        <td>{{ v.total }}</td>
                        <td>{{ date_format(v.created_at) }}</td>
                   
                    </tr>
                </tbody>
            </table>
          
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    data() {
        return {
            change_data: {
                course_id: '',
                pengeluaran: '',
                ket: '',
            }
            
        }
    },
    methods: {
        saveData() {
            axios.post('/user/changepassword', this.change_data)
            .then(r => {
                console.dir(r);
                this.change_data = {
                     course_id: '',
                    pengeluaran: '',
                    ket: '',
                }
                swal({
                    title: "Berhasil",
                    text: r.data.message,
                    icon: "success",
                    button: "Baik",
                });
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
        }
    }
}
</script>