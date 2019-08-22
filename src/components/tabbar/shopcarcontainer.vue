<template>
    <div class="shopcar-container">
    <div calss='goods-list'>
        <!-- 商品列表项区 -->
        <div class="mui-card" v-for="(item,i) in goodslist" :key='item.id'>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model='$store.getters.getGoodsSelected[item.id]' @change='selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])'></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class='price'>￥{{item.sell_price}}</span>
                            <numbox :initcount='$store.getters.getGoodsCount[item.id]' :goodsid='item.id'></numbox>
                            <!-- 如何从购物车中获取商品数量 -->
                            <!-- 创建一个空对象，循环购物车中的所有商品的数据，把当前这条商品的id作为对象的属性名，count作为对象的属性值，当所有的商品循环一遍，就得到一个对象{88:2,89:3,90:4} -->
                            <a href="#" @click.prevent='remove(item.id)'>删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                 <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class='red'>0</span> 件，总价<span class='red'>￥0</span></p>
                    </div>
                </div>
                <mt-button type='danger'>去结算</mt-button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox'
export default {
    data(){
        return {
            goodslist:[],  // 购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //获取购物车中商品列表
            // 1 获取store中所有id，拼接出一个字符串
            var idArr = [];
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            // 如果购物车中没有商品，则直接返回，否则报错
            if(idArr.length<=0){return};
            this.axios.get('api/goods/getshopcarlist/'+idArr.join(',')).then(res=>{
                this.goodslist = res.data.message;
            })
        },
        getGoodsCount(){
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o;
        },
        remove(id,index){
            // 点击删除吧商品从store中根据传递的id删除，同时把当前组件中的goodslist中当前要删除的商品用index删除
            this.goodslist.splice(index,i);
            this.$store.commit('removeFormCar',id);
        },
        selectedChanged(id,val){
            // 每当点击开关吧最新的开光状态同步到store中
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        },
    },
    components:{
        numbox
    }
}
</script>

<style scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
}
.shopcar-container .mui-card-content-inner{
    display: flex;
    align-items: center;
}
.shopcar-container .goods-list img{
    width:60px;
    height:60px;
}
.shopcar-container .goods-list h1{
    font-size: 13px;
}
.shopcar-container .goods-list .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.shopcar-container .goods-list .price{
    color:red;
    font-weight: bold;
}
.shopcar-container .mui-card .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.shopcar-container .mui-card .jiesuan .red{
    color:red;
    font-weight: bold;
    font-size: 16px;
}
</style>