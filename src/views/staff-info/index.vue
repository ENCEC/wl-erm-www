<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px">
      <div class="staff-info wrap">
        <div class="staff-info-module">
          <div class="staff-info-module-title">基本信息</div>
          <el-divider />
          <div class="staff-info-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    v-model="formData.name"
                    placeholder="请输入姓名"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 性别（0男，1女） -->
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="formData.sex">
                    <el-radio
                      v-for="item in sexOptions"
                      :key="'sex' + item.value"
                      :label="item.value"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="formData.birthday"
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
                  <el-radio-group v-model="formData.jobStatus">
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
                    v-model="formData.idCard"
                    placeholder="请输入身份证号码"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="mobile">
                  <el-input
                    v-model="formData.mobile"
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
                    v-model="formData.address"
                    placeholder="请输入现住址"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="户籍地址:" prop="sourceAddress">
                  <el-input
                    v-model="formData.sourceAddress"
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
                    v-model="formData.maritalStatus"
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
                <!-- TODO -->
                <el-form-item label="政治面貌:" prop="projectId2">
                  <el-select
                    v-model="formData.projectId2"
                    placeholder="请选择政治面貌"
                    clearable
                    class="input-width"
                  >
                    <el-option
                      v-for="(item,index) in politicsOptions"
                      :key="'projectId2'+index+item.projectId"
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
                    v-model="formData.education"
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
                    v-model="formData.graduateDate"
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
                    v-model="formData.graduateSchool"
                    placeholder="请输入毕业学校"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="在校专业:" prop="speciality">
                  <el-input
                    v-model="formData.speciality"
                    placeholder="请输入在校专业"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="入职时间:" prop="entryDate">
                  <el-date-picker
                    v-model="formData.entryDate"
                    format="yyyy-MM-dd"
                    class="input-width"
                    placeholder="请选择入职时间"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入职部门:" prop="uemDeptId">
                  <el-select
                    v-model="formData.uemDeptId"
                    placeholder="请选择入职部门"
                    clearable
                    class="input-width"
                  >
                    <el-option
                      v-for="(item) in deptOptions"
                      :key="'uemDeptId'+item.uemDeptId"
                      :label="item.deptName"
                      :value="item.uemDeptId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="入职岗位:" prop="staffDutyCode">
                  <el-select
                    v-model="formData.staffDutyCode"
                    placeholder="请选择入职岗位"
                    clearable
                    class="input-width"
                  >
                    <el-option
                      v-for="(item,index) in staffDutyOptions"
                      :key="'staffDutyCode'+index+item.staffDutyCode"
                      :label="item.staffDuty"
                      :value="item.staffDutyCode"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="岗位职称:" prop="technicalTitleId">
                  <el-select
                    v-model="formData.technicalTitleId"
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
                    v-model="formData.email"
                    placeholder="请输入电子邮箱"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作年限:" prop="seniority">
                  <el-input
                    v-model="formData.seniority"
                    placeholder="请输入工作年限"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="staff-info-module">
          <div class="staff-info-module-title">毕业学校信息</div>
          <el-divider />
        </div>
        <div class="staff-info-module">
          <div class="staff-info-module-title">入职信息</div>
          <el-divider />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'StaffInfo',
  data() {
    return {
      form: {
        account: '',
        name: '',
        sex: '',
        birthday: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        idCard: '',
        mobile: '',
        address: '', // 现住址
        sourceAddress: '', // 户籍地址
        maritalStatus: '', // 婚姻状况（0：未婚 1：已婚 2：离婚）
        // 政治面貌
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
        projectId: '' // 归属项目
      },
      sexOptions: this.$dict.getDictOptions('SEX'), // 性别
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'), // 婚姻状况
      educationOptions: this.$dict.getDictOptions('EDUCATION'), // 学历
      technicalOptions: [], // 岗位职称
      staffDutyOptions: [], // 入职岗位
      projectTypeOptions: [], // 归属项目
      politicsOptions: []
    };
  }
};
</script>

<style>
</style>
