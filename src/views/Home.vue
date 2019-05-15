<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-aside width="300px" class="user-list">
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
      </el-aside>
      <el-container>
        <el-header>title</el-header>
        <el-main>

        </el-main>
        <el-main>
          <InputBox></InputBox>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
import UserItem from '@/components/UserItem'
import InputBox from '@/components/InputBox'
import Message from '@/components/Message'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    UserItem,
    InputBox,
    Message
  }
}
</script>

<style scoped>

</style>
