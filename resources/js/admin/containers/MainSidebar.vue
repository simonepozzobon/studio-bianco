<template lang="html">
    <nav class="col-md-2 d-none d-md-block bg-light sidebar pt-2">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/' }" exact-active-class="active">
                        Dashboard
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/servizi/ortodonzia' }" exact-active-class="active">
                        Servizi Ortodonzia
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/servizi/estetica' }" exact-active-class="active">
                        Servizi Medicina Estetica
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MainSidebar'
}
</script>

<style lang="scss">
@import '~styles/shared';

</style>
