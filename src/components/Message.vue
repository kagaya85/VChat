<template>
  <div class="message">
    <div class="bubble">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {};
  }
};
</script>


<style scoped>
.message {
  margin: 0px 8px 20px 8px;
}

.bubble{
  display: inline-block;
  position: relative;
  padding: 15px;
  left: 0px;
  line-height: 1.2; 
  background: #fff;
  border-radius: 15px;
}

.bubble:before {
  content: '';
  position: absolute;
  top: -8px;
  left: -15px;
  height: 30px;
  width: 15px;
  background-color: #fff;  
  border-bottom-left-radius: 40px 60px;
}

.bubble:after {
  content: '';
  position: absolute;
  top: -8px;
  left: -15px;
  width: 15px;
  height: 20px;
  background-color: #f2f2f2;
  border-bottom-left-radius: 100px 40px;
}

</style>
