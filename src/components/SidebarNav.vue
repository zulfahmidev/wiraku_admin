<template>
    <router-link :to="{name}" class="item">
        <div class="icon"><i :class="`fa ${icon}`"></i></div>
        <div class="text">{{ text }}</div>
    </router-link>
</template>

<script>
export default {
    props: {
        name: String,
        text: String,
        icon: String,
    },
    data() {
        return {
            isActive: 'active',
        }
    },
}
</script>