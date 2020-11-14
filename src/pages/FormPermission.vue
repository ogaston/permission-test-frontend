<template>
  
  <form class="mt-5" @submit="submit">

  <div v-if="message" class="alert" v-bind:class="{ 
    'alert-success': message.type == 'success', 
    'alert-danger': message.type == 'error' 
    }"  role="alert">
    {{ message.text }}
  </div>

  <div class="form-group">
    <label for="fname">Name *</label>
    <input v-model="form.employeeName" type="text" class="form-control" id="fname">
  </div>

  <div class="form-group">
    <label for="flastname">Lastname *</label>
    <input v-model="form.employeeLastName" type="text" class="form-control" id="flastname">
  </div>

  <PermissionTypesSelect 
    v-bind:recordSelected="{id: form.permissionType, description: form._permissionTypeDesc}" 
    @input="setPermissionType" 
  />


  <div class="form-group">
    <label for="fdate">Created At *</label>
    <input v-model="form.createdAt" type="date" class="form-control" id="fdate">
  </div>
  
  
  <div class="mt-5">
    <router-link to="/">
      <span class="btn btn-light mr-2">Back</span>
    </router-link>

    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
  
</template>

<script>
import PermissionTypesSelect from '../components/PermissionTypesSelect.vue'
import { formatDate } from "../utils"
import { createPermission, updatePermission } from "../provider"

export default {
    name:"FormPermission",
    components: {
      PermissionTypesSelect
    },
    data () {
    return {
      loading: false,
      error: null,
      form: {
        employeeName: "",
        employeeLastName: "",
        createdAt: "",
        permissionType: "",
      },
      message: null,
    };
    },
    watch: {
     '$route': 'fetchData'
    },
    created () {
      if (this.$route.params.id) {
        this.fetchPermission(this.$route.params.id)
      }
    },
    methods: {

    validateForms() {
      const required = ['employeeName','employeeLastName', 'permissionType', 'createdAt']
      
      const allFilled = required.every(r => Boolean(this.form[r]))

      return allFilled;
    },

    async fetchPermission(id) {
      const data = await fetch('https://localhost:44382/permission/'+id).then(r => r.json())
      this.form = {
          employeeName: data.employeeName,
          employeeLastName: data.employeeLastName,
          createdAt: formatDate(data.createdAt),
          permissionType: data.permissionType.permissionTypeID,
          _permissionTypeDesc: data.permissionType.description
      }
    },

    async submit(e) {
      e.preventDefault()
      const isEditing = Boolean(this.$route.params.id)
      this.loading = true;

      if (!this.validateForms()) return this.message = {
        text: "All required fields need to be filled",
        type: "error"
      }


      try {

        let response;

        if (isEditing) {
          response = await updatePermission(this.$route.params.id, this.form)
        } else {
          response = await createPermission(this.form)
        }

        
        if (response.permissionID) {
          this.loading = false
          this.message = {
            type: "success",
            "text": `Permission has been succesfully ${isEditing ? "updated" : "created"}.`
          }

          if (!isEditing) {
            this.form = {
                employeeName: "",
                employeeLastName: "",
                createdAt: "",
                permissionType: "",
              }
          }

        }

      } catch (e) {
        console.log(e.message)
      }
    },
    setPermissionType(e) {
      this.form.permissionType = e
    }
  }
}
</script>
