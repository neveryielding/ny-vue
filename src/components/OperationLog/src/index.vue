<template>
  <div class="OperationLog">
    <el-dialog v-model="showlog" size="tiny" @close="dismiss">
      <el-table :data="logForm" height="300" style="margin-top:-1px;">
        <el-table-column prop="operateName" label="操作人员" align="center"></el-table-column>
        <el-table-column prop="operateType" label="操作类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.operateType==='COMFIRM'">确认</span>
            <span v-if="scope.row.operateType==='STOP'">终止</span>
            <span v-if="scope.row.operateType==='Invalid'">作废</span>
            <span v-if="scope.row.operateType==='AntiCOMFIRM'">反确认</span>
            <span v-if="scope.row.operateType==='MAKE'">制单</span>
            <span v-if="scope.row.operateType==='Save'">创建</span>
            <span v-if="scope.row.operateType==='Dismiss'">离职</span>
            <span v-if="scope.row.operateType==='Update'">更新</span>
            <span v-if="scope.row.operateType==='Pass'">审核通过</span>
            <span v-if="scope.row.operateType==='Apply'">待审核</span>
            <span v-if="scope.row.operateType==='Reject'">退回</span>
            <span v-if="scope.row.operateType==='Abandon'">作废</span>
          </template>
        </el-table-column>
        <el-table-column prop="operateTime" label="操作时间" align="center" width="180"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:10px">
        共 {{logForm.length}} 条操作日志
      </div>
      <loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText"></loading>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'OperationLog',
    props: {
      value: String,
      type: Number
    },
    data() {
      return {
        urls: {
          loadByBillId: 'operationLog/loadByBillId' // 操作日记
        },
        loading: false,
        logForm: [],
        showlog: false,
        loadingText: '',
        documentId: null,
        code: null
      }
    },
    created() {
      if (this.type === 1) {
        this.urls.loadByBillId = 'hr/api/orgAssistant/log'
      }
      if (this.type === 2) {
        this.urls.loadByBillId = 'api/operationLog/loadByBillId'
      }
      if (this.type === 3) {
        this.urls.loadByBillId = 'shop/api/operationLog/loadByBillId'
      }
    },
    methods: {
      dismiss() {
        this.logForm = []
        this.showlog = false
        this.$emit('input', null)
        this.loading = false
      },
      onRefresh() {
        this.showLog(this.code)
      },
      showLog(id) {
        this.loading = true
        let param = {
          documentId: id
        }
        if (this.type === 1) {
          param = {
            assistantId: id
          }
        }
        this.$http.get(this.urls.loadByBillId, param, (response, status) => {
          if (status && response.data.resultCode === 0) {
            this.dialogFormVisibleLog = false
            this.loading = false
            this.logForm = response.data.data
          } else {
            this.loadingText = response
          }
        })
      }
    },
    watch: {
      'value': {
        handler: function(newValue, oldValue) {
          if (newValue) {
            this.code = newValue
            this.showlog = true
            this.showLog(newValue)
          }
        },
        deep: true
      }
    }
  }

</script>
