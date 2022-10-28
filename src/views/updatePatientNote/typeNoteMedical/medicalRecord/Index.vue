<template>
    <!-- <va-breadcrumb></va-breadcrumb> -->
    <section class="bg-[#E3E5EB] p-4 rounded-md mb-4">
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
            <div class="">
                <a-collapse v-model:activeKey="activeKeyCol" expand-icon-position="right">
                    <a-collapse-panel key="1" header="1. Quá trình bệnh lý và diễn biến lâm sàng">
                        <div class="mt-3">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Tổn thương phổi kẽ
                                        (S)
                                    </a-tag>
                                    <a-tag closable @close="log">Bilan lao âm tính
                                        (S)</a-tag>
                                    <a-tag closable @close="log">Sưng đau kớp cổ tay
                                        2 bên</a-tag>
                                    <a-tag closable @close="log">Tim nhịp đều (S)
                                    </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <a-input-group compact>
                                    <a-input placeholder="ghi chú" style="width: calc(100% - 60px)">
                                        <template #suffix>
                                            <audio-outlined />
                                        </template>
                                    </a-input>
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bn nữ, 47 tuổi, vào
                                        viện xét truyền Actemra lần 3, Sau truyền BN
                                        đỡ sưng đau các khớp -> ra viện</a-tag>
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
                    <a-collapse-panel key="2" header="2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán ">
                        <div class="mt-3">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2 gap-y-2">
                                    <a-tag closable @close="log">Anti HCV: âm tính
                                    </a-tag>
                                    <a-tag closable @close="log">HBC total: âm tính
                                    </a-tag>
                                    <a-tag closable @close="log">HbsAg: âm tính
                                    </a-tag>
                                    <a-tag closable @close="log">CT ngực: nốt mờ đáy
                                        phổi trái </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <a-input-group compact>
                                    <a-input placeholder="ghi chú" style="width: calc(100% - 60px)">
                                        <template #suffix>
                                            <audio-outlined />
                                        </template>
                                    </a-input>
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
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
                    <a-collapse-panel key="3" header="3. Phương pháp điều trị">
                        <div class="mt-3">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2 gap-y-2">
                                    <a-tag closable @close="log">Nội khoa
                                    </a-tag>
                                    <a-tag closable @close="log">Truyền Actemra
                                    </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <a-input-group compact>
                                    <a-input placeholder="ghi chú" style="width: calc(100% - 60px)">
                                        <template #suffix>
                                            <audio-outlined />
                                        </template>
                                    </a-input>
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
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
                    <a-collapse-panel key="4" header="4. Tình trạng người bệnh ra viện ">
                        <a-button type="primary">
                            Thêm trường
                        </a-button>
                        <div class="mt-4">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2 gap-y-2">
                                    <a-tag closable @close="log">Tỉnh
                                    </a-tag>
                                    <a-tag closable @close="log">Không sốt
                                    </a-tag>
                                    <a-tag closable @close="log">Khó thở
                                    </a-tag>
                                    <a-tag closable @close="log">Tim đều </a-tag>
                                    <a-tag closable @close="log">Huyết động ổn
                                    </a-tag>
                                    <a-tag closable @close="log">Phổi RRPN rõ
                                    </a-tag>
                                    <a-tag closable @close="log">Không ran </a-tag>
                                    <a-tag closable @close="log">Bụng mềm </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <a-input-group compact>
                                    <a-input placeholder="ghi chú" style="width: calc(100% - 60px)">
                                        <template #suffix>
                                            <audio-outlined />
                                        </template>
                                    </a-input>
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
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
                    <a-collapse-panel key="5" header="5. Hướng điều trị và các chế độ tiếp theo">
                        <a-button type="primary">
                            Thêm trường
                        </a-button>
                        <div class="mt-3">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2 gap-y-2">
                                    <a-tag closable @close="log">Ra viện
                                    </a-tag>
                                    <a-tag closable @close="log">Uống thuốc
                                    </a-tag>
                                </div>
                            </div>
                            <div class="mt-6">
                                <a-input-group compact>
                                    <a-input placeholder="ghi chú" style="width: calc(100% - 60px)">
                                        <template #suffix>
                                            <audio-outlined />
                                        </template>
                                    </a-input>
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Khám lại chuyên
                                        khoa cơ xương khớp sau 01 tháng xét truyền
                                        Actemra lần 4
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
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusCircleOutlined
    },
    setup() {
        const activeKeyCol = ref(['1', '2', '3', '4', '5']);
        const log = (e: MouseEvent) => {
            console.log(e);
        };
        const handleClick = (event: MouseEvent) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        };

        return {
            activeKeyCol,
            log,
            handleClick

        }
    }
})
</script>

<style>

</style>