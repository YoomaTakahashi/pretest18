<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center text-h5">รายงาน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <!-- <v-text-field class="mt-3" v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field> -->
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อ-สกุล</th>
                                    <th class="border text-center">อีเมล</th>
                                    <th class="border text-center">ชื่อผู้ใช้</th>
                                    <!-- <th class="border text-center">จัดการ</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_member">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">{{ items.email }}</td>
                                    <td class="border text-center">{{ items.username }}</td>
                                    <!-- <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center text-white ma-2" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>
                                            <v-btn class="text-center text-white ma-2" color="error" size="small" @click="del(items.id_member)">ลบ</v-btn>
                                        </center>
                                    </td> -->
                                </tr>
                                <tr>
                                    <td class="text-center text-red" colspan="12" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <center><v-btn class="text-center ma-3 no-p" color="warning" @click="print()" prepend-icon="mdi-printer">พิมพ์</v-btn></center>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { api, staff } from '~/API/base'

const eva = ref([])
const round = ref([])
const error = ref<Record<string,string>>({})
const result = ref([])
const search = ref('')

const token = import.meta.client ? localStorage.getItem('token'):null
const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    } catch (error) {
        console.error("error eva",error);
        
    }
}

// const result = computed(()=>{
//     if(!search.value)return dataResult.value
//     const s = search.value.toLowerCase()

//     return dataResult.value.filter((items:any)=>{
//         return(
//             items.fname?.toLowerCase().includes(s) || 
//             items.lname?.toLowerCase().includes(s)
//         )
//     })
// })

// const edit = (items:any)=>{
//     form.value = {...items}
// }

// const del = async(id_eva:number)=>{
//     if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
//     try {
//         await axios.delete(`${staff}/eva/delete/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
//         await fetch()
//         await reset()
//     } catch (error) {
//         console.error("error",error);
        
//     }
// }

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
}

const go = (id_eva:number)=>{
    navigateTo({path:`/Staff/score_member-${id_eva}`})
}
const print = ()=>{
    window.print()
}
onMounted(fetch)
</script>

<style scoped>
@media print {
    .v-app-bar,.v-btn.no-p{
        display: none !important;
        margin: 0 !important;
        margin-top: 0 !important;
        padding: 0 !important;
        width: 100% !important;
    }
    td,th{
        color: black !important;
        border: 1px solid black !important;
    }
    h1,h2,h3,h4{
        color: black !important;
    }
}
</style>