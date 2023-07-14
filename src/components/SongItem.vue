<template>
    <div>
        <van-cell :title="name" :label="author + ' - ' + name" center 
            :key="id">
            <template #right-icon>
                <van-icon name="play-circle-o" size="0.6rem" @click="playFn"/>
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    props:{
        name:String, //歌名
        author:String, // 歌手
        id:Number // 歌曲id跳转播放
    },
    methods:{
        playFn(){
            this.$router.push({
                path:'/play',
                query:{
                    id:this.id
                }
            })
        }
    }
}
</script>

<style scoped>
.van-cell {
    border-bottom: 1px solid lightgray;
}
</style>