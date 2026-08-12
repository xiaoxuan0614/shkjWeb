<template>
  <div>
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>CONTACT</h1>
        <h2>联系我们</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt; 联系我们
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- 联系信息 -->
          <div class="contact-info">
            <h3>联系方式</h3>
            <div class="info-item">
              <span class="info-icon">📞</span>
              <div>
                <div class="info-label">服务热线</div>
                <div class="info-value">022-66220191</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">📍</span>
              <div>
                <div class="info-label">办公地址</div>
                <div class="info-value">天津市滨海新区京门大道 396 号</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">📧</span>
              <div>
                <div class="info-label">电子邮箱</div>
                <div class="info-value">shkj2023@shouhuikeji.cn</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">🕐</span>
              <div>
                <div class="info-label">工作时间</div>
                <div class="info-value">周一至周五 9:00-18:00</div>
              </div>
            </div>
          </div>

          <!-- 留言表单 -->
          <div class="contact-form">
            <h3>在线留言</h3>
            <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submitForm">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入您的姓名" maxlength="20" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入您的联系电话" maxlength="20" clearable />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入您的邮箱" maxlength="50" clearable />
              </el-form-item>

              <el-form-item label="公司名称" prop="company">
                <el-input v-model="form.company" placeholder="请输入您的公司名称" maxlength="50" clearable />
              </el-form-item>

              <el-form-item label="咨询类型" prop="types">
                <el-select v-model="form.types" multiple :max-collapse-tags="3" collapse-tags collapse-tags-tooltip placeholder="请选择咨询类型" style="width: 100%">
                  <el-option
                    v-for="opt in options"
                    :key="opt"
                    :label="opt"
                    :value="opt"
                  />
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" class="submit-btn" :loading="submitting" @click="submitForm" v-debounce="() => {}">提交留言</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../utils/request'

const formRef = ref(null)
const submitting = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  types: []
})

const options = [
  '智能闸口',
  '场站系统建设',
  '硬件设备采购',
  '项目报价与方案对接',
  '售后运维、故障调试',
  '商务协同合作',
  '其他需求'
]

// ==========================================
// 危险词黑名单 - 姓名和公司名称
// ==========================================
const DANGEROUS_WORDS = [
  '国家领导人', '习近平', '总书记', '总统', '总理', '主席',
  '政府', '共产党', '国民党', '党政', '腐败', '贪污',
  '分裂国家', '造反', '恐怖', '爆炸', '杀人', '谋杀',
  '自杀', '自残', '帮派', '黑社会', '犯罪', '抢劫',
  '宗教', '信仰', '伊斯兰', '基督教', '天主教', '佛教',
  '色情', '性', '淫秽', '成人', '性器官',
  '赌博', '博彩', '诈骗', '非法', '违法', '洗钱', '传销'
]

function filterInput(content) {
  if (!content) return ''
  let result = String(content)
  DANGEROUS_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi')
    result = result.replace(regex, '')
  })
  return result
}

const filteredName = computed(() => filterInput(form.name))
const filteredCompany = computed(() => filterInput(form.company))

const validateName = (rule, value, callback) => {
  const filtered = filterInput(value)
  if (filtered !== value) {
    callback(new Error('请删除姓名中的敏感信息后再提交'))
    return
  }
  if (!value || value.trim().length < 2) {
    return callback(new Error('请输入有效的姓名，至少 2 个字符'))
  }
  callback()
}

const validateCompany = (rule, value, callback) => {
  const filtered = filterInput(value)
  if (filtered !== value) {
    callback(new Error('请删除公司名中的敏感信息后再提交'))
    return
  }
  if (!value || value.trim().length < 2) {
    return callback(new Error('请输入有效的公司名称，至少 2 个字符'))
  }
  callback()
}

const validatePhone = (rule, value, callback) => {
  if (!value) return callback()
  const mobileRe = /^1[3-9]\d{9}$/
  const landlineRe = /^(0\d{2,3}[-]?\d{7,8})([-]?\d{1,5})?$/
  if (!mobileRe.test(value) && !landlineRe.test(value)) {
    return callback(new Error('请输入正确的手机号或座机号码'))
  }
  callback()
}

const rules = reactive({
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { max: 20, message: '姓名不能超过 20 个字符', trigger: 'blur' },
    { validator: validateName, trigger: 'input' }
  ],
  phone: [
    { required: true, message: '请输入您的联系电话', trigger: 'blur' },
    { max: 20, message: '电话不能超过 20 个字符', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '请输入您的公司名称', trigger: 'blur' },
    { max: 50, message: '公司名称不能超过 50 个字符', trigger: 'blur' },
    { validator: validateCompany, trigger: 'input' }
  ],
  types: [{ required: true, type: 'array', min: 1, message: '请选择至少一项咨询类型', trigger: 'change' }]
})

async function submitForm() {
  try {
    await formRef.value.validate()
  } catch {
    return
  }

  submitting.value = true
  try {
    const data = await request.post('/api/contact', {
      ...form,
      message: form.types.join(', ')
    })
    if (data.success) {
      ElMessage.success('提交成功，我们会尽快与您联系！')
      formRef.value.resetFields()
    } else {
      ElMessage.error(data.message || '提交失败')
    }
  } catch(error) {
  //   const res = error.response
  // if(res?.status === 400 && res.data){
  //   ElMessage.error(res.data.message || '参数校验失败')
  // }else{
  //   ElMessage.error('网络错误，请稍后重试')
  // }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page-hero {
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.75) 0%, rgba(26, 60, 124, 0.6) 100%);
}

.page-hero-content {
  position: relative;
  z-index: 1;
}

.page-hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.page-hero-content h2 {
  font-size: 26px;
  font-weight: 400;
  opacity: 0.9;
}

.page-breadcrumb {
  position: absolute;
  bottom: 20px;
  right: calc(50% - 600px);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.page-breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.page-breadcrumb a:hover {
  color: #fff;
}

.contact-section {
  padding: 60px 0;
  background: var(--white);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h3,
.contact-form h3 {
  font-size: 22px;
  color: var(--brand-primary);
  margin-bottom: 30px;
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  border-radius: 10px;
  flex-shrink: 0;
}

.info-label {
  font-size: 13px;
  color: #999;
  margin-bottom: 4px;
}

.info-value {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  background: var(--brand-primary);
  border-color: var(--brand-primary);
}

.submit-btn:hover {
  background: #153066;
  border-color: #153066;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: var(--text-primary);
}

:deep(.el-input__wrapper) {
  height: 40px;
  border-radius: 6px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
  transition: box-shadow 0.3s;
}

:deep(.el-select__wrapper) {
  height: 40px;
  border-radius: 6px;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--brand-primary) inset;
}

:deep(.el-select .el-input__wrapper) {
  height: 40px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
  .page-hero-content h1 { font-size: 28px; }
  .page-hero-content h2 { font-size: 18px; }
}

@media (max-width: 480px) {
  .page-hero {
    height: 220px;
  }
  .page-hero-content h1 {
    font-size: 22px;
    letter-spacing: 1px;
  }
  .page-hero-content h2 {
    font-size: 14px;
  }
  .contact-section {
    padding: 40px 0;
  }
  .contact-info h3,
  .contact-form h3 {
    font-size: 18px;
  }
}
</style>
