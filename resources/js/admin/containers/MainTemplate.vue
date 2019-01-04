<template lang="html">
    <div>
        <main-nav />
        <div class="container-fluid main-admin">
            <div class="row">
                <main-sidebar />
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 p-2 bg-primary">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import MainNav from './MainNav.vue'
import MainSidebar from './MainSidebar.vue'
export default {
    name: 'MainTemplate',
    components: {
        MainNav,
        MainSidebar,
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.main-admin {
    padding-top: 56px;

    main {
        min-height: 100vh;

        > div {
            background-color: $white;
            margin: $spacer;
            padding: $spacer * 2;
        }
    }
}
</style>
