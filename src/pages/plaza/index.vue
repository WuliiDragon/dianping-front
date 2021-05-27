<template>
  <div class="home-wrap">
    <div class="header-bar">
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input class="search" type="text" v-model="form.keyword" placeholder="请输入关键字" @keyup="handleSearch($event)" />
      </div>

      <span class="btn-search" @click="$router.push({name: isLogin ? 'collect' : 'login'})">
        <i :class="['iconfont', isLogin ? 'icon-star' : 'icon-login']"></i>
      </span>
    </div>

    <Tabs value="name1"   :animated="false">
      <TabPane label="固定发帖" name="name1"  >
        <div >
          <div v-if="userInfo.permission">
            <Button type="primary"  @click="to_add" long>添加课程</Button>

          </div>
          <template v-else>
            <div ></div>
          </template>
          <Scroll  :data="form.list"   height="1000px" style="padding-bottom: 100px">
            <PlazaItem :list="form.list" isHome></PlazaItem>
          </Scroll>

        </div>

      </TabPane>

    </Tabs>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Slider, Item } from '@/components';
import PlazaItem from "../../components/plazaitem";

export default {
  name: 'Home',
  components: {PlazaItem, Slider, Item },
  data() {
    return {
      form: {
        keyword: '',
        list: [],
      },
      isFirst:true,

    };
  },
  computed: mapState(['userInfo', 'isLogin']),
  activated() {
    if (this.isFirst) {
      this.isFirst = false;
      this.handleFetchData();
    }
    // 解决搜索回来页面不能滚动bug
    if (this.$refs.scrollRef) {
      this.$refs.scrollRef.handleRefresh();
    }
  },
  methods: {
    to_add() {
      console.log(this.userInfo.id);
      this.$router.push({ name: 'addplaza', params: { user_id: this.userInfo.id } });
    },
    async handleFetchData() {

      try {
        this.$http.get('http://127.0.0.1:5000/plaza/getPlazasList').then((response) => {
          console.log(response);
          this.form.list = [...this.form.list, ...response.plazas_list];



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
  }
};

</script>
<style lang="scss" scoped>
.home-wrap {
  height: 100vh;
  .header-bar {
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
