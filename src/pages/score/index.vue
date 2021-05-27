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
          <Input v-model="context" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>

        <FormItem label="味道">
          <Rate v-model="score.score_taste"/>
        </FormItem>

        <FormItem label="满意度">
          <Rate v-model="score.score_fullness"/>
        </FormItem>


        <FormItem label="卫生">
          <Rate v-model="score.score_health"/>
        </FormItem>


        <FormItem label="价格">
          <Rate v-model="score.score_money"/>
        </FormItem>

        <FormItem label="服务">
          <Rate v-model="score.score_service"/>
        </FormItem>
        <FormItem label="图片">

          <div>

            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <div style="width: 116px;height: 87px;">
                <img :src="item.url" style="width: 100%;height: 100%;">
                </div>
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
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
import Qs from 'qs'
import { mapState } from 'vuex';

export default {
  data() {

    return {
      submitData: { // 这里是需要携带的数据
        srcLanguage: "en",
        zone_id:'1',
        pic_zone:'2'
      },

      imgName: '',
      visible: false,
      uploadList: [],

      context: '秘制小汉堡，臭豆腐，腐乳，加柠檬，老干妈，既然实惠，还管饱，你看这汉堡做的行不行！',
      score: {
        score_taste: 2,
        score_health: 3,
        score_money:4 ,
        score_service: 1,
        score_fullness: 2,
      }
    };
  },
  methods: {
    back() {
      console.log(this.post_id);
      this.$router.push({ name: 'detail', params: { window_no: this.post_id } });
    },
    insert() {

      // if (!this.$store.state.isLogin){
      //     alert('您还未登录')
      //     return
      // }
      try {
        var pic_ids=""

        for(let i=0;i<this.uploadList.length;i++){
          var pic = this.uploadList[i]
          pic_ids += pic.id+'_'
        }
        console.log(pic_ids)

        var self = this;
        var data = Qs.stringify({
          'user_id': this.userInfo.user_id,
          'zone_id': this.canteen_id,
          'comment_zone': 1,
          'comment_content': self.context,
          'taste_score': self.score.score_taste,
          'health_score': self.score.score_health,
          'money_score': self.score.score_money,
          'service_score': self.score.score_service,
          'fullness_score': self.score.score_fullness,
          'pic_list':pic_ids
        })


        this.$http.post('http://127.0.0.1:5000/comment/insertComment',data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        ).then((response) => {
          if(response.msg=='评论插入成功'){
              self.$router.push({ name: 'detail', params: { canteen_id: self.canteen_id } });
          }


        });
      } catch (e) {
      }
    },

    handleView (name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      this.uploadList.push(
        {
          name:'',
          url:res.pic_url,
          id:res.pic_id,
          status:'finished'
        }

      )
      console.log(this.uploadList)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 9;
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 9 张图片。'
        });
      }
      return check;
    },
  },
  mounted() {
  },
  computed: mapState(['userInfo', 'isLogin']),

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
