
<template>
  <div class="staff-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="720px"
      center
      :close-on-click-modal="false"
      top="10vh"
      destroy-on-close
      z-index="10000"
      :append-to-body="true"
      v-on="$listeners"
    >
      <div class="btn-exchange">
        <el-button type="primary" @click="handleLookBasic">基本信息</el-button>
        <el-button v-if="form.jobStatus==='1'" type="primary" @click="handleLookRegular">转正评语</el-button>
        <el-button v-if="form.leaveReason" type="primary" @click="handleLookLeave">离职原因</el-button>
        <el-button v-if="form.dismissReason" type="primary" @click="handleLookDismiss">辞退原因</el-button>
      </div>
      <el-form
        ref="elForm"
        v-loading="formLoading"
        :model="form"
        :rules="rules"
        :inline="false"
        size="mini"
        label-width="100px"
        :disabled="type === 'detail'"
      >
        <div v-if="lookType==='basic'" class="form-wrap">

          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别（0男，1女） -->
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="form.sex">
                  <!-- <el-radio
                    v-for="item in sexOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio> -->
                  <el-radio :label="false">男</el-radio>
                  <el-radio :label="true">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                  v-model="form.birthday"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择出生日期"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 在职状态（0：试用员工 1：正式员工 2：离职员工） -->
              <el-form-item label="在职状态:" prop="jobStatus">
                <el-radio-group v-model="form.jobStatus">
                  <el-radio
                    v-for="item in jobStatusOptions"
                    :key="'jobStatus' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号码:" prop="idCard">
                <el-input
                  v-model="form.idCard"
                  placeholder="请输入身份证号码"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                  v-model="form.mobile"
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="现住址:" prop="address">
                <el-input
                  v-model="form.address"
                  placeholder="请输入现住址"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户籍地址:" prop="sourceAddress">
                <el-input
                  v-model="form.sourceAddress"
                  placeholder="请输入户籍地址"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="婚姻状况:" prop="maritalStatus">
                <el-select
                  v-model="form.maritalStatus"
                  placeholder="请选择婚姻状况"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in maritalStatusOptions"
                    :key="'maritalStatus'+item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- TODO 下拉值-->
              <el-form-item label="政治面貌:" prop="politicalStatus">
                <el-select
                  v-model="form.politicalStatus"
                  placeholder="请选择政治面貌"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in politicsOptions"
                    :key="'politicalStatus' + index"
                    :label="politicsOptions[index].label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历:" prop="education">
                <el-select
                  v-model="form.education"
                  placeholder="请选择学历"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in educationOptions"
                    :key="'education'+item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间:" prop="graduateDate">
                <el-date-picker
                  v-model="form.graduateDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择毕业时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业学校:" prop="graduateSchool">
                <el-input
                  v-model="form.graduateSchool"
                  placeholder="请输入毕业学校"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在校专业:" prop="speciality">
                <el-input
                  v-model="form.speciality"
                  placeholder="请输入在校专业"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="entryDate">
                <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker
                  v-model="form.entryDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职部门:" prop="uemDeptId">
                <Department v-model="form.uemDeptId" clearable placeholder="请选择入职部门" class="input-width" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyId">
                <StaffDuty v-model="form.staffDutyId" class="input-width" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位职称:" prop="technicalTitleId">
                <el-select
                  v-model="form.technicalTitleId"
                  placeholder="请选择岗位职称"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in technicalOptions"
                    :key="'technicalTitleId'+item.technicalTitleId"
                    :label="item.technicalName"
                    :value="item.technicalTitleId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input
                  v-model="form.email"
                  placeholder="请输入电子邮箱"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作年限:" prop="seniority">
                <el-input
                  v-model="form.seniority"
                  placeholder="请输入工作年限"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- TODO 联想控件 -->
              <el-form-item label="归属项目:" prop="projectId">
                <el-select
                  v-model="form.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in projectTypeOptions"
                    :key="'projectId'+index+item.uemProjectId"
                    :label="item.projectName"
                    :value="item.uemProjectId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form :model="form" label-width="100px" label-position="right">
                <el-form-item label="个人简历:">
                  <el-button v-if="form.resume" class="btn-attachment" type="text" @click="handleLookResume">{{ form.name }}个人简历</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-if="type === 'detail'"
                label="创建时间:"
              >
                <el-input
                  v-model="form.createTime"
                  placeholder="请输入创建时间"
                  clearable
                  class="input-width"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-if="type === 'detail'"
                label="创建人:"
              >
                <el-input
                  v-model="form.creatorName"
                  placeholder="请输入创建人"
                  clearable
                  class="input-width"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!--  -->
        <div v-if="lookType === 'regular'||lookType === 'leave'||lookType === 'dismiss'" class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别（0男，1女） -->
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="form.sex">
                  <!-- <el-radio
                    v-for="item in sexOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio> -->
                  <el-radio :label="false">男</el-radio>
                  <el-radio :label="true">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="entryDate">
                <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker
                  v-model="form.entryDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 在职状态（0：试用员工 1：正式员工 2：离职员工） -->
              <el-form-item label="在职状态:" prop="jobStatus">
                <el-radio-group v-model="form.jobStatus">
                  <el-radio
                    v-for="item in jobStatusOptions"
                    :key="'jobStatus' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职部门:" prop="uemDeptId">
                <Department v-model="form.uemDeptId" clearable placeholder="请选择入职部门" class="input-width" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyId">
                <StaffDuty v-model="form.staffDutyId" class="input-width" />
              </el-form-item>
            </el-col>
            <template v-if="lookType === 'leave'">
              <el-col :span="12">
                <el-form-item label="离职日期:" prop="leaveDate">
                  <el-date-picker
                    v-model="form.leaveDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择离职日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="离职原因：" prop="leaveReason" :hide-required-asterisk="false">
                  <el-input
                    v-model="form.leaveReason"
                    type="textarea"
                    placeholder="请输入离职原因"
                    clearable
                    style="width:500px"
                  />
                </el-form-item>
              </el-col>
            </template>
            <template v-if="lookType === 'dismiss'">
              <el-col :span="12">
                <el-form-item label="辞退日期:" prop="dismissDate">
                  <el-date-picker
                    v-model="form.dismissDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择辞退日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="辞退原因：" prop="dismissReason" :hide-required-asterisk="false">
                  <el-input
                    v-model="form.dismissReason"
                    type="textarea"
                    placeholder="请输入辞退原因"
                    clearable
                    style="width:500px"
                  />
                </el-form-item>
              </el-col>
            </template>
            <template v-if="lookType === 'regular'">
              <el-col :span="12">
                <el-form-item label="转正日期:" prop="offerDate">
                  <el-date-picker
                    v-model="form.offerDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择转正日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="转正类型:" prop="offerType">
                  <el-radio-group v-model="form.offerType">
                    <el-radio
                      v-for="item in offerTypeOptions"
                      :key="'offerType' + item.value"
                      :label="item.value"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12.5">
                <el-form-item label="转员工答辩成绩:" prop="faceScore" label-width="140px">
                  <el-input
                    v-model="form.faceScore"
                    clearable
                    placeholder="请输入转员工答辩成绩"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="11.5">
                <el-form :model="form" label-width="80px" label-position="right">
                  <el-form-item label="附件:" prop="interviewerName" label-width="80px">
                    <el-button v-if="form.resume" class="btn-attachment" type="text" @click="handleLookResume">{{ form.name }}个人简历</el-button>
                    <el-button v-if="form.staffApplication" class="btn-attachment" type="text" @click="handleLookQuestionnaire">{{ form.name }}转正申请表</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12.5">
                <el-form-item label="面谈评语:" prop="interviewerName" label-width="140px">
                  <el-input
                    v-model="form.interviewerName"
                    clearable
                    placeholder="请输入面谈评语"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="faceRemark" label-width="140px">
                  <el-input
                    v-model="form.faceRemark"
                    clearable
                    type="textarea"
                    :rows="3"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12.5">
                <el-form-item label="转正评语:" prop="approverName" label-width="140px">
                  <el-input
                    v-model="form.approverName"
                    clearable
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="offerRemark" label-width="140px">
                  <el-input
                    v-model="form.offerRemark"
                    clearable
                    type="textarea"
                    :rows="3"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="type === 'detail'" label="创建时间:">
                  <el-input
                    v-model="form.createTime"
                    placeholder="请输入创建时间"
                    clearable
                    class="input-width"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="type === 'detail'" label="创建人:">
                  <el-input
                    v-model="form.creatorName"
                    placeholder="请输入创建人"
                    clearable
                    class="input-width"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button
          type="primary"
          :plain="true"
          size="mini"
          @click="close"
        >{{ type === 'detail'?'关闭':'取消' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryStaffById, updateStaff } from '@/api/staff-manage';
import { queryOfferInfo, downloadExternalFile } from '@/api/staff-query';
// import { preservationUemUser } from '@/api/staff-query.js';
import { queryTechnicalNameBySelect, queryProjectNameBySelect } from '@/api/select-02';
import { formRules } from './rules';
import Department from '@/components/CurrentSystem/copy/Department.vue'
import StaffDuty from '@/components/CurrentSystem/copy/StaffDuty.vue'
export default {
  components: { Department, StaffDuty },
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formLoading: false,
      lookType: 'basic', // basic查看基本信息，regular查看转正评语
      rules: formRules, // 验证规则
      form: {
        uemUserId: '',
        name: '',
        sex: '',
        birthday: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        idCard: '',
        mobile: '',
        address: '', // 现住址
        sourceAddress: '', // 户籍地址
        maritalStatus: '', // 婚姻状况（0：未婚 1：已婚 2：离婚）
        politicalStatus: '', //  政治面貌
        education: '', // 学历（0：专科 1：本科 2：研究生 3：博士生）
        graduateDate: '', // 毕业时间
        graduateSchool: '', //
        speciality: '', // 在校专业
        entryDate: '', // 入职时间
        uemDeptId: '', // 入职部门
        staffDutyId: '', // 入职岗位
        technicalTitleId: '', // 岗位职称
        email: '', // 邮箱地址
        resume: '', // 简历fileKey
        dismissApplication: '', // 辞退fileKey
        staffApplication: '', // 转正申请表fileKey
        seniority: '', // 工作年限
        projectId: '', // 归属项目,
        offerDate: '', // 转正日期
        offerType: '', // 转正类型
        faceScore: '', // 答辩成绩
        interviewerName: '',
        faceRemark: '', // 面谈评语
        approverName: '',
        offerRemark: '', // 转正评语
        creatorName: '', // 创建人
        createTime: '', // 创建时间
        // offerDate，offerType，faceScore，interviewerName,faceRemark,approverName,offerRemark

        dismissDate: '',
        dismissReason: '',
        leaveDate: '',
        leaveReason: ''

      },
      // sexOptions: this.$dict.getDictOptions('SEX'),
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'),
      educationOptions: this.$dict.getDictOptions('EDUCATION'),
      offerTypeOptions: this.$dict.getDictOptions('OFFER_TYPE'),
      politicsOptions: this.$dict.getDictOptions('POLITICAL_STATUS'), // 政治面貌
      technicalOptions: [], // 岗位职称
      projectTypeOptions: []
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      return this.type === 'detail' ? '员工详细信息' : '编辑员工信息';
    },
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS')
    }
  },
  watch: {},
  created() {
    this.getSelectOptions()
  },
  mounted() {},
  methods: {
    // 查看个人’简历‘
    handleLookResume() {
      const params = {
        systemId: 'YYDM200013',
        fileKey: this.form.resume
      };
      downloadExternalFile(params)
        .then((res) => {
          const fileName = res.file.substring(0, res.file.lastIndexOf('.'));
          console.log(res);
          const base = res.file; // 你要传入的base64数据
          const bstr = window.atob(base);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 确定解析格式，可能可以变成img，没有深入研究
          const blob = new Blob([u8arr], {
            type: 'application/pdf;chartset=UTF-8'
          });
          const url = window.URL.createObjectURL(blob);
          // 在新窗口打开该pdf用这个
          window.open(url);
          // 下载dpf用这个
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', fileName + '.pdf');
          a.setAttribute('target', '_blank'); // 打开一个新的窗口
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // 删除url绑定
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          this.$message.error('下载文件失败')
        });
    },
    // 查看个人’试用期调查表‘
    handleLookQuestionnaire() {
      const params = {
        systemId: 'YYDM200013',
        fileKey: this.form.staffApplication
      };
      downloadExternalFile(params)
        .then((res) => {
          const fileName = res.file.substring(0, res.file.lastIndexOf('.'));
          console.log(res);
          const base = res.file; // 你要传入的base64数据
          const bstr = window.atob(base);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 确定解析格式，可能可以变成img，没有深入研究
          const blob = new Blob([u8arr], {
            type: 'application/pdf;chartset=UTF-8'
          });
          const url = window.URL.createObjectURL(blob);
          // 在新窗口打开该pdf用这个
          window.open(url);
          // 下载dpf用这个
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', fileName + '.pdf');
          a.setAttribute('target', '_blank'); // 打开一个新的窗口
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // 删除url绑定
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          this.$message.error('下载文件失败')
        });
    },
    // 点击‘基本信息’按钮
    handleLookBasic() {
      this.lookType = 'basic'
    },
    // 点击‘转正评语’按钮
    async handleLookRegular() {
      await this.getOfferInfo()
      this.lookType = 'regular'
    },
    // 点击‘离职原因’按钮
    handleLookLeave() {
      this.lookType = 'leave'
    },
    // 点击‘辞退原因’按钮
    handleLookDismiss() {
      this.lookType = 'dismiss'
    },
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    getOfferInfo() {
      const arr = ['offerDate', 'createTime', 'creatorName', 'offerType', 'faceScore', 'interviewerName', 'faceRemark', 'approverName', 'offerRemark']
      const params = {
        dispatchers: this.editData.uemUserId,
        name: this.form.name
      }
      queryOfferInfo(params).then((res) => {
        if (!(res.success)) {
          for (const key of arr) {
            this.form[key] = ''
          }
        } else {
          const data = Object.assign({}, res.data[1], res.data[0])
          for (const key of arr) {
            this.form[key] = data[key] || ''
          }
        }
      }).catch((err) => {
        this.$message.error(
          err.errorMessages ? err.errorMessages[0] : '查看转正评语失败'
        );
      });
    },
    // 获取用户信息
    getDetailInfo() {
      this.formLoading = true
      queryStaffById({
        uemUserId: this.editData.uemUserId
      }).then(res => {
        for (const key in this.form) {
          if (key === 'sex') {
            this.form[key] = res[key] || false
          } else {
            this.form[key] = res[key] || ''
          }
        }
        this.formLoading = false
        // this.form = {
        //   ...this.form,
        //   ...res,
        //   jobStatus: res.jobStatus || '',
        //   entryDate: res.entryDate || '',
        //   uemDeptId: res.uemDeptId || '',
        //   staffDutyId: res.staffDutyId || '',
        //   technicalTitleId: res.technicalTitleId || '',
        //   projectId: res.projectId || ''
        // };
      }).catch(() => {
        this.$$message.error('获取员工信息失败')
        this.formLoading = false
      })
    },
    // 获取下拉信息
    async getSelectOptions() {
      this.technicalOptions = await queryTechnicalNameBySelect()
      this.projectTypeOptions = await queryProjectNameBySelect()
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          updateStaff({ uemUserId: this.editData.uemUserId, ...this.form }).then(res => {
            this.$message.success(res.data);
            this.$emit('getTableData', '');
            this.close();
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.staff-dialog {

  .form-wrap {
    min-height:480px;
    margin-bottom: 20px;
    .input-width {
      width: 180px !important;
    }
  }

}
  .btn-attachment{
    span{
      text-decoration: underline;
    }
  }
    .btn-exchange{
    margin-bottom: 10px;
  }
</style>
