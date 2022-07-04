<template>
    <section id="sidebar">
        <div class="inner">
            <div class="header">
                <div class="avatar">
                    <img :src="`../../wiraku/public/upload/user/profile_image/`+profile_image" class="wf-media" alt="avatar">
                </div>
                <div class="name">{{name}}</div>
            </div>
            <div class="navs">
                <SidebarNav name="Dashboard" text="Dashboard" icon="fa-tachometer-alt" />
                <SidebarNav v-if="isRole('admin')" name="Courses" text="Kelas" icon="fa-chalkboard" />
                <SidebarNav v-if="isRole('admin')" name="Mentors" text="Mentor" icon="fa-user-tie"/>
                <SidebarNav v-if="isRole('admin')" name="trend" text="Trend Tooday!" icon="fa-hashtag" />
                <SidebarNav v-if="isRole('admin')" name="Transactions" text="Transaksi" icon="fa-exchange-alt" />
                <SidebarNav v-if="isRole('admin')" name="lapkeuangan" text="Laporan Keuangan" icon="fa-book" />
                <!-- <SidebarNav v-if="isRole('admin')" name="Laporankeuangan" text="Laporan Keuangan" icon="fa-book" /> -->
                <SidebarNav v-if="isRole('superadmin')" name="Admin" text="Admin Manage" icon="fa-user-tie" />
                <SidebarNav v-if="isRole('admin')" name="Settings" text="Pengaturan" icon="fa-cog" />
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
    data(){
        return{
            userInfo : null,
            name:null,
            profile_image:null
        }
    },
    components: {
        SidebarNav,
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            // setTimeout(()=>{
            // }, 20)
        },
        isRole(role) {
            let user = this.$store._state.data.user
            return user.roles.toLowerCase() == role.toLowerCase();
        }
    },

    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.name=this.userInfo.user.name
        this.profile_image =this.userInfo.user.profile_image 
    }
}
</script>