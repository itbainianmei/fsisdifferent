<!--评级模型编辑-->
<template>
    <div>

    </div>
</template>
<script>
import qs from 'qs';
export default {
    data() {
        return {
            modelDetail: []
        }
    },
    methods: {
        getDetail() {
            this.$axios.post('/rateManage/queryAll', qs.stringify({
                modelId: this.$route.params.id
            })).then(res => {
                if (res.data.code = 200) {
                    this.modelDetail = res.data.data.result;
                    return;
                }
                this.$alert(res.data.msg, "提示", {
                    type: "warning",
                    confirmButtonText: "确定"
                });
            });
        }
    },
    mounted() {
        this.getDetail();
    }
};
</script>
<style scoped>
</style>
