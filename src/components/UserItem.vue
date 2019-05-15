<template>
  <div class="user-item">
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
export default {
  name: "userItem",
  props: {
    username: String
  }
};
</script>