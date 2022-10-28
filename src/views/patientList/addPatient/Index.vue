<template>
    <va-breadcrumb></va-breadcrumb>
    <div class="w-full bg-white p-3 rounded-md shadow-md">
        <a-divider orientation="left">Thông tin bệnh nhân</a-divider>
        <!-- Profile Card -->
        <div class=" rounded h-full w-full flex gap-2">
            
            <div class="flex gap-2 w-1/3 my-auto">
                <div class="w-full">
                    <div class="flex gap-2">
                        <div class="my-auto w-[150px]">
                            Tên bệnh nhân:
                        </div>
                        <va-input class="w-1/2" placehodel="Hãy nhập tên bệnh nhân"></va-input>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <div class="my-auto w-[150px]">
                            Mã số ảo hiểm y tế:
                        </div>
                        <va-input class="w-1/2"></va-input>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <div class="my-auto w-[150px]">
                            CCCD:
                        </div>
                        <va-input class="w-1/2"></va-input>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <div class="my-auto w-[150px]">
                            Mã số sức khỏe:
                        </div>
                        <va-input class="w-1/2"></va-input>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <div class="my-auto w-[150px]">
                            Ảnh:
                        </div>
                        <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            list-type="picture" class="upload-list-inline">
                            <a-button style="width: 100%;">
                                <upload-outlined></upload-outlined>
                                Upload
                            </a-button>
                        </a-upload>
                    </div>
                    <!-- <h1 class="flex gap-1">Sổ bệnh án <p class="text-[red]">028863/22/NOI</p>
                                    </h1> -->
                </div>
            </div>
            <a-descriptions style="width: 100%;" class="break-normal" bordered size="small"
                :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
                <a-descriptions-item class="break-normal" label="Tỉnh, Thành phố" :labelStyle="labelStyle">
                    <va-select placeholder="Tỉnh, Thành phố"></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Quận, Huyện, TX" :labelStyle="labelStyle">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Phường, xã" :labelStyle="labelStyle">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Dân tộc" :labelStyle="labelStyle">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Giới tính" :labelStyle="labelStyle">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Ngày sinh" :labelStyle="labelStyle">
                    <va-date-picker style="width: 100%;"></va-date-picker>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" label="Thôn, phố " :labelStyle="labelStyle">
                    <va-select></va-select>
                </a-descriptions-item>

                <!-- <a-descriptions-item label="Bảo hiểm y tế" :labelStyle="labelStyle">
                    <va-input></va-input>
                </a-descriptions-item> -->
            </a-descriptions>
        </div>
        <!-- End of profile card -->
        <div class="flex justify-end mt-3">
            <a-button type="primary" @click="">
                <template #icon>
                    <SaveOutlined />
                </template>
                Lưu thông tin
            </a-button>
        </div>
    </div>
    <div class="bg-white mt-4 p-3 rounded-md shadow-md">
        <a-divider orientation="left">Thông tin vào viện</a-divider>

        <div class="">
            <a-descriptions class="break-normal" bordered size="small"
                :column="{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }">
                <a-descriptions-item class="break-normal" label="Lý do vào viện" :labelStyle="labelStyle">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nơi chuyển đến">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nhập viện lúc">
                    <va-date-picker show-time style="width: 100%;"></va-date-picker>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Ngày nhập khoa">
                    <va-date-picker style="width: 100%;"></va-date-picker>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Trực tiếp vào">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Khoa">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Phân loại điều trị">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Vào viện lần này thứ">
                    <va-input type="number"></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nơi giới thiệu">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Phòng">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Giường">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Bác sĩ">
                    <va-select></va-select>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nơi chuyển đến">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="KKB, Cấp cứu">
                    <va-input></va-input>
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Ban đầu">
                    <va-input></va-input>
                </a-descriptions-item>
                <!-- <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Chẩn đoán hiện tại">
                    <va-input></va-input>
                </a-descriptions-item> -->

            </a-descriptions>
        </div>
        <div class="flex justify-end mt-3">
            <a-button type="primary" @click="">
                <template #icon>
                    <SaveOutlined />
                </template>
                Lưu thông tin
            </a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

// function getBase64(img: Blob, callback: (base64Url: string) => void) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
// }
export default defineComponent({
    components: {
        LoadingOutlined,
        PlusOutlined,
        UploadOutlined
    },
    setup() {
        const fileList = ref<UploadProps['fileList']>([]);
        // const fileList = ref([]);
        const loading = ref<boolean>(false);
        // const imageUrl = ref<string>('');
        const labelStyle = {
            fontWeight: '700'
        }

        // const handleChange = (info: UploadChangeParam) => {
        //     if (info.file.status === 'uploading') {
        //         loading.value = true;
        //         return;
        //     }
        //     if (info.file.status === 'done') {
        //         // Get this url from response in real world.
        //         getBase64(info.file.originFileObj, (base64Url: string) => {
        //             imageUrl.value = base64Url;
        //             loading.value = false;
        //         });
        //     }
        //     if (info.file.status === 'error') {
        //         loading.value = false;
        //         message.error('upload error');
        //     }
        // };

        // const beforeUpload = (file: UploadProps['fileList'][number]) => {
        //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        //     if (!isJpgOrPng) {
        //         message.error('You can only upload JPG file!');
        //     }
        //     const isLt2M = file.size / 1024 / 1024 < 2;
        //     if (!isLt2M) {
        //         message.error('Image must smaller than 2MB!');
        //     }
        //     return isJpgOrPng && isLt2M;
        // };

        return {
            fileList,
            loading,
            // imageUrl,
            // handleChange,
            // beforeUpload,
            labelStyle
        };
    },
})

</script>

<style scoped>
/* tile uploaded pictures */
.upload-list-inline :deep(.ant-upload-list-item) {
    float: left;
    width: 200px;
    margin-right: 8px;
}

.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
    float: right;
}
</style>