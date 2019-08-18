<template>
    <div class='goodsinfo_container'>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList='lunbotu' :isfull='false'></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>¥{{goodsinfo.margkey_price}}</del>&nbsp;&nbsp;&nbsp;销售价：<span class='now_price'>¥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox></numbox></p>
                    <p>
                        <mt-button type='primary' size='small'>立即购买</mt-button>
                        <mt-button type='danger' size='small'>加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数区域</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
                    <p>上架时间：{{goodsinfo.add_time|dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type='primary' size='large' plain @click='godesc(id)'>图文介绍</mt-button>
                <mt-button type='danger' size='large' plain @click='gocomment(id)'>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper'
// 导入数字选择框组件
import numbox from '../subcomponents/goodsinfo_numbox'
export default {
    data(){
        return{
            id:this.$route.params.id,  //将路由参数对象中的id挂载到data中，方便调用
            lunbotu:[],//轮播图的数据
            goodsinfo:[],//获取到的商品的信息
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        godesc(id){
            // 点击使用编程式导航跳转到图文介绍页面
            this.$router.push({name:'/home/goodsdesc',params:{id}})
        },
        gocomment(id){
            // 点击跳转到评论页面
            this.$router.push({name:'/home/goodscomment',params:{id}})
        },
        getGoodsInfo(){
            // 获取商品的信息
            this.axios.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.data.status==0){
                    this.goodsinfo = result.data.message[0];
                }
            })
        },
        getLunbotu(){
            this.axios.get('api/getthumimages'+this.id).then(result=>{
                if(result.data.status==0){
                    // 先循环轮播图数组的每一项,为item添加img属性，因为轮播图组件中只认识item,img
                    result.data.message.forEach(item=>{item.img=item.src});
                    this.lunbotu=result.data.message;
                }
            })
        },
    },
    components:{swiper,numbox}
}
</script>

<style scoped>
.goodsinfo_container{
    background-color: #eee;
    overflow: hidden;
}   
.goodsinfo_container .now_price{
    color:red;
    font-size: 16px;
    font-weight: bold;
} 
.mui-card-footer{
    display: block;
}
.mui-card-footer button{
    margin: 15px 0;
}
</style>