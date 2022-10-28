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
                    <p>Tên tổ chức</p>
                    <!-- <a-select show-search placeholder="Chọn câu hỏi" style="width: 100%"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select> -->
                    <va-input placeholder="Tên tổ chức"></va-input>
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
                                <a-form-item label="Mã tổ chức">
                                    <a-input disabled v-model:value="record.id" />
                                </a-form-item>
                                <a-form-item label="Tên tổ chức">
                                    <a-input disabled v-model:value="record.name" />
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
                <a-col :span="12">
                    <a-form-item label="Mã" name="id" v-bind="validateInfos.id">
                        <a-input v-model:value="form.id" placeholder="Hãy nhập mã" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Tên" name="name" v-bind="validateInfos.name">
                        <a-input v-model:value="form.name" placeholder="Hãy nhập nội dung" />
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
import { defineComponent, ref, reactive, createVNode, toRaw } from 'vue';
import columns from './columns';
// import type { Rule } from 'ant-design-vue/es/form';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
import { Modal, Form, message } from 'ant-design-vue';

const data = [
    {
        key: 1,
        id: 'TC001',
        name: 'Bộ phận hành chính lãnh đạo',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'TC002',
        name: 'Bộ phận chuyên môn',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'TC003',
        name: 'Bộ phận phục vụ',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'TC004',
        name: 'Biên chế cán bộ và giường bệnh của bệnh viện',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
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
        const isAdd = ref<Boolean>(true)
        const useForm = Form.useForm;

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

        const form = reactive({
            id: '',
            name: '',
            // shortName: '',
            // API: '',
            // nameAPI: '',
            // description: '',
        });

        const formUpdate = reactive({
            name: '',
        });

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            name: [{ required: true, message: 'Tên không được để trống' }],
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
            // message.error('Sửa không thành công!')
        };

        const updateHandle = (record) => {
            form.id = record.id
            form.name = record.name
            showDrawer()
        }

        const showConfirm = (record) => {
            Modal.confirm({
                title: 'Hộp thoại xác nhận',
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', { style: 'color:red;' }, 'Bạn có chắc muốn sửa'),
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
            formUpdate,
            cancel,
            updateHandle,
            showConfirm,
            validateInfos,
            resetFields,
            onAddSubmit,
            onEditSubmit,
            handleAdd,
            handleEdit,
            isAdd
        };
    },
})
</script>

<style>

</style>