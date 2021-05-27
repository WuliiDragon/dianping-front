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

        <FormItem label="学术">
          <Rate v-model="score.academic_score"/>
        </FormItem>

        <FormItem label="负担">
          <Rate v-model="score.burden_score"/>
        </FormItem>


        <FormItem label="难度">
          <Rate v-model="score.difficulty_score"/>
        </FormItem>


        <FormItem label="趣味">
          <Rate v-model="score.fun_score"/>
        </FormItem>

        <FormItem label="流行">
          <Rate v-model="score.popularity_score"/>
        </FormItem>

        <FormItem label="实用">
          <Rate v-model="score.practicality_score"/>
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
      context: '第三次来了',
      score: {
        academic_score: 2,
        fun_score: 3,
        practicality_score: 4,
        difficulty_score: 1,
        burden_score: 2,
        popularity_score: 2
      }
    };
  },
  methods: {
    back() {
      console.log(this.course_id);
      this.$router.push({ name: 'coursedetail', params: { course_id: this.course_id } });
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
          'user_id': self.user_id,
          'zone_id': self.course_id,
          'comment_zone': 2,
          'comment_content': self.context,
          'academic_score': self.score.academic_score,
          'fun_score': self.score.fun_score,
          'practicality_score': self.score.practicality_score,
          'difficulty_score': self.score.difficulty_score,
          'burden_score': self.score.burden_score,
          'popularity_score': self.score.popularity_score,
          'pic_list': pic_ids
        })


        this.$http.post('http://127.0.0.1:5000/comment/insertComment',data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        ).then((response) => {
          if(response.msg=='评论插入成功'){
              self.$router.push({ name: 'coursedetail', params: { course_id: self.course_id } });
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
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        this.course_id = +val.params.course_id;
        this.user_id = +val.params.user_id;
      },
      immediate: true,
      deep: true
    }
  }

};
</script>
