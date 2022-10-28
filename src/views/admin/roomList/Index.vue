<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="bg-white shadow-md rounded-md">
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
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Thời gian tạo </p>
                    <a-range-picker style="width: 100%" />
                </div>
                <div class="">
                    <p>Khoa</p>
                    <a-select show-search placeholder="Chọn khoa" style="width: 100%" :filter-option="filterOption"
                        @focus="handleFocus" @blur="handleBlur" @change="handleChange">
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
                    <p>Loại phòng</p>
                    <a-select show-search placeholder="Chọn phòng" style="width: 100%" :filter-option="filterOption"
                        @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                        <a-select-option value="jack">Cận lâm sàng</a-select-option>
                        <a-select-option value="lucy">Phòng khám </a-select-option>
                        <a-select-option value="disabled">Lâm sàng</a-select-option>
                        <a-select-option value="1">Lấy mẫu bệnh phẩm</a-select-option>
                        <a-select-option value="2">Phòng giường</a-select-option>
                        <a-select-option value="3">Phòng giường tự chọn</a-select-option>
                        <a-select-option value="4">Khác</a-select-option>
                    </a-select>
                </div>
                <!-- <div class="">
                    <p>Đối tượng sử dụng</p>
                    <a-select show-search placeholder="Chọn đối tượng sử dụng" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div> -->
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
                    <template v-if="column.key === 'tags'">
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
                        <div class="flex justify-between py-2 gap-2">
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
                                <a-form-item label="Mã phòng">
                                    <a-input disabled v-model:value="record.id" />
                                </a-form-item>
                                <a-form-item label="Khoa">
                                    <a-input disabled v-model:value="record.department" />
                                </a-form-item>
                                <a-form-item label="Loại phòng">
                                    <div class="">
                                        <div class="">
                                            <a-select disabled v-if="inputVisible" show-search ref="inputRef"
                                                v-model:value="inputValue" placeholder="Chọn câu hỏi"
                                                :style="{ width: '100%' }" :options="options"
                                                :filter-option="filterOption" @focus="handleFocus"
                                                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
                                                @change="handleChange">
                                            </a-select>
                                            <a-tag v-else
                                                style="background: #fff; border-style: dashed; 	width: 100%;; padding: 6px;"
                                                @click="showInput">
                                                <plus-outlined />
                                                Chọn loại phòng SNOMED
                                            </a-tag>
                                        </div>
                                        <div class="w-full">
                                            <div class="mt-2 gap-2">
                                                <template v-for="(tag) in tags" :key="tag">
                                                    <a-tooltip v-if="tag.length > 20" :title="tag">
                                                        <a-tag>
                                                            {{ `${tag.slice(0, 20)}...` }}
                                                        </a-tag>
                                                    </a-tooltip>
                                                    <a-tag v-else>
                                                        {{ tag }}
                                                    </a-tag>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
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
                    <a-form-item label="Mã phòng" name="id" v-bind="validateInfos.id">
                        <va-input v-model:value="form.id" placeholder="Hãy nhập mã phòng" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Tên phòng" name="name" v-bind="validateInfos.name">
                        <va-input v-model:value="form.name" placeholder="Hãy nhập tên phòng"></va-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Khoa" name="department" v-bind="validateInfos.department">
                        <a-select show-search v-model:value="form.department" placeholder="Hãy chọn khoa">
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
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Loại phòng" name="type" v-bind="validateInfos.type">
                        <!-- <a-select show-search v-model:value="form.type">
                            <a-select-option value="jack">Cận lâm sàng</a-select-option>
                            <a-select-option value="lucy">Phòng khám </a-select-option>
                            <a-select-option value="disabled">Lâm sàng</a-select-option>
                            <a-select-option value="1">Lấy mẫu bệnh phẩm</a-select-option>
                            <a-select-option value="2">Phòng giường</a-select-option>
                            <a-select-option value="3">Phòng giường tự chọn</a-select-option>
                            <a-select-option value="4">Khác</a-select-option>
                        </a-select> -->
                        <div class="">
                            <div class="">
                                <a-select v-if="inputVisible" show-search ref="inputRef"
                                    v-model:value="inputValue" placeholder="Chọn câu hỏi" :style="{ width: '100%' }"
                                    :options="options" :filter-option="filterOption" @focus="handleFocus"
                                    @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" @change="handleChange">
                                </a-select>
                                <a-tag v-else
                                    style="background: #fff; border-style: dashed; 	width: 100%;; padding: 6px;"
                                    @click="showInput">
                                    <plus-outlined />
                                    Chọn loại phòng SNOMED
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
                    <a-form-item label="Ghi chú" name="description">
                        <a-textarea v-model:value="form.description" :rows="4"
                            placeholder="Hãy nhập ghi chú" />
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
import { defineComponent, ref, toRefs, reactive, nextTick, createVNode, toRaw } from 'vue'
import columns from './columns'
import type { SelectProps } from 'ant-design-vue';
// import type { Rule } from 'ant-design-vue/es/form';
import { Modal, Form, message } from 'ant-design-vue';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';

const data = [
    {
        key: 1,
        id: 'P200',
        name: 'Phòng can thiệp tim mạch 130',
        department: 'Nội khoa',
        type: 'Cận lâm sàng',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'P210',
        name: 'Phòng khám Ngoại Tiêu hóa 114',
        department: 'Tiêu hoá',
        type: 'Phòng khám',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'P211',
        name: 'Phòng khám Tiêu hóa 205',
        department: 'Tiêu hoá',
        type: 'Phòng khám',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'P212',
        name: 'Phòng khám quốc tế 308.2A',
        department: 'Phụ sản',
        type: 'Phòng khám',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'P213',
        name: 'Phòng khám Ngoại Chấn thương chỉnh hình 117',
        department: 'Ngoại cơ xương khớp',
        type: 'Phòng khám ',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'P214',
        name: 'Phòng thủ thuật 405B (PTTM)',
        department: 'Ngoại khoa',
        type: 'Cận lâm sàng',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'P215',
        name: 'Phòng 406',
        department: 'Mô - Phôi ',
        type: 'Phòng giường',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'P216',
        name: 'Đo chức năng hô hấp C255',
        department: 'Thăm dò chức năng',
        type: 'Cận lâm sàng',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'P217',
        name: 'Khám Ngoại - thẩm mỹ 125',
        department: 'Phẫu thuật tạo hình – Thẩm mỹ',
        type: 'Phòng khám ',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'P218',
        name: 'Phòng điện cơ - điện thế gợi C253',
        department: 'Thăm dò chức năng',
        type: 'Cận lâm sàng',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 11,
        id: 'P219',
        name: 'Khám nội - nội tiết Đái tháo đường 114B',
        department: 'Nội khoa ',
        type: 'Phòng khám ',
        owner: 'Lương Quỳnh Thư',
        created: '13:00 30-08-2022',
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
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
        ExclamationCircleOutlined
    },
    setup() {
        const loading = ref<Boolean>(false)
        // const isDisable = ref<Boolean>(true)
        const visible = ref<boolean>(false)
        const inputRef = ref();
        const useForm = Form.useForm;
        const isAdd = ref<Boolean>(true)

        const handleAdd = () => {
            isAdd.value = true
        }

        const handleEdit = () => {
            isAdd.value = false
        }
        // const updateData = () => {
        //     isDisable.value = false
        // }

        const showDrawer = () => {
            visible.value = true;
        };

        const cancel = (e: MouseEvent) => {
            console.log(e);
            // message.error('Sửa không thành công!')
        };

        const handleBlur = () => {
            console.log('blur');
        };

        const updateHandle = (record) => {
            form.id = record.id
            form.name = record.name
            form.department = record.department
            form.type = record.type
            showDrawer()
        }

        const state = reactive({
            tags: ['Phòng giường tự chọn'],
            inputVisible: false,
            inputValue: '',
        });

        const options = ref<SelectProps['options']>([
            { value: 'Cận lâm sàng', label: 'Cận lâm sàng' },
            { value: 'Phòng khám', label: 'Phòng khám' },
            { value: 'Lâm sàng', label: 'Lâm sàng' },
            { value: 'Lấy mẫu bệnh phẩm', label: 'Lấy mẫu bệnh phẩm' },
            { value: 'Phòng giường', label: 'Phòng giường' },
            { value: 'Phòng giường tự chọn', label: 'Phòng giường tự chọn' },
            { value: 'Khác', label: 'Khác' },
            // { value: 'tom', label: 'Tom' },

        ]);

        const checked = ref<Boolean>(true)

        const filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const handleChange = (value: string) => {
            console.log(`selected ${value}`);
        };

        const handleFocus = () => {
            console.log('focus');
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

        const showInput = () => {
            state.inputVisible = true;
            nextTick(() => {
                inputRef.value.focus();
            });
        };

        const handleClose = (removedTag: string) => {
            const tags = state.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            state.tags = tags;
        };

        // const saveData = () => {
        //     isDisable.value = true
        // }

        const onClose = () => {
            visible.value = false;
        };

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            name: [{ required: true, message: 'Tên không được để trống' }],
            department: [{ required: true, message: 'Khoa không được để trống' }],
            type: [{ required: true, message: 'Loại phòng không được để trống' }],
            // type: [{ required: true, message: 'Please choose the type' }],
        });

        const form = reactive({
            id: '',
            name: '',
            department: undefined,
            type: undefined,
            description: ''
        });

        const { resetFields, validate, validateInfos } = useForm(form, rules, {
            onValidate: (...args) => console.log(...args),
        });

        const showConfirm = (record) => {
            Modal.confirm({
                title: 'Hộp thoại xác nhận',
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', { style: 'color:red;' }, 'Bạn có thực sự muốn sửa?'),
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

        return {
            ...toRefs(state),
            loading,
            onAddSubmit,
            onEditSubmit,
            data,
            columns,
            handleAdd,
            showDrawer,
            visible,
            handleEdit,
            cancel,
            updateHandle,
            labelCol: { style: { width: '150px' } },
            wrapperCol: { span: 24 },
            checked,
            options,
            filterOption,
            handleFocus,
            handleInputConfirm,
            handleChange,
            showInput,
            handleClose,
            onClose,
            rules,
            form,
            handleBlur,
            showConfirm,
            validateInfos,
            resetFields,
            isAdd
        }

    }
})
</script>

<style>

</style>