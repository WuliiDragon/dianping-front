<template>
  <div class="mine-wrap">
    <Header title="个人中心"></Header>
    <scroll isBottom :data="[_user]">
      <div class="user-box">
        <div class="avatar-box">
          <img class="avatar" :src="_user.user_pic" alt="头像" />
        </div>
        <div class="name">{{_user.name}}</div>
        <div>
          <Upload
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            action="http://localhost:5000/pic/uploadUserPhoto">
            <Button class="btn-logout" icon="ios-cloud-upload-outline">点击上传头像</Button>
          </Upload>
          <div v-if="file !== null">Upload file: {{ file.name }}
            <Button class="btn-logout" type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
          </div>
        </div>
        <div class="manager" v-if="this._user.permission=='1'">
          <Button class="btn-logout"  @click="value3 = true" type="primary">发布公告</Button>
          <Drawer
            title="Create"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
          >
            <Form :model="bulletin">
              <FormItem label="标题" label-position="top">
                <Input v-model="bulletin.title" placeholder="please enter title" />
              </FormItem>
              <FormItem label="内容" label-position="top">
                <Input type="textarea" v-model="bulletin.content" :rows="4" placeholder="please enter the bulltin" />
              </FormItem>
            </Form>
            <div class="demo-drawer-footer">
              <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
              <Button type="primary" @click="insertbulletin">Submit</Button>
            </div>
          </Drawer>
        </div>
        <div class="btn-logout" @click="handleLogout">退出</div>
      </div>

    </scroll>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data() {
    return {
      value3: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      bulletin: {
        title: '',
        content: ''
      },
      file: null,
      loadingStatus: false
    };
  },
  computed: {
    _user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    handleLogout() {
      this.$confirm({
        msg: '你确定要退出登录吗？',
        confirm: () => {
          this.$store.commit('$handleLogin', { isLogin: 0, userInfo: {} });

          this.$router.push({ name: 'home' });
        }
      });
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    insertbulletin() {
      var param = new FormData();
      param.append('admin_id', this._user.user_id);
      param.append('bulletin_title', this.bulletin.title);
      param.append('bulletin_content', this.bulletin.content);
      this.$http.post('http://localhost:5000/bulletin/insertBulletin', param);
      this.value3 = false;
    },
    async upload() {
      console.log(this._user.user_id)
      this.loadingStatus = true;
      var param = new FormData();
      param.append('user_pic', this.file);
      param.append('user_id', this._user.user_id);
      this.$http.post('http://localhost:5000/pic/uploadUserPhoto', param).then((response) =>{
        const { pic_route: avatar } = response;
        console.log(response);
        this._user.user_pic = avatar;
        this.$store.commit('$handleLogin', { isLogin: 1, userInfo: this._user });
        console.log(this._user);
      });
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
  }
};
</script>

<style lang="scss" scoped>
.ivu-layout-header {
  background: #f3394e;
  padding: 0 50px;
  height: 64px;
  line-height: 64px;
}
.mine-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;
  .user-box {
    @include fcol(flex-start);
    padding: 30px 0 20px;
    .avatar-box {
      width: 60px;
      height: 60px;
      padding: 5px;
      border: 1px solid $bdeee;
      border-radius: 50%;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      @include frow();
      margin-top: 10px;
    }
    .btn-logout {
      @include frow();
      width: 120px;
      height: 42px;
      margin-top: 20px;
      color: $fswhite;
      border-radius: 50px;
      background: $bgf33;
    }
  }
}
</style>
