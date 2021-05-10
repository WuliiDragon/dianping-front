<template>

  <div class="detail-wrap">
    <Header title="商品详情">

      <div style="margin-left:1px">
        <Button  icon="md-arrow-round-back" @click="$router.push({name: 'detail' ,params:{id:1}})"></Button>
      </div>

    </Header>

    <div style="padding-top: 20px">


      <Form :model="formItem" :label-width="80">


        <FormItem label="评价">
          <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入您的评价"></Input>
        </FormItem>


        <FormItem label="味道">
          <Rate v-model="value"/>
        </FormItem>

        <FormItem label="外型">
          <Rate v-model="value"/>
        </FormItem>

        <FormItem>
          <Button type="primary">提交评价</Button>
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
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    };
  }
};
</script>
