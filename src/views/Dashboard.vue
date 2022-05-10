<template>
    <div class="inner">
        <h2>Dashboard</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        
        <div class="wf-container mt-4">
            <div>
                <h4>Statistik Penjualan</h4>
                <div class="mb-3">
                    <select class="form-control" @change="changeModeStats">
                        <option value="week">Mingguan</option>
                        <option value="month">Bulanan</option>
                    </select>
                </div>
            </div>
            <apexchart type="line" height="300" :options="options" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            transactions: [],
            options: {},
            series: [],
        }
    },
    methods: {
        changeModeStats(e) {
            if (e.target.value == 'week') {
                this.dataWeek();
            }else if (e.target.value == 'month') {
                this.dataMonth();
            }
        },
        dataWeek() {
            let transactions = this.transactions;
            let row = [0,0,0,0,0,0,0];
            transactions.forEach(e => {
                let dn = new Date(); // Date Now
                let d = (dn.getMonth()+1)+'-'+(dn.getDate() - dn.getDay())+'-'+dn.getFullYear()
                let dfw = new Date(d);
                let dt = new Date(e.created_at); // Date of transaction
                if (dt.getDate() >= dfw.getDate() && dt.getDate() <= (dfw.getDate() + 6) ) {
                    row[dt.getDay()]++;
                }
            })
            this.options = {
                chart: {
                    id: 'statistik_penjualan'
                },
                xaxis: {
                    categories: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
                }
            }
            this.series= [{
                name: 'Terjual',
                data: row
            }]
        },
        dataMonth() {
            let transactions = this.transactions;
            let row = [0,0,0,0,0,0,0,0,0,0,0,0];
            transactions.forEach(e => {
                let dt = new Date(e.created_at); // Date of transaction
                let dn = new Date(); // Date Now
                if (dt.getFullYear() == dn.getFullYear()) {
                    row[dt.getMonth()]++;
                }
            })
            this.options = {
                chart: {
                    id: 'statistik_penjualan'
                },
                xaxis: {
                    categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
                }
            }
            this.series= [{
                name: 'Terjual',
                data: row
            }]
        }
    },
    mounted() {
        axios.get('/transaction')
        .then(r => {
            this.transactions = r.data.body;
            this.dataWeek();
        })
    }
}
</script>