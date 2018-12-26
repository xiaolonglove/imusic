<template>
  <div class="loading-wrapper">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style scoped>
  .loading-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    z-index: 10000;
    transform: translateY(-50%);
    text-align: center;
  }
  .loading {
    display: inline-block;
    height: 15px;
  }
  .loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    border-radius: 50%;
    background: #c0d7f5;
    animation: load 1.04s ease infinite;
  }
  .loading span:last-child{
    margin-right: 0px;
  }
  .loading span:nth-child(1){
    animation-delay: 0.13s;
  }
  .loading span:nth-child(2){
    animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    animation-delay:0.65s;
  }
  @keyframes load {
    0%{
      opacity: 1;
      transform: scale(1.3);
    }
    100%{
      opacity: 0.1;
      transform: scale(.3);
    }
  }
</style>
