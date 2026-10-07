<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center text-h5">ยืนยันผลการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form v-if="!result.signature" @submit.prevent="saveMember">
                            <v-row justify="center">
                                <v-col cols="12" md="12">
                                    <v-file-input label="เอกสาร" v-model="file" :error-messages="error.pic_user" accept=".pdf" prepend-inner-icon="mdi-file" persistent-hint hint="รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB"></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="text-center ma-2" color="error" type="reset">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ไฟล์</th>
                                    <th class="border text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td class="border text-center">{{ 1 }}</td>
                                    <td class="border text-center">{{ result.signature }}</td>
                                    <td class="border text-center">
                                        <v-btn class="text-center text-white ma-2" color="info" prepend-icon="mdi-eye" size="small" @click="view(items.file)">เปิดดู</v-btn>
                                        <v-btn class="text-center text-white ma-2" color="error" size="small" @click="del(items.id_doc)">ลบ</v-btn>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center text-red" colspan="12" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { api, staff,commit } from '~/API/base'

const error = ref<Record<string,string>>({})
const file = ref<File | null>(null)

const name_doc = ref('')
const search = ref('')
const dataResult = ref([])
const id_eva = useRoute().params.id_eva
const token = import.meta.client ? localStorage.getItem('token'):null
const saveMember = async()=>{
    if(!name_doc.value && !file.value)return alert('กรอกข้อมูลให้ครบถ้วน')
    const maxSize = 10*1024*1024
    if(file.value?.size > maxSize){
        alert('ไฟล์มีขนาดเกิน 10MB')
    }
    const formdata = new FormData
    formdata.append('name_doc',name_doc.value)
    formdata.append('file',file.value!)
    try {
        
        await axios.post(`${commit}/signature/${id_eva}`,formdata,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        name_doc.value = ''
        file.value = null
        await fetch()
    } catch (error) {
        console.error("error doc",error);
        
    }
}
const fetch = async()=>{
    try {
        
        const res = await axios.get(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data

    } catch (error) {
        console.error("error doc",error);
        
    }
}

const view = (filename:string)=>{
    const url = new URL(`/uploads/signature/${filename}`,commit).href
    window.open(url,'_blank')
}

const result = computed(()=>{
    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{
        return(
            items.name_doc?.toLowerCase().includes(s)
        )
    })
})

const del = async(id_doc:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        await axios.delete(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
    } catch (error) {
        console.error("error",error);
        
    }
}

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
}

onMounted(fetch)
</script>

<style scoped>

</style>