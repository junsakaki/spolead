<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown" class="page-header SP">
      <div class="layer" />
      <div class="page-title">
        ALL SPORTS BEGINING
        <br>
        SpoLeadeR
      </div>
    </div>
    <div v-else class="page-header">
      <div class="layer" />
      <div class="page-title">
        ALL SPORTS BEGINING
        <br>
        SpoLeadeR
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';

.page-header {
  @include default-page-header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100vw;
  height: 50vh;
  margin-top: -72px;
  background-color: blue;
  background-image: url('../../../assets/images/top.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: default;
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #40404075;
  }
  .page-title {
    position: absolute;
    bottom: 16px;
    left: 96px;
    font-size: 32px;
    color: white;
  }
}
.page-header.SP {
  margin-top: -12px;
  height: 30vh;
  max-height: 300px;
  .page-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 100%;
    font-size: 20px;
    text-align: center;
  }
}
</style>
