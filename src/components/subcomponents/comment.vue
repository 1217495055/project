<template>
    <div class='cmt-container'>
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽120个字)" v-model="msg"></textarea>
        <mt-button type='primary' size='large' @click='postComment'>发表评论</mt-button>

        <div class="cmt-list" v-for='(item,i) of comments' :key='i'>
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined'?'此用户很懒，嘛都没说':item.content}}
                </div>
            </div>
        </div>

        <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex:1,
            comments:[],//所有的评论数据
            msg:'',  //评论输入的内容
        }
    },
    props:['id'],
    created(){
        this.getComments();
    },
    methods:{
        // 发表评论
        postComment(){
            // 校验是否为空
            if(this.msg.trim().length==0){
                $toast('评论的内容不能为空');
                return;
            }
            // 参数1，请求的url地址
            // 参数2，提交给服务器的数据对象 {content:this.msg}
            // 参数3 定义提交时候，变淡中数据的格式{emulateJson:true}
            this.axios.post('api/postcomment'+this.$route.params.id,{content:this.msg.trim()}).then(result=>{
                if(result.data.status==0){
                    // 1 拼接出一个评论对象
                    var cmt ={user_name:'匿名用户',add_time:Data.now(),content:this.msg.trim()};
                    this.comments.unshift(cmt);
                    this.msg='';
                }else{
                    //失败的情况.....
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        getComments(){
            this.axios.get('api/getcomments/'+'this.id'+'?this.pageIndex').then(result=>{
                if(result.body.status==0){
                    // this.comments=result.data.message;
                    // 每当获取新评论数据的时候，不要把老数据清空，用该在后面追加
                    this.comments = this.comments.comcat(result.data.message);
                }else{
                    this.$toast('获取评论失败')
                }
            })
        }
    }
}
</script>

<style scoped>
.cmt-container h3{
    font-size: 18px;
}
.cmt-container textarea{
    font-size: 14px;
    height:85px;
    margin: 0;
}
.cmt-list .cmt-item{
    font-size: 13px;
    margin:5px 0; 
}
.cmt-list .cmt-item .cmt-title{
    background-color: #ccc;
    line-height: 30px;
}
.cmt-list .cmt-item .cmt-body{
    line-height: 35px;
    text-indent: 2em;
}
</style>

