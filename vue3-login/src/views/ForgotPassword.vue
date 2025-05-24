<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-title">找回密码</h1>
      
      <div class="form-group">
        <label for="email">邮箱地址</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="请输入注册邮箱"
          class="form-input"
        >
      </div>
      
      <div class="form-group">
        <label for="verification-code">验证码</label>
        <div class="code-input-group">
          <input
            id="verification-code"
            type="text"
            v-model="verificationCode"
            placeholder="请输入验证码"
            class="form-input"
          >
          <button 
            class="send-code-btn"
            :disabled="isCountingDown"
            @click="sendVerificationCode"
          >
            {{ isCountingDown ? `${countdown}秒后重试` : '获取验证码' }}
          </button>
        </div>
      </div>
      
      <button @click="handleResetPassword" class="login-button">重置密码</button>
      
      <div class="back-to-login">
        <router-link to="/login">返回登录</router-link>
      </div>
    </div>

    <teleport to="body">
      <div v-if="showModal" class="modal">
        <p>密码重置邮件已发送!</p>
        <button @click="showModal = false">确定</button>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ForgotPassword',
  setup() {
    const email = ref('')
    const verificationCode = ref('')
    const countdown = ref(0)
    const isCountingDown = ref(false)
    const showModal = ref(false)

    const sendVerificationCode = () => {
      if (!email.value) return
      
      isCountingDown.value = true
      countdown.value = 60
      
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
          isCountingDown.value = false
        }
      }, 1000)
    }

    const handleResetPassword = () => {
      if (email.value && verificationCode.value) {
        showModal.value = true
      }
    }

    return {
      email,
      verificationCode,
      countdown,
      isCountingDown,
      showModal,
      sendVerificationCode,
      handleResetPassword
    }
  }
})
</script>

<style scoped>
/* 基准rem设置 */
:root {
  font-size: 62.5%; /* 1rem = 10px */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f8f8;
  padding: 2rem;
  position: relative;
}

.login-form {
  background: white;
  padding: 4rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 48rem;
  margin: 2rem;
  box-sizing: border-box;
}

.login-form:hover {
  transform: translateY(-0.3rem);
}

.login-title {
  font-size: 2.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 3.2rem;
  font-weight: 600;
  line-height: 1.3;
}

.form-group {
  margin-bottom: 2.8rem;
}

.form-group label {
  display: block;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #666;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 1.4rem 1.8rem;
  font-size: 1.6rem;
  border: 0.1rem solid #e0e0e0;
  border-radius: 1rem;
  transition: all 0.3s ease;
  background-color: #fff;
  box-sizing: border-box;
  max-width: 100%;
  line-height: 1.5;
}

.form-input:focus {
  border-color: #06c1ae;
  box-shadow: 0 0 0 0.2rem rgba(6, 193, 174, 0.15);
  outline: none;
}

.form-input::placeholder {
  color: #b8c2cc;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  font-size: 1.4rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.remember-me input {
  width: 1.8rem;
  height: 1.8rem;
  accent-color: #4fc08d;
}

.forgot-password {
  color: #5a6a7d;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #4fc08d;
}

.login-button {
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  font-weight: 500;
  background-color: #06c1ae;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  letter-spacing: 0.1rem;
}

.login-button:hover {
  background-color: #05a895;
  transform: translateY(-0.2rem);
  box-shadow: 0 0.4rem 1.2rem rgba(6, 193, 174, 0.2);
}

.login-button:active {
  transform: translateY(0);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
}

.modal p {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.modal button {
  padding: 1rem 2rem;
  background-color: #06c1ae;
  color: white;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1.6rem;
}

.login-footer {
  margin-top: 4rem;
  text-align: center;
  font-size: 1.4rem;
  color: #999;
  padding-top: 2rem;
  border-top: 0.1rem solid #f0f0f0;
}

.login-footer a {
  color: #06c1ae;
  text-decoration: none;
  margin: 0 1.2rem;
  transition: color 0.3s;
}

.login-footer a:hover {
  color: #05a895;
  text-decoration: underline;
}

/* 找回密码表单样式 */
.code-input-group {
  display: flex;
  gap: 1rem;
}

.code-input-group .form-input {
  flex: 1;
}

.send-code-btn {
  padding: 0 1.6rem;
  background-color: #f5f5f5;
  color: #06c1ae;
  border: 0.1rem solid #e0e0e0;
  border-radius: 1rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.send-code-btn:hover:not(:disabled) {
  background-color: #06c1ae;
  color: white;
  border-color: #06c1ae;
}

.send-code-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.back-to-login {
  margin-top: 2rem;
  text-align: center;
}

.back-to-login a {
  color: #06c1ae;
  text-decoration: none;
  font-size: 1.4rem;
  transition: color 0.3s;
}

.back-to-login a:hover {
  color: #05a895;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 76.8rem) { /* 768px */
  .login-form {
    padding: 3rem;
  }
  
  .login-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 48rem) { /* 480px */
  .login-container {
    padding: 1.6rem;
    align-items: flex-start;
    padding-top: 6rem;
  }
  
  .login-form {
    padding: 2.4rem;
    margin: 0;
  }
  
  .login-title {
    font-size: 2.2rem;
    margin-bottom: 2.4rem;
  }
  
  .form-group {
    margin-bottom: 2rem;
  }
  
  .form-input {
    padding: 1.2rem 1.6rem;
  }
  
  .login-button {
    padding: 1.4rem;
    font-size: 1.6rem;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .forgot-password {
    margin-top: 1.2rem;
  }
  
  .login-footer {
    margin-top: 3rem;
    padding-top: 1.6rem;
  }
}
</style>
