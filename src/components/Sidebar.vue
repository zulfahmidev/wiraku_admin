<template>
    <section id="sidebar">
        <div class="inner">
            <div class="header">
                <div class="avatar">
                    <img src="/img/637960.jpg" class="wf-media" alt="avatar">
                </div>
                <div class="name">Noname</div>
            </div>
            <div class="navs">
                <SidebarNav name="Dashboard" text="Dashboard" icon="fa-tachometer-alt" />
                <SidebarNav name="Courses" text="Kelas" icon="fa-chalkboard" />
                <SidebarNav name="Mentors" text="Mentor" icon="fa-user-tie"/>
                <SidebarNav name="Transactions" text="Transaksi" icon="fa-exchange-alt" />
                <SidebarNav name="Settings" text="Pengaturan" icon="fa-cog" />
                <div style="cursor: pointer" @click="logout" class="item">
                    <div class="icon"><i class="fa fa-sign-out-alt"></i></div>
                    <div class="text">Keluar</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SidebarNav from './SidebarNav.vue';

export default {
    components: {
        SidebarNav,
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    mounted() {
        // console.log(this.$store._state.data.user);
    }
}
</script>