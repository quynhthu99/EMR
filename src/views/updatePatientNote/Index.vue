<template>
    <section>
        <va-breadcrumb></va-breadcrumb>
        <div class="">
            <a-collapse class="shadow-md" v-model:activeKey="activeKeyCollapse" expand-icon-position="right">
                <a-collapse-panel key="1" header="Thông tin bệnh nhân">
                    <div class="w-full h-full">
                        <!-- Profile Card -->
                        <div class="bg-white rounded h-full w-full">
                            <div class="flex gap-4">
                                <div class="overflow-hidden">
                                    <img class="object-fill rounded-md" src="@/assets/images/AvatarDashboard.png"
                                        alt="">
                                </div>
                                <div class="grid gap-2">
                                    <div class="flex">
                                        <p class="font-extrabold my-auto text-lg">Vũ Thị Lan Anh</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Nữ</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">01/01/1988</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">24 tuổi</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Kinh</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">SN 61, Đường 221B - Nam Hưng - Tiền Hải - Thái Bình</p>
                                    </div>
                                    <div class=" flex">
                                        <div class="gap-1 flex ">
                                            <p class="my-auto">Sổ bệnh án:</p>
                                            <p class="text-[red] my-auto">028863/22/NOI</p>
                                        </div>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">CCCD: 0132456789</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto">Mã số sức khỏe: 0132456789</p>
                                        <a-divider :style="dividerStyle" class="my-auto" type="vertical" />
                                        <p class="my-auto"> Bảo hiểm y tế: HS 4 01 0120878817</p>
                                    </div>
                                    <div class="my-auto">
                                        <div class="flex gap-2">
                                            <div class="">Chẩn đoán:</div>
                                            <div class="font-bold">A02.1-Nhiễm trùng huyết do Salmonella</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of profile card -->
                    </div>
                </a-collapse-panel>
            </a-collapse>
            <a-collapse class="shadow-md" v-model:activeKey="activeKeyCollapse" expand-icon-position="right"
                style="margin-top: 10px;">
                <a-collapse-panel key="2" header="Thông tin vào viện">
                    <div class="bg-white rounded">
                        <div class="p-4">
                            <a-descriptions class="break-normal" bordered size="small"
                                :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
                                <a-descriptions-item class="break-normal" label="Lý do vào viện"
                                    :labelStyle="labelStyle">Đau bụng trên, chướng bụng
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Phòng">P001
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Nơi giới thiệu">Tự đến
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Giường">G001
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Nhập viện lúc">14:00 10/10/2022
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Bác sĩ điều trị">
                                    Lương Quỳnh Thư
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Trực tiếp vào">Khoa cấp cứu
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán nơi chuyển đến ">
                                    Không có
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Ngày nhập khoa">23/8/2022
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán KKB, Cấp cứu">
                                    A04-Nhiễm trùng đường ruột do vi khuẩn khác
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Khoa nhập viện">
                                    Khoa nội tổng hợp
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán hiện tại">
                                    A02.1-Nhiễm trùng huyết do Salmonella
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Vào viện lần này thứ">5
                                </a-descriptions-item>

                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Chẩn đoán ra viện">
                                </a-descriptions-item>
                                <a-descriptions-item class="break-normal" :labelStyle="labelStyle"
                                    label="Khoa điều trị">
                                    Khoa nội tổng hợp
                                </a-descriptions-item>
                            </a-descriptions>
                        </div>
                    </div>
                </a-collapse-panel>
            </a-collapse>
        </div>
        <a-modal v-model:visible="visible" width="1200px" title="Basic Modal" @ok="handleOk">
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
                            <a-descriptions-item :labelStyle="labelStyle"
                                label="Nội tiết - Dinh dưỡng - Các bệnh lý khác">
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
    </section>
    <div class="flex gap-3 mt-3">
        <router-link to="/medical-being-treated">
            <a-button type="primary">
                <template #icon>
                    <FileOutlined />
                </template>
                Quản lý phiếu hiện có
            </a-button>
        </router-link>
        <router-link to="/note-list">
            <a-button type="primary">
                <template #icon>
                    <FileOutlined />
                </template>
                Quản lý danh mục phiếu
            </a-button>
        </router-link>
        <a-button type="primary" @click="showModal">
            <template #icon>
                <PrinterOutlined />
            </template>
            In phiếu
        </a-button>
    </div>
    <div class="mt-3">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs, nextTick } from 'vue';
import { AppleOutlined, SearchOutlined, AndroidOutlined, FileOutlined, PlusOutlined, LoadingOutlined, VerticalLeftOutlined, AudioOutlined, PlusCircleOutlined, SaveOutlined, PrinterOutlined, FundViewOutlined, FontColorsOutlined, ReadOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import type { MenuProps, UploadChangeParam, UploadProps } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { message } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

export default defineComponent({
    components: {
        AppleOutlined,
        AndroidOutlined,
        AudioOutlined,
        PlusCircleOutlined,
        FileOutlined,
        SaveOutlined,
        PrinterOutlined,
        FontColorsOutlined,
        ReadOutlined,
        DeleteOutlined,
        VerticalLeftOutlined,
        FundViewOutlined, SearchOutlined,
        PlusOutlined, LoadingOutlined
    },
    setup() {
        const dateFormat = 'YYYY-MM-DD';
        const value2 = ref<string>('');
        const value = ref<string>('');
        const value1 = ref<string>('');
        const value15 = ref<string>('Sign Up');
        const tabPosition = ref('top');
        const activeKeyChild = ref('1');
        const activeKeyTab2 = ref('1')
        const activeKeyCollapse = ref('1')
        const expandIconPosition = ref('right');
        const activeKeyCol = ref(['1', '2', '3', '4', '5']);
        const inputReason = ref<String>('')
        const inputRef = ref();
        const state = reactive({
            tags: ['Unremovable', 'Đau mắt (S)', 'mỏi mắt (S)', 'mỏi mắt (S) '],
            inputVisible: false,
            inputValue: '',
        });
        const labelStyle = {
            fontWeight: '700'
        }

        const dividerStyle = {
            borderColor: 'black'
        }

        const log = (e: MouseEvent) => {
            console.log(e);
        };

        const handleClose = (removedTag: string) => {
            const tags = state.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            state.tags = tags;
        };

        const handleClick = (event: MouseEvent) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        };

        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        const handleMenuClick: MenuProps['onClick'] = e => {
            console.log('click', e);
        };

        watch(activeKeyCol, val => {
            console.log(val);
        });

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

        const onChange = (value: Dayjs, dateString: string) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        };

        const onOk = (value: Dayjs) => {
            console.log('onOk: ', value);
        };

        const visible = ref<boolean>(false);

        const showModal = () => {
            visible.value = true;
        };

        const handleOk = (e: MouseEvent) => {
            console.log(e);
            visible.value = false;
        };

        const handleBlur = () => {
            console.log('blur');
        };

        const handleFocus = () => {
            console.log('focus');
        };

        const options = ref<SelectProps['options']>([
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'tom', label: 'Tom' },
        ]);

        const handleChange = (value: string) => {
            console.log(`selected ${value}`);
        };
        const filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const fileList = ref([]);
        const loading = ref<boolean>(false);
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

        return {
            options,
            handleChange,
            filterOption,
            handleBlur,
            handleFocus,
            activeKey: ref('1'),
            value2,
            onSearch,
            value15,
            value1,
            value,
            handleMenuClick,
            tabPosition,
            activeKeyChild,
            expandIconPosition,
            handleClick,
            activeKeyCol,
            inputReason,
            log,
            inputRef,
            ...toRefs(state),
            handleInputConfirm,
            showInput,
            handleClose,
            activeKeyTab2,
            onChange,
            onOk,
            DatePicker: ref<Dayjs>(dayjs('2022-08-16', dateFormat)),
            visible,
            showModal,
            handleOk,
            labelStyle,
            activeKeyCollapse,
            fileList,
            loading,
            imageUrl,
            handleChangeImg,
            beforeUpload,
            dividerStyle
        }
    }
})
</script>

<style lang="less" scoped>
.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>