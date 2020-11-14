<template>
  <div class="form-group">
    <label for="fpermissionType">Permission Type *</label>
    <select name="permission-type" class="form-control" id="fpermissionType" @change="emitValue">
      <option v-if="!recordSelected" selected disabled>Seleccione</option>
      <option v-if="recordSelected" v-bind:value="recordSelected.id" selected disabled>
        {{ recordSelected.description }}
      </option>
      <option 
        v-for="pt in permissionTypesList" 
        :key="pt.permissionTypeID" 
        v-bind:value="pt.permissionTypeID">
        {{ pt.description }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    name:"PermissionTypesSelect",
    props: ['recordSelected'],
    data () {
    return {
      loading: false,
      permissionTypesList: null, 
      error: null
    };
    },
    created () {
    this.fetchData()
    },

    methods: {
    async fetchData () {
      this.error = this.permissionTypesList = null
      this.loading = true    
        try {
            this.permissionTypesList = await fetch('https://localhost:44382/permissionType').then(res => res.json())
            this.loading = false
        } catch(e) {
            this.error = e.message
        }
    },
    emitValue(e) {
      this.$emit("input", e.target.value);
    }
  }
}
</script>
