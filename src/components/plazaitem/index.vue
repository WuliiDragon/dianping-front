<template>
  <ul class="item-wrap" :class="{padding: isHome}">

    <template >
      <li class="item-box" v-for="(item, index) in list" :key="index" @click="$router.push({name: 'plazadetail', params: {plaza_id: item.plaza_id}})">
        <div class="img-box">
          <img class="img" :src="item.plaza_pic" :alt="item.name" />
        </div>

        <div class="intr-box">
          <div class="top-box">
            <h3 class="name">{{item.plaza_name}}</h3>
            <div v-if="userInfo.permission" class="distance">
              <Button type="error" shape="circle" icon="ios-trash" @click.stop="deleteplaza(item.plaza_id)"></Button>
            </div>
          </div>
          <div class="top-box">

            <h3 class="name">{{item.plaza_district}}</h3>
            <div class="distance">{{item.plaza_type}} </div>
            <div class="distance">{{item.plaza_intro}} </div>
          </div>

          <div class="bottom-box">
            <div class="price-box">
              <Rate
                :count="10"
                disabled
                v-model="item.plaza_score.plaza_score_total" />
            </div>
          </div>
        </div>
      </li>
    </template>

  </ul>
</template>

<script>
import Star from '@/components/star';
import { mapState } from 'vuex';
import Qs from "qs";

export default {
  name: 'PlazaItem',
  components: { Star },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    isHome: {
      type: Boolean,
      default: false
    },
    isCart: {
      type: Boolean,
      default: false
    },
    isShowDel: {
      type: Boolean,
      default: false
    }
  },
  activated() {
    console.log(this.userInfo.root);
  },
  methods: {
    deleteplaza(id) {
      this.$Modal.confirm({
          title: '确认对话框标题',
          content: '确定删除档口以及相关评论信息？',
          onOk: () => {
            var self = this;
            var data = Qs.stringify({
              'user_id': self.user_id,
              'plaza_id': id
            });
            console.log(id);
            this.$http.post('http://127.0.0.1:5000/plaza/deletePlaza', data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }
            ).then((response) => {
              location.reload();
            });
          },
        onCancel: () => {

        }
      });
    },

  },
  computed: mapState(['userInfo', 'isLogin'])

};
</script>

<style lang="scss" scoped>
.item-wrap {
  &.padding {
    padding: 0 15px;
    .item-box {
      @include frow(flex-start);
      padding: 15px 0;
    }
  }
  .item-box {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid $bdeee;
    .img-box {
      width: 116px;
      height: 87px;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .intr-box {
      @include fcol(space-between, stretch);
      flex: 1;
      height: 87px;
      padding: 5px 0 5px 15px;
      font-size: 12px;
      overflow: hidden;
      box-sizing: border-box;
      .top-box {
        @include frow(space-between, baseline);
        .name {
          font-size: 14px;
          color: $fs333;
        }
        .distance {
          color: $fs999;
        }
      }
      .desc {
        height: 30px;
        line-height: 1.2;
        text-align: justify;
        color: $fs999;
        overflow: hidden;
      }
      .bottom-box {
        @include frow(space-between, baseline);
        .price-box {
          @include frow(flex-start, baseline);
          .price {
            font-size: 14px;
            font-weight: bold;
            color: $fsf33;
          }
          .old-price {
            margin-left: 8px;
            text-decoration: line-through;
            color: $fs999;
          }
        }
        .sales {
          color: $fs999;
        }
      }
    }
    .intr-box2 {
      position: relative;
      flex: 1;
      padding-left: 15px;
      font-size: 12px;
      overflow: hidden;
      box-sizing: border-box;
      .btn-del {
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px 15px;
        color: $fswhite;
        border-radius: 5px;
        background: $bgf33;
      }
      .goods-name {
        font-size: 14px;
        color: $fs333;
      }
      .other-box {
        @include frow(flex-start);
        margin-top: 5px;
        .text {
          margin-left: 5px;
        }
      }
      .store-name {
        margin-top: 5px;
        color: $fs999;
      }
      .promotion-list {
        margin-top: 5px;
        ._item-box {
          @include frow(flex-start);
          height: 26px;
          color: $fs333;
          border-top: 1px solid $bdeee;
          .iconfont {
            color: $fsf33;
            margin-right: 7px;
          }
        }
      }
    }
  }
  .item-box2 {
    display: flex;
    padding: 15px 15px 15px 0;
    border-bottom: 1px solid $bdeee;
    .check-box {
      @include frow();
      width: 50px;
      .btn-check {
        position: relative;
        width: 25px;
        height: 25px;
        border: 1px solid $bdeee;
        border-radius: 50%;
        &:after {
          content: '';
          position: absolute;
          left: 3px;
          top: 3px;
          right: 3px;
          bottom: 3px;
          border-radius: 50%;
          transform: scale(0);
          transition: 0.3s;
          background: $bgf33;
        }
        &.on:after {
          transform: scale(1);
        }
      }
    }
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
      font-size: 14px;
      overflow: hidden;
      box-sizing: border-box;
      .goods-name {
        font-size: 14px;
        color: $fs333;
      }
      .star-box {
        margin-top: 8px;
      }
      .price {
        margin-top: 8px;
        color: $fs999;
      }
      .btn-box {
        @include frow(flex-end);
        .btn {
          @include frow();
          width: 25px;
          height: 25px;
          .iconfont {
            color: $fs999;
            font-size: 24px;
          }
        }
      }
      .num {
        @include frow(center, stretch);
        width: 40px;
      }
    }
  }
}
</style>
