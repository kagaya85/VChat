<template>
  <div>
    <el-input
      type="textarea"
      :rows="5"
      :placeholder="$t('messagePlaceholder')"
      v-model.trim="textarea"
      @keyup.enter.native="sendClicked"
    ></el-input>
    <div class="input-bar">
      <div class="char-count">
        <span>{{textarea.length}}</span>
        /
        <span>{{maxlen}}</span>
      </div>
      <el-button type="primary" @click="sendClicked">{{$t('send')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sendBox",
  data() {
    return {
      textarea: "",
      maxlen: 500
    };
  },
  watch: {
    textarea: function() {
      this.textarea = this.textarea.substring(0, this.maxlen);
    }
  },
  methods: {
    sendClicked: function() {
      if(this.textarea.length == 0)
        return;
      this.$emit('send', this.textarea);
      this.textarea = "";
    }
  }
};
</script>

<style scoped>
.char-count {
  display: inline;
  margin-right: 10px;
}

.input-bar {
  margin-top: 10px;
  text-align: right;
}
</style>
