<template>
    <div>
      <input
        type="date"
        :max="maxDate"
        v-model="birthDate"
        @input="validateDate"
        :class="{ 'error': !isValid }"
      />
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        birthDate: '',
        isValid: true,
        errorMessage: '',
        maxDate: new Date().toISOString().split('T')[0] // Сегодняшняя дата как максимальная
      }
    },
    methods: {
      validateDate() {
        if (!this.birthDate) {
          this.isValid = false
          this.errorMessage = 'Пожалуйста, введите дату рождения'
          return
        }
  
        const today = new Date()
        const birthDate = new Date(this.birthDate)
        
        // Проверка на валидность даты
        if (birthDate > today) {
          this.isValid = false
          this.errorMessage = 'Дата рождения не может быть в будущем'
          return
        }
  
        // Вычисление возраста
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
  
        // Проверка на 18 лет
        if (age < 18) {
          this.isValid = false
          this.errorMessage = 'Вам должно быть не менее 18 лет'
          return
        }
  
        this.isValid = true
        this.errorMessage = ''
        
        // Здесь можно добавить emit события или другую логику
        this.$emit('update:modelValue', this.birthDate)
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    border: 1px solid red;
  }
  
  .error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
    display: block;
  }
  
  input[type="date"] {
    width: 100%;
    padding: 5px;
    border: var(--border);
  }
  </style>