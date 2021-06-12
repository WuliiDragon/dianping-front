<template>
  <div class="mine-wrap">
    <Header title="个人中心"></Header>

    <scroll isBottom :data="[_user]" height="1000px" style="padding-bottom: 100px">

      <div class="user-box">
        <div>
          <Upload
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            action="http://localhost:5000/pic/uploadUserPhoto">
            <div class="avatar-box">
              <img class="avatar" :src="_user.user_pic" alt="头像"/>
            </div>
          </Upload>
          <div v-if="file !== null">Upload file: {{ file.name }}
            <Button class="btn-logout" type="text" @click="upload" :loading="loadingStatus">
              {{ loadingStatus ? 'Uploading' : 'Click to upload' }}
            </Button>
          </div>
        </div>
        <div class="name">{{ _user.user_name }}</div>


      </div>

      <div>
        <List  border size="large">
          <ListItem>

          </ListItem>
          <ListItem @click.native="$router.push({name: 'userrecord', params: {user_id: _user.user_id}})">我的发帖</ListItem>
          <ListItem @click.native="value3 = true">
            <div class="manager" v-if="this._user.permission=='1'">
<!--              <Button class="btn-logout" @click="value3 = true" type="primary">发布公告</Button>-->
              <span >
                发布公告
              </span>
              <Drawer
                title="发布公告"
                v-model="value3"
                width="220"
                :mask-closable="false"
                :styles="styles"
              >
                <Form :model="bulletin" >
                  <FormItem label="标题" label-position="top">
                    <Input v-model="bulletin.title" placeholder="请输入标题"/>
                  </FormItem>
                  <FormItem label="内容" label-position="top">
                    <Input type="textarea" v-model="bulletin.content" :rows="4" placeholder="请输入公告内容"/>
                  </FormItem>
                </Form>
                <div class="demo-drawer-footer">
                  <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                  <Button type="primary" @click="insertbulletin">发布</Button>
                </div>
              </Drawer>
            </div>
          </ListItem>

          <ListItem @click.native="aboutUs=true">关于我们</ListItem>
          <Modal
            v-model="aboutUs"
            title="关于我们"
            ok-text="了解"
            cancel-text=" ">
            <p>创新港七嘴八舌团队</p>
            <p>有问题请联系 1184646300@qq.com</p>

          </Modal>
          <ListItem @click.native="handleLogout">退出登录</ListItem>
        </List>
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
      aboutUs:false,
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
    test() {
      console.log('test')
    },
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
      console.log(this._user.user_id);
      this.loadingStatus = true;
      var param = new FormData();
      param.append('user_pic', this.file);
      param.append('user_id', this._user.user_id);
      this.$http.post('http://localhost:5000/pic/uploadUserPhoto', param).then((response) => {
        const { pic_route: avatar } = response;
        console.log(response);
        this._user.user_pic = avatar;
        this.$store.commit('$handleLogin', { isLogin: 1, userInfo: this._user });
        console.log(this._user);
      });
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success');
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
