<template>
    <div>
        <SubNavbarAdmin />
        <router-view />
    </div>
</template>

<script>
import SubNavbarAdmin from '@/components/SubNavbarAdmin.vue'

export default {
    name: 'AdminPage',
    components: {
        SubNavbarAdmin
    }
}
</script>

<style>

</style>
