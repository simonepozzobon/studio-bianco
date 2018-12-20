<template lang="html">
    <div class="about">
        <div class="about-container" ref="container">
            <div class="about-left" ref="content">
                <div class="about-content">
                    <div class="about-bold-divider"></div>
                    <h1 ref="title">About</h1>
                    <span class="about-subtitle">Lo Studio</span>
                    <div class="about-v-div"></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                        <br><br>
                        Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
                    </p>
                </div>
            </div>
            <div class="about-right">
                <about-illust width="80%"/>
            </div>
        </div>
        <div class="about-container bg-light-cyan">
            <div class="about-left position-relative" ref="content">
                <about-silvia-illust width="80%"/>
            </div>
            <div class="about-right">
                <div class="about-content">
                    <div class="about-bold-divider dark"></div>
                    <h1 class="text-white" ref="title">Silvia Citella</h1>
                    <span class="about-subtitle text-white">Chi sono</span>
                    <div class="about-v-div dark"></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                        <br><br>
                        Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
                    </p>
                </div>
            </div>
        </div>
        <div class="about-container bg-light-yellow">
            <div class="about-left" ref="content">
                <div class="about-content">
                    <div class="about-bold-divider light"></div>
                    <h1 class="text-purple" ref="title">Paura del dentista</h1>
                    <div class="about-v-div light"></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                        <br><br>
                        Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
                    </p>
                </div>
            </div>
            <div class="about-right position-relative">
                <about-paura-illust width="100%"/>
            </div>
        </div>
    </div>
</template>

<script>
import AboutIllust from '../components/AboutIllust.vue'
import AboutPauraIllust from '../components/AboutPauraIllust.vue'
import AboutSilviaIllust from '../components/AboutSilviaIllust.vue'

export default {
    name: 'About',
    components: {
        AboutIllust,
        AboutPauraIllust,
        AboutSilviaIllust,
    },
    watch: {
        '$root.window.h': function(value) {
            this.positionIllustration()
        }
    },
    methods: {
        positionIllustration: function() {
            this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 'px'
        }
    },
    mounted: function() {
        this.$root.hasFooter = true
        this.$root.navColor = 2
        this.positionIllustration()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


.about {
    @include make-container();
    background-color: $light-brown;

    .about-container {
        @include make-row();
        min-height: 100vh;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;

            > svg {
                margin-bottom: $spacer * 2;
            }

            h1 {
                display: block;
            }
        }

        .about-left {
            @include make-col(6);

        }

        .about-right {
            @include make-col(6);
        }

        .about-content {
            padding: $spacer * 4;

            .about-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $pink;
                margin-bottom: $spacer;

                &.dark {
                    border-top: 6px solid $black;
                }

                &.light {
                    border-top: 6px solid $white;
                }
            }

            .about-v-div {
                content: '';
                height: 100px;
                border-left: 1px solid $pink;
                margin-bottom: $spacer;
                margin-top: $spacer;

                &.dark {
                    border-left: 1px solid $black;
                }

                &.light {
                    border-left: 1px solid $white;
                }
            }
        }

        .about-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
        }

        .about-divider {
            margin-bottom: $spacer;
        }
    }
}

</style>
