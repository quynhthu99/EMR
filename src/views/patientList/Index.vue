<template>
    <va-breadcrumb>
        <template #extraAction>
        <a-button type="primary">
          <template #icon>
            <cloud-sync-outlined></cloud-sync-outlined>
          </template>
          Đồng bộ
        </a-button>
      </template>
    </va-breadcrumb>
    <!-- <router-view></router-view> -->
    <div class="bg-white shadow-md rounded-md">
        <!-- <div class="pt-5 rounded w-1/2 mx-auto">
            <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH SÁCH BỆNH
                NHÂN </h1>
        </div> -->
        <div class="p-3">
            <!-- <div class=""></div> -->
            <div class="">
                <a-divider orientation="left">
                    <div class="font-bold text-lg">Tìm kiếm bệnh nhân</div>
                </a-divider>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="">
                    <p>Loại bệnh án </p>
                    <a-select show-search ref="select" style="width: 100%;" @focus="focus" @change="handleChange"
                        placeholder="Chọn loại bệnh án">
                        <a-select-option value="Cấp cứu">Cấp cứu</a-select-option>
                        <a-select-option value="Mắt ">Mắt</a-select-option>
                        <a-select-option value="Ngoại khoa ">Ngoại khoa</a-select-option>
                        <a-select-option value="Răng - Hàm - Mặt ">Răng - Hàm - Mặt</a-select-option>
                        <a-select-option value="Tai - Mũi - Họng  ">Tai - Mũi - Họng</a-select-option>
                        <a-select-option value="Tim mạch ">Tim mạch</a-select-option>
                        <a-select-option value="Truyền nhiễm ">Truyền nhiễm </a-select-option>
                        <a-select-option value="Ung bướu">Ung bướu</a-select-option>
                    </a-select>
                </div>
                <div class="">
                    <p>Khoa</p>
                    <a-select show-search ref="select" style="width: 100%" @focus="focus" @change="handleChange"
                        placeholder="Hãy chọn khoa">
                        <a-select-option value="jack">Khoa khám bệnh </a-select-option>
                        <a-select-option value="lucy">Khoa nội </a-select-option>
                        <a-select-option value="disabled">Khoa ngoại </a-select-option>
                        <a-select-option value="Yiminghe">Khoa phụ sản </a-select-option>
                        <a-select-option value="1">Khoa nhi </a-select-option>
                        <a-select-option value="2">Khoa truyền nhiễm </a-select-option>
                        <a-select-option value="3">Khoa cấp cứu </a-select-option>
                        <a-select-option value="4">Khoa hồi sức tích cực và chống độc </a-select-option>
                        <a-select-option value="5">Khoa y học cổ truyền</a-select-option>
                        <a-select-option value="6">Khoa ung bướu </a-select-option>
                        <a-select-option value="7">Khoa gây mê</a-select-option>
                        <a-select-option value="8">Khoa xét nghiệm </a-select-option>
                        <a-select-option value="9">Khoa giải phẫu </a-select-option>
                        <a-select-option value="10">Khoa dược </a-select-option>
                    </a-select>
                </div>
                <div class="">
                    <p>Phòng</p>
                    <a-select show-search ref="select" style="width: 100%" @focus="focus" @change="handleChange"
                        placeholder="Hãy chọn phòng">
                    </a-select>
                </div>
                <div class="">
                    <p>Giường</p>
                    <va-input placeholder="Giường" allow-clear />
                </div>
                <div class="">
                    <p>Tìm theo mã BA, mã BN, tên BN</p>
                    <a-input placeholder="mã BA, mã BN, tên BN" allow-clear />

                </div>
                <div class="">
                    <p>Từ ngày - Đến ngày</p>
                    <a-range-picker style="width: 100%;" />
                </div>
            </div>
        </div>
        <div class="flex justify-start px-3">
            <div class="flex gap-3">
                <!-- <div class="">
                    <a-button type="primary">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Tìm kiếm
                    </a-button>
                </div> -->
                <router-link to="/add-patient">
                    <a-button type="primary" @click="">
                        <template #icon>
                            <UserAddOutlined />
                        </template>
                        Tạo mới bệnh nhân
                    </a-button>
                </router-link>
            </div>
        </div>
        <va-table class="px-2 mt-3" :columns-table="columns" :data-source="data" :spinning="loading"
            :scroll="{ x: 'max-content' }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a>Chỉnh sửa</a>
                </template>
                <template v-if="column.key === 'name'">
                    <router-link to="/medical-being-treated">
                        {{ record.name }}
                    </router-link>
                </template>
            </template>

            <template #expandedRowRender="{ record }">
                <!-- <p style="margin: 0">
                    {{ record.description }}
                </p> -->
                <div class="grid grid-cols-3 gap-5 mt-3">
                    <router-link to="/dashboard/analysis">
                        <div class="flex gap-2">
                            <div class="">
                                <img src="@/assets/images/Group3.png" alt="">
                            </div>
                            <p class="font-semibold">Quản lý điều trị </p>
                        </div>
                    </router-link>
                    <router-link to="/medical-being-treated">
                        <div class="flex gap-2">
                            <div class="">
                                <img src="@/assets/images/Group1.png" alt="">
                            </div>
                            <p class="font-semibold">Bệnh án đang điều trị</p>
                        </div>
                    </router-link>
                    <router-link to="/medical-examination-history">
                        <div class="flex gap-2">
                            <div class="">
                                <img src="@/assets/images/Group5.png" alt="">
                            </div>
                            <p class="font-semibold">Lịch sử khám chữa bệnh </p>
                        </div>
                    </router-link>
                </div>
            </template>
        </va-table>
    </div>
</template>

<script lang="ts">
//'@ant-design/icons-vue'
import { UserAddOutlined, CloudSyncOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import columns from './columns';
import { useRoute } from 'vue-router'
// import router from '@/router';

const data = [
    {
        key: 1,
        name: 'Nguyễn Thị Thanh',
        sex: 'Nữ',
        birth: '12/03/1990 - 32 Tuổi',
        patientCode: '2208250012',
        patientNoteCode: 'BA221000368',
        room: 'Phòng Cấp cứu hồi sức 1',
        bed: 'H001',
        department: 'Khoa Ngoại tổng hợp (Ngoại B)',
        dayIn: '11:00 25/08/2022',
        diagnose: 'A01.3-Bệnh phó thương hàn C',
        doctor: 'Trần Ngọc Ánh',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Vũ Văn Lụng',
        sex: 'Nam ',
        birth: '13/04/1998 - 24 Tuổi',
        patientCode: '2202130011',
        patientNoteCode: 'BA221000355',
        room: 'Phòng 402',
        bed: 'H004',
        department: 'Khoa nội tổng hợp ',
        dayIn: '17:30 13/02/2022',
        diagnose: 'A04-Nhiễm trùng đường ruột do vi khuẩn khác',
        doctor: 'Đỗ Trường Sơn',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Phạm Anh Quân',
        sex: 'Nam ',
        birth: '25/05/1991 - 31 Tuổi',
        patientCode: '2208030010',
        patientNoteCode: 'BA221000367',
        room: 'Phòng Cấp cứu hồi sức 2',
        bed: 'H015',
        department: 'Khoa nội tổng hợp ',
        dayIn: '13:25 03/08/2022',
        diagnose: 'A02.1-Nhiễm trùng huyết do Salmonella',
        doctor: 'Hoàng Thị Thanh Huyền',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        name: 'Nguyễn Hữu Lý ',
        sex: 'Nữ',
        birth: '05/01/1955 - 67 Tuổi',
        patientCode: '2208180004',
        patientNoteCode: 'BA221000366',
        room: 'Phòng 223',
        bed: 'H036',
        department: 'Khoa nội tổng hợp ',
        dayIn: '11:32 10/10/2022',
        diagnose: 'A01.4-Bệnh phó thương hàn, không xác định',
        doctor: 'Phạm Hoài Thu',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        name: 'Trần Quốc Anh ',
        sex: 'Nam ',
        birth: '11/01/1988 - 34 Tuổi',
        patientCode: '2208180006',
        patientNoteCode: 'BA221000364',
        room: 'Phòng 227',
        bed: 'H008',
        department: 'Khoa nội tổng hợp ',
        dayIn: '09:13 08/08/2022',
        diagnose: 'A02-Nhiễm salmonella khác',
        doctor: 'Đào Nguyễn Hà Linh',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        name: 'Đào Nguyễn Hà Linh',
        sex: 'Nam ',
        birth: '12/03/1990 - 32 Tuổi',
        patientCode: '2208190083',
        patientNoteCode: 'BA221000363',
        room: 'Phòng 225',
        bed: 'H025',
        department: 'Khoa nội tổng hợp ',
        dayIn: '14:05 11/07/2022',
        diagnose: 'J10.1-Cảm cúm với biểu hiện hô hấp khác, virus cúm được định',
        doctor: 'Trần Huyền Trang',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        name: 'Nguyễn Thị Sơn ',
        sex: 'Nữ',
        birth: '01/01/1988 - 34 Tuổi',
        patientCode: '2208220004',
        patientNoteCode: 'BA221000362',
        room: 'Phòng 222',
        bed: 'H015',
        department: 'Khoa nội tổng hợp ',
        dayIn: '16:41 07/08/2022',
        diagnose: 'A18.6-Lao ở tai',
        doctor: 'Nguyễn Trần Kiên',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        name: 'Lê Xuân Hiệp ',
        sex: 'Nam ',
        birth: '15/03/1940 - 82 Tuổi',
        patientCode: '2208220002',
        patientNoteCode: 'BA221000358',
        room: 'Phòng hồi sức (GMHS&CĐ)',
        bed: 'H016',
        department: 'Khoa nội tổng hợp ',
        dayIn: '18:43 14/06/2022',
        diagnose: 'A00.0-Bệnh tả do Vibrio cholerae 01, typ sinh học cholerae',
        doctor: 'Hoàng Thị Thanh Huyền',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        name: 'Trương Quang Kính ',
        sex: 'Nam ',
        birth: '15/06/1964 - 58 Tuổi',
        patientCode: '2208190001',
        patientNoteCode: 'BA221000357',
        room: 'Phòng 223',
        bed: 'H001',
        department: 'Khoa nội tổng hợp ',
        dayIn: '10:14 21/07/2022',
        diagnose: 'A00.0-Bệnh tả do Vibrio cholerae 01, typ sinh học cholerae',
        doctor: 'Nguyễn Thị Hải Yến',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        name: 'Hoàng Văn Thao',
        sex: 'Nam ',
        birth: '06/11/1986 - 36 Tuổi',
        patientCode: '2208180003',
        patientNoteCode: 'BA221000356',
        room: 'Phòng 221',
        bed: 'H016',
        department: 'Khoa nội tổng hợp ',
        dayIn: '08:04 29/09/2022',
        diagnose: 'A19.2-Lao kê cấp, không xác định',
        doctor: 'Trịnh Lê Huy',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        name: 'Hoàng Văn Thao',
        sex: 'Nam ',
        birth: '06/11/1986 - 36 Tuổi',
        patientCode: '2208180003',
        patientNoteCode: 'BA221000356',
        room: 'Phòng 221',
        bed: 'H016',
        department: 'Khoa nội tổng hợp ',
        dayIn: '08:04 29/09/2022',
        diagnose: 'A19.2-Lao kê cấp, không xác định',
        doctor: 'Trịnh Lê Huy',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        name: 'Hoàng Văn Thao',
        sex: 'Nam ',
        birth: '06/11/1986 - 36 Tuổi',
        patientCode: '2208180003',
        patientNoteCode: 'BA221000356',
        room: 'Phòng 221',
        bed: 'H016',
        department: 'Khoa nội tổng hợp ',
        dayIn: '08:04 29/09/2022',
        diagnose: 'A19.2-Lao kê cấp, không xác định',
        doctor: 'Trịnh Lê Huy',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        name: 'Hoàng Văn Thao',
        sex: 'Nam ',
        birth: '06/11/1986 - 36 Tuổi',
        patientCode: '2208180003',
        patientNoteCode: 'BA221000356',
        room: 'Phòng 221',
        bed: 'H016',
        department: 'Khoa nội tổng hợp ',
        dayIn: '08:04 29/09/2022',
        diagnose: 'A19.2-Lao kê cấp, không xác định',
        doctor: 'Trịnh Lê Huy',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    }




];
export default defineComponent({
    components: {
        UserAddOutlined,
        CloudSyncOutlined
    },
    setup() {
        const loading = ref<Boolean>(false)
        const route = useRoute()
        const focus = () => {
            console.log('focus');
        };

        const extraBreadcrumbs = ref([route.meta.breadcrumbText])
        console.log(extraBreadcrumbs.value);


        const handleChange = (value: string) => {
            console.log(`selected ${value}`);
        };

        return {
            data,
            columns,
            focus,
            handleChange,
            loading,
            extraBreadcrumbs
        };
    },
})
</script>

<style lang="less" scoped>

</style>