<template lang="html">
    <div class="">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h4">Servizi {{ this.$route.params.category }}</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <b-form-group horizontal class="mb-0 mr-2">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search" class="light-theme"/>
                        <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                <button class="btn btn-outline-primary" @click="showNew">
                    <i class="far fa-file"></i> Nuovo
                </button>
            </div>
        </div>
        <b-table
            striped
            hover
            responsive
            :stacked="this.isMobile"
            :items="this.servicesArr"
            :current-page="currentPage"
            :per-page="perPage"
            :fields="fields"
            :filter="filter"
            @filtered="onFiltered"
        >
                <template slot="status_id" slot-scope="data">
                    <i class="far fa-eye text-success" v-if="data.item.status_id == 1"></i>
                    <i class="far fa-eye-slash text-warning" v-else></i>
                </template>
                <template slot="description" slot-scope="data">
                    {{ shortDescription(data.item.description) }}
                </template>
                <template slot="tools" slot-scope="data">
                    <div class="btn-group">
                        <button class="btn btn-outline-info" @click="edit(data.item)">
                            <i class="far fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger" @click="deleteConfirm(data.item)">
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
            title="Elimina">
            L'eliminazione sarà definitiva
            <div slot="modal-footer">
                <b-btn variant="link">Annulla</b-btn>
                <b-btn variant="danger" @click="destroy">Elimina</b-btn>
            </div>
        </b-modal>
        <b-modal
            id="nuovo-servizio"
            title="Nuovo Servizio"
            size="lg"
            ref="modal">
                <div class="form-group">
                    <label for="title">Titolo</label>
                    <input type="text" name="title" class="form-control" v-model="title" placeholder="titolo...">
                </div>
                <div class="form-group">
                    <label for="description">Descrizione</label>
                    <wysiwyg v-model="description" />
                </div>
                <div slot="modal-footer">
                    <b-btn variant="link">Annulla</b-btn>
                    <b-btn variant="primary" @click="addNew">Salva</b-btn>
                </div>
        </b-modal>
    </div>
</template>

<script>
import Services from '../fields/Services'

export default {
    name: 'AdminServizi',
    data: function() {
        return {
            editMode: false,
            fields: Services,
            servicesArr: [],
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
        }
    },
    methods: {
        shortDescription: function(string) {
            if (string.length > 50) {
                return string.substr(0, 49) + '...'
            }
            return string
        },
        init: function() {
            this.$http.get('/api/admin/services/get/'+this.$route.params.category).then(response => {
                this.servicesArr = response.data
            })
        },
        edit: function(item) {
            this.title = item.title
            this.description = item.description
            this.editMode = true
            this.editID = item.id
            this.$refs.modal.show()
        },
        deleteConfirm: function(item) {
            this.deleteID = item.id
            this.$refs.delete.show()
        },
        destroy: function() {
            this.$http.get('/api/admin/services/destroy/'+this.deleteID).then(response => {
                this.servicesArr = this.servicesArr.filter(item => item.id !== parseInt(response.data.id))
                this.$refs.delete.hide()
            })
            this.deleteID = null
        },
        addNew: function() {
            let data = new FormData()
            data.append('title', this.title)
            data.append('description', this.description)

            if (!this.editMode) {

                // setto la categoria
                if (this.$route.params.category == 'estetica') {
                    data.append('category', 2)
                } else {
                    data.append('category', 1)
                }

                this.$http.post('/api/admin/services/create', data).then(response => {
                    this.servicesArr.push(response.data.service)
                    this.$refs.modal.hide()
                    this.description = ''
                    this.title = ''
                })

                return true
            }

            // Siamo in edit mode
            data.append('id', this.editID)
            this.$http.post('/api/admin/services/update', data).then(response => {
                // Replace the item
                let idx = this.servicesArr.findIndex(item => item.id == response.data.service.id)
                this.servicesArr.splice(idx, 1, response.data.service)

                this.$refs.modal.hide()
                this.description = ''
                this.title = ''
            })
            this.editID = null
        },
        showNew: function() {
            this.$refs.modal.show()
        },
        onFiltered: function(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    },
    mounted: function() {
        // this.showNew()
        this.init()
    }
}
</script>

<style lang="css">
</style>
