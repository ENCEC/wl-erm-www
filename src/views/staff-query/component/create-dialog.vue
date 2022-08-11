
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
      v-on="$listeners"
    >
      <div class="btn-exchange">
        <el-button type="primary" @click="handleLookBasic">基本信息</el-button>
        <el-button type="primary" @click="handleLookRegular">转正评语</el-button>
      </div>
      <el-form
        ref="elForm"
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
                    v-for="(item,index) in projectTypeOptions"
                    :key="'politicalStatus'+index+item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
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
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <StaffDuty v-model="form.staffDutyCode" class="input-width" />
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
                    :key="'projectId'+index+item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人简历:">
                <el-button type="text">个人简历</el-button>
              </el-form-item>
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
        <div v-if="lookType === 'regular'" class="form-wrap">
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
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <StaffDuty v-model="form.staffDutyCode" class="input-width" />
              </el-form-item>
            </el-col>
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
              <el-form-item label="转正类型:" prop="positiveType">
                <el-radio-group v-model="form.positiveType">
                  <el-radio
                    v-for="item in positiveTypeOptions"
                    :key="'positiveType' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12.5">
              <el-form-item label="转员工答辩成绩:" prop="defenseScore" label-width="140px">
                <el-input
                  v-model="form.defenseScore"
                  clearable
                  placeholder="请输入转员工答辩成绩"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11.5">
              <el-form-item label="附件:" prop="interviewerName" label-width="80px">
                <el-button class="btn-attachment" type="text" @click="handleLookResume">个人简历</el-button>
                <el-button class="btn-attachment" type="text" @click="handleLookQuestionnaire">试用期调查表</el-button>
              </el-form-item>
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
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
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
import { queryOfferInfo } from '@/api/staff-query';
// import { preservationUemUser } from '@/api/staff-query.js';
import { queryTechnicalNameBySelect, queryProjectNameBySelect } from '@/api/select';
import { formRules } from './rules';
import Department from '@/components/CurrentSystem/Department.vue'
import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
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
        staffDutyCode: '', // 入职岗位
        technicalTitleId: '', // 岗位职称
        email: '',
        seniority: '', // 工作年限
        projectId: '', // 归属项目,
        offerDate: '', // 转正日期
        positiveType: '', // 转正类型
        defenseScore: '', // 答辩成绩
        interviewerName: '',
        faceRemark: '', // 面谈评语
        approverName: '',
        offerRemark: '', // 转正评语
        creatorName: '', // 创建人
        creatorTime: ''// 创建时间
        // offerDate，positiveType，defenseScore，interviewerName,faceRemark,approverName,offerRemark
      },
      // sexOptions: this.$dict.getDictOptions('SEX'),
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'),
      educationOptions: this.$dict.getDictOptions('EDUCATION'),
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE'),
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
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
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
    },
    // 查看个人’试用期调查表‘
    handleLookQuestionnaire() {
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
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    getOfferInfo() {
      const arr = ['offerDate', 'positiveType', 'defenseScore', 'interviewerName', 'faceRemark', 'approverName', 'offerRemark']
      const params = {
        dispatcher: this.editData.uemUserId,
        name: this.form.name
      }
      queryOfferInfo(params).then((res) => {
        debugger
        const data = Object.assign({}, res[0], res[1])
        for (const key of arr) {
          this.form[key] = data[key] || ''
        }
      })
    },
    // 获取用户信息
    getDetailInfo() {
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
        // this.form = {
        //   ...this.form,
        //   ...res,
        //   jobStatus: res.jobStatus || '',
        //   entryDate: res.entryDate || '',
        //   uemDeptId: res.uemDeptId || '',
        //   staffDutyCode: res.staffDutyCode || '',
        //   technicalTitleId: res.technicalTitleId || '',
        //   projectId: res.projectId || ''
        // };
      });
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
  .btn-exchange{
    margin-bottom: 10px;
  }
  .form-wrap {
    min-height:480px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
    }
  }
  .btn-attachment{
    &>span{
      text-decoration: underline;
    }
  }
}
</style>
