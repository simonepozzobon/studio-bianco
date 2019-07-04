<template>
<div class="">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h4">Prima e Dopo {{ this.$route.params.category }}</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <b-form-group class="mb-0 mr-2">
                <b-input-group>
                    <b-form-input
                        v-model="filter"
                        placeholder="Type to Search"
                        class="light-theme"
                    />
                    <b-input-group-append>
                        <b-button
                            :disabled="!filter"
                            @click="filter = ''"
                        >
                            Clear
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <button
                class="btn btn-outline-primary"
                @click="showNew"
            >
                <i class="far fa-file"></i> Nuovo
            </button>
        </div>
    </div>
    <b-table
        striped
        hover
        responsive
        :stacked="this.isMobile"
        :items="this.comparisonsArr"
        :current-page="currentPage"
        :per-page="perPage"
        :fields="fields"
        :filter="filter"
        @filtered="onFiltered"
    >
        <template
            slot="before"
            slot-scope="data"
        >
            <img
                :src="data.item.before.thumb"
                alt=""
                width="64"
            >
        </template>
        <template
            slot="category_id"
            slot-scope="data"
        >
            <div v-if="data.item.category_id == 1">Medicina Estetica</div>
            <div v-else>Odontoiatria</div>
        </template>
        <template
            slot="after"
            slot-scope="data"
        >
            <img
                :src="data.item.after.thumb"
                alt=""
                width="64"
            >
        </template>
        <template
            slot="tools"
            slot-scope="data"
        >
            <div class="btn-group">
                <button
                    class="btn btn-outline-info"
                    @click="edit(data.item)"
                >
                    <i class="far fa-edit"></i> Edit
                </button>
                <button
                    class="btn btn-outline-danger"
                    @click="deleteConfirm(data.item)"
                >
                    <i class="far fa-trash-alt"></i> Delete
                </button>
            </div>
        </template>
    </b-table>
    <b-pagination
        align="center"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        class="my-3"
    />
    <b-modal
        id="elimina-servizio"
        ref="delete"
        title="Elimina"
    >
        L'eliminazione sarà definitiva
        <div slot="modal-footer">
            <b-btn variant="link">Annulla</b-btn>
            <b-btn
                variant="danger"
                @click="destroy"
            >Elimina</b-btn>
        </div>
    </b-modal>
    <b-modal
        id="nuovo-servizio"
        title="Nuovo Servizio"
        size="lg"
        ref="modal"
    >
        <div class="form-group">
            <label for="selected">Categoria</label>
            <b-form-select
                v-model="selectedCat"
                :options="selectedOpts"
            />
        </div>
        <div class="form-group">
            <label for="title">Prima</label>
            <b-form-file
                v-model="file_before"
                :state="Boolean(file_before)"
                placeholder="Scegli un'immagine..."
            ></b-form-file>
        </div>
        <div class="form-group">
            <label for="title">Dopo</label>
            <b-form-file
                v-model="file_after"
                :state="Boolean(file_after)"
                placeholder="Scegli un'immagine..."
            ></b-form-file>
        </div>
        <div slot="modal-footer">
            <b-btn variant="link">Annulla</b-btn>
            <b-btn
                variant="primary"
                @click="addNew"
            >Salva</b-btn>
        </div>
    </b-modal>
</div>
</template>

<script>
import Comparison from '../fields/Comparison'

export default {
    name: 'AdminServizi',
    data: function () {
        return {
            editMode: false,
            fields: Comparison,
            comparisonsArr: [],
            isMobile: false,
            selected: {},
            perPage: 5,
            totalRows: 0,
            currentPage: 1,
            filter: null,
            title: '',
            description: '',
            deleteID: null,
            editID: null,
            file_before: null,
            file_after: null,
            selectedCat: null,
            selectedOpts: [{
                    value: null,
                    text: 'Selezione una categoria...'
                },
                {
                    value: 1,
                    text: 'Medicina Estetica'
                },
                {
                    value: 2,
                    text: 'Odontoiatria'
                }
            ]
        }
    },
    methods: {
        shortDescription: function (string) {
            if (string.length > 50) {
                return string.substr(0, 49) + '...'
            }
            return string
        },
        init: function () {
            this.$http.get('/api/admin/comparison/get').then(response => {
                this.comparisonsArr = response.data
            })
        },
        edit: function (item) {
            this.editMode = true
            this.editID = item.id
            this.$refs.modal.show()
        },
        deleteConfirm: function (item) {
            this.deleteID = item.id
            this.$refs.delete.show()
        },
        destroy: function () {
            this.$http.get('/api/admin/comparison/destroy/' + this.deleteID).then(response => {
                this.comparisonsArr = this.comparisonsArr.filter(item => item.id !== parseInt(response.data.id))
                this.$refs.delete.hide()
            })
            this.deleteID = null
        },
        addNew: function () {
            let data = new FormData()
            data.append('category_id', this.selectedCat)
            data.append('media_left', this.file_before)
            data.append('media_right', this.file_after)

            if (!this.editMode) {

                // setto la categoria
                this.$http.post('/api/admin/comparison/create', data).then(response => {
                    this.comparisonsArr.push(response.data.comparison)
                    this.$refs.modal.hide()
                    this.description = ''
                    this.title = ''
                })
                return true
            }

            // Siamo in edit mode
            data.append('id', this.editID)
            this.$http.post('/api/admin/comparison/update', data).then(response => {
                // Replace the item
                let idx = this.comparisonsArr.findIndex(item => item.id == response.data.service.id)
                this.comparisonsArr.splice(idx, 1, response.data.service)

                this.$refs.modal.hide()
                this.description = ''
                this.title = ''
            })
            this.editID = null
        },
        showNew: function () {
            this.$refs.modal.show()
        },
        onFiltered: function (filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    },
    mounted: function () {
        // this.showNew()
        this.init()
    }
}
</script>

<style lang="css">
</style>
