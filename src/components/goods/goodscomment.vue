<template>
    <div>
        <cmtbox :id='id'></cmtbox>
    </div>
</template>


<script>
import cmtbox from '../subcomponents/comment'
export default {
    props:[id],
    components: {
        cmtbox
    }
}
</script>

<style scoped>
    
</style>