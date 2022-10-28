<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="bg-white shadow-md rounded-md">
        <!-- <div class="pt-5 rounded w-1/2 mx-auto">
            <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH MỤC BỘ CÂU HỎI</h1>
        </div> -->
        <div class="p-3">
            <!-- <div class=""></div> -->
            <div class="">
                <a-divider orientation="left">
                    <div class="font-bold text-lg">Tìm kiếm</div>
                </a-divider>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="">
                    <p>Người tạo</p>
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%" :filter-option="filterOption"
                        @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Tên câu hỏi</p>
                    <a-select show-search placeholder="Chọn câu hỏi" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Thời gian tạo </p>
                    <a-range-picker v-model:value="dataPicker" style="width: 100%" />
                </div>
            </div>
        </div>
        <div class="flex justify-start px-3">
            <div class="flex gap-3">
                <div class="">
                    <a-button type="primary">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Tìm kiếm
                    </a-button>
                </div>
                <a-button type="primary" @click="showDrawer(), resetFields(), handleAdd()">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm mới
                </a-button>
            </div>
        </div>
        <div class="">
            <va-table class="px-2" :columns-table="columns" :data-source="data" :spinning="loading"
                :scroll="{ x: 'max-content' }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a>Delete</a>
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
                <template #expandedRowRender="{ record }">
                    <div class="">
                        <div class="flex justify-between py-2">
                            <h1 class="font-bold text-base lg:text-xl text-[#1A90D2]">Thông tin chi tiết</h1>
                            <div class="lg:flex grid grid-cols-3 gap-2 max-w-[700px]">
                                <a-button @click="showConfirm(record), handleEdit()" type="primary">
                                    <template #icon>
                                        <tool-outlined />
                                    </template>
                                    Sửa
                                </a-button>
                                <a-button type="primary">
                                    <template #icon>
                                        <DeleteOutlined />
                                    </template>
                                    Xóa
                                </a-button>
                                <a-button type="primary">
                                    <template #icon>
                                        <HistoryOutlined />
                                    </template>
                                    Lịch sử chỉnh sửa
                                </a-button>
                            </div>
                        </div>
                        <div class="">
                            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                                <a-form-item label="Mã">
                                    <a-input disabled v-model:value="record.id" />
                                </a-form-item>
                                <a-form-item label="Câu hỏi">
                                    <a-input disabled v-model:value="record.question" />
                                </a-form-item>
                                <a-form-item label="Khái niệm CT">
                                    <a-space direction="vertical">
                                        <a-select disabled style="width: 300px" :options="options"
                                            placeholder="Chọn trong 19 bộ khái niệm SNOMED"></a-select>
                                    </a-space>
                                </a-form-item>
                                <!-- <a-form-item label="Mô tả">
                                    <a-textarea disabled v-model:value="record.description" />
                                </a-form-item> -->
                                <a-form-item label="Biểu thức ">
                                    <div class="flex gap-3">
                                        <a-input disabled v-model:value="record.expression" />
                                        <a-button disabled type="primary">
                                            <template #icon>
                                                <plus-square-outlined />
                                            </template>
                                            Thêm mới
                                        </a-button>
                                    </div>
                                </a-form-item>
                                <a-form-item label="Kiểu hiển thị">
                                    <a-tabs v-model:activeKey="activeKey" type="card">
                                        <a-tab-pane key="1" tab="Check box">
                                            <a-checkbox-group disabled style="width: 100%">
                                                <a-row>
                                                    <a-col :span="8">
                                                        <a-checkbox value="A">Acute edema
                                                        </a-checkbox>
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-checkbox value="B">
                                                            Acute respiratory disease</a-checkbox>
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-checkbox value="C">Pulmonary edema
                                                        </a-checkbox>
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-checkbox value="D">
                                                            Lung structure</a-checkbox>
                                                    </a-col>
                                                </a-row>
                                            </a-checkbox-group>
                                        </a-tab-pane>
                                        <a-tab-pane key="2" tab="Radio">
                                            <div class="ml-2">
                                                <a-radio-group disabled v-model:value="radioValue">
                                                    <a-radio :style="radioStyle" :value="1">Acute edema</a-radio>
                                                    <a-radio :style="radioStyle" :value="2">Acute respiratory disease
                                                    </a-radio>
                                                    <a-radio :style="radioStyle" :value="3">Pulmonary edema</a-radio>
                                                    <a-radio :style="radioStyle" :value="4">Lung structure</a-radio>
                                                </a-radio-group>
                                            </div>
                                        </a-tab-pane>
                                        <a-tab-pane key="3" tab="Select ">
                                            <a-select disabled show-search placeholder="Select a person"
                                                style="width: 200px" :options="options" :filter-option="filterOption"
                                                @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                                            </a-select>
                                        </a-tab-pane>
                                        <a-tab-pane key="4" tab="Yes/No  ">
                                            <div class="ml-2">
                                                <a-radio-group disabled v-model:value="yesNo">
                                                    <a-radio :style="radioStyle" :value="1">Yes</a-radio>
                                                    <a-radio :style="radioStyle" :value="2">No
                                                    </a-radio>
                                                </a-radio-group>
                                            </div>
                                        </a-tab-pane>
                                    </a-tabs>
                                </a-form-item>
                                <a-form-item label="Có hiệu lực">
                                    <a-checkbox disabled v-model:checked="checked"></a-checkbox>
                                </a-form-item>
                            </a-form>
                        </div>
                    </div>
                </template>
            </va-table>
        </div>
    </div>
    <a-drawer title="Quản lý dữ liệu" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }" @close="onClose">
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Mã câu hỏi" name="id" v-bind="validateInfos.id">
                        <a-input v-model:value="form.id" placeholder="Hãy nhập mã câu hỏi" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Câu hỏi" name="question" v-bind="validateInfos.question">
                        <a-input v-model:value="form.question" placeholder="Hãy nhập câu hỏi" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Người tạo" name="owner" v-bind="validateInfos.owner">
                        <a-select v-model:value="form.owner" placeholder="Người tạo">
                            <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                            <a-select-option value="mao">Maomao Zhou</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Khái niệm CT" name="CT" v-bind="validateInfos.defineTC">
                        <a-select v-model:value="form.defineTC" placeholder="Chọn trong 19 bộ khái niệm"
                            :options="options">
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Biểu thức" name="expression" v-bind="validateInfos.expression">
                        <a-textarea v-model:value="form.expression" placeholder="Hãy nhập biểu thức" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Mô tả" name="description">
                        <a-textarea v-model:value="form.description" :rows="4" placeholder="Hãy nhập mô tả"
                            allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Kiểu hiển thị">
                        <a-tabs v-model:activeKey="addActiveKey" type="card">
                            <a-tab-pane key="1" tab="Check box">
                                <a-checkbox-group style="width: 100%">
                                    <a-row>
                                        <a-col :span="8">
                                            <a-checkbox value="A">Acute edema
                                            </a-checkbox>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-checkbox value="B">
                                                Acute respiratory disease</a-checkbox>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-checkbox value="C">Pulmonary edema
                                            </a-checkbox>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-checkbox value="D">
                                                Lung structure</a-checkbox>
                                        </a-col>
                                    </a-row>
                                </a-checkbox-group>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Radio">
                                <div class="ml-2">
                                    <a-radio-group v-model:value="radioValue">
                                        <a-radio :style="radioStyle" :value="1">Acute edema</a-radio>
                                        <a-radio :style="radioStyle" :value="2">Acute respiratory disease
                                        </a-radio>
                                        <a-radio :style="radioStyle" :value="3">Pulmonary edema</a-radio>
                                        <a-radio :style="radioStyle" :value="4">Lung structure</a-radio>
                                    </a-radio-group>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="Select ">
                                <a-select show-search placeholder="Select a person" style="width: 200px"
                                    :options="options" :filter-option="filterOption" @focus="handleFocus"
                                    @blur="handleBlur" @change="handleChange">
                                </a-select>
                            </a-tab-pane>
                            <a-tab-pane key="4" tab="Yes/No  ">
                                <div class="ml-2">
                                    <a-radio-group v-model:value="yesNo">
                                        <a-radio :style="radioStyle" :value="1">Yes</a-radio>
                                        <a-radio :style="radioStyle" :value="2">No
                                        </a-radio>
                                    </a-radio-group>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Có hiệu lực">
                        <a-checkbox v-model:checked="checked"></a-checkbox>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #extra>
            <a-space>
                <div v-if="isAdd" class="flex gap-2">    
                    <a-button @click="onClose">Hủy</a-button>
                    <a-button @click="resetFields">Reset</a-button>
                    <a-button type="primary" @click="onAddSubmit">Thêm</a-button>
                </div>
                <div v-else class="flex gap-2">    
                    <a-button @click="onClose">Hủy</a-button>
                    <a-button @click="resetFields">Reset</a-button>
                    <a-button type="primary" @click="onEditSubmit">Sửa</a-button>
                </div>
            </a-space>
        </template>
    </a-drawer>
</template>

<script lang="ts">
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref, reactive, nextTick, toRefs, createVNode, toRaw } from 'vue';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
// import type { Rule } from 'ant-design-vue/es/form';
import { message, Modal, Form } from 'ant-design-vue';
import columns from './columns'
type RangeValue = [Dayjs, Dayjs];

const data = [
    {
        key: 1,
        id: 'B001',
        question: 'Ngưng hút thuốc lá trước mổ ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['Non active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'B002',
        question: 'Sử dụng kháng sinh ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Nc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'B003',
        question: 'Phẫu thuật cắt khối tá tuỵ ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Uh",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['Non active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'B004',
        question: 'Chế độ ăn trước mổ ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'B005',
        question: 'Phục hồi chức năng trước mổ ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'B006',
        question: 'Máy lọc sử dụng ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'B007',
        question: 'Đường lọc ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Mc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'B008',
        question: 'Tốc độ máu ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['Non active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'B009',
        question: 'Dịch thay thế',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        defineTC: 'Sinh vật(sinh vật)',
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        question: 'Tốc độ thay thế',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        question: 'Cơ quan tuần hoàn ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        question: 'Cơ quan hô hấp ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        question: 'Cơ quan tiêu hoá ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        tags: ['active'],
        expression: '64572001 | Disease|  :  263502005 | Clinical course|  = 424124008 | Sudden onset AND/OR short duration| ',
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
        HistoryOutlined,
        CloseOutlined,
        ExclamationCircleOutlined
    },
    setup() {
        const checked = ref<Boolean>(true)

        const loading = ref<Boolean>(false)

        const radioValue = ref<number>(1);

        const yesNo = ref<number>(1);

        const isAdd = ref<Boolean>(true)

        const useForm = Form.useForm;

        const handleAdd = () => {
            isAdd.value = true
        }

        const handleEdit = () => {
            isAdd.value = false
        }

        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        });

        const options = ref<SelectProps['options']>([
            { value: 'jack', label: 'Cấu trúc cơ thể(cấu trúc cơ thể)' },
            { value: 'lucy', label: 'Phát hiện lâm sàng(phát hiện)' },
            { value: 'tom', label: 'Môi trường hoặc vị trí địa lý(môi trường/địa lý)' },
            { value: 'tom', label: 'event(sự kiện)' },
            { value: 'tom', label: 'Thực thể có thể quan sát(thực thể có thể quan sát)' },
            { value: 'tom', label: 'Sinh vật(sinh vật)' },

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
            tags: ['Unremovable', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
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
            question: '',
            owner: undefined,
            defineTC: undefined,
            expression: '',
            createdAt: null,
            description: '',
        });

        const updateHandle = (record) => {
            form.id = record.question
            form.question = record.question
            form.owner = record.owner
            form.defineTC = record.defineTC
            form.expression = record.expression
            form.createdAt = record.createdAt
            form.description = record.description
            showDrawer()
        }

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            question: [{ required: true, message: 'Câu hỏi không được để trống' }],
            owner: [{ required: true, message: 'Người tạo không được để trống' }],
            defineTC: [{ required: true, message: 'Khái niệm CT không được để trống' }],
            expression: [{ required: true, message: 'Biểu thức không được để trống' }],
            description: [{ required: true, message: 'Please enter url description' }],
        });

        const { resetFields, validate, validateInfos } = useForm(form, rules, {
            onValidate: (...args) => console.log(...args),
        });

        const onAddSubmit = () => {
            validate()
                .then(() => {
                    console.log(toRaw(form));
                    message.success('Thêm mới thành công')
                    onClose()
                })
                .catch(err => {
                    console.log('error', err);
                });
        };

        const onEditSubmit = () => {
            validate()
                .then(() => {
                    console.log(toRaw(form));
                    message.success('Sửa thành công')
                    onClose()
                })
                .catch(err => {
                    console.log('error', err);
                });
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
            message.error('Sửa không thành công!')
        };

        const showConfirm = (record) => {
            Modal.confirm({
                title: 'Hộp thoại xác nhận',
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', { style: 'color:red;' }, 'Bạn có thực sự muốn sửa'),
                onOk() {
                    console.log('OK');
                    updateHandle(record)
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test',
            });
        };

        return {
            value: ref<string | undefined>(undefined),
            dataPicker: ref<RangeValue>(),
            labelCol: { style: { width: '150px' } },
            wrapperCol: { span: 24 },
            activeKey: ref('1'),
            addActiveKey: ref('1'),
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
            showDrawer,
            onClose,
            rules,
            form,
            visible,
            cancel,
            updateHandle,
            loading,
            showConfirm,
            onAddSubmit,
            onEditSubmit,
            validateInfos,
            resetFields,
            handleAdd,
            handleEdit,
            isAdd
        };
    },
})
</script>

<style>

</style>