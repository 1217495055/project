<template>
    <div>
        <!-- 轮播图区域 -->
		<mt-swipe :auto='4000'>
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <!-- 谁用轮播图组件，谁传递lunbotuList -->
            <mt-swipe-item v-for="(item,i) of lunbotuList" :key="i">
                {{item.img_url}}
                <img :src="item.img_url" alt="" :class='{"full":isfull}'>
            </mt-swipe-item>
		</mt-swipe>
    </div>
</template>

<script>
export default {
    props:[lunbotuList,isfull]
}
</script>

<style scoped>
/* 1 首页中商品的图片，宽高都是100% */
/* 2 在详情页中，图片的宽高100%，页面不好看， */
/* 3 详情页中的轮播图，希望高度100%，宽度自适应 */

 .mint-swipe{
    height:200px;
}
.mint-swipe-item img{
    /* width:100%; */
    text-align: center;
    height:100%;
}   
.funn{
    width:100%;
}
</style>