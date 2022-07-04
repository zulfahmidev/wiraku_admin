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
                     <p class="small text-black-50">Mari Perbarui Trend Setiap Hari!</p>
                  
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
                <div class="col-lg-4" style="text-align: right" >
                         <button class="btn btn-default btn-block w-100" @click="AmbilData">Ambil data Twitter</button>
                 </div>

                <div class="col-lg-4" style="text-align: right">
                         <button class="btn btn-default btn-block w-100" @click="AmbilData">Perbarui data Trend</button>
                 </div>
            
                <div class="col-lg-4" style="text-align: right">
                         <button class="btn btn-default btn-block w-100" onclick="<?php $command = escapeshellcmd('python3 ppy\deteksitopik.py'); $output = shell_exec($command); echo $output; ?>">Perbarui Model </button>
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
            axios.get('/user/changepassword', this.change_password_form)
            .then(r => {
                console.dir(r);
                this.change_password_form = {
                    old_password: '',
                    new_password: '',
                    confirm_new_password: '',
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
        },
           

        },
        created(){
            this.loadData();

        }
}
</script>