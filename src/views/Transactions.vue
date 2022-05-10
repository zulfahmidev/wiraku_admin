<template>
    <div class="inner">
        <h2>Transaksi</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Transaksasi</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        <ul class="nav nav-pills categories">
            <li :class="`nav-item ${(status == '') ? 'active' : ''}`">
                <a href="#" @click="byStatus('')" class="nav-link">All</a>
            </li>
            <li :class="`nav-item ${(status == 'Active') ? 'active' : ''}`">
                <a href="#" @click="byStatus('Active')" class="nav-link">Aktif</a>
            </li>
            <li :class="`nav-item ${(status == 'Pending') ? 'active' : ''}`">
                <a href="#" @click="byStatus('Pending')" class="nav-link">Panding</a>
            </li>
        </ul>
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
            </div>
            <table id="transactions_table" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Kelas</th>
                        <th>User Gmail</th>
                        <th>Harga</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in getTransactions()" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ v.course.name }}</td>
                        <td>{{ v.user.email }}</td>
                        <td>{{ v.total }}</td>
                        <td>{{ date_format(v.created_at) }}</td>
                        <td>
                            <button v-if="v.status == 'Active'" @click="switchStatus(i)" :class="`btn btn-success btn-sm`"><i class="fa fa-check"></i></button>
                            <button v-if="v.status == 'Pending'" @click="switchStatus(i)" :class="`btn btn-secondary btn-sm`"><i class="far fa-clock"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li :class="`page-item ${pagination.page == 0 ? 'disabled' : ''}`">
                        <a class="page-link" @click="setPage(pagination.page-1)" href="#">Previous</a>
                    </li>
                    <li :class="`page-item ${i-1 == pagination.page ? 'active' : ''}`" v-for="i in pagination.pages" :key="i"><a @click="setPage(i-1)" class="page-link" href="#">{{ i }}</a></li>
                    <li :class="`page-item ${pagination.page+1 == pagination.pages ? 'disabled' : ''}`">
                        <a class="page-link" @click="setPage(pagination.page+1)" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    data() {
        return {
            transactions: [],
            status: '',
            searchKey: '',
            pagination: {
                page: 0,
                count: 5,
                pages: 0,
            }
        };
    },
    methods: {
        byStatus(status) {
            event.preventDefault();
            this.status = status;
        },
        setPage(page) {
            event.preventDefault();
            this.pagination.page = page;
        },
        getTransactions() {
            let transactions = this.transactions.filter((v) => {
                if (this.status == 'Active') {
                    if (v.status == 'Active') return v;
                }else if (this.status == 'Pending') {
                    if (v.status == 'Pending') return v;
                }else {
                    return v;
                }
            });

            if (this.searchKey.trim() != '') {
                transactions = transactions.filter((v) => {
                    return (
                        v.course.name.toLowerCase().includes(this.searchKey.toLowerCase().trim()) ||
                        v.user.email.toLowerCase().includes(this.searchKey.toLowerCase().trim()) ||
                        `${v.total}`.toLowerCase().includes(this.searchKey.toLowerCase().trim())
                    );
                })
            }

            let rows = transactions.length;
            let pages = Math.ceil(rows/this.pagination.count);
            this.pagination.pages = pages;
            let start = this.pagination.page*this.pagination.count;
            transactions = transactions.splice(start, start+this.pagination.count);

            return transactions;
        },
        date_format(v) {
            let date = new Date(v);
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        },
        getMeta(status) {
            if (status == null) return {color: 'success', icon: ' fa fa-check'}; else return {color: 'secondary', icon: 'far fa-clock'};
        },
        switchStatus(i) {
            let transaction = this.getTransactions()[i];
            let msg = (transaction.status == "Pending") ? 'konfirmasi' : 'membatalkan konfirmasi';
            let conf = confirm(`Apakah anda yakin ingin ${msg} transaksi ini`);

            if (conf) {
                axios.post(`/transaction/${transaction.id}/switch_status`)
                .then(r => {
                    this.transactions[i] = r.data.body;
                    swal({
                        title: "Berhasil",
                        text: "Status berhasil diubah",
                        icon: "success",
                        button: "Baik",
                    });
                }).catch(e => {
                    console.dir(e)
                })
            }
        }
    },
    async mounted() {
        await axios.get('/transaction')
        .then(r => {
            this.transactions = r.data.body;
            // $('#transaction_table').DataTable();
        })
        .catch(e => {
            console.dir(e);
        });
    }
}
</script>