import request from '@/utils/request' // 将二次封装的axios引入

// 首页 推介歌单的数据
export const recommendMusic = parmas => request({
    url:'/personalized',
    parmas
})
// 首页 推介最新音乐
export const newMusic = parmas => request({
    url:'/personalized/newsong',
    parmas
})