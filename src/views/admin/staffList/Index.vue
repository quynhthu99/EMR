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
                    <p>Phòng ban</p>
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%" :filter-option="filterOption"
                        @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Khoa</p>
                    <a-select show-search placeholder="Chọn người tạo" style="width: 100%" :filter-option="filterOption"
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
                    <p>Tên nhân viên</p>
                    <!-- <a-select show-search placeholder="Chọn câu hỏi" style="width: 100%"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select> -->
                    <va-input placeholder="Tên nhân viên"></va-input>
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
                <a-button type="primary" @click="showDrawer(), handleAdd(), resetFields()">
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
                        <div class="flex gap-2">
                            <a>Xóa</a>
                            <a>Reset mật khẩu</a>
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
                                <a-form-item label="Mã nhân viên">
                                    <a-input disabled v-model:value="record.id" />
                                </a-form-item>
                                <a-form-item label="Tên nhân viên">
                                    <a-input disabled v-model:value="record.name" />
                                </a-form-item>
                                <a-form-item label="Chuyên môn">
                                    <a-input disabled v-model:value="record.speciality"></a-input>
                                </a-form-item>
                                <a-form-item label="Chức vụ">
                                    <a-input disabled v-model:value="record.position"></a-input>
                                </a-form-item>
                                <a-form-item label="Ngày sinh">
                                    <a-input disabled v-model:value="record.birth" style="width: 100%;"></a-input>
                                </a-form-item>
                                <a-form-item label="Giới tính">
                                    <a-input disabled v-model:value="record.gender"></a-input>
                                </a-form-item>
                                <a-form-item label="CCCD">
                                    <a-input disabled v-model:value="record.personId" />
                                </a-form-item>
                                <a-form-item label="Khoa">
                                    <a-input disabled v-model:value="record.department"></a-input>
                                </a-form-item>
                                <a-form-item label="Tên đăng nhập">
                                    <a-input disabled v-model:value="record.userName"></a-input>
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
                <a-col :span="12">
                    <a-form-item label="Chuyên môn" v-bind="validateInfos.speciality">
                        <a-select show-search v-model:value="form.speciality" placeholder="Hãy chọn chuyên môn">
                            <a-select-option value="Cấp cứu">Bác sĩ </a-select-option>
                            <a-select-option value="Mắt ">Điều dưỡng </a-select-option>
                            <a-select-option value="Ngoại khoa ">Học viên </a-select-option>
                            <a-select-option value="Răng - Hàm - Mặt ">Kỹ thuật y</a-select-option>
                            <a-select-option value="Tai - Mũi - Họng  ">Y sỹ</a-select-option>
                            <a-select-option value="Tim mạch ">Hộ sinh </a-select-option>
                            <a-select-option value="Truyền nhiễm ">Dược sĩ</a-select-option>
                            <a-select-option value="Ung bướu">Dinh dưỡng </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Chức vụ" v-bind="validateInfos.position">
                        <a-select show-search v-model:value="form.position" placeholder="Hãy chọn vị trí"></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Ngày sinh" v-bind="validateInfos.birth">
                        <va-date-picker style="width: 100%;" v-model:value="form.birth" placeholder="Hãy nhập ngày sinh"></va-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Giới tính" v-bind="validateInfos.gender">
                        <a-select v-model:value="form.gender" placeholder="Hãy chọn giới tính">
                            <a-select-option value="Truyền nhiễm ">Nam</a-select-option>
                            <a-select-option value="Ung bướu">Nữ</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="CCCD" v-bind="validateInfos.personId">
                        <a-input v-model:value="form.personId" placeholder="Hãy nhập số CCCD"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Khoa" v-bind="validateInfos.department">
                        <a-select v-model:value="form.department" placeholder="Hãy chọn khoa">
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
import { Modal, Form, message } from 'ant-design-vue';
type RangeValue = [Dayjs, Dayjs];

const data = [
    {
        key: 1,
        id: 'NV001',
        name: 'Nguyễn Bá Vinh',
        speciality: 'Bác sĩ',
        position: 'Quản lý',
        birth: '28-03-1990',
        gender: 'Nam',
        personId: '223021445596',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa truyền nhiễm',
        userName:'VinhNB@123',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'NV002',
        name: 'Đinh Thị Hương',
        speciality: 'Bác sĩ',
        position: 'Quản lý',
        birth: '22-03-1980',
        gender: 'Nữ',
        personId: '123021445587',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nhi',
        userName:'HuongDT@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'NV003',
        name: 'Vũ Mai Chi',
        speciality: 'Điều dưỡng',
        position: 'Nhân viên',
        birth: '09-05-1986',
        gender: 'Nữ',
        personId: '223021444798',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa ngoại',
        userName:'ChiVM@123',
        tags: ['Non active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'NV004',
        name: 'Nguyễn Thanh Tùng',
        speciality: 'Bác sĩ',
        position: 'Quản lý',
        birth: '08-11-1976',
        gender: 'Nam',
        personId: '654021445542',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa sản',
        userName:'TungNTB@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'NV005',
        name: 'Phạm Thế Minh',
        speciality: 'Điều dưỡng',
        position: 'Nhân viên',
        birth: '31-12-1990',
        gender: 'Nam',
        personId: '564021445410',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa y học cổ truyền',
        userName:'MinhPT@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'NV006',
        name: 'Lương Thế Vinh',
        speciality: 'Y tá',
        position: 'Nhân viên',
        birth: '12-03-1989',
        gender: 'Nam',
        personId: '230021445451',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nhi',
        userName:'VinhLT@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'NV007',
        name: 'Phan Công Khoa',
        speciality: 'Bác sĩ',
        position: 'Quản lý',
        birth: '28-03-1990',
        gender: 'Nam',
        personId: '548021445418',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa giải phẫu',
        userName:'KhoaPC@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'NV008',
        name: 'Vũ Thanh Tuyền',
        speciality: 'Y tá',
        position: 'Quản lý',
        birth: '04-10-1992',
        gender: 'Nữ',
        personId: '523021445214',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa dược',
        userName:'TuyenVT@123',
        tags: ['active'],
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'NV009',
        name: 'Đậu Minh Hằng',
        speciality: 'Y tá',
        position: 'Nhân viên',
        birth: '05-03-1988',
        gender: 'Nữ',
        personId: '963021445547',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nhi',
        userName:'HangDM@123',
        tags: ['active'],
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
            department: undefined,
            speciality: undefined,
            position: undefined,
            birth: '',
            gender: undefined,
            personId: ''
        });

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            name: [{ required: true, message: 'Tên không được để trống' }],
            department: [{ required: true, message: 'Khoa không được để trống' }],
            speciality: [{ required: true, message: 'Chuyên môn không được để trống' }],
            position: [{ required: true, message: 'Chức vụ không được để trống' }],
            birth: [{ required: true, message: 'Ngày sinh không được để trống' }],
            gender: [{ required: true, message: 'Giới tính không được để trống' }],
            personId: [{ required: true, message: 'CCCD không được để trống' }],
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
            form.department = record.department
            form.speciality = record.speciality
            form.position = record.position
            // form.birth = record.birth
            form.gender = record.gender
            form.personId = record.personId
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
            handleAdd,
            handleEdit,
            isAdd,
            cancel,
            updateHandle,
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