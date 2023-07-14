// api 文件夹下 各个请求模块js，都统一来到index.js在向外导出
import { recommendMusic,newMusic } from './Home'
export const recommendMusicApI = recommendMusic // 推介歌单的数据
export const newMusicAPI = newMusic // 最新音乐

import {hotSearch,searchResultList} from './Search' // 搜索页面
export const hotSearchAPI = hotSearch // 热搜关键词
export const searchResultListAPI = searchResultList// 搜索结果

import {getSongById,getLyricById} from './Play'
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById