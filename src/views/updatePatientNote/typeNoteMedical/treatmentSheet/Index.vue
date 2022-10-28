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
                    <a-collapse-panel key="1" header="Diễn biến bệnh">
                        <div class="mt-3">
                            <div class="">
                                <a-input-group compact>
                                    <a-input placeholder="SELECT SNOMED" style="width: calc(100% - 60px)" />
                                    <a-button type="primary">
                                        <plus-circle-outlined />
                                    </a-button>
                                </a-input-group>
                                <div class="mt-2">
                                    <a-tag closable @close="log">Bệnh nhân tỉnh táo
                                        (S)
                                    </a-tag>
                                    <a-tag closable @close="log">Sốt cao (S)
                                    </a-tag>
                                    <a-tag closable @close="log">Bụng mềm (S)
                                    </a-tag>
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
                                    <a-tag closable @close="log">Bệnh nhân có triệu
                                        chứng
                                        được 3 ngày</a-tag>
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
                    <a-collapse-panel key="2" header="Y lệnh">
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
                                    <a-tag closable @close="log">Natri clorid(Natri
                                        clorid
                                        [Kabi]) 0,9 % x 500ml (S) </a-tag>
                                    <a-tag closable @close="log">Glucose khan
                                        10g(Glucose
                                        10% [Kabi]) 10% x 500ml</a-tag>
                                    <a-tag closable @close="log">Xét nghiệm
                                        MD10-HBsAg
                                        miễn
                                        dịch tự động</a-tag>
                                    <a-tag closable @close="log">Xét nghiệm
                                        MD50-Định
                                        lượng
                                        AFP (Alpha Fetoproteine) [Máu]</a-tag>
                                    <a-tag closable @close="log">XQ04-Chụp Xquang
                                        bụng
                                        không
                                        chuẩn bị thẳng hoặc nghiêng</a-tag>
                                    <a-tag closable @close="log">Siêu âm ổ bụng
                                    </a-tag>
                                    <a-tag closable @close="log">
                                        Silymarin(Silymax-F)
                                        140mg
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
                                    <a-tag closable @close="log">Bệnh nhân dị ứng
                                        ........
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