<template>

  <div class="detail-wrap">

    <Header title="商品详情">

      <Button :size="buttonSize"  :ghost="true" to="/detail">
        <Icon type="ios-arrow-back" />
        返回
      </Button>


    </Header>

    <template v-if="isAjax">
      <div class="loading-box">加载中...</div>
      <Loading></Loading>

    </template>
    <!-- 主体内容 -->
    <template v-else>

      <Scroll :data="[goods]" isBottom  height="800px">

        <div class="goods-box">


          <div class="img-box">
            <img class="img" :src="goods.imgUrl" :alt="goods.name" />
          </div>

          <div class="intr-box">
            <h2 class="name">{{goods.name}}</h2>
            <div class="other-box">
              <Star :score="goods.star"></Star>
              <span class="text">{{goods.comments.length + '条'}}</span>
              <span class="text">{{'￥'+ goods.price + '/份'}}</span>
            </div>
            <div class="store-name">{{goods.store.name}}</div>
            <div class="score-box">
              <span class="text">{{'口味:' + goods.store.taste}}</span>
              <span class="text">{{'环境:' + goods.store.environment}}</span>
              <span class="text">{{'服务:' + goods.store.service}}</span>
            </div>


          </div>
          <div >

            <Button icon="ios-create-outline"
                    @click="$router.push({name: 'score', params: {id: 1}})">

            </Button>

            <Button icon="ios-heart"></Button>

          </div>
        </div>
        <!-- 店铺信息 -->
        <ul class="store-box">

          <li class="item-box">
            <i class="iconfont icon-time" />
            <span class="text">{{'营业时间' + goods.store.businessHours}}</span>
          </li>
          <li class="item-box">
            <i class="iconfont icon-tel" />
            <span class="text">{{goods.store.tel}}</span>
          </li>
        </ul>
        <!-- 商品评论 -->
        <ul class="comments-list">
          <li class="title-box" v-if="goods.comments.length">
            <span class="title">{{'师生点评'+ goods.comments.length +'条'}}</span>
          </li>
          <li class="no-comments" v-else>此商品暂无评论</li>
          <li class="item-box" v-for="(item, index) in goods.comments.slice(0, 3)" :key="index">
            <div class="avatar-box">
              <img class="avatar" :src="item.avatar" :alt="item.name" />
            </div>
            <div class="content-box">
              <div class="username">{{item.name}}</div>
              <div class="star-box">
                <Star :score="item.star"></Star>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="pic-bar" v-if="item.pics.length">
                <ul class="pic-list">
                  <li class="pic-box" v-for="(_item, _index) in item.pics" :key="_index">
                    <img class="pic" :src="_item" alt />
                  </li>
                </ul>
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

export default {
  name: 'Detail',
  components: { Star, Loading },
  data() {
    return {
      id: 0,
      goods: {
        store: {},
        comments: []
      },
      isAjax: false
    };
  },
  computed: {
    _isCollect() {
      if (this.$store.state.isLogin === 0) {
        return false;
      }
      return !!this.$store.state.collectList.find(item => item.id === this.id);
    }
  },
  methods: {


    async handleFetchData() {

      try {
        this.$http.get('http://localhost:5000/api/getWindowInfo?window_no').then((response) => {
          // this.form.list = [...this.form.list, ...response.windows_list];
          // for (let i in this.form.list) {
          //   let win =  this.form.list[i]
          //   win.window_pic= 'http://localhost:5000/img/'+win.window_pic
          //   console.log(win)
          //   // win['window_pic'] = 'http://localhost:5000'+window_pic['window_pic']
          //
          // }


        });
      } catch (e) {
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        // +的作用是隐式转化
        this.window_no = +val.params.window_no;
        this.handleFetchData();
      },
      immediate: true,
      deep: true
    }
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
