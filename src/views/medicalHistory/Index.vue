<template>
    <va-breadcrumb></va-breadcrumb>
    <section>
        <div class="">
            <a-collapse class="shadow-md" v-model:activeKey="activeKeyCollapse" expand-icon-position="right">
                <a-collapse-panel key="1" header="Thông tin bệnh nhân">
                    <div class="w-full h-full">
                        <!-- Profile Card -->
                        <div class="bg-white rounded h-full w-full">
                            <div class="flex gap-4">
                                <div class="overflow-hidden">
                                    <img class="object-fill rounded-md" src="@/assets/images/AvatarDashboard.png"
                                        alt="">
                                </div>
                                <div class="grid gap-2">
                                    <div class="flex">
                                        <p class="font-extrabold my-auto text-lg">Vũ Thị Lan Anh</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Nữ</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">01/01/1988</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">24 tuổi</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Kinh</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">SN 61, Đường 221B - Nam Hưng - Tiền Hải - Thái Bình</p>
                                    </div>
                                    <div class=" flex">
                                        <div class="gap-1 flex ">
                                            <p class="my-auto">Sổ bệnh án:</p>
                                            <p class="text-[red] my-auto">028863/22/NOI</p>
                                        </div>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">CCCD: 0132456789</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Mã số sức khỏe: 0132456789</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto"> Bảo hiểm y tế: HS 4 01 0120878817</p>
                                    </div>
                                    <div class="my-auto">
                                        <div class="flex gap-2">
                                            <div class="">Chẩn đoán:</div>
                                            <div class="font-bold">A02.1-Nhiễm trùng huyết do Salmonella</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of profile card -->
                    </div>
                </a-collapse-panel>
            </a-collapse>
            <a-collapse class="shadow-md" v-model:activeKey="activeKeyCollapse" expand-icon-position="right"
                style="margin-top: 10px;">
                <a-collapse-panel key="2" header="Thông tin vào viện">
                    <div class="bg-white rounded">
                        <div class="p-4">
                            <a-descriptions class="break-normal" bordered size="small"
                                :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
                                <a-descriptions-item class="break-normal" label="Lý do vào viện"
                                    :labelStyle="labelStyle">Đau bụng trên, chướng bụng
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Phòng">P001
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Nơi giới thiệu">Tự đến
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Giường">G001
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Nhập viện lúc">14:00 10/10/2022
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Bác sĩ điều trị">
                                    Lương Quỳnh Thư
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Trực tiếp vào">Khoa cấp cứu
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán nơi chuyển đến ">
                                    Không có
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Ngày nhập khoa">23/8/2022
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán KKB, Cấp cứu">
                                    A04-Nhiễm trùng đường ruột do vi khuẩn khác
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Khoa nhập viện">
                                    Khoa nội tổng hợp
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán hiện tại">
                                    A02.1-Nhiễm trùng huyết do Salmonella
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Vào viện lần này thứ">5
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán ra viện">
                                </a-descriptions-item>
                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Khoa điều trị">
                                    Khoa nội tổng hợp
                                </a-descriptions-item>
                            </a-descriptions>
                        </div>
                    </div>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </section>
    <section>
        <div class="bg-white shadow-md rounded-md mt-7 pt-1">
            <!-- <div class="pt-5 rounded w-1/2 mx-auto">
                <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">LỊCH SỬ KHÁM
                    CHỮA
                    BỆNH</h1>
            </div> -->
            <va-table class="px-2" :columns-table="columns" :data-source="data" :spinning="loading" :filter="false"
                :multi-action="false" :row-selection="null" :scroll="{ x: 'max-content' }">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'action'">
                        <span>
                            <router-link to="/dashboard/analysis">
                                <a>Xem quá trình điều trị</a>
                            </router-link>
                            <a-divider type="vertical" />
                            <router-link to="/medical-being-treated">
                                <a>Xem bệnh án</a>
                            </router-link>
                        </span>
                    </template>
                </template>
            </va-table>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import columns from './columns';

const data = [
    {
        key: 1,
        hospitalName: 'Bệnh viện Đại học y Hà Nội',
        date: '14/08/2022',
        hospitalizedDate: '14/08/2022',
        departmentIn: 'Khoa nội tổng hợp',
        treatmentDepartment: 'Khoa nội tổng hợp',
        diagnose: 'A01.3-Bệnh phó thương hàn C',
        type: "Nội khoa",
    },
    {
        key: 2,
        hospitalName: 'Bệnh viện TW Quân đội 108',
        date: '14/09/2022',
        hospitalizedDate: '17/09/2022',
        departmentIn: 'Khoa nội tổng hợp ',
        treatmentDepartment: 'Khoa nội tổng hợp',
        diagnose: 'A04-Nhiễm trùng đường ruột do vi khuẩn khác',
        type: "Ngoại khoa ",
    },
    {
        key: 3,
        hospitalName: 'Bệnh viện Thanh Nhàn',
        date: '01/10/2022',
        hospitalizedDate: '05/10/2022',
        departmentIn: 'Khoa nội tổng hợp ',
        treatmentDepartment: 'Khoa nội tổng hợp',
        diagnose: 'A02.1-Nhiễm trùng huyết do Salmonella',
        type: "Nội khoa",
    },
    {
        key: 4,
        hospitalName: 'Bệnh viện phụ sản Thiện An ',
        date: '06/10/2022',
        hospitalizedDate: '07/10/2022',
        departmentIn: 'Khoa cấp cứu',
        treatmentDepartment: 'Khoa sản ',
        diagnose: 'N.72-Viêm cổ tử cung',
        type: "Sản khoa",
    }
];

export default defineComponent({
    setup() {
        const activeKeyCollapse = ref('1');
        const loading = ref<Boolean>(false)

        const labelStyle = {
            // fontSize: '20px',
            fontWeight: '700',
        }

        const dividerStyle = {
            borderColor: 'black'
        }

        return {
            activeKeyCollapse,
            labelStyle,
            columns,
            loading,
            data,
            dividerStyle
        }
    }
})
</script>

<style scoped>

</style>