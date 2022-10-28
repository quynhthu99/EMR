<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="bg-white shadow-md rounded-md">
        <!-- <div class="pt-5 rounded w-1/2 mx-auto">
            <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH MỤC GIƯỜNG</h1>
        </div> -->
        <div class="p-3">
            <!-- <div class=""></div> -->
            <div class="">
                <a-divider orientation="left">
                    <div class="font-bold text-lg">Tìm kiếm</div>
                </a-divider>
            </div>
            <!-- <div class="flex">
            </div> -->
            <div class="w-1/3">
                <div class="">
                    <p>Biểu mẫu chờ ký</p>
                    <div class="flex gap-3">
                        <va-select></va-select>
                        <div class="flex gap-3">
                            <div class="">
                                <a-button type="primary">
                                    <template #icon>
                                        <SearchOutlined />
                                    </template>
                                    Tìm kiếm
                                </a-button>
                            </div>
                            <!-- <a-button type="primary" @click="showDrawer">
                        <template #icon>
                            <plus-square-outlined />
                        </template>
                        Thêm mới
                    </a-button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-start px-3">
            <!-- <div class="flex gap-3">
                <div class="">
                    <a-button type="primary">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Tìm kiếm
                    </a-button>
                </div>
                <a-button type="primary" @click="showDrawer">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm mới
                </a-button>
            </div> -->
        </div>
        <div class="">
            <va-table class="px-2" :columns-table="columns" :data-source="data" :spinning="loading"
                :scroll="{ x: 'max-content' }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <div class="flex gap-2">
                            <a-button type="primary" @click="showModal">View file </a-button>
                            <a-button type="primary">Ký</a-button>
                            <a-button type="primary">Từ chối </a-button>
                        </div>

                    </template>
                    <template v-else-if="column.key === 'tags'">
                        <span>
                            <a-tag v-for="tag in record.tags" :key="tag"
                                :color="tag === 'Non active' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                {{ tag.toUpperCase() }}
                            </a-tag>
                        </span>
                    </template>
                </template>

            </va-table>
        </div>
    </div>
    <a-drawer title="Thêm mới" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }" @close="onClose">
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Mã giường" name="id">
                        <a-input v-model:value="form.id" placeholder="Please enter department" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Khoa" name="department">
                        <a-input v-model:value="form.department" placeholder="Please enter department" />
                    </a-form-item>
                </a-col>

            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Phòng" name="room">
                        <a-input v-model:value="form.room" placeholder="Please enter department" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Loại giường" name="type">
                        <div class="w-full">
                            <div class="w-full">
                                <a-select v-if="inputVisible" show-search ref="inputRef" v-model:value="inputValue"
                                    placeholder="Chọn câu hỏi" :style="{ width: '100%' }" :options="options"
                                    :filter-option="filterOption" @focus="handleFocus" @keyup.enter="handleInputConfirm"
                                    @blur="handleInputConfirm" @change="handleChange">
                                </a-select>
                                <a-tag v-else
                                    style="background: #fff; border-style: dashed; 	width: 100%;; padding: 6px;"
                                    @click="showInput">
                                    <plus-outlined />
                                    Chọn loại giường SNOMED
                                </a-tag>
                            </div>
                            <div class="w-full">
                                <div class="mt-2 gap-2">
                                    <template v-for="(tag) in tags" :key="tag">
                                        <a-tooltip v-if="tag.length > 20" :title="tag">
                                            <a-tag closable @close="handleClose(tag)">
                                                {{ `${tag.slice(0, 20)}...` }}
                                            </a-tag>
                                        </a-tooltip>
                                        <a-tag v-else closable @close="handleClose(tag)">
                                            {{ tag }}
                                        </a-tag>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Miêu tả" name="description">
                        <a-textarea v-model:value="form.description" :rows="4"
                            placeholder="please enter url description" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="Có hiệu lực">
                        <a-checkbox v-model:checked="checked"></a-checkbox>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #extra>
            <a-space>
                <a-button @click="onClose">Hủy</a-button>
                <a-button type="primary" @click="onClose">Thêm</a-button>
            </a-space>
        </template>
    </a-drawer>
    <a-modal v-model:visible="modalVisible" width="1200px" title="Basic Modal" @ok="handleOk">
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
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref, reactive, nextTick, toRefs } from 'vue';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
import type { Rule } from 'ant-design-vue/es/form';
import columns from './columns'
type RangeValue = [Dayjs, Dayjs];

const data = [
    {
        key: 1,
        name: 'Bảng kiểm trước tiêm chủng đối với trẻ sơ sinh tại các cơ sở tiêm chủng ngoài bệnh viện',
        fileId: ' 20210001',
        patient: "Trần Quốc Anh ",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Phiếu phẫu thuật Mổ quặm',
        fileId: ' 20210002',
        patient: "Nguyễn Thị Thanh ",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Phiếu phẫu thuật thể thủy tinh',
        fileId: ' 20210003',
        patient: "Vũ Văn Lụng",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        name: 'Bảng theo dõi đường huyết theo giờ của người bệnh',
        fileId: ' 20210004',
        patient: "Phạm Anh Quân ",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        name: 'Phiếu phẫu thuật thể thủy tinh',
        fileId: ' 20210005',
        patient: "Nguyễn Hữu Lý ",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        name: 'Phiếu Phẫu thuật Glocom',
        fileId: ' 20210006',
        patient: "Bùi Hoàng Long",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        name: 'Bản cam đoan chấp nhận thực hiện phẫu thuật - can thiệp tim mạch',
        fileId: ' 20210007',
        patient: "Nguyễn Thị Sơn",
        ownerName: 'BS Nguyễn Văn A',
        created: '12:00 07-08-2022',
        // owner: 'Lương Quỳnh Thư',
        // tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
];

export default defineComponent({
    components: {
        SearchOutlined,
        PlusSquareOutlined,
        SaveOutlined,
        ToolOutlined,
        DeleteOutlined,
        HistoryOutlined
    },
    setup() {
        const checked = ref<Boolean>(true)

        const isDisable = ref<Boolean>(true)

        const loading = ref<Boolean>(false)

        const radioValue = ref<number>(1);

        const yesNo = ref<number>(1);

        const modalVisible = ref<boolean>(false)


        const handleOk = (e: MouseEvent) => {
            console.log(e);
            modalVisible.value = false;
        };

        const showModal = () => {
            modalVisible.value = true;
        };

        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        });

        const labelStyle = {
            fontWeight: '700',
        }


        const updateData = () => {
            isDisable.value = false
        }

        const saveData = () => {
            isDisable.value = true
        }

        const options = ref<SelectProps['options']>([
            // { value: 'jack', label: 'Jack' },
            // { value: 'lucy', label: 'Lucy' },
            // { value: 'tom', label: 'Tom' },
        ]);
        const handleChange = (value: string) => {
            console.log(`selected ${value}`);
        };
        const handleBlur = () => {
            console.log('blur');
        };
        const handleFocus = () => {
            console.log('focus');
        };
        const filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const inputRef = ref();
        const state = reactive({
            tags: ['Giường kế hoạch (S)', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
            inputVisible: false,
            inputValue: '',
        });

        const handleClose = (removedTag: string) => {
            const tags = state.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            state.tags = tags;
        };

        const showInput = () => {
            state.inputVisible = true;
            nextTick(() => {
                inputRef.value.focus();
            });
        };

        const handleInputConfirm = () => {
            const inputValue = state.inputValue;
            let tags = state.tags;
            if (inputValue && tags.indexOf(inputValue) === -1) {
                tags = [...tags, inputValue];
            }
            console.log(tags);
            Object.assign(state, {
                tags,
                inputVisible: false,
                inputValue: '',
            });
        };

        const form = reactive({
            id: '',
            department: '',
            room: '',
            type: '',
            description: ''
        });

        const formUpdate = reactive({
            id: '',
            department: '',
            room: '',
            type: '',
            description: ''
        });

        const updateHandle = (record) => {
            formUpdate.department = record.department
            formUpdate.room = record.room
            formUpdate.type = record.type
        }

        const rules: Record<string, Rule[]> = {
            department: [{ required: true, message: 'Please enter department' }],
            room: [{ required: true, message: 'please enter room' }],
            // type: [{ required: true, message: 'Please choose the type' }],
        };

        const visible = ref<boolean>(false);

        const showDrawer = () => {
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };

        const cancel = (e: MouseEvent) => {
            console.log(e);
            // message.error('Sửa không thành công!')
        };

        return {
            value: ref<string | undefined>(undefined),
            dataPicker: ref<RangeValue>(),
            labelCol: { style: { width: '150px' } },
            wrapperCol: { span: 24 },
            activeKey: ref('1'),
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
            options,
            data,
            columns,
            checked,
            radioStyle,
            radioValue,
            yesNo,
            ...toRefs(state),
            handleClose,
            showInput,
            handleInputConfirm,
            inputRef,
            form,
            rules,
            visible,
            showDrawer,
            onClose,
            isDisable,
            updateData,
            saveData,
            formUpdate,
            updateHandle,
            cancel,
            loading,
            labelStyle,
            modalVisible,
            handleOk,
            showModal
        };
    },
})
</script>

<style>

</style>