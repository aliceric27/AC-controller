<template>
  <div class="logo">
    <div class="logo-content">
      <div class="logo-img">
        <img class="img" src="/Logo.png" alt="logo" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.logo {
  display: inline-block;
  .logo-content {
    border-radius: 50%;
    padding: 2rem;
    background-color: #fff;
  }
  .logo-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
