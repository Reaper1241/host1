<template>
  <svg
    class="strelka"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    fill="none"
    v-on="$attrs"
    :class="$attrs.class"
    :style="$attrs.style"
  >
    <circle cx="25" cy="25" r="25" fill="#D2122B" />
    <path
      d="M31.0607 26.0607C31.6464 25.4749 31.6464 24.5251 31.0607 23.9393L21.5147 14.3934C20.9289 13.8076 19.9792 13.8076 19.3934 14.3934C18.8076 14.9792 18.8076 15.9289 19.3934 16.5147L27.8787 25L19.3934 33.4853C18.8076 34.0711 18.8076 35.0208 19.3934 35.6066C19.9792 36.1924 20.9289 36.1924 21.5147 35.6066L31.0607 26.0607ZM29 26.5H30V23.5H29V26.5Z"
      fill="white"
    />
  </svg>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})
</script>


