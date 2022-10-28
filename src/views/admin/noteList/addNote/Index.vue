<template>
    <va-breadcrumb></va-breadcrumb>
    <div class=" bg-white mx-auto" style="border: 1px solid; border-color: black;">
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
                    <div class="flex gap-3">
                        <va-input value="{BENH_VIEN}"></va-input>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                    <div class="flex gap-3">
                        <p class="font-semibold text-base my-auto" style="width: 80px;">Khoa: </p>
                        <va-input value="{khoa_id}"></va-input>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                    <div class="flex gap-3">
                        <p class="font-semibold text-base my-auto" style="width: 80px;">Phòng: </p>
                        <va-input value="{phong_id}"></va-input>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                    <div>
                        <a-button type="primary" @click="visible = true">Thêm trường</a-button>
                        <a-modal v-model:visible="visible" title="Create a new collection" ok-text="Create"
                            cancel-text="Cancel" @ok="onOk">
                            <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                                <a-form-item name="title" label="Tiêu đề"
                                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                                    <a-input v-model:value="formState.title" />
                                </a-form-item>
                                <a-form-item name="description" label="Loại dữ liệu">
                                    <!-- <a-textarea v-model:value="formState.description" /> -->
                                    <va-select></va-select>
                                </a-form-item>
                                <a-form-item name="modifier" class="collection-create-form_last-form-item">
                                    <a-radio-group v-model:value="formState.modifier">
                                        <a-radio value="public">Public</a-radio>
                                        <a-radio value="private">Private</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                            </a-form>
                        </a-modal>
                    </div>
                </div>
                <div class="">
                    <div class="flex gap-3">
                        <div class="flex gap-2">
                            <p class="font-semibbold text-base my-auto w-[200px]">Mã người bệnh:</p>
                            <va-input value="{MA_BA}"></va-input>
                        </div>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                    <div class="flex gap-3 mt-2">
                        <div class="flex gap-2">
                            <p class="font-semibbold text-base my-auto w-[200px]">Mã bệnh án:</p>
                            <va-input value="{MA_BN}"></va-input>
                        </div>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                    <div class="flex gap-3 mt-2">
                        <div class="flex gap-2">
                            <p class="font-semibbold text-base my-auto w-[200px]">Mã YT:</p>
                            <va-input value="{MA_YT}"></va-input>
                        </div>
                        <MinusCircleOutlined class="my-auto" />
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <!-- <a-button type="primary">
                    <template #icon>
                        <plus-square-outlined />
                    </template>
                    Thêm trường
                </a-button> -->
                <div class="flex mt-2 gap-3">
                    <a-input placeholder="Tiêu đề" allow-clear style="width: 200px" />
                    <a-select show-search placeholder="Giá trị" style="width: 200px" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                    </a-select>
                    <a-select show-search placeholder="Vị trí" style="width: 200px" :options="options"
                        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
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
                                    <div class="flex gap-2">
                                        <va-input placeholder="Hãy nhập tên" value="{HO_TEN}" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Giới tính">
                                    <div class="flex gap-2">
                                        <va-select label-in-value :options="optionsSex" @change="handleChange"
                                            value="{GIOI_TINH}">
                                        </va-select>
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Năm sinh">
                                    <div class="flex gap-2">
                                        <va-date-picker style="width: 100%;" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <a-form-item label="Địa chỉ">
                                    <div class="flex gap-2">
                                        <va-input placeholder="Hãy nhập địa chỉ" value="{DIA_CHI}" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="BHYT">
                                    <div class="flex gap-2">
                                        <va-input placeholder="Bảo hiểm y tế" value="{BHYT}" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Từ ngày - Đến ngày">
                                    <div class="flex gap-2">
                                        <a-range-picker style="width: 100%;" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Chẩn đoán bệnh chính">
                                    <div class="flex gap-2">
                                        <a-input placeholder="Chẩn đoán bệnh" value="{CHAN_DOAN_BENH_CHINH}" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Bác sĩ điều trị">
                                    <div class="flex gap-2">
                                        <a-input placeholder="Bác sĩ điều trị" value="{BAC_SI_DIEU_TRI}" />
                                        <MinusCircleOutlined class="my-auto" />
                                    </div>
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
                                            <a-select label-in-value :options="parentElement" @change="handleChange">
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
</template>

<script lang="ts">
import { PlusOutlined, LoadingOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref, reactive, toRaw } from 'vue';
import type { UploadChangeParam, UploadProps, SelectProps, FormInstance } from 'ant-design-vue';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

interface Values {
    title: string;
    description: string;
    modifier: string;
}

export default defineComponent({
    components: {
        LoadingOutlined,
        PlusOutlined,
        MinusCircleOutlined
    }, setup() {
        const fileList = ref([]);
        const loading = ref<boolean>(false);
        const imageUrl = ref<string>('');

        const handleChange = (info: UploadChangeParam) => {
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

        const filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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

        const handleFocus = () => {
            console.log('focus');
        };

        const options = ref<SelectProps['options']>([
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'tom', label: 'Tom' },
        ]);

        const handleBlur = () => {
            console.log('blur');
        };

        const formRef = ref<FormInstance>();
        const visible = ref(false);
        const formState = reactive<Values>({
            title: '',
            description: '',
            modifier: 'public',
        });

        const onOk = () => {
            formRef.value
                .validateFields()
                .then(values => {
                    console.log('Received values of form: ', values);
                    console.log('formState: ', toRaw(formState));
                    visible.value = false;
                    formRef.value.resetFields();
                    console.log('reset formState: ', toRaw(formState));
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        };

        return {
            fileList,
            handleBlur,
            handleFocus,
            filterOption,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            options,
            optionsSex,
            parentElement,
            formState,
            formRef,
            visible,
            onOk
        };
    },

})
</script>

<style scoped lang="less">
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}

.dynamic-delete-button:hover {
    color: #777;
}

.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>