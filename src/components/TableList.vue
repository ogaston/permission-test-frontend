
<template>
  <table class="table">
    <thead class="thead-dark">
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Lastname</th>
            <th scope="col">Permission Type</th>
            <th scope="col">Created At</th>
            <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="dt in tableData" :key="dt.permissionID">
            <th scope="row">{{ dt.permissionID }}</th>
            <td>{{ dt.employeeName }}</td>
            <td>{{ dt.employeeLastName }}</td>
            <td>{{ dt.permissionType.description }}</td>
            <td>{{ dt.createdAt }}</td>
            <td>
                <router-link v-bind:to="'/permission/'+ dt.permissionID">
                    <button class="btn btn-info mr-1">Edit</button>
                </router-link>
                <button @click="() => remove(dt)" class="btn btn-danger">Remove</button>
            </td>
        </tr>
        <tr class="text-center p-2 bg-info text-white" v-if="!tableData.length">
           <td colspan="6">
                <p>No data</p>
           </td>
        </tr>
    </tbody>
    
    </table>

</template>

<script>
export default {
    name:"TableList",
    props: ['data'],
    data() {
        return {
            tableData: this.data
        }
    },
    methods: {
        async remove(permission) {
            const { employeeName, permissionID: id, permissionType: { description } } = permission
            if (confirm(`Are you sure you want delete ${employeeName}'s permission for ${description}`)) {
                const response = await fetch('https://localhost:44382/permission/'+id, { method: 'DELETE' })
                if (response.status == 204) {
                    window.location.reload()
                } 
            }
        }
    }
}
</script>

<style>

</style>