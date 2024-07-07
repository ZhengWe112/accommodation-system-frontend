<style>
.center {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/login/login1.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  font-size: 30px;
  color: black;
}

.logon {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  /* position: relative;
  overflow: hidden; */
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin-top: 20px;
  display: flex;
  background: -webkit-linear-gradient(right, #4284db, #29eac4);
}

.overlaylong {
  border-radius: 10px 0 0 10px;
  width: 50%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlaylongleft {
  border-radius: 0 10px 10px 0;
  width: 50%;
  height: 100%;
  background-color: #fff;
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlaylongright {
  border-radius: 10px 0 0 10px;
  width: 50%;
  height: 100%;
  background-color: #fff;
  transform: translateX(0%);
  transition: transform 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlaytitle {
  border-radius: 0 10px 10px 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlaytitleH2 {
  font-size: 30px;
  color: #fff;
  margin-top: 20px;
}

.overlaytitleP {
  font-size: 15px;
  color: #fff;
  margin-top: 20px;
}

.overlaytitleleft {
  border-radius: 0 10px 10px 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0%);
  transition: transform 0.6s ease-in-out;
}

.overlaytitleright {
  border-radius: 0 10px 10px 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-100%);
  transition: transform 0.6s ease-in-out;
}

.overlaytitle-Signin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.overlaytitle-Signup {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.buttongohs {
  width: 180px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}

.overlaylongH2 {
  font-size: 25px;
  color: black;
  /* width: 250px; */
}

.overlaylong-Signin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.overlaylong-Signup {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 10px 0;
  width: 240px;
}
h3{
  font-size: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.inuptbutton{
  background-color: #29eac4;
  border: none;
  width: 180px;
  height: 40px;
  border-radius: 50px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin-top: 30px;
}
</style>

<template>
  <div class="center">
    <h1>Sign in/ Sign up</h1>
    <div class="logon">
      <div class=overlaylong>
        <div class="overlaylong-Signin">
          <h2 class="overlaylongH2">Sign in</h2>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="auto" >
            <el-form-item label="账号" prop="number">
              <el-input v-model="loginForm.number"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item label="用户类型" prop="role">
              <el-select v-model="loginForm.role" placeholder="please select your role">
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <button class="inuptbutton" @click="handleSubmit">Sign in</button>
        </div>
      </div>
      <div class=overlaytitle>
        <div class="overlaytitle-Signin">
          <h2 class="overlaytitleH2">Hello,Friend!</h2>
          <p class="overlaytitleP">
            Enter your personal details and start journey with us
          </p>
          <div class="buttongohs" @click="handleSubmit">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {loginApi} from '../../api/login'

export default {
  data () {
    return {
      loginForm: {
        number: '',
        password: '',
        role: ''
      },
      roles: [
        {value: 1, label: '系统管理员'},
        {value: 2, label: '维修管理员'},
        {value: 3, label: '宿舍管理员'},
        {value: 4, label: '分管领导'},
        {value: 5, label: '教师'},
        {value: 6, label: '学生'}
      ]
    }
  },
  computed: {
    loginRules () {
      const validateNumber = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码必须在3位以上'))
        } else {
          callback()
        }
      }
      const validateRole = (rule, value, callback) => {
        if (!value) {
          callback(new Error('用户类型不能为空'))
        } else {
          callback()
        }
      }
      return {
        number: [{ validator: validateNumber, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        role: [{ validator: validateRole, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          let res = await loginApi(this.loginForm)
          if (!res.status) {
            this.$message.warning(res.message)
          } else {
            this.$message.success('登录成功')
            await this.$router.push({path: '/main'})
          }
        }
      })
    }
  }
}
</script>
