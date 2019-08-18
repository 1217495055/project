<!--template 组件模块：保存标签-->
<template> 
	<!-- 模块要求：必须有一个跟标签 -->
	<div>
		<!-- 顶部header区域 -->
		<mt-header fixed title='遇见更美的你'></mt-header>
		<!-- 中间路由 router-view 区域 -->

		<!-- 底部 tabbar区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item mui-active" to="search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>



<script>
export default {
    
}
</script>

<style>
    /* 当前组件专有的样式内容 */
	@import url('../../lib/mui/css/mui.min.css');
	@import url('../../lib/mui/css/icons-extra.css');
</style>

