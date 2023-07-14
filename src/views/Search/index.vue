<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @input="inputFn"/>
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span class="hot_item" v-for="(obj,index) in hotArr" :key="index" @click="fn(obj.first)">{{obj.first}}</span>
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell :title="obj.name"  :label="obj.ar[0].name + ' - ' + obj.name" center v-for="obj in resultList" :key="obj.id">
          <template #right-icon>
            <van-icon name="play-circle-o"  size="0.7rem"  />
          </template>
        </van-cell> -->
        <SongItem v-for="obj in resultList" :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"
        >
        </SongItem>
      </van-list>
      
    </div>
  </div>
</template>

<script>
import {hotSearchAPI,searchResultListAPI} from '@/api'
import SongItem from '@/components/SongItem.vue';
export default {
  components:{SongItem},
  data() {
    return {
      value: '',
      hotArr:[], //热搜关键字 
      resultList:[],//搜索结果
      loading:false,//控制加载中的动画，通常请求数据回来就会设置为fasle
      finished:false,//未来加载全部 如果设置为true 底部就不会再次执行onload 代表加载完成
      page:1, //当前搜索页的页码
      timer:null,
    };
  },
  async created(){
    const res = await hotSearchAPI()
    this.hotArr = res.data.result.hots
  },
  methods:{
    async getListFn(){
      return await searchResultListAPI({
        keywords:this.value,
        limit:20,
        offset:(this.page - 1) * 20 //固定公式
      })
    },
    async fn(val) { // 把选中的关键词显示到搜索框里
      this.page = 1
      this.finished = false // 重新初始化 防止下一次更新数据 底部还是显示加载更多
      this.value = val
      const res = await this.getListFn()
      this.resultList = res.data.result.songs
      this.loading = false 
    },
    async inputFn(){ // 输入框值改变、
      this.page = 1
      if(this.timer) clearTimeout(this.timer) // 防抖
      this.timer = setTimeout(async() => { // 用户在一定时间内没有不触发事件了，才会开始执行逻辑代码
          this.page = 1 // 重新获取第一页数据
        this.finished = false // 输入框改变可能也会有更多数据
        if(this.value.length === 0 ){ // 当输入框里面没有值
          this.resultList=[] // 我让搜索结果为空 上面就会判断显示歌曲还是热搜词
          return
        }
        
        const res = await this.getListFn()
        if(res.data.result.songs == undefined ) { //没有数据
          this.resultList = []
          return
        }
        this.resultList = res.data.result.songs
        this.loading = false 
      }, 900);
      
    },
    async onLoad(){ // 触底事件 加载更多数据 内部会自动把loading 改为true
      this.page++
      const res = await this.getListFn()
      if(res.data.result.songs == undefined ) { //没有更多数据
        this.finished = true // 只要设置为true 就会说 没有更多数据了
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs]
      this.loading = false // 数据加载完毕 保证下一次继续加载
      
    }
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>