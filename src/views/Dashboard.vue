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
            </div>
            <apexchart type="line" height="300" :options="options" :series="series"></apexchart>
        </div>
        <!-- <div class="row">
            <div class="col-lg-6">
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Okteber', 'November', 'Desember']
                }
            },
            series: [{
                name: 'Jumlah Penjualan',
                data: [10, 20, 38, 45, 50, 49, 38, 45, 60, 70, 75, 91]
            }]
        }
    },
}
</script>