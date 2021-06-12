<template>
  <div class="home-wrap">
    <div class="header-bar">
      <Button  :ghost="true" to="/">
        <Icon type="ios-arrow-back" />
        返回
      </Button>
    </div>

    <Tabs value="name1" :animated="false">
      <TabPane label="我的评论" name="name1">

        <Scroll isBottom height="800px" :data="comments_list">
          <div>
            <ul class="comments-list">

              <li class="item-box" v-for="(item, index) in comments_list" :key="index">
                <hr>
                <div class="content-box" style="margin-left:20px">

                  <span style="margin-top: 5px;">
                      {{ item.comment_like }} 赞
                    </span>
                  <div class="username" style="margin-top: 5px;">{{ item.comment_time }}</div>

                  <p class="text" style="margin-top: 5px;">{{ item.comment_content }}</p>

                </div>

              </li>

            </ul>

          </div>
        </Scroll>
      </TabPane>

      <TabPane label="我的发帖" name="name2">
        <Scroll isBottom height="800px">
          <post-item :list="posts_list"></post-item>
        </Scroll>
      </TabPane>
    </Tabs>


  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Slider, Item } from '@/components';
import postItem from '../../components/postItem';

export default {
  name: 'Home',
  components: { Slider, Item, postItem },
  data() {
    return {
      form: {
        keyword: '',
        list: [],
      },
      posts_list: [],
      comments_list: [],
      isFirst: true,

    };
  },
  computed: mapState(['userInfo', 'isLogin']),
  activated() {
    if (this.isFirst) {
      this.isFirst = false;
      this.handleFetchCommentsData();
      this.handleFetchPostData();
    }
    // 解决搜索回来页面不能滚动bug
    if (this.$refs.scrollRef) {
      this.$refs.scrollRef.handleRefresh();
    }
  },
  methods: {
    open(nodesc) {
      this.$Notice.open({
        title: 'Notification title',
        desc: nodesc ? '' : this.form.keyword
      });
    },

    async handleFetchPostData() {
      try {
        this.$http.get('http://127.0.0.1:5000/user/postsRecord/' + this.user_id).then((response) => {
          this.posts_list = response.posts_list;
          // console.log('1111',this.posts_list)
        });
      } catch (e) {
      }
    },

    async handleFetchCommentsData() {

      try {
        this.$http.get('http://127.0.0.1:5000/user/commentsRecord/' + this.user_id).then((response) => {
          this.comments_list = [];
          this.comments_list = response.comments_list;
          this.comments_list = this.comments_list.reverse();
          console.log('33', this.comments_list);
        });
      } catch (e) {
      }
    },
    handleSearch(e) {
      if (e.keyCode !== 13) {
        return;
      }

      let word = this.form.keyword.trim();

      if (!word) {
        return this.$toast({ msg: '关键字不能为空' });
      }
      this.$router.push({
        name: 'search',
        query: { word, time: +new Date() }
      });
    }
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        this.user_id = +val.params.user_id;
      },
      immediate: true,
      deep: true
    }
  }
};

</script>
<style lang="scss" scoped>
.home-wrap {
  height: 100vh;

  .header-bar {
    .ivu-btn-primary {
      color: #fff;
      background-color: #f3394e;
      border-color: #fff;
    }

    @include frow(space-between);
    height: 50px;
    font-size: 16px;
    color: $fswhite;
    background: $bgf33;

    .search-box {
      @include frow(flex-start);
      flex: 1;
      height: 30px;
      padding: 0 10px 0 5px;
      border-radius: 50px;
      background: $bgwhite;

      .icon-search {
        font-size: 18px;
        color: $fs999;
      }

      .search {
        display: flex;
        flex: 1;
        padding-left: 5px;
        background: none;

        &::-webkit-input-placeholder {
          color: $fs999;
        }
      }
    }

    .text-box,
    .btn-search {
      @include frow();
      width: 86px;
      height: 100%;

      &:active {
        opacity: 0.8;
      }
    }

    .text-box {
      .iconfont {
        margin-left: 8px;
        font-size: 18px;
      }
    }

    .btn-search {
      width: 53px;

      .iconfont {
        font-size: 26px;
      }
    }
  }

  .slider-box {
    padding: 25px 15px;
    font-size: 12px;

    .item-list {
      display: flex;
      flex-wrap: wrap;

      .item-box {
        @include fcol();
        width: 20%;
        padding-bottom: 13px;

        .img-box {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: $bgeee;

          .img {
            width: 100%;
            height: 100%;
          }
        }

        .text {
          padding-top: 6px;
        }
      }
    }
  }

  .boon-box {
    .title {
      @include frow();
      height: 40px;
      font-size: 14px;
      color: $fs333;
      background: $bgeee;
    }

    .list-box {
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px;
      border-top: 1px solid $bdeee;
      box-sizing: border-box;

      .item-box {
        @include fcol();
        width: 33.3%;
        height: 130px;
        box-sizing: border-box;
        border-right: 1px solid $bdeee;

        &:nth-of-type(n + 4) {
          border-top: 1px solid $bdeee;
        }

        &:nth-of-type(3n) {
          border-right: 0 none;
        }

        .caption {
          font-size: 14px;
          font-weight: bold;
        }

        .sub-caption {
          font-size: 12px;
          margin-top: 6px;
        }

        .img-box {
          width: 96px;
          height: 67px;
          margin-top: 8px;

          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .hot-box {
    .title {
      @include frow();
      height: 40px;
      font-size: 14px;
      color: $fs333;
      background: $bgeee;
    }
  }
}
</style>
