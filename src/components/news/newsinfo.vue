<template>
    <div class='newsinfo-container'>
        <h3 class='title'>{{newsinfo.title}}</h3>
        <p class='subtitle'>
            <span>发表时间:{{newsinfo.add_time|dataFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class='content'>
            {{newsinfo.content}}
        </div>
        <!-- 评论子组件区域 -->
        <comment-box :id='this.id'></comment-box>
    </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents.comment'
export default {
    components:{
        'comment-box':comment,
    },
    data(){
        return{
            //将url地址传递过来的参数挂载到data中，方便以后调用
            id:this.$route.params.id,
            newsinfo:[],  //新闻对象
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){  //获取新闻详情
            this.axios.get('http://127.0.0.1:3000/user/getnew/'+this.id).then(result=>{
                // console.log(result.data.message[0])
                if(result.data.status==0){
                    console.log(result.data)
                    this.newsinfo = result.data.message[0];
                }else{
                    // 失败
                    this.$toast({message :'获取新闻失败'});
                }
            })
        }
    }
}
</script>

<style scoped>
.newsinfo-container{
    padding:0 4px;
}
.newsinfo-container .title{
    font-size:16px;
    text-align: center;
    margin: 15px 0;
    color:red;
}
.newsinfo-container .subtitle{
    font-size: 13px;
    color:#226aff;
    display: flex;
    justify-content: space-between;
}
</style>
