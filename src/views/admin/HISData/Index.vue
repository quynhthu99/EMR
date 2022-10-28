<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="bg-white shadow-md rounded-md">
        <!-- <div class="pt-5 rounded w-1/2 mx-auto">
            <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH MỤC DỮ LIỆU HIS
            </h1>
        </div> -->
        <div class="p-3">
            <!-- <div class=""></div> -->
            <div class="">
                <a-divider orientation="left">
                    <div class="font-bold text-lg">Tìm kiếm</div>
                </a-divider>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
                <div class="">
                    <p>Người tạo</p>
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Câu hỏi</p>
                    <a-select show-search placeholder="Chọn câu hỏi" style="width: 100%" :filter-option="filterOption"
                        @focus="handleFocus" @blur="handleBlur" @change="handleChange">
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
            <va-table class="px-2" :columns-table="columns" :data-source="data" :spinning="loading" :filter="false"
                :multi-action="false" :row-selection="null" :scroll="{ x: 'max-content' }">
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
                            <h1 class="font-bold text-base xl:text-xl text-[#1A90D2]">Thông tin chi tiết</h1>
                            <div class="lg:flex grid grid-cols-3 gap-2 max-w-[700px]">
                                <!-- <a-button type="primary" :disabled="!isDisable" @click="showDrawer">
                                    <template #icon>
                                        <plus-square-outlined />
                                    </template>
                                    Thêm mới
                                </a-button> -->
                                <!-- <a-button type="primary">
                                    <template #icon>
                                        <SaveOutlined />
                                    </template>
                                    Lưu
                                </a-button> -->
                                <!-- <a-popconfirm :disabled="!isDisable" title="Bạn có thực sự muốn sửa câu hỏi này?"
                                    ok-text="Có" cancel-text="Không" @confirm="updateData" @cancel="cancel">
                                    <a-button :disabled="!isDisable" @click="updateHandle(record)" type="primary">
                                        <template #icon>
                                            <tool-outlined />
                                        </template>
                                        Sửa
                                    </a-button>
                                </a-popconfirm> -->
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
                                <a-form-item label="Tên viết tắt">
                                    <a-input disabled v-model:value="record.shortName" />
                                </a-form-item>
                                <a-form-item label="API">
                                    <a-input disabled v-model:value="record.API" />
                                </a-form-item>
                                <a-form-item label="Tên trường trong API">
                                    <a-select disabled show-search placeholder="Chọn trường API" :options="options"
                                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                        @change="handleChange">
                                    </a-select>
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
        <a-form :model="form" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-form-item label="Mã" name="id" v-bind="validateInfos.id">
                        <a-input v-model:value="form.id" placeholder="Hãy nhập mã" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Nội dung" name="content" v-bind="validateInfos.content">
                        <a-input v-model:value="form.content" placeholder="Hãy nhập nội dung" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Tên viết tắt" name="shortName" v-bind="validateInfos.shortName">
                        <a-input v-model:value="form.shortName" placeholder="Hãy nhập tên viết tắt" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="API" name="API" v-bind="validateInfos.API">
                        <a-input v-model:value="form.API" placeholder="Hãy nhập API" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Tên trường API" name="nameAPI" v-bind="validateInfos.nameAPI">
                        <a-select v-model:value="form.nameAPI" placeholder="Hãy chọn trường API">
                            <a-select-option value="private">Private</a-select-option>
                            <a-select-option value="public">Public</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Mô tả" name="description">
                        <a-textarea v-model:value="form.description" :rows="4" placeholder="Hãy nhập mô tả" />
                    </a-form-item>
                </a-col>
            </a-row>
            <!-- <a-row :visible="isAd" :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Mô tả" name="description">
                        <a-textarea v-model:value="form.description" :rows="4" placeholder="Hãy nhập mô tả" />
                    </a-form-item>
                </a-col>
            </a-row> -->
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
                    <a-button type="primary" @click.prevent="onSubmit">Thêm</a-button>
                </div>
                <div v-else class="flex gap-2">
                    <a-button @click="onClose">Hủy</a-button>
                    <a-button @click="resetFields">Reset</a-button>
                    <a-button type="primary" @click.prevent="onSubmit">Sửa</a-button>
                </div>
            </a-space>
        </template>
    </a-drawer>
</template>

<script lang="ts">
import { message, SelectProps, Modal } from 'ant-design-vue';
import { defineComponent, ref, reactive, toRaw, createVNode } from 'vue';
import columns from './columns';
import { Form } from 'ant-design-vue';
// import type { Rule } from 'ant-design-vue/es/form';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

const data = [
    {
        key: 1,
        id: 'B001',
        data: 'Họ tên bệnh nhân ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'B002',
        data: 'Tuổi ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'B003',
        data: 'Giới tính ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'B004',
        data: 'Ngày sinh ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'B005',
        data: 'BHYT',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'B006',
        data: 'Địa chỉ ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'B007',
        data: 'Khoa điều trị ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'B008',
        data: 'Nghề nghiệp',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'B009',
        data: 'Chẩn đoán bệnh chính ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        data: 'SĐT',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 11,
        id: 'B010',
        data: 'Chẩn đoán ra viện ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 12,
        id: 'B010',
        data: 'Người thân ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 13,
        id: 'B010',
        data: 'SĐT người thân ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        valuable: 'New York No. 1 Lake Park',
        shortName: "Tc",
        API: 'http://api.example.com/inventory-management/managed-entities/maNguoiBenh=XXX?',
        nameAPI: 'lucy',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    }
];

export default defineComponent({
    components: {
        SearchOutlined,
        PlusSquareOutlined,
        SaveOutlined,
        ToolOutlined,
        DeleteOutlined,
        HistoryOutlined,
        ExclamationCircleOutlined
    },
    setup() {
        const checked = ref<Boolean>(true)
        const loading = ref<Boolean>(false)
        const useForm = Form.useForm;
        const isAdd = ref<Boolean>(true)
        // const isDisable = ref<Boolean>(true)
        // const updateData = () => {
        //     isDisable.value = false
        // }

        // const saveData = () => {
        //     isDisable.value = true
        // }

        const handleAdd = () => {
            isAdd.value = true
        }
        const handleEdit = () => {
            isAdd.value = false
        }

        const options = ref<SelectProps['options']>([
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'tom', label: 'Tom' },
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

        const updateHandle = (record) => {
            form.id = record.id
            form.content = record.question
            form.shortName = record.shortName
            form.API = record.API
            form.nameAPI = record.nameAPI
            form.description = record.description
            showDrawer()
        }

        const form = reactive({
            id: '',
            content: '',
            shortName: '',
            API: '',
            nameAPI: undefined,
            description: '',
        });

        // const formUpdate = reactive({
        //     content: '',
        //     shortName: '',
        //     API: '',
        //     nameAPI: undefined,
        //     description: '',
        // });

        const showConfirm = (record) => {
            Modal.confirm({
                title: 'Hộp thoại xác nhận',
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', { style: 'color:red;' }, 'Bạn có thực sự muốn sửa?'),
                okText: 'Sửa',
                // okType: 'danger',
                cancelText: 'Hủy',
                onOk() {
                    console.log('OK');
                    updateHandle(record);
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test',
            });
        };

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            content: [{ required: true, message: 'Nội dung không được để trống' }],
            shortName: [{ required: true, message: 'Tên viết tắt không được để trống' }],
            API: [{ required: true, message: 'API không được để trống' }],
            nameAPI: [{ required: true, message: 'Tên trường không được để trống' }],
            // description: [{ required: true, message: 'Please enter url description' }],
        });

        const { resetFields, validate, validateInfos } = useForm(form, rules, {
            onValidate: (...args) => console.log(...args),
        });

        const onSubmit = () => {
            validate()
                .then(() => {
                    console.log(toRaw(form));
                    onClose()
                    message.success('Thêm mới thành công')
                })
                .catch(err => {
                    console.log('error', err);
                });
        };

        return {
            value: ref<string | undefined>(undefined),
            dataPicker: ref<RangeValue>(),
            labelCol: { style: { width: '150px' } },
            wrapperCol: { span: 24 },
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
            options,
            data,
            columns,
            checked,
            loading,
            form,
            rules,
            visible,
            showDrawer,
            onClose,
            // isDisable,
            // updateData,
            // saveData,
            // formUpdate,
            cancel,
            updateHandle,
            onSubmit,
            validateInfos,
            resetFields,
            showConfirm,
            handleAdd,
            handleEdit,
            isAdd
        };
    },
})
</script>

<style>

</style>