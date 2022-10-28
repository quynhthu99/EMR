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
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="">
                    <p>Người tạo</p>
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Thời gian tạo </p>
                    <a-range-picker v-model:value="dataPicker" style="width: 100%" />
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
                <!-- <div class="">
                    <p>Phòng</p>
                    <a-select show-search placeholder="Chọn phòng" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Loại giường</p>
                    <a-select show-search placeholder="Chọn loại giường" style="width: 100%" :options="options"
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
                                <a-form-item label="Mã khoa">
                                    <a-input disabled v-model:value="record.id" />
                                </a-form-item>
                                <a-form-item label="Khoa">
                                    <a-input disabled v-model:value="record.department" />
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
                    <a-form-item label="Mã khoa" name="id" v-bind="validateInfos.id">
                        <a-input v-model:value="form.id" placeholder="Please enter department" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Tên khoa" name="name" v-bind="validateInfos.name">
                        <a-input v-model:value="form.name" placeholder="Please enter department" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
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
                    <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
                    <a-button type="primary" @click="onAddSubmit">Thêm</a-button>
                </div>
                <div v-else class="flex gap-2">
                    <a-button @click="onClose">Hủy</a-button>
                    <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
                    <a-button type="primary" @click="onEditSubmit">Sửa</a-button>
                </div>
            </a-space>
        </template>
    </a-drawer>
</template>

<script lang="ts">
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref, reactive, nextTick, toRefs, createVNode, toRaw } from 'vue';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
// import type { Rule } from 'ant-design-vue/es/form';
import columns from './columns'
import { Modal, Form, message } from 'ant-design-vue';
type RangeValue = [Dayjs, Dayjs];

const data = [
    {
        key: 1,
        id: 'KH001',
        department: 'Khoa khám bệnh',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'KH002',
        department: 'Khoa nội',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'KH003',
        department: 'Khoa ngoại',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'KH004',
        department: 'Khoa phụ sản',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'KH005',
        department: 'Khoa nhi',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'KH006',
        department: 'Khoa truyền nhiễm',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'KH007',
        department: 'Khoa cấp cứu',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'KH008',
        department: 'Khoa hồi sức tích cực và chống độc',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'KH009',
        department: 'Khoa y học cổ truyền',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'KH009',
        department: 'Khoa ung bướu ',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 11,
        id: 'KH009',
        department: 'Khoa gây mê',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 12,
        id: 'KH009',
        department: 'Khoa xét nghiệm ',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 13,
        id: 'KH009',
        department: 'Khoa giải phẫu',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 14,
        id: 'KH009',
        department: 'Khoa dược',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 15,
        id: 'KH009',
        department: 'Khoa Răng - Hàm - Mặt',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 16,
        id: 'KH009',
        department: 'Khoa Tai - Mũi - Họng ',
        room: "P214",
        type: 'Giường kế hoạch',
        created: '12:00 07-08-2022',
        owner: 'Lương Quỳnh Thư',
        tags: ['Non active'],
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
        const checked = ref<Boolean>(true)

        const isAdd = ref<Boolean>(true)

        const loading = ref<Boolean>(false)

        const radioValue = ref<number>(1);

        const yesNo = ref<number>(1);

        const useForm = Form.useForm;

        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        });

        const handleAdd = () => {
            isAdd.value = true
        }

        const handleEdit = () => {
            isAdd.value = false
        }

        // const updateData = () => {
        //     isDisable.value = false
        // }

        // const saveData = () => {
        //     isDisable.value = true
        // }

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
            name: '',
            room: '',
            type: '',
        });

        const formUpdate = reactive({
            id: '',
            department: '',
            room: '',
            type: '',
        });

        const updateHandle = (record) => {
            form.id = record.id
            form.name = record.department
            form.room = record.room
            form.type = record.type
            showDrawer()
        }

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

        const showConfirm = (record) => {
            Modal.confirm({
                title: 'Hộp thoại xác nhận',
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', { style: 'color:red;' }, 'Bạn có chắc muốn xóa'),
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
            handleAdd,
            isAdd,
            handleEdit,
            formUpdate,
            updateHandle,
            cancel,
            loading,
            showConfirm,
            validateInfos,
            resetFields,
            onAddSubmit,
            onEditSubmit
        };
    },
})
</script>

<style>

</style>