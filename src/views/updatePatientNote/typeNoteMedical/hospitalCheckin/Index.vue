<template>
    <div class="bg-[#E3E5EB] p-4 rounded-md mb-4">
        <div class="flex justify-between">
            <h1 class="font-bold text-xs lg:text-base 2xl:text-2x rounded text-black">
                Thêm mới phiếu</h1>
            <div class="">
                <a-button type="primary">
                    Lưu phiếu
                    <plus-circle-outlined />
                </a-button>
            </div>
        </div>
        <div class="grid gap-y-3 mt-2">
            <a-collapse v-model:activeKey="activeKeyCol" expand-icon-position="right">
                <a-collapse-panel key="1" header="I. Lý do vào viện ">
                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <div class="">
                                <a-input v-if="inputVisible" ref="inputRef" class="p-[6px]" v-model:value="inputValue"
                                    type="text" size="small" :style="{ width: '100%' }" enter-button
                                    @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
                                <a-tag v-else
                                    style="background: #fff; border-style: dashed; 	width: 100%;; padding: 6px;"
                                    @click="showInput">
                                    <plus-outlined />
                                    SELECT SNOMED
                                </a-tag>
                            </div>
                            <div class="w-full">
                                <div class="mt-2 gap-2">
                                    <template v-for="(tag, index) in tags" :key="tag">
                                        <a-tooltip v-if="tag.length > 20" :title="tag">
                                            <a-tag :closable="index !== 0" @close="handleClose(tag)">
                                                {{ `${tag.slice(0, 20)}...` }}
                                            </a-tag>
                                        </a-tooltip>
                                        <a-tag v-else :closable="index !== 0" @close="handleClose(tag)">
                                            {{ tag }}
                                        </a-tag>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <a-input-group compact>
                                <a-input placeholder="ghi chú " style="width: calc(100% - 80px)">
                                    <template #suffix>
                                        <audio-outlined />
                                    </template>
                                </a-input>
                                <a-button type="primary">
                                    <plus-circle-outlined />
                                </a-button>
                            </a-input-group>
                            <div class="mt-2">
                                <a-tag closable @close="log">Bệnh nhân có triệu
                                    chứng
                                    được 3 ngày</a-tag>
                                <a-tag closable @close="log">Tag 2</a-tag>
                                <a-tag closable @close="log">Tag 2</a-tag>
                            </div>
                        </div>
                    </div>
                    <template #extra>
                        <setting-outlined @click="handleClick" />
                    </template>
                </a-collapse-panel>
            </a-collapse>
            <div class="">
                <a-collapse v-model:activeKey="activeKeyCol" expand-icon-position="right">
                    <a-collapse-panel key="2" header="II. Hỏi bệnh">
                        <div class="">
                            <div class="">
                                <div class="flex justify-between mb-4">
                                    <p class="font-bold">1. Quá trình bệnh lý</p>
                                    <a-button class="text-right" type="primary">
                                        <plus-circle-outlined />
                                        Thêm trường
                                    </a-button>
                                </div>
                                <div class="flex gap-4">
                                    <a-input-group class="w-1/2" compact>
                                        <a-input style="width: calc(100% - 60px)" />
                                        <a-button type="primary">
                                            <plus-circle-outlined />
                                        </a-button>
                                    </a-input-group>
                                    <div class="w-1/2"></div>
                                </div>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bệnh nhân có triệu
                                        chứng được 3 ngày</a-tag>
                                    <a-tag closable @close="log">Tag 2</a-tag>
                                    <a-tag closable @close="log">Tag 2</a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <p class="font-bold">2. Tiền sử bản thân </p>
                                <div class="flex gap-4">
                                    <div class="w-1/2">
                                        <p>+ Mắt</p>
                                        <a-input-group compact>
                                            <a-input style="width: calc(100% - 60px)" />
                                            <a-button type="primary">
                                                <plus-circle-outlined />
                                            </a-button>
                                        </a-input-group>
                                        <div class="mt-2">
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                        </div>
                                    </div>
                                    <div class="w-1/2">
                                        <p>+ Toàn thân</p>
                                        <a-input-group compact>
                                            <a-input style="width: calc(100% - 60px)" />
                                            <a-button type="primary">
                                                <plus-circle-outlined />
                                            </a-button>
                                        </a-input-group>
                                        <div class="mt-2">
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                            <a-tag closable @close="log">Bình thường
                                            </a-tag>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <template #extra>
                            <setting-outlined @click="handleClick" />
                        </template>
                    </a-collapse-panel>
                </a-collapse>
            </div>
            <div class="">
                <a-collapse v-model:activeKey="activeKeyCol" expand-icon-position="right">
                    <a-collapse-panel key="3" header="III. Khám bệnh">
                        <div class="">
                            <p class="font-bold">1. Khám bệnh chuyên khoa </p>
                            <div class=" ">
                                <a-divider orientation="left">
                                    <div class="font-medium text-sm">
                                        Thị lực vào viện
                                    </div>
                                </a-divider>
                                <div class="grid grid-cols-2 gap-3">
                                    <a-descriptions title="Không kính" bordered size="small">
                                        <a-descriptions-item label="MT">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                        <a-descriptions-item label="MP">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions title="Có kính" bordered size="small">
                                        <a-descriptions-item label="MT">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                        <a-descriptions-item label="MP">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions title="Nhãn áp vào viện" bordered size="small">
                                        <a-descriptions-item label="MT">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                        <a-descriptions-item label="MP">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions title="Thị trường" bordered size="small">
                                        <a-descriptions-item label="MT">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                        <a-descriptions-item label="MP">
                                            <a-input placeholder="Nhập chỉ số" allow-clear />
                                        </a-descriptions-item>
                                    </a-descriptions>
                                </div>
                            </div>
                            <div class="mt-2">
                                <a-divider orientation="left">
                                    <div class="font-medium text-sm">
                                        Khác
                                    </div>
                                </a-divider>
                                <a-input-group compact>
                                    <a-input style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                            </div>
                            <div class="">
                                <p class="mt-6 font-bold">2. Các cơ quan </p>
                                <div class="">
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Tuần hoàn
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                                <div class="mt-2">
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                    <a-tag closable @close="log">
                                                        Bình thường
                                                    </a-tag>
                                                </div>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Hô hấp
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Tiêu hoá
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Thận - tiết
                                            niệu - sinh dục
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Thần kinh
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Cơ - xương
                                            - khớp
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Tai - Mũi -
                                            Họng
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Răng - Hàm
                                            - Mặt
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Nội tiết,
                                            dinh dưỡng, các bệnh lý khác
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full">
                                        <p class="font-medium -mb-[1px]">Mắt
                                        </p>
                                        <div class="flex gap-4">
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)"
                                                        placeholder="SELECT SNOMED" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                            <div class="w-1/2">
                                                <a-input-group compact>
                                                    <a-input style="width: calc(100% - 60px)" placeholder="NOTE" />
                                                    <a-button type="primary">
                                                        <plus-circle-outlined />
                                                    </a-button>
                                                </a-input-group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6">
                                <p class="font-bold">3. Các xét nghiệm lâm sàng cần
                                    làm
                                </p>
                                <div class="flex gap-4">
                                    <div class="mt-2 w-full">
                                        <a-input-group compact>
                                            <a-input style="width: calc(100% - 60px)" placeholder="SELECT SNOMED" />
                                            <a-button type="primary">
                                                <plus-circle-outlined />
                                            </a-button>
                                        </a-input-group>
                                    </div>
                                    <div class="w-full"></div>
                                </div>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <p class="font-bold">4. Tóm tắt bệnh án
                                </p>
                                <div class="flex gap-4">
                                    <div class="mt-2 w-full">
                                        <a-input-group compact>
                                            <a-input style="width: calc(100% - 60px)" placeholder="SELECT SNOMED" />
                                            <a-button type="primary">
                                                <plus-circle-outlined />
                                            </a-button>
                                        </a-input-group>
                                    </div>
                                    <div class="w-full"></div>
                                </div>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <p class="font-bold">5. Tiên lượng
                                </p>
                                <div class="flex gap-4">
                                    <div class="mt-2 w-full">
                                        <a-input-group compact>
                                            <a-input style="width: calc(100% - 60px)" placeholder="SELECT SNOMED" />
                                            <a-button type="primary">
                                                <plus-circle-outlined />
                                            </a-button>
                                        </a-input-group>
                                    </div>
                                    <div class="w-full"></div>
                                </div>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                    <a-tag closable @close="log">Bình thường
                                    </a-tag>
                                </div>
                            </div>
                        </div>
                        <template #extra>
                            <setting-outlined @click="handleClick" />
                        </template>
                    </a-collapse-panel>
                </a-collapse>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components:{
        PlusCircleOutlined
    },
    setup() {
        const activeKeyCol = ref(['1', '2', '3', '4', '5']);

        const state = reactive({
            tags: ['Unremovable', 'Đau mắt (S)', 'mỏi mắt (S)', 'mỏi mắt (S) '],
            inputVisible: false,
            inputValue: '',
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

        const inputRef = ref();

        const handleClose = (removedTag: string) => {
            const tags = state.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            state.tags = tags;
        };

        const log = (e: MouseEvent) => {
            console.log(e);
        };

        const handleClick = (event: MouseEvent) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        };


        return {
            activeKeyCol,
            ...toRefs(state),
            handleInputConfirm,
            showInput,
            inputRef,
            handleClose,
            log,
            handleClick
        }
    }
})
</script>

<style>

</style>