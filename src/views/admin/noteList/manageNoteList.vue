<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="bg-white shadow-md rounded-md">
        <!-- <div class="pt-5 rounded w-1/2 mx-auto">
            <h1 class="uppercase font-bold text-lg lg:text-[30px] my-auto text-blue-600 text-center">DANH MỤC PHIẾU
            </h1>
        </div> -->
        <div class="p-3">
            <!-- <div class=""></div> -->
            <div class="">
                <a-divider orientation="left">
                    <div class="font-bold text-lg">Tìm kiếm</div>
                </a-divider>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
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
                <div class="">
                    <p>Phòng</p>
                    <a-select show-search placeholder="Chọn phòng" style="width: 100%" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                </div>
                <div class="">
                    <p>Đối tượng sử dụng</p>
                    <a-select show-search placeholder="Chọn đối tượng sử dụng" style="width: 100%"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                        <a-select-option value="Cấp cứu">Bác sĩ </a-select-option>
                        <a-select-option value="Mắt ">Điều dưỡng </a-select-option>
                        <a-select-option value="Ngoại khoa ">Học viên </a-select-option>
                        <a-select-option value="Răng - Hàm - Mặt ">Kỹ thuật y</a-select-option>
                        <a-select-option value="Tai - Mũi - Họng  ">Y sỹ</a-select-option>
                        <a-select-option value="Tim mạch ">Hộ sinh </a-select-option>
                        <a-select-option value="Truyền nhiễm ">Dược sĩ</a-select-option>
                        <a-select-option value="Ung bướu">Dinh dưỡng </a-select-option>
                    </a-select>
                </div>
            </div>
        </div>
        <div class="flex justify-start px-3">
            <div class="flex gap-3">
                <a-button type="primary">
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    Tìm kiếm
                </a-button>
                <a-button type="primary" @click="showDrawer(), handleAdd(), resetFields()">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm mới
                </a-button>
                <!-- <a-button type="primary" @click="showDrawer">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm mới
                </a-button>
                <a-button type="primary" @click="noteView">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm mới tờ phiếu
                </a-button> -->
            </div>
        </div>
        <div class="">
            <va-table class="px-2" :columns-table="manageNoteListColumns" :data-source="data" :spinning="loading"
                :scroll="{ x: 'max-content' }">
                <template #bodyCell="{ column, record }">
                    <!-- <template v-if="column.key === 'action'">
                        
                        <span>
                            <a-button type="primary">Sửa</a-button>
                            <a-divider type="vertical" />
                            <a-button type="primary" danger>Xóa</a-button>
                        </span>
                    </template> -->
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
                        <div class="flex justify-between py-2">
                            <h1 class="font-bold text-base lg:text-xl text-[#1A90D2]">Thông tin chi tiết</h1>
                            <div class="lg:flex grid grid-cols-3 gap-2 max-w-[700px]">
                                <!-- <a-button type="primary">
                                    <template #icon>
                                        <FundViewOutlined />
                                    </template>
                                    Xem phiếu
                                </a-button> -->
                                <router-link to="/add-note-view">
                                    <a-button type="primary">
                                        <template #icon>
                                            <plus-square-outlined />
                                        </template>
                                        Tạo phiếu
                                    </a-button>
                                </router-link>
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
                                <a-form-item label="Tên phiếu">
                                    <a-input disabled v-model:value="record.name" />
                                </a-form-item>
                                <a-form-item label="Tên viết tắt">
                                    <a-input disabled v-model:value="record.shortName" />
                                </a-form-item>
                                <!-- <a-form-item label="Mô tả">
                                    <a-textarea disabled v-model:value="record.description" />
                                </a-form-item> -->
                                <a-form-item label="Khoa áp dụng ">
                                    <a-select disabled show-search placeholder="Chọn khoa" :options="options"
                                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                        @change="handleChange" v-model:value="record.department">
                                        <!-- {{record.department}} -->
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="Đối tượng sử dụng">
                                    <a-select disabled show-search placeholder="Chọn khoa" :options="options"
                                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                        @change="handleChange" v-model:value="record.permissionUser">
                                        <!-- {{record.department}} -->
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
                    <a-form-item label="Mã phiếu" name="id" v-bind="validateInfos.id">
                        <a-input v-model:value="form.id" placeholder="Please enter id" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Tên phiếu" name="name" v-bind="validateInfos.name">
                        <a-input v-model:value="form.name" placeholder="Please enter name" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Tên viết tắt" name="shortName" v-bind="validateInfos.shortName">
                        <a-input v-model:value="form.shortName" placeholder="Please enter short name" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Khoa áp dụng" name="owner" v-bind="validateInfos.department">
                        <a-select v-model:value="form.department" placeholder="Please a-s an owner">
                            <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                            <a-select-option value="mao">Maomao Zhou</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Đối tượng sử dụng" name="type" v-bind="validateInfos.permissionUser">
                        <a-select v-model:value="form.permissionUser" placeholder="Please choose the type">
                            <a-select-option value="private">Private</a-select-option>
                            <a-select-option value="public">Public</a-select-option>
                        </a-select>
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
    <a-modal v-model:visible="modalVisible" width="1400px" title="Basic Modal" @ok="handleOk">
        <div class=" bg-gray-100 mx-auto" style="border: 1px solid; border-color: black;">
            <div class="p-4">
                <div class="flex justify-between">
                    <div class="grid gap-2">
                        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :show-upload-list="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
                            @change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">Logo</div>
                            </div>
                        </a-upload>
                        <va-input v-model:value="nameBV"></va-input>
                        <div class="flex gap-3">
                            <p class="font-semibold text-base my-auto" style="width: 80px;">Khoa: </p>
                            <va-input value="{khoa_id}"></va-input>
                        </div>
                        <div class="flex gap-3">
                            <p class="font-semibold text-base my-auto" style="width: 80px;">Phòng: </p>
                            <va-input value="{phong_id}"></va-input>
                        </div>
                    </div>
                    <div class="mr-24">
                        <p class="font-semibbold text-base">Mã người bệnh: {MA_BA}</p>
                        <p class="font-semibbold text-base">Mã bệnh án: {MA_BN}</p>
                        <p class="font-semibbold text-base">Mã YT: {MA_YT}</p>
                    </div>
                </div>
                <div class="mt-2">
                    <a-button type="primary">
                        <template #icon>
                            <plus-square-outlined />
                        </template>
                        Thêm trường
                    </a-button>
                    <div class="flex mt-2 gap-3">
                        <a-input placeholder="Tiêu đề" allow-clear style="width: 200px" />
                        <a-select show-search placeholder="Giá trị" style="width: 200px" :options="options"
                            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                            @change="handleChange">
                        </a-select>
                        <a-select show-search placeholder="Vị trí" style="width: 200px" :options="options"
                            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                            @change="handleChange">
                        </a-select>
                        <a-button type="primary">
                            <template #icon>
                                <plus-square-outlined />
                            </template>
                            Thêm
                        </a-button>
                    </div>
                    <h1 class="font-bold text-3xl my-5 text-center">Phiếu khám vào viện</h1>
                    <div class="bg-white h-2 w-full"></div>
                    <div class="mt-3">
                        <a-form layout="vertical">
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <a-form-item label="Họ tên">
                                        <va-input placeholder="Hãy nhập tên" value="{HO_TEN}" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="Giới tính">
                                        <va-select label-in-value :options="optionsSex" @change="handleChange"
                                            value="{GIOI_TINH}">
                                        </va-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="Năm sinh">
                                        <va-date-picker style="width: 100%;" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <a-form-item label="Địa chỉ">
                                        <va-input placeholder="Hãy nhập địa chỉ" value="{DIA_CHI}" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="BHYT">
                                        <va-input placeholder="Bảo hiểm y tế" value="{BHYT}" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="Từ ngày - Đến ngày">
                                        <a-range-picker style="width: 100%;" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-item label="Chẩn đoán bệnh chính">
                                        <a-input placeholder="Chẩn đoán bệnh" value="{CHAN_DOAN_BENH_CHINH}" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="Bác sĩ điều trị">
                                        <a-input placeholder="Bác sĩ điều trị" value="{BAC_SI_DIEU_TRI}" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-button type="primary">
                                <template #icon>
                                    <plus-square-outlined />
                                </template>
                                Thêm trường
                            </a-button>
                            <div class="flex mt-4 gap-3">
                                <a-input placeholder="Tiêu đề" allow-clear style="width: 200px" />
                                <a-select show-search placeholder="Giá trị" style="width: 200px" :options="options"
                                    :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                    @change="handleChange">
                                </a-select>
                                <a-select show-search placeholder="Vị trí" style="width: 200px" :options="options"
                                    :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                    @change="handleChange">
                                </a-select>
                                <a-button type="primary">
                                    <template #icon>
                                        <plus-square-outlined />
                                    </template>
                                    Thêm
                                </a-button>
                            </div>
                        </a-form>
                    </div>
                    <div class="bg-white h-2 w-full my-5"></div>
                    <h1 class="font-bold text-xl">Tạo bố cục khám , hỏi bệnh, chăm sóc....</h1>
                    <div class="mt-4">
                        <div class="flex justify-between gap-4">
                            <div class="w-1/2">
                                <a-form layout="vertical">
                                    <a-row :gutter="16">
                                        <a-col :span="12">
                                            <a-form-item label="Tên thành phần">
                                                <a-input placeholder="Hãy nhập thành phần" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-item label="Thành phần cha">
                                                <a-select label-in-value :options="parentElement"
                                                    @change="handleChange">
                                                </a-select>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <p class="text-gray-500">( Ví dụ: 1.Tiền sử hút thuốc )</p>
                                    <div class="mt-2">
                                        <h1 class="font-bold text-lg">Dữ liệu</h1>
                                        <a-row :gutter="16">
                                            <a-col :span="12">
                                                <a-form-item label="Lấy từ danh mục bộ câu hỏi">
                                                    <a-select label-in-value :options="parentElement"
                                                        @change="handleChange">
                                                    </a-select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="12">
                                                <a-form-item label="Lấy  từ  liên thông HIS">
                                                    <a-select label-in-value :options="parentElement"
                                                        @change="handleChange">
                                                    </a-select>
                                                </a-form-item>
                                            </a-col>
                                        </a-row>
                                        <div class="flex gap-3">
                                            <a-button type="primary">
                                                <template #icon>
                                                    <SaveOutlined />
                                                </template>
                                                Lưu
                                            </a-button>
                                            <a-button type="primary">
                                                <template #icon>
                                                    <SaveOutlined />
                                                </template>
                                                Thêm trường
                                            </a-button>
                                        </div>
                                    </div>
                                </a-form>
                            </div>
                            <div class="w-1/2 text-center">
                                Xem trước
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex justify-end">
                                <div class="mr-10 text-center grid gap-2">
                                    <va-input value="{NGAY_KY}"></va-input>
                                    <p class="font-bold text-lg">Bác sĩ khám bệnh</p>
                                    <va-input value="{CHU_KY_BSDT}"></va-input>
                                    <va-input value="{HO TEN BAC SI  }"></va-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script lang="ts">
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref, reactive, createVNode, toRaw } from 'vue';
import { SearchOutlined, PlusSquareOutlined, SaveOutlined, ToolOutlined, DeleteOutlined, HistoryOutlined, CloseOutlined, FundViewOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
// import type { Rule } from 'ant-design-vue/es/form';
import manageNoteListColumns from './manageNoteListColumns'
import { Modal, Form, message } from 'ant-design-vue';
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
type RangeValue = [Dayjs, Dayjs];

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const data = [
    {
        key: 1,
        id: 'B001',
        type: 1,
        name: 'Bảng kiểm chuẩn bị NB can thiệp CDHA',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['Non active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        id: 'B002',
        type: 2,
        name: 'Bảng kê tổng hợp viện phí',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 'B003',
        type: 3,
        name: 'Bảng kiểm trước tiêm chủng đối với trẻ sơ sinh tại các cơ sở tiêm chủng ngoài bệnh viện',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['Non active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 4,
        id: 'B004',
        type: 3,
        name: 'Bảng theo dõi bệnh nhân ECMO',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 5,
        id: 'B005',
        type: 3,
        name: 'Bảng theo dõi Bệnh nhân HSTC của Điều dưỡng',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 6,
        id: 'B006',
        type: 3,
        name: 'Bảng theo dõi đường huyết theo giờ của người bệnh',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 7,
        id: 'B007',
        type: 3,
        name: 'Bảng theo dõi gây mê hồi sức',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 8,
        id: 'B008',
        type: 3,
        name: 'Phiếu phẫu thuật Mộng',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['Non active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 9,
        id: 'B009',
        type: 3,
        name: 'Phiếu phẫu thuật Mổ quặm',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 10,
        id: 'B010',
        type: 3,
        name: 'Phiếu phẫu thuật thể thủy tinh',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 11,
        id: 'B010',
        type: 3,
        name: 'Bản cam đoan chấp nhận thực hiện phẫu thuật - can thiệp tim mạch',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 12,
        id: 'B010',
        type: 3,
        name: 'Tóm tắt hồ sơ bệnh án',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 13,
        id: 'B010',
        type: 3,
        name: 'Phiếu Phẫu thuật Glocom',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
        shortName: 'TC',
        tags: ['active'],
        permissionUser: 'Điều dưỡng',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 14,
        id: 'B010',
        type: 3,
        name: 'Phiếu phẫu thuật Lác',
        owner: 'Lương Quỳnh Thư',
        created: '12:00 07-08-2022',
        department: 'Khoa nội tổng hợp',
        room: "P101",
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
        CloseOutlined,
        FundViewOutlined,
        ExclamationCircleOutlined
    },
    props: {
        keepAlive: {
            type: Boolean,
            default: false
        }
    }
    ,
    setup(props) {
        const checked = ref<Boolean>(true)
        const isAdd = ref<Boolean>(true)
        const loading = ref<Boolean>(false)
        const nameBV = ref('{BỆNH VIỆN }')
        const router = useRouter()
        const useForm = Form.useForm;

        const noteView = () => {
            router.push({ path: '/add-note-view' })
        }

        const handleAdd = () => {
            isAdd.value = true
        }
        const handleEdit = () => {
            isAdd.value = false
        }

        // const updateData = () => {
        //     isDisabled.value = false
        // }

        // const saveData = () => {
        //     isDisabled.value = true
        // }

        const radioValue = ref<number>(1);

        const yesNo = ref<number>(1);

        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        });

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

        const form = reactive({
            id: '',
            name: '',
            shortName: '',
            department: undefined,
            permissionUser: undefined,
            description: '',
        });

        const formUpdate = reactive({
            name: '',
            shortName: '',
            department: '',
            permissionUser: '',
            description: '',
        });

        const rules = reactive({
            id: [{ required: true, message: 'Mã không được để trống' }],
            name: [{ required: true, message: 'Tên không được để trống' }],
            shortName: [{ required: true, message: 'Tên viết tắt không được để trống' }],
            department: [{ required: true, message: 'Phòng ban không được để trống' }],
            permissionUser: [{ required: true, message: 'Đối tượng sử dụng không được để trống' }],
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

        const handleOk = (e: MouseEvent) => {
            console.log(e);
            modalVisible.value = false;
        };

        const modalVisible = ref<boolean>(false);

        const showModal = () => {
            modalVisible.value = true;
        };

        const optionsSex = ref<SelectProps['options']>([
            {
                value: '1',
                label: 'Nam',
            },
            {
                value: '2',
                label: 'Nữ',
            },
        ]);

        const parentElement = ref<SelectProps['options']>([
            {
                value: '1',
                label: 'I. Tiền sử',
            },
            {
                value: '2',
                label: 'II. Etc...',
            },
        ]);

        const cancel = (e: MouseEvent) => {
            console.log(e);
            // message.error('Sửa không thành công!')
        };

        const updateHandle = (record) => {
            form.id = record.id
            form.name = record.name
            form.shortName = record.shortName
            form.department = record.department
            form.permissionUser = record.permissionUser
            form.description = record.description
            showDrawer()
        }

        const fileList = ref([]);
        // const loading = ref<boolean>(false);
        const imageUrl = ref<string>('');

        const handleChangeImg = (info: UploadChangeParam) => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (base64Url: string) => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                });
            }
            if (info.file.status === 'error') {
                loading.value = false;
                message.error('upload error');
            }
        };

        const beforeUpload = (file: UploadProps['fileList'][number]) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        };

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
            activeKey: ref('1'),
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
            options,
            data,
            manageNoteListColumns,
            checked,
            radioStyle,
            radioValue,
            yesNo,
            // isDisabled,
            // updateData,
            // saveData,
            form,
            rules,
            visible,
            showDrawer,
            onClose,
            handleOk,
            modalVisible,
            showModal,
            optionsSex,
            parentElement,
            formUpdate,
            cancel,
            updateHandle,
            nameBV,
            fileList,
            loading,
            imageUrl,
            handleChangeImg,
            beforeUpload,
            noteView,
            showConfirm,
            validateInfos,
            resetFields,
            onAddSubmit,
            onEditSubmit,
            isAdd,
            handleAdd,
            handleEdit
        };
    },
})
</script>

<style>

</style>