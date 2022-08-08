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
                
                <!-- <div class="form-group my-2">
                        <label for="">course_id:</label>
                        <input type="text" v-model="result.course_id" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.course_id" :key="i">{{ v }}</div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Pemasukan:</label>
                        <input type="number" v-model="result.pemasukan" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.pemasukan" :key="i">{{ v }}</div>
                    </div>
                       <div class="form-group mb-2">
                        <label for="">Pengeluaran:</label>
                        <input type="number" v-model="result.pengeluaran" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.pengeluaran" :key="i">{{ v }}</div>
                    </div>
                     <div class="form-group my-2">
                        <label for="">keterangan:</label>
                        <input type="text" v-model="result.keterangan" placeholder="Ketik disini..." class="form-control">
                        <div class="small text-danger" v-for="(v,i) in errors.detail.keterangan" :key="i">{{ v }}</div>
                    </div>
                    <div class="btn btn-default mt-2 btn-block w-100" @click="tambahpengeluaran">Tambah Pengeluaran</div> -->
            </div>
            <table id="transactions_table" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                      
                        <th>Kode Kelas</th>
                        <th>Pemasukan</th>
                        <!-- <th>Saldo</th> -->
                        <!-- <th>Keterangan</th> -->
                        <th>Tanggal Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in datakeuangan" :key="i">
                        <td>{{i+1}}</td>
                        <td>{{ v.course_id}}</td>
                        <!-- <td>{{ v.pengeluaran }}</td> -->
                        <td>{{ v.pemasukan }}</td>
                        <!-- <td>{{ v.saldo }}</td> -->
                        <td>{{ v.keterangan }}</td>
                        <td>{{date_format(v.created_at)}}</td>
                   
                    </tr>
                </tbody>
            </table>
          
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            result: {},
             
            datakeuangan:[]
            
        }
    },
    methods: {

        getdata(){
           axios.get('/keuangan')
            .then(r=>{                
                this.datakeuangan=r.data[0]
                console.log(this.datakeuangan)
            })
        },
        date_format(v) {
            let date = new Date(v);
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        },
          
    },
    mounted(){
        this.getdata()
    }
}
</script>