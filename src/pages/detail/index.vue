<template>

  <div class="detail-wrap">
    <Header title="商品详情">
      <Button :ghost="true" to="/detail">
        <Icon type="ios-arrow-back"/>
        返回
      </Button>
    </Header>

    <!--    <template v-if="isAjax">-->
    <!--      <div class="loading-box">加载中...</div>-->
    <!--      <Loading></Loading>-->

    <!--    </template>-->

    <template>
      <Scroll :data="[data]" isBottom height="800px">
        <div class="goods-box">
          <div class="img-box">
            <img class="img" :src="data.canteen_pic"/>
          </div>


          <div class="intr-box">
            <h2 class="name">{{ data.canteen_name }}</h2>
            <span class="text">{{ data.canteen_district + '区' }}</span>
            <span class="text">{{ data.canteen_floor + '层' }}</span>
            <div class="score-box">
              <span class="text">{{ '总分: ' + data.canteen_score.canteen_score_total }}</span>
              <span class="text">{{ '满意度: ' + data.canteen_score.fullness_score_average }}</span>
              <span class="text">{{ '价格: ' + data.canteen_score.money_score_average }}</span>
              <span class="text">{{ '卫生: ' + data.canteen_score.health_score_average }}</span>
              <span class="text">{{ '卫生: ' + data.canteen_score.taste_score_average }}</span>
              <span class="text">{{ '服务: ' + data.canteen_score.service_score_average }}</span>
            </div>


          </div>
          <div>
            <Button icon="ios-create-outline"
                    @click="to_score">

            </Button>
            <!--            <Button icon="ios-heart"></Button>-->
          </div>
        </div>


        <!-- 商品评论 -->
        <ul class="comments-list">
          <li class="title-box" v-if="data.canteen_comment.length">
            <span class="title">{{ '师生点评 ' + data.canteen_comment.length + '条' }}</span>
          </li>
          <li class="no-comments" v-else>此档口暂无评论</li>

          <li class="item-box" v-for="(item, index) in data.canteen_comment" :key="index">
            <div class="avatar-box">
              <img class="avatar" :src="item.comment_userpic" :alt="item.name"/>
            </div>
            <div class="content-box">
              <div class="username">{{ item.comment_username }}</div>
              <div class="score-box">
              </div>


              <p class="text">{{ item.comment_content }}</p>
              <div class="pic-bar" v-if="item.comment_pic.length">
                <ul class="pic-list">
                  <li class="pic-box" v-for="(_item, _index) in item.comment_pic" :key="_index">
                    <img class="pic" :src="_item" alt/>
                  </li>
                </ul>

              </div>
              <div v-if="userInfo.permission" class="distance" style="float: right;" onClick="">
                <Button type="error" shape="circle" icon="ios-trash"
                        @click="to_delete_comment(item.comment_id)"></Button>
              </div>

              <div v-if="flags">

              </div>
              <div v-else>

              </div>

              <div style="float: right;" >
                <Icon type="arrow-right-a"></Icon>

                <Button  v-show="!item.click_like" type="text" icon="ios-heart" @click="to_like(item.comment_id,index)">{{ item.comment_like }}</Button>
                <Button  v-show="item.click_like"  type="error"    @click="to_like(item.comment_id,index)">{{ item.comment_like }}</Button>
              </div>


            </div>
          </li>
        </ul>
      </Scroll>

    </template>

  </div>
</template>

<script>
import { Star, Loading } from '@/components';
import { mapState } from 'vuex';
import Qs from 'qs';

export default {
  name: 'Detail',
  components: { Star, Loading },
  data() {
    return {
      id: 0,
      flags:true,
      goods: {
        store: {},
        comments: []
      },
      comment_click:[],
      data: {
        canteen_comment: []
      },
    };
  },

  methods: {
    to_delete_comment(comment_id) {
      console.log(comment_id);
      this.$Modal.confirm({
        title: '确认对话框标题',
        content: '确定删除评论信息？',
        onOk: () => {

          try {
            var self = this;
            var data = Qs.stringify({
              'user_id': self.userInfo.user_id,
              'comment_id': comment_id,
            });

            this.$http.post('http://127.0.0.1:5000/comment/deleteComment', data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }
            ).then((response) => {
              this.$router.go(0);
              console.log(response);

            });
          } catch (e) {
          }
        },
        onCancel: () => {

        }
      });
    },
    to_like(comment_id,index) {
      var self = this;
      this.data.canteen_comment[index].click_like = !this.data.canteen_comment[index].click_like
      // console.log(this.data.canteen_comment[index].click_like)
      this.flags = !this.flags


      if (this.data.canteen_comment[index].click_like){
        var data = Qs.stringify({
          'user_id': self.userInfo.user_id,
          'comment_id': comment_id,
        });

        this.$http.post('http://127.0.0.1:5000/comment/like', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        ).then((response) => {
          self.data.canteen_comment[index].comment_like = response.comment_like
          console.log(response);
        });

      }else{

        var data = Qs.stringify({
          'user_id': self.userInfo.user_id,
          'comment_id': comment_id,
        });

        this.$http.post('http://127.0.0.1:5000/comment/dislike', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        ).then((response) => {
          self.data.canteen_comment[index].comment_like = response.comment_like
          console.log(response);
        });

      }



    },
    to_score() {
      // console.log(this.userInfo)
      if (this.isLogin) {
        this.$router.push({ name: 'score', params: { canteen_id: this.canteen_id, user_id: 1 } });
      } else {
        this.$Message.success('登录才能提交评论');
      }

    },

    async handleFetchData() {
      var self = this;

      try {
        this.$http.get('http://127.0.0.1:5000/canteen/' + this.canteen_id).then((response) => {

          this.data = response;

          for (let i = 0; i < response.canteen_comment.length; i++) {
            this.data.canteen_comment[i].click_like=false;
          }


        });
      } catch (e) {
      }
    }
  },
  mounted() {
    console.log(this.userInfo);

  },
  computed: mapState(['userInfo', 'isLogin']),

  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        // +的作用是隐式转化
        this.canteen_id = +val.params.canteen_id;
        console.log(this.canteen_id);
        this.handleFetchData();
      },
      immediate: true,
      deep: true
    },
  }
};
</script>

<style lang="scss" scoped>
.detail-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;

  .loading-box {
    @include frow();
    height: 100px;
  }

  .goods-box {
    display: flex;
    padding: 15px;
    box-sizing: border-box;

    .img-box {
      width: 116px;
      height: 87px;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .intr-box {
      flex: 1;
      padding-left: 15px;
      font-size: 12px;
      color: $fs999;

      .name {
        font-size: 14px;
        color: $fs333;
      }

      .other-box,
      .store-name,
      .score-box {
        @include frow(flex-start);
        margin-top: 10px;

        .text {
          margin-left: 15px;
        }
      }

      .score-box {
        .text {
          margin: 0 5px 0 0;
        }
      }
    }
  }

  .store-box {
    .item-box {
      @include frow(flex-start);
      height: 35px;
      margin: 0 15px;
      border-top: 1px solid $bdeee;

      .iconfont {
        color: $fs999;
      }

      .text {
        font-size: 12px;
        margin-left: 10px;
      }
    }
  }

  .comments-list {
    font-size: 12px;

    .title-box,
    .no-comments {
      @include frow(space-between);
      height: 40px;
      padding: 0 15px;
      background: $bgeee;
    }

    .no-comments {
      justify-content: center;
    }

    .item-box {
      display: flex;
      margin: 0 15px;
      padding: 15px 0;

      &:nth-of-type(n + 3) {
        border-top: 1px solid $bdeee;
      }

      .avatar-box {
        width: 35px;
        height: 35px;
        border: 1px solid $bdeee;
        border-radius: 50%;
        overflow: hidden;
        background: url(./img/avatar.png) no-repeat center;
        background-size: contain;

        .avatar {
          width: 100%;
          height: 100%;
        }
      }

      .content-box {
        flex: 1;
        padding-left: 15px;
        overflow: hidden;

        .star-box,
        .text,
        .pic-bar {
          margin-top: 10px;
        }

        .text {
          line-height: 1.5;
        }

        .pic-bar {
          overflow: hidden;

          .pic-list {
            display: inline-table;
            white-space: nowrap;

            .pic-box {
              display: inline-table;
              width: 80px;
              height: 80px;

              &:nth-of-type(n + 2) {
                margin-left: 15px;
              }

              .pic {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  .handle-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    @include frow(flex-start);
    height: 50px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      border-top: 1px solid $bdeee;
    }

    .btn {
      @include frow();
      flex: 1;
      height: 100%;

      &.active {
        color: $fswhite;
        background: $bgf33;
      }

      &:nth-of-type(n + 2) {
        border-left: 1px solid $bdeee;
      }
    }

    .btn-cart {
      color: $bgwhite;
      background: $bgf33;
    }

    .btn-buy {
      color: $bgwhite;
      background: $bgdf2;
    }
  }
}
</style>
