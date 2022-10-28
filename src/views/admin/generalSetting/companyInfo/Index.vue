<template>
  <div>
    <vaBreadCrumb v-model:select.number="select"></vaBreadCrumb>
    <a-card>
      <a-spin :spinning="loading">
        <div class="company-info--content-list mx-auto relative w-4/5">
          <div
            class="company-info--content-item"
            :class="editCompanyInfo ? 'active' : ''"
            @click="openEditCompanyInfo"
          >
            <div class="content-item--title">Thông tin công ty</div>
            <div class="content-item--table">
              <div v-if="!editCompanyInfo">
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8"></a-col>
                  <a-col :span="16">
                    <Upload
                      :key="keyUpload"
                      :image-url="companyInfo.imageUrl"
                      :disabled="true"
                      class="overflow-hidden"
                      @update:value="getLogo"
                    ></Upload>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Tên pháp lý</a-col>
                  <a-col :span="16">{{ companyInfo.name }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Địa chỉ</a-col>
                  <a-col :span="16">{{ companyInfo.address }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Mã số thuế</a-col>
                  <a-col :span="16">{{ companyInfo.taxCode }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">TK ngân hàng</a-col>
                  <a-col :span="16">{{ companyInfo.bankAccountInfo }}</a-col>
                </a-row>
              </div>
              <div v-else>
                <a-form>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8"></a-col>
                    <a-col :span="16">
                      <a-form-item>
                        <Upload
                          :key="keyUpload"
                          :image-url="companyInfo.imageUrl"
                          class="overflow-hidden"
                          @update:value="getLogo"
                        ></Upload>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Tên pháp lý</a-col>
                    <a-col :span="16">
                      <a-form-item v-bind="validateCompanyInfoInfos.name">
                        <a-input v-model:value="companyInfo.name"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Địa chỉ</a-col>
                    <a-col :span="16">
                      <a-form-item v-bind="validateCompanyInfoInfos.address">
                        <a-input v-model:value="companyInfo.address"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Mã số thuế</a-col>
                    <a-col :span="16">
                      <a-form-item v-bind="validateCompanyInfoInfos.taxCode">
                        <a-input v-model:value="companyInfo.taxCode"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">TK ngân hàng</a-col>
                    <a-col :span="16">
                      <a-form-item>
                        <a-select
                          v-model:value="companyInfo.bankAccountId"
                          :allow-clear="true"
                          show-search
                          :filter-option="false"
                          class="w-full"
                          @change="handleChangeBankAccount"
                          @search="handleSearchBankAccount"
                        >
                          <a-select-option
                            v-for="item in listBankAccount"
                            :key="item.id"
                            :value="item.id"
                          >
                            {{ item.bankAccountNumber + ' - ' + item.bankBranchName }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8"></a-col>
                    <a-col :span="16">
                      <div class="content-item--table-submit">
                        <a-button class="btn-success mr-4" @click="cancelCompanyInfo">Hủy</a-button>
                        <a-button type="primary" @click="saveCompanyInfo">Lưu</a-button>
                      </div>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
            </div>

            <div class="content-item--edit">
              <va-svg-icon
                name="edit"
                class="cursor-pointer"
                @click="openEditCompanyInfo"
              ></va-svg-icon>
            </div>
          </div>
          <div
            class="company-info--content-item"
            :class="editContactInfo ? 'active' : ''"
            @click="openEditContractInfo"
          >
            <div class="content-item--title">Thông tin liên hệ</div>
            <div class="content-item--table">
              <div v-if="!editContactInfo">
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Số điện thoại</a-col>
                  <a-col :span="16">{{ contactInfo.phoneNumber }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Email</a-col>
                  <a-col :span="16"> {{ contactInfo.email }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Website</a-col>
                  <a-col :span="16"> {{ contactInfo.website }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Tỉnh/TP</a-col>
                  <a-col :span="16"> {{ contactInfo.province }}</a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8">Quận huyện</a-col>
                  <a-col :span="16"> {{ contactInfo.district }}</a-col>
                </a-row>
              </div>
              <div v-else>
                <a-form>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Số điện thoại</a-col>
                    <a-col :span="16">
                      <a-form-item v-bind="validateContactInfoInfos.phoneNumber">
                        <a-input v-model:value="contactInfo.phoneNumber"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Email</a-col>
                    <a-col :span="16">
                      <a-form-item v-bind="validateContactInfoInfos.email">
                        <a-input v-model:value="contactInfo.email"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Website</a-col>
                    <a-col :span="16">
                      <a-form-item>
                        <a-input v-model:value="contactInfo.website"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Tỉnh/TP</a-col>
                    <a-col :span="16">
                      <a-form-item>
                        <a-input v-model:value="contactInfo.province"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8">Quận huyện</a-col>
                    <a-col :span="16">
                      <a-form-item>
                        <a-input v-model:value="contactInfo.district"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="content-item--table-row">
                    <a-col :span="8"></a-col>
                    <a-col :span="16">
                      <div class="content-item--table-submit">
                        <a-button class="btn-success mr-4" @click="cancelContactInfo">Hủy</a-button>
                        <a-button type="primary" @click="saveContactInfo">Lưu</a-button>
                      </div>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
            </div>

            <div class="content-item--edit">
              <va-svg-icon name="edit" class="cursor-pointer" @click="openEditContractInfo" />
            </div>
          </div>
          <div
            class="company-info--content-item"
            :class="editSignatureInfo ? 'active' : ''"
            @click="openEditSignatureInfo"
          >
            <div class="content-item--title">Thông tin chữ ký</div>
            <div class="content-item--table">
              <div v-if="!editSignatureInfo">
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="24">
                    <a-table
                      :data-source="signatureInfo.dataTable"
                      :pagination="false"
                      :locale="{ emptyText: 'Chưa có dữ liệu' }"
                      :columns="columnsSignatureInfo"
                    ></a-table>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="12">In tên người ký lên chứng từ, báo cáo:</a-col>
                  <a-col :span="12">
                    {{ signatureInfo.includeSignerNameOnReport ? 'Có' : 'Không' }}</a-col
                  >
                </a-row>
                <a-row :gutter="16" class="content-item--table-row">
                  <a-col :span="12">Lấy tên người lập biểu theo tên người đăng nhập:</a-col>
                  <a-col :span="12">
                    {{ signatureInfo.getPlannerNameByUsername ? 'Có' : 'Không' }}</a-col
                  >
                </a-row>
              </div>
              <div v-else>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="24">
                    <a-table
                      :data-source="signatureInfo.dataTable"
                      :locale="{ emptyText: 'Chưa có dữ liệu' }"
                      :columns="columnsSignatureInfo"
                      :pagination="false"
                    >
                      <template
                        v-for="col in ['identification', 'titleSigner', 'signerName']"
                        #[col]="{ text, record }"
                      >
                        <div>
                          <a-input
                            v-if="col !== 'identification'"
                            style="margin: -5px 0"
                            :value="text"
                            @change="
                              (e) => handleChangeTableSignatureInfo(e.target.value, record.key, col)
                            "
                          />
                          <template v-else>
                            {{ text }}
                          </template>
                        </div>
                      </template>
                    </a-table>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="12">In tên người ký lên chứng từ, báo cáo:</a-col>
                  <a-col :span="12">
                    <a-radio-group v-model:value="signatureInfo.includeSignerNameOnReport">
                      <a-radio :value="true">Có</a-radio>
                      <a-radio :value="false">Không</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="12">Lấy tên người lập biểu theo tên người đăng nhập:</a-col>
                  <a-col :span="12">
                    <a-radio-group v-model:value="signatureInfo.getPlannerNameByUsername">
                      <a-radio :value="true">Có</a-radio>
                      <a-radio :value="false">Không</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="content-item--table-row mb-4">
                  <a-col :span="8"></a-col>
                  <a-col :span="16">
                    <div class="content-item--table-submit">
                      <a-button class="btn-success mr-4" @click="cancelSignatureInfo">Hủy</a-button>
                      <a-button type="primary" @click="saveSignatureInfo">Lưu</a-button>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>

            <div class="content-item--edit">
              <va-svg-icon
                name="edit"
                class="cursor-pointer"
                @click="openEditSignatureInfo"
              ></va-svg-icon>
            </div>
          </div>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { columnsSignatureInfo } from './columnsSignatureInfo'
import {
  getOrgUnitDetail,
  updateInfoOrgUnit,
  updateContactOrgUnit,
  updateSignatureOrgUnit
} from '@/services/sys/orgUnit'
import Upload from '@/components/UploadFile/Upload.vue'
import { Modal, Form } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { RULES_REQUIRED, RULES_PHONE_NUMBER, RULES_EMAIL } from '@/constants/validation'
import ls from '@/utils/Storage'
import { CURRENT_ORG_UNIT_ID } from '@/store/mutation-types'

const useForm = Form.useForm
export default defineComponent({
  components: {
    Upload
  },
  setup() {
    // PROPERTY
    const router = useRouter()
    const orgUnitId = ls.get(CURRENT_ORG_UNIT_ID)
    const visible = ref(true)
    const loading = ref(false)
    const select = ref('')
    const fieldActivity = ref({
      field: ['service'],
      business: 1
    })
    const listBankAccount = ref([])
    const editCompanyInfo = ref(false)
    const editFieldActivity = ref(false)
    const editContactInfo = ref(false)
    const editSignatureInfo = ref(false)
    const companyInfo = reactive({
      imageUrl: '',
      imageKey: '',
      image: {},
      name: '',
      address: '',
      taxCode: '',
      bankAccountId: '',
      bankAccountInfo: ''
    })
    const rulesCompanyInfo = reactive({
      name: [RULES_REQUIRED],
      address: [RULES_REQUIRED],
      taxCode: [RULES_REQUIRED]
    })
    const useFormCompanyInfo = useForm(companyInfo, rulesCompanyInfo)
    const validateCompanyInfoInfos = useFormCompanyInfo.validateInfos
    const loadingUploadAvatar = ref(false)
    const fieldActivityOptions = ref([
      { label: 'Thương mại', value: 'commerce' },
      { label: 'Dịch vụ', value: 'service' },
      { label: 'Sản xuất', value: 'manufacturing' },
      { label: 'Xây lắp', value: 'build' }
    ])
    const listBusiness = ref([
      { value: 1, name: 'Kinh doanh dược phẩm' },
      { value: 2, name: 'Kinh doanh hóa chất' },
      { value: 3, name: 'Kinh doanh mỹ phẩm' },
      { value: 4, name: 'Kinh doanh gốm, sứ, thủy tinh' },
      { value: 5, name: 'Kinh doanh điện máy thiết bị gia dụng' },
      { value: 6, name: 'Kinh doanh thiết bị y tế' },
      { value: 7, name: 'Kinh doanh nhôm kính' }
    ])
    const contactInfo = reactive({
      phoneNumber: '',
      email: '',
      website: '',
      province: '',
      district: ''
    })
    const rulesContactInfo = reactive({
      phoneNumber: [RULES_REQUIRED, RULES_PHONE_NUMBER],
      email: [RULES_REQUIRED, RULES_EMAIL]
    })
    const useFormContactInfo = useForm(contactInfo, rulesContactInfo)
    const validateContactInfoInfos = useFormContactInfo.validateInfos
    const signatureInfo = reactive({
      dataTable: [],
      includeSignerNameOnReport: true,
      getPlannerNameByUsername: false
    })
    const rulesSignatureInfo = reactive({})
    const useFormSignatureInfo = useForm(signatureInfo, rulesSignatureInfo)
    const keyUpload = ref(1)

    // METHODS
    const getData = async () => {
      loading.value = true
      try {
        const rs = await getOrgUnitDetail(orgUnitId)
        console.log(rs.body)
        if (rs.body) {
          getCompanyInfo(rs.body)
          getContactInfo(rs.body)
          getSignatureInfo(rs.body)
        }
      } finally {
        loading.value = false
        keyUpload.value++
      }
    }

    const getCompanyInfo = (data = {}) => {
      companyInfo.imageUrl = data.avatarUrl || ''
      companyInfo.image = data.avatar || {}
      companyInfo.name = data.orgUnitName || ''
      companyInfo.address = data.address || ''
      companyInfo.taxCode = data.taxCode || ''
      companyInfo.bankAccountId = data.bankAccountId || ''
      companyInfo.bankAccountInfo = data.bankAccountInfo || ''
    }

    const openEditCompanyInfo = () => {
      if (editFieldActivity.value) {
        saveFieldActivity()
      } else if (editContactInfo.value) {
        saveContactInfo()
      } else if (editSignatureInfo.value) {
        saveSignatureInfo()
      } else {
        editCompanyInfo.value = true
        editFieldActivity.value = false
        editContactInfo.value = false
        editSignatureInfo.value = false
      }
    }

    const cancelCompanyInfo = () => {
      Modal.confirm({
        content: 'Bạn có chắc chắc muốn hủy?',
        onOk() {
          getData()
          editCompanyInfo.value = false
        }
      })
    }

    const saveCompanyInfo = async () => {
      useFormCompanyInfo.validate().then(() => {
        Modal.confirm({
          content: 'Lưu thay đổi thông tin công ty?',
          onOk() {
            loading.value = true
            const params = {
              address: companyInfo.address,
              avatar: {
                dataBase64: companyInfo.image.dataBase64,
                fileName: companyInfo.image.fileName,
                key: companyInfo.image.key
              },
              bankAccountId: companyInfo.bankAccountId,
              orgUnitId: orgUnitId,
              taxCode: companyInfo.taxCode
            }
            updateInfoOrgUnit(params)
              .then((res) => {
                if (res) {
                  message.success({ content: 'Lưu thay đổi thông tin công ty thành công' })
                  editCompanyInfo.value = false
                  getData()
                }
              })
              .finally(() => {
                loading.value = false
              })
          }
        })
      })
    }

    const openEditFieldActivity = () => {
      if (editCompanyInfo.value) {
        saveCompanyInfo()
      } else if (editContactInfo.value) {
        saveContactInfo()
      } else if (editSignatureInfo.value) {
        saveSignatureInfo()
      } else {
        editFieldActivity.value = true
        editCompanyInfo.value = false
        editContactInfo.value = false
        editSignatureInfo.value = false
      }
    }

    const onChangeFieldActivity = () => {
      console.log('saveCompanyInfo')
    }

    const cancelFieldActivity = () => {
      console.log('cancelFieldActivity')
    }

    const saveFieldActivity = () => {
      console.log('saveFieldActivity')
    }

    const getFieldActivityFieldName = () => {
      let result = ''
      fieldActivityOptions.value.forEach((item) => {
        if (fieldActivity.value.field.includes(item.value)) result += `${item.label} `
      })

      return result
    }

    const getFieldActivityBusinessName = () => {
      const result = listBusiness.value.find((item) => {
        return item.value === fieldActivity.value.business
      })

      return result ? result.name : ''
    }

    const getContactInfo = (data = {}) => {
      contactInfo.phoneNumber = data.phoneNumber
      contactInfo.email = data.email
      contactInfo.website = data.website
      contactInfo.province = data.province
      contactInfo.district = data.district
    }

    const openEditContractInfo = () => {
      if (editCompanyInfo.value) {
        saveCompanyInfo()
      } else if (editFieldActivity.value) {
        saveFieldActivity()
      } else if (editSignatureInfo.value) {
        saveSignatureInfo()
      } else {
        editFieldActivity.value = false
        editCompanyInfo.value = false
        editContactInfo.value = true
        editSignatureInfo.value = false
      }
    }

    const cancelContactInfo = () => {
      Modal.confirm({
        content: 'Bạn có chắc chắc muốn hủy?',
        onOk() {
          getData()
          editContactInfo.value = false
        }
      })
    }

    const saveContactInfo = () => {
      useFormContactInfo.validate().then(() => {
        Modal.confirm({
          content: 'Lưu thay đổi thông tin liên hệ?',
          onOk() {
            loading.value = true
            const params = {
              orgUnitId: orgUnitId,
              district: contactInfo.district,
              province: contactInfo.province,
              email: contactInfo.email,
              phoneNumber: contactInfo.phoneNumber,
              website: contactInfo.website
            }
            updateContactOrgUnit(params)
              .then((rs) => {
                if (rs) {
                  message.success({ content: 'Cập nhật thông tin liên hệ thành công' })
                  editContactInfo.value = false
                  getData()
                }
              })
              .catch(() => {
                message.error({ content: 'Cập nhật thông tin liên hệ thất bại' })
              })
              .finally(() => {
                loading.value = false
              })
          }
        })
      })
    }

    const getSignatureInfo = (data = {}) => {
      signatureInfo.dataTable = [
        {
          key: 1,
          identification: 'Giám đốc',
          titleSigner: data.directorSignerTitle,
          signerName: data.directorSignerName
        },
        {
          key: 2,
          identification: 'Kế toán trưởng',
          titleSigner: data.chiefAccountantSignerTitle,
          signerName: data.chiefAccountantSignerName
        },
        {
          key: 3,
          identification: 'Thủ quỹ',
          titleSigner: data.cashierSignerTitle,
          signerName: data.cashierSignerName
        },
        {
          key: 4,
          identification: 'Thủ kho',
          titleSigner: data.warehouseControllerSignerTitle,
          signerName: data.warehouseControllerSignerName
        },
        {
          key: 5,
          identification: 'Người lập phiếu',
          titleSigner: data.preparedSignerTitle,
          signerName: data.preparedSignerName
        }
      ]
      signatureInfo.includeSignerNameOnReport = data.includeSignerNameOnReport
      signatureInfo.getPlannerNameByUsername = data.getPlannerNameByUsername
    }

    const openEditSignatureInfo = () => {
      if (editCompanyInfo.value) {
        saveCompanyInfo()
      } else if (editFieldActivity.value) {
        saveFieldActivity()
      } else if (editContactInfo.value) {
        saveContactInfo()
      } else {
        editFieldActivity.value = false
        editCompanyInfo.value = false
        editContactInfo.value = false
        editSignatureInfo.value = true
      }
    }

    const cancelSignatureInfo = () => {
      Modal.confirm({
        content: 'Bạn có chắc chắc muốn hủy?',
        onOk() {
          getData()
          editSignatureInfo.value = false
        }
      })
    }

    const saveSignatureInfo = () => {
      useFormSignatureInfo.validate().then(() => {
        Modal.confirm({
          content: 'Lưu thay đổi thông tin chữ ký?',
          onOk() {
            loading.value = true
            const params = {
              orgUnitId: orgUnitId,
              getPlannerNameByUsername: signatureInfo.getPlannerNameByUsername,
              includeSignerNameOnReport: signatureInfo.includeSignerNameOnReport,
              directorSignerTitle: signatureInfo.dataTable[0].titleSigner,
              directorSignerName: signatureInfo.dataTable[0].signerName,
              cashierSignerTitle: signatureInfo.dataTable[1].titleSigner,
              chiefAccountantSignerName: signatureInfo.dataTable[1].signerName,
              chiefAccountantSignerTitle: signatureInfo.dataTable[2].titleSigner,
              cashierSignerName: signatureInfo.dataTable[2].signerName,
              warehouseControllerSignerTitle: signatureInfo.dataTable[3].titleSigner,
              warehouseControllerSignerName: signatureInfo.dataTable[3].signerName,
              preparedSignerTitle: signatureInfo.dataTable[4].titleSigner,
              preparedSignerName: signatureInfo.dataTable[4].signerName
            }
            updateSignatureOrgUnit(params)
              .then((rs) => {
                if (rs) {
                  message.success({ content: 'Cập nhật thông tin chữ ký thành công ' })
                  editSignatureInfo.value = false
                  getData()
                }
              })
              .catch(() => {
                message.error({ content: 'Cập nhật thông tin chữ ký thất bại' })
              })
              .finally(() => {
                loading.value = false
              })
          }
        })
      })
    }

    const handleChangeTableSignatureInfo = (value, key, column) => {
      const newData = [...signatureInfo.dataTable]
      const target = newData.find((item) => key === item.key)
      if (target) {
        target[column] = value
        signatureInfo.dataTable = newData
      }
    }

    const handleClosePage = () => {
      router.push({ name: 'admin.settings.general' })
    }

    const getLogo = (v) => {
      companyInfo.image = v
    }

    const handleSearchBankAccount = (value) => {}

    const handleChangeBankAccount = () => {
      const bankAccount = listBankAccount.value.find((item) => {
        return item.id === companyInfo.bankAccountId
      })

      companyInfo.bankAccountInfo = bankAccount
        ? bankAccount.bankAccountNumber + ' - ' + bankAccount.bankBranchName
        : ''
    }

    // CREATED
    // getData()

    return {
      visible,
      loading,
      fieldActivity,
      listBankAccount,
      select,
      columnsSignatureInfo,
      editCompanyInfo,
      editFieldActivity,
      editContactInfo,
      editSignatureInfo,
      companyInfo,
      validateCompanyInfoInfos,
      loadingUploadAvatar,
      fieldActivityOptions,
      listBusiness,
      contactInfo,
      validateContactInfoInfos,
      signatureInfo,
      keyUpload,
      getCompanyInfo,
      openEditCompanyInfo,
      cancelCompanyInfo,
      saveCompanyInfo,
      openEditFieldActivity,
      onChangeFieldActivity,
      cancelFieldActivity,
      saveFieldActivity,
      getFieldActivityFieldName,
      getFieldActivityBusinessName,
      getContactInfo,
      openEditContractInfo,
      cancelContactInfo,
      saveContactInfo,
      getSignatureInfo,
      openEditSignatureInfo,
      cancelSignatureInfo,
      saveSignatureInfo,
      handleChangeTableSignatureInfo,
      handleClosePage,
      getLogo,
      handleSearchBankAccount,
      handleChangeBankAccount
    }
  }
})
</script>

<style lang="less" scoped>
.ant-table-wrapper {
  margin-left: -8px;
}
.company-info--content-list {
  .company-info--content-item:not(:last-child) {
    border-bottom: 2px solid #f0f0f0;
  }
  .company-info--content-item {
    display: flex;

    .content-item--title {
      flex: 1;
      font-weight: 700;
      display: flex;
      align-items: center;
      border-right: 2px solid #f0f0f0;
    }

    .content-item--table {
      flex: 5;
      padding: 1rem;

      .content-item--table-row {
        width: 100%;
      }
    }
    .content-item--edit {
      width: 100px;
      text-align: center;
      display: flex;
      align-items: center;
      border-left: 2px solid #f0f0f0;
      justify-content: center;

      .content-item--edit-button {
        cursor: pointer;
      }
    }

    .avatar-uploader > .ant-upload {
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
  }
}
</style>
