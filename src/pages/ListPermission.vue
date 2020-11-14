<template>
   <div id="app">

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

        <div v-if="permissions">
            <div class="text-right mb-3">
                <router-link to="/new">
                    <Button />
                </router-link>
            </div>
                <TableList v-bind:data="permissions" />
        </div>
    
    </div>
</template>

<script>
import TableList from '../components/TableList.vue'
import Button from '../components/Button.vue'

export default {
    name:"ListPermission",
    components: {
        TableList,
        Button
    },

    data () {
    return {
      loading: false,
      permissions: null,
      error: null
    };
    },
    created () {
    this.fetchData()
    },

    methods: {
    async fetchData () {
      this.error = this.permissions = null
      this.loading = true    
        try {
            this.permissions = await fetch('https://localhost:44382/permission').then(res => res.json())
            this.loading = false
        } catch(e) {
            this.error = e.message
        }
    }
  }
}
</script>

<style>

</style>