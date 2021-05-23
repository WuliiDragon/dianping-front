<template>

  <div class="detail-wrap">
    <Header title="商品详情">

      <div style="margin-left:1px">
        <Button icon="md-arrow-round-back" @click="back"></Button>
      </div>

    </Header>

    <div style="padding-top: 20px">
      <Form :model="formItem" :label-width="80">

        <FormItem label="评价">
          <Input v-model="canteenName" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="canteenDistrict" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="canteenFloor" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="canteenIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>

        <FormItem label="图片">

          <div>

            <div class="demo-upload-list" v-for="item in uploadList">

              <template v-if="item.status === 'finished'">

                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>

            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="http://127.0.0.1:5000/pic/uploadPic"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="insert">提交评价</Button>
          <Button style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>

    </div>

  </div>

</template>
<script>
import Qs from 'qs';

export default {
  data() {
    return {

      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [
        {
        'name': 'bc7521e033abdd1e92222d733590f104',
        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
      }
      ],

      canteenName: '和园',
      canteenDistrict: '黄焖鸡',
      canteenFloor: '1',
      canteenIntro: '黄焖鸡'

    };
  },
  methods: {
    back() {
      console.log(this.post_id);
      this.$router.push({ name: 'home' });
    },
    insert() {
      // if (!this.$store.state.isLogin){
      //     alert('您还未登录')
      //     return
      // }
      try {
        var self = this;
        var data = Qs.stringify({
          'user_id': self.user_id,
          'canteen_name': self.canteenName,
          'canteen_district': self.canteenDistrict,
          'canteen_floor': self.canteenFloor,
          'canteen_intro': self.canteenIntro,
        });

        this.$http.post('http://127.0.0.1:5000/canteen/insertCanteen', data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        ).then((response) => {
          self.$router.push({ name: 'home' });
        });
      } catch (e) {
      }
    },

    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      // 因为上传过程为实例，这里模拟添加 url
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 9;
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 9 张图片。'
        });
      }
      return check;
    }
  },
  mounted() {
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        this.canteen_id = +val.params.canteen_id;
        this.user_id = +val.params.user_id;
      },
      immediate: true,
      deep: true
    }
  }

};
</script>
