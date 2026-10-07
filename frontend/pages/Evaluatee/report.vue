<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2 py-2 mt-2" rounded="5" :elevation="5" >
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี : {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="text-h5 font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">ประธาน</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">กรรมการ</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">เลขา</th>
                                    <th class="boder pa-2 bg-grey" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="text-center pa-2 " style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ indicate.point_indicate *4 }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ scores[indicate.indicate]?. a ?? 'รอประธานประเมิน' }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ scores[indicate.indicate]?. b ?? 'รอกรรมการประเมิน' }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ scores[indicate.indicate]?. c ?? 'รอเลขาประเมิน' }}</td>
                                    <td class="text-center pa-2 " style="width: 10%;">{{ (((scores[indicate.indicate]?. a ?? 0)+(scores[indicate.indicate]?. b ?? 0)+(scores[indicate.indicate]?. c ?? 0))/3).toFixed(2)  }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="text-end pa-2 mt-4">
                        <v-card color="green"  type="success">คะแนนรวมสุทธิ : {{ ((user.total_commit)/3).toFixed(2) }} คะแนน</v-card>
                    </div>
                    <div class="mt-2 pa-2">
                        <v-card class="pa-2">
                            <label for="">ข้อเสนอแนะของกรรมการ</label>
                            <v-row>
                                <v-col cols="12" v-for="commit,c in commits" :key="commit.id_commit">
                                    <img :src="`http://localhost:3001/signature/${commit.signature}`" :alt="`รอ${commit.level_commit}ประเมิน`" width="20%"> <br>
                                    ( {{ commit.fname }} {{ commit.lname }}) <br>
                                    {{ commit.level_commit }}
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                    <div class="mt-5 text-center">
                        <v-btn color="warning" class="no-p" @click="print">พิมพ์</v-btn>
                    </div>
                </v-form>
                <v-alert variant="tonal" type="warning" v-else-if="user.status_eva === 1">ยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert variant="tonal" type="error" v-else>ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { compileTemplate } from 'vue/compiler-sfc';
import { eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])
const commits = ref<any>([])
const scores = ref<any>([])

const print = async()=>{
    window.print()
}
const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('error get user')
    }
}
const fecthTopic = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('error get user')
    }
}
const fecthScore = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/score`,{headers:{Authorization:`Bearer ${token}`}})
        scores.value = res.data
    } catch (error) {
        console.error('error get user')
    }
}
const fecthCommit = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/commit`,{headers:{Authorization:`Bearer ${token}`}})
        commits.value = res.data
    } catch (error) {
        console.error('error get user')
    }
}

onMounted(async()=>{
    await Promise.all([fecth(),fecthTopic(),fecthCommit(),fecthScore()])
})


</script>

<style scoped>

</style>