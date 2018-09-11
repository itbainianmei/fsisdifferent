<!-- 销售画像 -->
<template>
    <div id="salesPortrait">
        <h3 class="section_hd fs18">销售基本信息</h3>
        <table  cellspacing="0" cellpadding="0" style="width:100%;">
            <tr>
                <td  class="bgf5" style="min-width:100px;">销售</td>
                <td style="min-width:100px;"></td>
                <td  class="bgf5" style="min-width:100px;">直属上级</td>
                <td style="min-width:100px;"></td>
                <td  class="bgf5" style="min-width:100px;">分公司</td>
                <td style="min-width:100px;"></td>
                <td class="bgf5" style="min-width:100px;">入职日期</td>
                <td style="min-width:100px;"></td>
                <td class="bgf5" style="min-width:100px;">名下总商户数</td>
                <td style="min-width:100px;"></td>
            </tr>
            <tr>
                <td  class="bgf5" style="min-width:100px;">失信次数</td>
                <td style="min-width:100px;"></td>
                <td  class="bgf5" style="min-width:100px;">特批商户数</td>
                <td style="min-width:100px;"></td>
                <td  class="bgf5" style="min-width:100px;">特批商户数占比</td>
                <td style="min-width:100px;"></td>
                <td class="bgf5" style="min-width:100px;">月活商户数</td>
                <td style="min-width:100px;"></td>
                <td class="bgf5" style="min-width:100px;">风险商户数</td>
                <td style="min-width:100px;"></td>
            </tr>
        </table>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data() {

    },
    methods: {

    },
    mounted() {

    }
};
</script>
<style scoped lang="less">
.section_hd{height: 70px; line-height: 70px;}
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#999;}
.el-icon-arrow-down:before{font-weight:800;color:#999;}
table{border-right:1px solid #ebeef5;font-size:12px;border-bottom: 1px solid #ebeef5;}
td{border:solid #ebeef5; border-width:1px 0px 0px 1px;height: 50px;color:#636363;}
.bgf5{background: #F5F6FA;text-align: center;}
table.table{
    border:1px solid #ebeef5;
    td{border-top:1px solid #ebeef5; border-right:none;height: 50px;text-align: center;color:#636363;}
    th{color:#636363;height: 50px;}
}

.blue{
color:#409eff;
cursor: pointer;
}
</style>
