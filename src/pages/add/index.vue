<template>

  <div class="detail-wrap">
    <Header title="商品详情">

      <div style="margin-left:1px">
        <Button icon="md-arrow-round-back" @click="back"></Button>
      </div>

    </Header>

    <div style="padding-top: 20px">
      <Form :model="formItem" :label-width="80">

        <FormItem label="档口名称">
          <Input v-model="canteenName" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入档口名称"></Input>
        </FormItem>
        <FormItem label="区域">
          <Input v-model="canteenDistrict" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入档口所在区域"></Input>
        </FormItem>
        <FormItem label="楼层">
          <Input v-model="canteenFloor" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="餐厅所在楼层"></Input>
        </FormItem>
        <FormItem label="详细描述">
          <Input v-model="canteenIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入详细信息"></Input>
        </FormItem>

        <FormItem label="图片">
          <div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :data="submitData"
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
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="insert">添加档口</Button>
          <Button style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>

    </div>

  </div>

</template>
<script>
import Qs from 'qs';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      imgName: '',
      visible: false,
      canteenName: '秘制小汉堡',
      canteenDistrict: '1',
      canteenFloor: '1',
      canteenIntro: '汉堡王',
      pic_id:0,

      submitData: { // 这里是需要携带的数据
        srcLanguage: "en",
        pic_zone:'3'
      },

    };
  },
  methods: {
    back() {
      console.log(this.post_id);
      this.$router.push({ name: 'home' });
    },
    insert() {

      console.log(this.pic_id)
      if (this.pic_id == 0){
        this.$Message.info('请添加一张图片');
        return
      }

      try {
        var self = this;
        var data = Qs.stringify({
          'user_id': self.userInfo.user_id,
          'canteen_name': self.canteenName,
          'canteen_district': self.canteenDistrict,
          'canteen_floor': self.canteenFloor,
          'canteen_intro': self.canteenIntro,
          'pic_id':self.pic_id,
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
    handleSuccess(res, file) {
      console.log(res.pic_id)
      this.pic_id = res.pic_id
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
      return true;
    }
  },
  mounted() {
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        this.canteen_id = +val.params.canteen_id;
      },
      immediate: true,
      deep: true
    }
  },
  computed: mapState(['userInfo', 'isLogin']),


};
</script>
