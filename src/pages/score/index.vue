<template>

  <div class="detail-wrap">
    <Header title="商品详情">

      <div style="margin-left:1px">
        <Button  icon="md-arrow-round-back" @click="back"></Button>
      </div>

    </Header>

        <div style="padding-top: 20px">
      <Form :model="formItem" :label-width="80" >


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

        <FormItem>
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
<!--          <Upload-->
<!--            ref="upload"-->
<!--            :show-upload-list="false"-->
<!--            :default-file-list="defaultList"-->
<!--            :on-success="handleSuccess"-->
<!--            :format="['jpg','jpeg','png']"-->
<!--            :max-size="2048"-->
<!--            :on-format-error="handleFormatError"-->
<!--            :on-exceeded-size="handleMaxSize"-->
<!--            :before-upload="handleBeforeUpload"-->
<!--            multiple-->
<!--            type="drag"-->
<!--            action="//jsonplaceholder.typicode.com/posts/"-->
<!--            style="display: inline-block;width:58px;">-->
<!--            <div style="width: 58px;height:58px;line-height: 58px;">-->
<!--              <Icon type="ios-camera" size="20"></Icon>-->
<!--            </div>-->
<!--          </Upload>-->
          <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
          </Modal>


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
export default {
  data() {
    return {
      context:'',
      score:{
        score_taste:0,
          score_health:0,
          score_money:0,
          score_service:0,
          score_fullness:0,
      }
    };
  },
  methods: {
    back(){
      console.log(this.post_id)
      this.$router.push({name: 'detail' ,params:{window_no: this.post_id}})
    },
    insert() {

      if (!this.$store.state.isLogin){
          alert('您还未登录')
          return
      }
      try {
        var self = this

        this.$http.post('http://localhost:5000/api/insertComment',{
          'user_id':1,
          'post_id':self.post_id,
          'content':self.context,
          'score_taste':self.score.score_taste,
          'score_health':self.score.score_health,
          'score_money':self.score.score_money,
          'score_service':self.score.score_service,
          'score_fullness':self.score.score_fullness,
        }).then((response) => {
          self.$router.push({name: 'detail' ,params:{window_no: self.post_id}})

        });
      } catch (e) {
      }
    }
  },
  mounted() {
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());

        this.post_id = +val.params.post_id;
        this.user_id = +val.params.user_id;
      },
      immediate: true,
      deep: true
    }
  }



};
</script>
