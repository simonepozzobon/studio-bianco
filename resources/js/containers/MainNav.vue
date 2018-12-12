<template lang="html">
    <nav class="navbar navbar-light navbar-expand-md bg-light" ref="navbar">
        <a class="navbar-brand" href="#">
            <nav-logo :width="214"/>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Odontoiatria</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Medicina estetica</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contatti</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { NavLogo } from '../ui'

export default {
    name: 'MainNav',
    components: {
        NavLogo,
    },
    mounted: function() {
        this.$root.navbarHeight = this.$refs.navbar.offsetHeight
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
.navbar {
    min-height: 112px;
}
</style>
