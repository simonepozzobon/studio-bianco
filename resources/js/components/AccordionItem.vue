<template lang="html">
    <div class="accordion-item">
        <div class="accordion-header" ref="header" @click="togglePanel">
            <div class="accordion-title">{{ title }}</div>
            <div><icon-arrow-down width="16px" color="#283745"/></div>
        </div>
        <div class="accordion-content" ref="content">
            <h3>{{ title }}</h3>
            <home-horizontal-sep width="50px" color="#e5c386"/>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                <br><br>
                Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
                <br><br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                <br><br>

                Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
                <br><br>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum ligula, imperdiet convallis neque. Praesent pulvinar placerat mattis. Praesent pulvinar, nisl ut posuere ornare, tortor massa mollis arcu, eu rutrum odio urna sed neque. Pellentesque lacus mi, dapibus eget pulvinar ut, cursus sed nisi. Quisque placerat, purus pellentesque sollicitudin finibus, odio lectus scelerisque ipsum, id porta sapien felis vitae turpis. Donec blandit magna vel sapien sodales, in sollicitudin enim tempus. Nunc non posuere enim. Nullam non sodales enim. Duis viverra tortor nec lacus sollicitudin ullamcorper. Phasellus placerat vulputate luctus. Pellentesque volutpat purus odio, quis viverra magna commodo at. Nulla enim felis, vulputate nec lacus vitae, porta volutpat sapien. Vivamus molestie sit amet erat ac elementum.
                <br><br>

                Vivamus sed eleifend risus. Nam gravida sem dolor, nec mattis ligula tincidunt in. Nunc in malesuada tortor. Cras velit augue, posuere in nibh in, aliquam tincidunt mauris. Pellentesque eu nisi in turpis blandit euismod non non erat. Nunc quis ante massa. Maecenas eleifend dui id felis blandit, et interdum ipsum suscipit.
            </p>
        </div>
    </div>
</template>

<script>
import { IconArrowDown } from '../ui'
import HomeHorizontalSep from './HomeHorizontalSep.vue'
export default {
    name: 'AccordionItem',
    components: {
        IconArrowDown,
        HomeHorizontalSep,
    },
    props: {
        idx: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
            default: 'Titolo'
        }
    },
    data: function() {
        return {
            formIsOpen: false,
            headerColorClass: null,
            master: null,
            panelHeight: 0,
            even: false,
        }
    },
    watch: {
        formIsOpen: function(value) {
            if (value && !this.even) {
                this.$refs.header.style.backgroundColor = '#f6f5ea'
            } else if (!value && !this.even) {
                this.$refs.header.style.backgroundColor = 'inherit'
            }
        }
    },
    methods: {
        isEven: function(n) {
            return n % 2 == 0;
        },
        setHeaderColor: function() {
            if (this.isEven(this.idx)) {
                this.headerColorClass = 'f6f5ea'
                this.$refs.header.style.backgroundColor = '#f6f5ea'
                this.even = true
            }
        },
        togglePanel: function() {
            let panel = this.$refs.content
            if (!this.formIsOpen) {
                if (this.master) {
                    this.master.play()
                    this.formIsOpen = true
                } else {
                    this.master = new TimelineMax({
                        paused: true,
                        reversed: true,
                    })

                    TweenLite.set(panel, {
                        height: 0,
                        autoAlpha: 0,
                        display: 'none',
                        transformOrigin: "left top 0",
                    })

                    this.master.to(panel, .6, {
                        height: this.panelHeight,
                        scaleY: 1,
                        autoAlpha: 1,
                        display: "block",
                        transformOrigin: "left top 0",
                        ease: Cubic.easeInOut
                    })

                    this.master.progress(1).progress(0);
                    this.master.play()
                    this.formIsOpen = true
                }
            } else {
                this.master.reverse()
                this.formIsOpen = false
            }
        },
    },
    mounted: function() {
        this.setHeaderColor()
        let form = this.$refs.content
        this.panelHeight = form.offsetHeight
        TweenLite.set(form, {
            height: 0,
            autoAlpha: 0,
            display: 'none',
            transformOrigin: "left top 0",
        })
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.accordion-item {
    width: 100%;
}

.accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: $spacer / 4;
    padding-bottom: $spacer / 4;
    padding-left: $spacer;
    padding-right: $spacer;

    .accordion-title {
        font-weight: normal;
        text-transform: capitalize;
    }
}

.accordion-content {
    background-color: $white;
    position: relative;
    width: calc(100vw - 8rem);
    z-index: 2;
    padding: $spacer * 2;

    visibility:hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
    height:auto; /* tell the browser that initial height is auto */
    overflow:hidden;

    svg {
        padding-bottom: $spacer;
    }
}

</style>
