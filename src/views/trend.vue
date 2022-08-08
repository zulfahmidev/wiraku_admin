<template>
    <div class="inner">
      
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
         
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
      
        <div class="wf-container mt-4">
            <div class="row">
                <div class="col-lg-9">
                    <h2>Trend Tooday!</h2>
                     <p class="col-lg-9">Mari Perbarui Trend Setiap Hari!</p>
                      <h5  style="text-align: left" class="btn btn-default btn-block w-80">Note : Hapus data sebelumnya jika ingin mengambil data tweet Baru</h5>
                  
                </div>

            
                  

                 <div class="mt-3">
                    <h5>Celana</h5>
                      <div >{{prediksi[0][0].jml_tweet}} Tweet</div>
                </div>

                <hr>
                <div class="row mt-3 justify-content-center">   
                </div>
                <h5 class="mt-3">mukena</h5>
                     <div >{{prediksi[1][0].jml_tweet}} Tweet</div>
            
                <hr>
                <div class="row mt-3 ">
                </div>
              <h5 class="mt-3">jaket</h5>
                    <div >{{prediksi[2][0].jml_tweet}} Tweet</div>
                <hr>
                <div class="row mt-3 ">
                </div>
                <h5 class="mt-3">tunik</h5>
                <div >{{prediksi[3][0].jml_tweet}} Tweet</div>
                <hr>
                <div class="row mt-3 ">
                </div>
                <h5 class="mt-3">kebaya</h5>
                <div >{{prediksi[4][0].jml_tweet}} Tweet</div>
                <hr>
                <div class="row mt-3 ">
                </div>
                <h5 class="mt-3">Akurasi Trend Hari Ini</h5>
                <div >{{prediksi[5][0].jml_tweet}} %</div>
                <hr>
                <div class="row mt-3 ">
                </div>
                <div class="col-lg-4" style="text-align: right">
                         <button class="btn btn-default btn-block w-100" @click="ambildata">Ambil Data Tweet</button>
                 </div>

                  <div class="col-lg-4" style="text-align: right">
                         <button class="btn btn-default btn-block w-100" @click="aa">Perbarui Trend </button>
                 </div>
            
                <div class="col-lg-4" style="text-align: right">
                         <button class="btn btn-default btn-block w-100" @click="updatetweet">Perbarui Trend </button>
                 </div>
                    
                    
              
                
    
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';


export default {
    data(){
            return{
                prediksi:[],
                
                
            }
        },
     
        methods:{
           loadData(){

            axios.get("/prediksi").then(res => {
                  
                    this.prediksi =res.data
                    console.log(res.data)
                });
           },
             AmbilData() {
            axios.get("/ambildata").then(() => {
                    swal({
                        title: "Data Sedang Diambil",
                        text: " Silahkan cek Direktori D:1tga/ppy Data trend.xlxs",
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
        }, 
        updatetweet() {
            axios.get("/perbaruitrend").then(() => {
                    swal({
                        title: "Trend Sedang Diupdate!",
                        text: "reload halaman 5 menit dari sekarang",
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
        },
           

        },
        created(){
            this.loadData();

        }
}
</script>