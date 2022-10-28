<template>
  <va-breadcrumb>
    <template #extraAction>
      <a-button type="primary">
        <template #icon>
          <cloud-sync-outlined></cloud-sync-outlined>
        </template>
        Đồng bộ
      </a-button>
    </template>
  </va-breadcrumb>
  <section>
    <div class="">
      <a-collapse class="shadow-md" v-model:activeKey="activeKeyCollapse" expand-icon-position="right">
        <a-collapse-panel key="1" :header="test">
          <!-- <template slot="header">
            <div>Title</div>
            <div style="float: right;">Right hand content</div>
          </template> -->
          <div class="w-full h-full">
            <!-- Profile Card -->
            <div class="bg-white rounded h-full w-full">
              <div class="flex gap-4">
                <div class="overflow-hidden">
                  <img class="object-fill rounded-md" src="@/assets/images/AvatarDashboard.png" alt="">
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
        <a-collapse-panel key="2" header="Thông tin vào viện >>">
          <div class="bg-white rounded">
            <div class="p-4">
              <a-descriptions class="break-normal" bordered size="small"
                :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
                <a-descriptions-item class="break-normal" label="Lý do vào viện" :labelStyle="labelStyle">Đau bụng trên,
                  chướng bụng
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Phòng">P001
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nơi giới thiệu">Tự đến
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Giường">G001
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Nhập viện lúc">14:00
                  10/10/2022
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Bác sĩ điều trị">
                  Lương Quỳnh Thư
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Trực tiếp vào">Khoa cấp cứu
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Chẩn đoán nơi chuyển đến ">
                  Không có
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Ngày nhập khoa">23/8/2022
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Chẩn đoán KKB, Cấp cứu">
                  A04-Nhiễm trùng đường ruột do vi khuẩn khác
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Khoa nhập viện">
                  Khoa nội tổng hợp
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Chẩn đoán hiện tại">
                  A02.1-Nhiễm trùng huyết do Salmonella
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Vào viện lần này thứ">5
                </a-descriptions-item>

                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Chẩn đoán ra viện">
                </a-descriptions-item>
                <a-descriptions-item class="break-normal" :labelStyle="labelStyle" label="Khoa điều trị">
                  Khoa nội tổng hợp
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </section>
  <section class="mt-4">
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" animated>
      <a-tab-pane key="1" tab="Bệnh sử, tiền sử">
        <div class="w-full rounded">
          <div class="">
            <div class="flex justify-between rounded bg-white p-2 shadow-md img"
              style="background-image: url('@/assets/images/backgroundS.gif');">
              <div class="flex gap-2 w-1/2 justify-between">
                <a-button type="primary">Sinh hiệu</a-button>
              </div>
              <div class="flex gap-4">
                <a-button type="primary" @click="showModal">
                  Nhập giá trị
                </a-button>
                <a-modal v-model:visible="visible" title="Nhập giá trị" @ok="handleOk">
                  <form layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="Thời gian">
                          <!-- <a-date-picker style="width: 100%;"></a-date-picker> -->
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Cân nặng(kg)">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="Huyết áp tâm thu">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Huyết áp tâm trương">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="Nhiệt độ(C)">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Nhịp tim(bpm)">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="Đường huyết(mg/Dl)">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Chiều cao(cm)">
                          <a-input></a-input>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </form>
                </a-modal>
                <div class="font-semibold my-auto">
                  Ngày điều trị thứ: {{dayTreated}}
                </div>
                <div class="flex gap-2">
                  <a-date-picker :format="dateFormat" />
                </div>
                <a-button type="primary" @click="nextDay">
                  <template #icon>
                    <double-right-outlined />
                  </template>
                  Ngày tiếp theo
                </a-button>
              </div>
            </div>
            <div class="grid grid-cols-2 lg:flex gap-3 mt-4">
              <div class="flex-1 rounded-md shadow-md bg-gradient-to-r from-blue-800  w-full">
                <div class="flex h-full">
                  <div class="p-5 h-full text-left w-2/3 text-white grid">
                    <div class="font-medium text-xs 2xl:text-lg">Nhịp tim</div>
                    <div class="flex gap-2">
                      <p class="font-bold text-sm 2xl:text-2xl my-auto">90</p>
                      <p class="font-semibold text-xs my-auto">bpm</p>
                    </div>
                  </div>
                  <div class="h-full bg-blue-800 w-1/3 rounded-l-full grid justify-items-center">
                    <img class="max-h-12 2xl:max-h-20 my-auto" src="@/assets/images/heartbeat.png" alt="">
                  </div>
                </div>
              </div>
              <div class="flex-1 rounded-md shadow-md bg-gradient-to-r from-blue-800  w-full">
                <div class="flex h-full">
                  <div class="p-5 h-full text-left w-2/3 text-white grid">
                    <div class="font-medium text-xs 2xl:text-lg">Huyết áp</div>
                    <div class="flex gap-2">
                      <p class="font-bold text-sm 2xl:text-2xl my-auto">105</p>
                      <p class="font-semibold text-xs my-auto">mmHg</p>
                    </div>
                  </div>
                  <div class="h-full bg-blue-800 w-1/3 rounded-l-full grid justify-items-center">
                    <img class="max-h-12 2xl:max-h-20 my-auto" src="@/assets/images/hypertension.png" alt="">
                  </div>
                </div>
              </div>
              <div class="flex-1 rounded-md shadow-md bg-gradient-to-r from-blue-800  w-full">
                <div class="flex h-full">
                  <div class="p-5 h-full text-left w-2/3 text-white grid">
                    <div class="font-medium text-xs 2xl:text-lg">Đường huyết</div>
                    <div class="flex gap-2">
                      <p class="font-bold text-sm 2xl:text-2xl my-auto">140</p>
                      <p class="font-semibold text-xs my-auto">mg/dL</p>
                    </div>
                  </div>
                  <div class="h-full bg-blue-800 w-1/3 rounded-l-full grid justify-items-center">
                    <img class="max-h-12 2xl:max-h-20 my-auto" src="@/assets/images/sugar-blood-level.png" alt="">
                  </div>
                </div>
              </div>
              <div class="flex-1 rounded-md shadow-md bg-gradient-to-r from-blue-800  w-full">
                <div class="flex h-full">
                  <div class="p-5 h-full text-left w-2/3 text-white grid">
                    <div class="font-medium text-xs 2xl:text-lg">Nhiệt độ</div>
                    <div class="flex gap-2">
                      <p class="font-bold text-sm 2xl:text-2xl my-auto">36</p>
                      <p class="font-semibold text-xs my-auto">℃</p>
                    </div>
                  </div>
                  <div class="h-full bg-blue-800 w-1/3 rounded-l-full grid justify-items-center">
                    <img class="max-h-12 2xl:max-h-20 my-auto" src="@/assets/images/temperature.png" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:flex gap-8 w-full mt-10 justify-between">
              <div class="bg-white p-4 rounded-md shadow-md w-full relative"
                style="border-bottom: 5px solid; border-color: #103674;">
                <h1
                  class="font-bold text-base 2xl:text-2xl text-white bg-blue-800 w-1/3 text-center absolute -top-6 rounded-md p-1">
                  Huyết áp</h1>
                <LineChart :height="280" :chart-data="chartData" :options="option" />
              </div>
              <div class="bg-white p-4 rounded-md shadow-md w-full relative"
                style="border-bottom: 5px solid; border-color: #103674;">
                <h1
                  class="font-bold text-base 2xl:text-2xl text-white bg-blue-800 w-1/3 text-center absolute -top-6 rounded-md p-1">
                  Nhiệt độ</h1>
                <LineChart :height="280" :chart-data="chartData" :options="option" />
              </div>
              <div class="bg-white p-4 rounded-md shadow-md w-full relative"
                style="border-bottom: 5px solid; border-color: #103674;">
                <h1
                  class="font-bold text-base 2xl:text-2xl text-white bg-blue-800 w-1/3 text-center absolute -top-6 rounded-md p-1">
                  Nhịp tim</h1>
                <LineChart :height="280" :chart-data="chartData" :options="option" />
              </div>
            </div>
            <div class="flex mt-4 gap-4 shadow-md bg-white rounded-md p-2"
              style="border-left: 10px solid;border-color: #103674;">
              <div class="w-full p-3 max-h-[500px] overflow-auto">
                <h1
                  class="text-lg 2xl:text-2xl font-bold bg-gradient-to-r from-blue-800 w-1/3 p-2 text-white rounded-l-md">
                  Thông tin theo dõi</h1>
                <div class="">
                  <a-divider style="border-color: #0362fc" dashed orientation="left">
                    <p class="font-bold text-lg my-auto text-gray-500">7:00 am</p>
                  </a-divider>
                  <ul class="grid grid-cols-2 lg:grid-cols-3 list-disc gap-2">
                    <li>Bệnh nhân tỉnh, GCS 15 điểm</li>
                    <li>Không nói khó</li>
                    <li>Liệt nửa người phải cơ lực 5-/5</li>
                    <li>Bán manh 1/4 dưới phải</li>
                    <li>Tê bì giảm cảm giác nửa người phải</li>
                    <li>Gáy mềm</li>
                    <li>Tim nhịp đều</li>
                    <li>Phổi thông khí 2 bên đều</li>
                    <li>Bụng mềm</li>
                  </ul>
                  <a-divider style="border-color: #0362fc" dashed orientation="left">
                    <p class="font-bold text-lg my-auto text-gray-500">10:00 am</p>
                  </a-divider>
                  <ul class="grid grid-cols-2 lg:grid-cols-3 list-disc gap-2">
                    <li>Bệnh nhân tỉnh, GCS 15 điểm</li>
                    <li>Không nói khó</li>
                    <li>Liệt nửa người phải cơ lực 5-/5</li>
                    <li>Bán manh 1/4 dưới phải</li>
                    <li>Tê bì giảm cảm giác nửa người phải</li>
                    <li>Gáy mềm</li>
                    <li>Tim nhịp đều</li>
                    <li>Phổi thông khí 2 bên đều</li>
                    <li>Bụng mềm</li>
                  </ul>
                  <a-divider style="border-color: #0362fc" dashed orientation="left">
                    <p class="font-bold text-lg my-auto text-gray-500">1:00 pm</p>
                  </a-divider>
                  <ul class="grid grid-cols-2 lg:grid-cols-3 list-disc gap-2">
                    <li>Bệnh nhân tỉnh, GCS 15 điểm</li>
                    <li>Không nói khó</li>
                    <li>Liệt nửa người phải cơ lực 5-/5</li>
                    <li>Bán manh 1/4 dưới phải</li>
                    <li>Tê bì giảm cảm giác nửa người phải</li>
                    <li>Gáy mềm</li>
                    <li>Tim nhịp đều</li>
                    <li>Phổi thông khí 2 bên đều</li>
                    <li>Bụng mềm</li>
                  </ul>
                  <a-divider style="border-color: #0362fc" dashed orientation="left">
                    <p class="font-bold text-lg my-auto text-gray-500">3:00 pm</p>
                  </a-divider>
                  <ul class="grid grid-cols-2 lg:grid-cols-3 list-disc gap-2">
                    <li>Bệnh nhân tỉnh, GCS 15 điểm</li>
                    <li>Không nói khó</li>
                    <li>Liệt nửa người phải cơ lực 5-/5</li>
                    <li>Bán manh 1/4 dưới phải</li>
                    <li>Tê bì giảm cảm giác nửa người phải</li>
                    <li>Gáy mềm</li>
                    <li>Tim nhịp đều</li>
                    <li>Phổi thông khí 2 bên đều</li>
                    <li>Bụng mềm</li>
                  </ul>
                  <a-divider style="border-color: #0362fc" dashed orientation="left">
                    <p class="font-bold text-lg my-auto text-gray-500">8:00 pm</p>
                  </a-divider>
                  <ul class="grid grid-cols-2 lg:grid-cols-3 list-disc gap-2">
                    <li>Bệnh nhân tỉnh, GCS 15 điểm</li>
                    <li>Không nói khó</li>
                    <li>Liệt nửa người phải cơ lực 5-/5</li>
                    <li>Bán manh 1/4 dưới phải</li>
                    <li>Tê bì giảm cảm giác nửa người phải</li>
                    <li>Gáy mềm</li>
                    <li>Tim nhịp đều</li>
                    <li>Phổi thông khí 2 bên đều</li>
                    <li>Bụng mềm</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-md shadow-md">
              <div class="flex justify-between mt-5 p-3">
                <h1 class="uppercase font-bold text-lg text-blue-700 my-auto">CÁC PHIẾU ĐƯỢC TẠO TRONG NGÀY</h1>
                <router-link to="/choose-note-type">
                  <a-button type="primary" class="shadow-md">
                    <template #icon>
                      <plus-circle-outlined />
                    </template>
                    Tạo Phiếu
                  </a-button>
                </router-link>
              </div>
              <div class="mt-4">
                <va-table class="px-2" :columns-table="columns" :data-source="data" :spinning="loading"
                  :scroll="{ x: 'max-content' }">
                  <template #bodyCell="{ column }">
                    <template v-if="column.key === 'action'">
                      <div class="flex gap-2">
                        <a>Xem</a>
                        <a>Sửa</a>
                        <a>Xóa</a>
                        <a @click="showSignModal">Yêu cầu ký</a>

                      </div>
                    </template>
                  </template>
                  <template #expandedRowRender="{ record }">
                    <p style="margin: 0">
                      {{ record.description }}
                    </p>
                  </template>
                </va-table>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tiền gử gia đình">Content of Tab 2</a-tab-pane>
      <a-tab-pane key="3" tab="CĐHA">Content of Tab 3</a-tab-pane>
      <a-tab-pane key="4" tab="Xét nghiệm ">Content of Tab 4</a-tab-pane>
      <a-tab-pane key="5" tab="Cận lâm sàng ">Content of Tab 5</a-tab-pane>
      <a-tab-pane key="6" tab="Dịch vụ kỹ thuât khác">Content of Tab 6</a-tab-pane>
      <a-tab-pane key="7" tab="Lịch sử khám chữa bệnh ">Content of Tab 7</a-tab-pane>
    </a-tabs>
  </section>
  <a-modal v-model:visible="signVisible" title="Gửi yêu cầu ký" @ok="handleOk">
    <div class="mb-2">Chọn người ký:</div>
    <va-select show-search></va-select>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
// import { shuffle } from "lodash";
import { DoughnutChart, LineChart, useDoughnutChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables, LineController, PointElement } from "chart.js";
import { SmileOutlined, DoubleRightOutlined, PlusCircleOutlined, CloudSyncOutlined } from '@ant-design/icons-vue';
import type { CollapseProps } from 'ant-design-vue';
// import {Router} from 'vue-router'
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";

Chart.register(...registerables, LineController, PointElement);

const columns = [
  { title: 'Tên phiếu', dataIndex: 'name', key: 'name', fixed: true },
  { title: 'Đối tượng ', dataIndex: 'type', key: 'type' },
  { title: 'Người tạo ', dataIndex: 'owner', key: 'owner' },
  { title: 'Thời gian ', dataIndex: 'created', key: 'created' },
  { title: 'Action', key: 'action' },
];

const data = [
  {
    key: 1,
    name: 'Phiếu chỉ định',
    type: 'Điều dưỡng',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Phiếu chỉ định',
    type: 'Điều dưỡng',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  }, {
    key: 3,
    name: 'Phiếu chỉ định',
    type: 'Điều dưỡng',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  }, {
    key: 4,
    name: 'Phiếu chỉ định',
    type: 'Điều dưỡng',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 5,
    name: 'Tờ điều trị',
    type: 'Bác sĩ ',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 6,
    name: 'Tờ điều trị ',
    type: 'Bác sĩ ',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 7,
    name: 'Tờ điều trị ',
    type: 'Bác sĩ ',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 8,
    name: 'Tờ điều trị ',
    type: 'Bác sĩ ',
    owner: 'DD. Nguyễn Thị Lan Anh',
    created: '06:00 03/08/2022',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
];

export default defineComponent({
  components: { DoughnutChart, LineChart, SmileOutlined, DoubleRightOutlined, PlusCircleOutlined, CloudSyncOutlined },
  setup() {
    const visible = ref<boolean>(false);

    const signVisible = ref<boolean>(false);

    const showSignModal = () => {
      signVisible.value = true;
    };

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
      signVisible.value = false;
    };

    const dayTreated = ref(1)

    const nextDay = () => {
      dayTreated.value++
    }

    const labelStyle = {
      // fontSize: '20px',
      fontWeight: '700',
    }

    const loading = ref<Boolean>(false)

    const contentStyle = {
    }
    const dateFormat = 'YYYY/MM/DD';
    const tabPosition = ref('top');
    const activeKey = ref('1');
    const activeKeyCollapse = ref('1');
    const activeTime = ref('0');
    const top = ref<number>(10);
    const test = ref('Thông tin bệnh nhân')
    // const test = {
    //   createVNode('div', { style: 'color:red;' }, 'Bạn có thực sự muốn sửa?')
    // }
    const option = ref(
      {
        // animations: {
        //   tension: {
        //     duration: 500,
        //     easing: 'linear',
        //     from: 1,
        //     to: 0,
        //     loop: true
        //   }
        // },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 70,
            max: 130
          }
        }
      }
    )
    const chartValue = ref([
      [80, 90, 87, 100, 90, 100, 95],
      [100, 110, 105, 115, 110, 95, 100]
    ])

    const height = ref('300px')

    const dividerStyle = {
      borderColor: 'black'
    }

    const chartData = computed(() => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: 'Foo',
          data: chartValue.value[0],
          backgroundColor: 'red',
          borderColor: 'rgb(129, 8, 166)',
        },
        {
          label: 'Bar',
          data: chartValue.value[1],
          backgroundColor: 'yellow',
          borderColor: 'rgb(75, 192, 192)',
        }
      ]
    }))

    const dataValues = ref([30, 40, 60, 70, 5]);
    const dataLabels = ref(["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"]);
    const toggleLegend = ref(true);
    const expandIconPosition = ref<CollapseProps['expandIconPosition']>('right');

    const testData = computed<ChartData<"doughnut">>(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    const options = computed<ChartOptions<"doughnut">>(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });

    let index = ref(20);

    const shuffleData = () => {
      // dataValues.value = shuffle(dataValues.value);
      dataValues.value.push(index.value);
      dataLabels.value.push("Other" + index.value);
      console.log(dataValues.value);
      // console.log(doughnutChartRef.value.chartInstance);
      index.value++;
    }

    const switchLegend = () => {
      toggleLegend.value = !toggleLegend.value;
    }

    watch(activeKey, val => {
      console.log(val);
    });



    return {
      tabPosition,
      activeKey,
      activeTime,
      dateFormat,
      data,
      columns,
      chartData,
      option,
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
      expandIconPosition,
      top,
      height,
      labelStyle,
      contentStyle,
      activeKeyCollapse,
      loading,
      dividerStyle,
      test,
      visible,
      showModal,
      handleOk,
      dayTreated,
      nextDay,
      showSignModal,
      signVisible
    }
  }
})
</script>

<style lang="less" scoped>
.table-title {
  font-size: xx-large;
  font-weight: 700;
}
</style>
