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
                                    label="Chẩn đoán nơi chuyển đến">
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
    <section class="mt-4">
        <div class="bg-white rounded-md shadow-md">
            <!-- <div class="pt-5 rounded w-1/2 mx-auto">
                <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH SÁCH BỆNH
                    NHÂN </h1>
            </div> -->
            <a-divider orientation="left" class="pt-3">
                <div class="font-bold text-lg">Tìm kiếm</div>
            </a-divider>
            <div class="px-2">
                <div class="grid grid-cols-4 gap-2">
                    <div class="">
                        <p>Tên phiếu </p>
                        <va-select :placeholder="placeholder"></va-select>
                    </div>
                    <div class="">
                        <p>Ngày tạo</p>
                        <va-date-picker style="width: 100%;"></va-date-picker>
                    </div>
                    <div class="">
                        <p>Người tạo</p>
                        <va-select :placeholder="placeholder"></va-select>
                    </div>
                    <div class="">
                        <p>Trạng thái ký</p>
                        <va-select :placeholder="placeholder"></va-select>
                    </div>
                </div>
                <a-button type="primary" class="mt-2" @click="handleAdd">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    Tạo phiếu
                </a-button>
                <div class="">
                    <va-table class="" :columns-table="columns" :data-source="data" :spinning="loading" :filter="false"
                        :multi-action="false" :row-selection="null" :scroll="{ x: 'max-content' }">
                        <template #bodyCell="{ column }">
                            <template v-if="column.key === 'action'">
                                <span>
                                    <div class="flex gap-2">
                                        <a-button type="primary" @click="showModal">Xem</a-button>
                                        <router-link to="/medical-record">
                                            <a-button type="primary">Sửa</a-button>
                                        </router-link>
                                        <a-button type="primary">Xóa</a-button>
                                        <a-button type="primary">Yêu cầu ký</a-button>
                                    </div>
                                </span>
                            </template>
                        </template>
                    </va-table>
                </div>
            </div>
        </div>
    </section>
    <a-modal v-model:visible="visible" width="1200px" title="Basic Modal" @ok="handleOk">
        <div class="p-3">
            <div class="flex justify-between">
                <div class="grid">
                    <h1 class="text-center">BỘ Y TẾ <br>
                        BỆNH VIỆN THANH NHÀN </h1>
                    <p class="font-semibold text-base">Khoa Nội tổng hợp </p>
                    <p class="font-semibold text-base">Phòng: 203 Giường: HH1</p>
                </div>
                <div class="mr-24">
                    <p class="font-semibbold text-base">Mã người bệnh: </p>
                    <p class="font-semibbold text-base">Mã bệnh án: </p>
                </div>
            </div>
            <h1 class="font-bold text-center mt-2">MỤC A BỆNH ÁN MẮT</h1>
            <div class="mt-2">
                <a-descriptions title="Thông tin hành chính" :column="{ xxl: 2 }">
                    <a-descriptions-item :labelStyle="labelStyle" label="Họ và tên bệnh nhân">
                        BỆNH NHÂN DEMO 1 </a-descriptions-item>
                    <a-descriptions-item :labelStyle="labelStyle" label="Giới tính">Nữ
                    </a-descriptions-item>
                    <a-descriptions-item :labelStyle="labelStyle" label="Ngày sinh">04-09-1999
                    </a-descriptions-item>
                    <a-descriptions-item :labelStyle="labelStyle" label="Chuẩn đoán">
                        I05.1: Hở van hai lá do thấp
                    </a-descriptions-item>
                    <a-descriptions-item :labelStyle="labelStyle" label="Ngày vào viện">
                        05-09-2022</a-descriptions-item>
                    <a-descriptions-item :labelStyle="labelStyle" label="Số ngày điều trị">3
                    </a-descriptions-item>
                    <!-- <a-descriptions-item label="Config Info">
                                                Data disk type: MongoDB
                                                <br />
                                                Database version: 3.4
                                                <br />
                                                Package: dds.mongo.mid
                                                <br />
                                                Storage space: 10 GB
                                                <br />
                                                Replication factor: 3
                                                <br />
                                                Region: East China 1
                                            </a-descriptions-item> -->

                </a-descriptions>
                <div class="mt-5">
                    <a-descriptions title="I. Lí do vào viện" :column="{ xxl: 2 }">
                        <a-descriptions-item :labelStyle="labelStyle" label="1">Bệnh nhân Đau
                            mắt, mỏi mắt, khó nhìn
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="2">Bệnh nhân có
                            triệu chứng được 3 ngày
                        </a-descriptions-item>
                    </a-descriptions>
                </div>
                <div class="mt-5">
                    <a-descriptions title="II. Hỏi bệnh" :column="{ xxl: 2 }">
                        <a-descriptions-item :labelStyle="labelStyle" label="Quá trình bệnh lý">
                            BỆNH NHÂN DEMO 1
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Tiền sử bản thân">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Mắt">Bình thường
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Toàn thân">
                            Bình thường
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Tiền sử gia đình">
                            Bình thường
                        </a-descriptions-item>
                    </a-descriptions>
                </div>
                <div class="mt-5">
                    <a-descriptions title="III. Khám bệnh" :column="{ xxl: 2 }">
                        <a-descriptions-item :labelStyle="labelStyle" label="1. Khám bệnh chuyên khoa">Bệnh nhân Đau
                            mắt
                            3 ngày, sử dụng sancoba, tình trạng không thay đổi
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Thị lực vào viện: không kính">
                            MP 3/10 MT 3/10
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Thị lực vào viện: có kính">MP 10/10 MT
                            10/10
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Nhãn áp vào viện">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Thị trường">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Khác">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="2. Các cơ quan">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Tuần hoàn">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Hô hấp">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Tiêu hóa">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Thận - Tiết niệu - Sinh dục">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Thần kinh">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Cơ - Xương - Khớp">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Tai - Mũi - Họng">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Răng -  Hàm - Mặt">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="Nội tiết - Dinh dưỡng - Các bệnh lý khác">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="3. Các xét nghiệm lâm sàng cần làm">
                        </a-descriptions-item>
                        <a-descriptions-item :labelStyle="labelStyle" label="4. Tóm tắt bệnh án">
                        </a-descriptions-item>
                    </a-descriptions>
                </div>
                <div class="mt-5">
                    <a-descriptions title="IV. Tiên lượng " :column="{ xxl: 2 }">
                        <a-descriptions-item>
                        </a-descriptions-item>
                        <a-descriptions-item>
                        </a-descriptions-item>
                    </a-descriptions>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex justify-end">
                    <div class="mr-10 text-center">
                        <p class="font-medium">Bác sĩ khám bệnh</p>
                        <p class="font-bold text-2xl pb-10">KÝ VÀ XÁC THỰC </p>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './columns'
import { PlusOutlined } from '@ant-design/icons-vue';
import router from '@/router';

const data = [
    {
        key: 1,
        noteName: 'Bìa hồ sơ',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 2,
        noteName: 'Phiếu điện tim',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 3,
        noteName: 'Tờ điều trị',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 4,
        noteName: 'Mục A bệnh án mắt',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 5,
        noteName: 'Phiếu truyền máu',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 6,
        noteName: 'Phiếu theo dõi truyền dịch',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 7,
        noteName: 'Phiếu siêu âm',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 8,
        noteName: 'Phiếu nội soi',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 9,
        noteName: 'Phiếu điện não',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
    {
        key: 10,
        noteName: 'Phiếu gây mê hồi sức',
        dateCreated: '13/04/2022',
        owner: 'DD. Lương Quỳnh Thư',
        lastEdited: '13/04/2022',
        lastEditor: 'DD. Lương Quỳnh Thư',
        statusSign: "Đã ký",
    },
];

export default defineComponent({
    components: {
        PlusOutlined
    },
    setup() {
        const activeKeyCollapse = ref('1')
        const placeholder = ref('Tất cả')
        const visible = ref<boolean>(false)
        const loading = ref<Boolean>(false)
        const handleAdd = () => {
            router.push({ path: '/choose-note-type' })
        }
        const labelStyle = {
            fontWeight: '700',
        }

        const dividerStyle = {
            borderColor: 'black'
        }

        const handleOk = (e: MouseEvent) => {
            console.log(e);
            visible.value = false;
        };

        const showModal = () => {
            visible.value = true;
        };
        return {
            activeKeyCollapse,
            labelStyle,
            placeholder,
            loading,
            columns,
            data,
            handleAdd,
            handleOk,
            visible,
            showModal,
            dividerStyle
        }
    }
})
</script>

<style>

</style>