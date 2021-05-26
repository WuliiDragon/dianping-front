<template>

  <div class="detail-wrap">
    <Header title="商品详情">

      <div style="margin-left:1px">
        <Button icon="md-arrow-round-back" @click="back"></Button>
      </div>

    </Header>

    <div style="padding-top: 20px">
      <Form :model="formItem" :label-width="80">

        <FormItem label="课程名">
          <Input v-model="courseName" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="courseSchool" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="courseCredit" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="courseTeacher" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
        </FormItem>
        <FormItem label="评价">
          <Input v-model="courseIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5} "
                 placeholder="请输入您的评价"></Input>
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
  computed: {
    _user() {
      console.log(this.$store.state.userInfo);
      return this.$store.state.userInfo;
    }
  },
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

      courseName: '软件综合训练',
      courseSchool: '软件学院',
      courseCredit: '2',
      courseTeacher: '宋永红老师',
      courseIntro: '敏捷软件开发'

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
          'course_name': self.courseName,
          'course_school': self.courseSchool,
          'course_credit': self.courseCredit,
          'course_teacher': self.courseTeacher,
          'course_intro': self.courseIntro
        });

        this.$http.post('http://127.0.0.1:5000/course/insertCourse', data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        ).then((response) => {
          self.$router.push({ name: 'course' });
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
