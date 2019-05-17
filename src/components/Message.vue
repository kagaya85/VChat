<template>
  <div :class="['message', isMe ? 'is-me' : 'not-me']">
    <div v-if="!isMe" class="username">{{username}}</div>
    <div class="bubble">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    isMe: Boolean,
    username: String
  }
};
</script>


<style scoped>
.message {
  margin: 0px 8px 20px 8px;
}

.username {
  /* display: inline; */
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
}

.bubble{
  display: inline-block;
  position: relative;
  padding: 15px;
  line-height: 1.2; 
  background: #fff;
  border-radius: 15px;
}

.is-me {
  text-align: right;
}

.not-me {
  text-align: left;
}

.not-me .bubble:before {
  content: '';
  position: absolute;
  top: -8px;
  left: -15px;
  height: 30px;
  width: 15px;
  background-color: #fff;  
  border-bottom-left-radius: 40px 60px;
}

.not-me .bubble:after {
  content: '';
  position: absolute;
  top: -8px;
  left: -15px;
  width: 15px;
  height: 20px;
  background-color: #f2f2f2;
  border-bottom-left-radius: 100px 40px;
}

.is-me .bubble:before {
  content: '';
  position: absolute;
  top: -8px;
  right: -15px;
  height: 30px;
  width: 15px;
  background-color: #fff;  
  border-bottom-right-radius: 40px 60px;
}

.is-me .bubble:after {
  content: '';
  position: absolute;
  top: -8px;
  right: -15px;
  width: 15px;
  height: 20px;
  background-color: #f2f2f2;
  border-bottom-right-radius: 100px 40px;
}

</style>
