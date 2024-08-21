<template>
  <div class="box-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="true"
      label-width="85px"
    >
      <el-form-item label="文件名称" prop="eptp">
        <el-input
          v-model="queryParams.eptp"
          placeholder="请输入文件名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传日期">
        <el-date-picker
          v-model="searchTime"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          date-format="YYYY/MM/DD"
          time-format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="timeChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery(queryRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="box-header">
      <div class="box-header-left">
        <el-button type="danger" plain icon="Delete" @click="handleAllDelete"
          >批量删除</el-button
        >
        <el-upload
          style="margin: 0 10px 0"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :show-file-list="false"
          :auto-upload="false"
          :limit="1"
          :on-change="() => {}"
          ><el-button type="primary" plain icon="Edit"
            >上传</el-button
          ></el-upload
        >
        <!-- <el-button type="warning" plain icon="Download" @click="handleExport"
          >导出</el-button
        > -->
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="YzStDayevRList"
      @selection-change="handleSelectionChange"
      height="690"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="文件名称" align="center" prop="stcd" />
      <el-table-column label="上传日期" align="center" prop="tm" />
      <el-table-column label="文件类型" align="center" prop="eptp" />
      <el-table-column label="文件大小" align="center" prop="dye" />
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handledownload(scope.row)"
            >下载</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        v-show="total > 0"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[20, 40, 60, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getList"
        @current-change="getList"
      />
    </div>

    <el-dialog v-model="dialogOpen" :title="dialogTiltle" width="650">
      <div>
        <el-form
          ref="YzStForecastcFRef"
          :model="form"
          :rules="rules"
          label-width="140px"
        >
          <el-form-item label="文件名称" prop="stcd">
            <el-input v-model="form.stcd" placeholder="请输入文件名称" />
          </el-form-item>
          <el-form-item label="上传日期" prop="tm">
            <el-input v-model="form.tm" placeholder="请输入时间" disabled />
          </el-form-item>
          <el-form-item label="文件类型" prop="eptp">
            <el-input
              v-model.number="form.eptp"
              placeholder="请输入文件类型"
              disabled
            />
          </el-form-item>
          <el-form-item label="文件大小" prop="dye">
            <el-input
              v-model.number="form.dye"
              placeholder="请输入文件大小"
              disabled
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm(YzStForecastcFRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import {
  listYzStDayevR,
  getYzStDayevR,
  updateYzStDayevR,
  addYzStDayevR,
  delYzStDayevR,
  exportYzStDayevR,
} from "@/apis/modules/meteorology/YzStDayevR";
const queryRef = ref<FormInstance>();
const YzStForecastcFRef = ref<FormInstance>();
const YzStDayevRList = ref<any>([]);
const loading = ref(false);
const total = ref(0);
const ids = ref([]);
const dialogOpen = ref(false);
const dialogTiltle = ref("添加");
const searchTime = ref("");

const queryParams = reactive({
  pageNum: 1,
  pageSize: 20,
  eptp: null,
  dye: null,
  BGYR: "",
  EDYR: "",
});
const form = ref({
  stcd: null,
  tm: null,
  eptp: null,
  dye: null,
});
const timeChange = () => {
  console.log(searchTime.value);
  if (searchTime.value == null) {
    queryParams.BGYR = "";
    queryParams.EDYR = "";
    return;
  }
  queryParams.BGYR = searchTime.value[0];
  queryParams.EDYR = searchTime.value[1];
};
/** 查询日蒸发量列表 */
const getList = async () => {
  loading.value = true;
  const res: any = await listYzStDayevR(queryParams);
  YzStDayevRList.value = res.rows;
  total.value = Number(res.total);
  //   for (let index = 0; index < 10; index++) {
  //     YzStDayevRList.value.push({
  //       stcd: 10001,
  //       tm: "2016-5-9",
  //       eptp: "29p",
  //       dye: "90e",
  //     });
  //   }
  //   total.value = 10;
  loading.value = false;
};
const rules = reactive<FormRules<typeof form>>({
  stcd: [
    { required: true, message: "请输入测站编码", trigger: "blur" },
    { min: 3, max: 5, message: "长度为3到5", trigger: "blur" },
  ],
  eptp: [
    { required: true, message: "age is required" },
    { type: "number", message: "age must be a number" },
  ],
  dye: [
    { required: true, message: "age is required" },
    { type: "number", message: "age must be a number" },
  ],
});
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  searchTime.value = "";
  handleQuery();
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};
// 重置表单
const resetForm = () => {
  form.value = {
    stcd: null,
    tm: null,
    eptp: null,
    dye: null,
  };
};
/** 新增按钮操作 */
const handleAdd = () => {
  resetForm();
  dialogOpen.value = true;
  dialogTiltle.value = "添加";
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  ids.value = selection.map((item: any) => item.stcd);
  console.log(ids);
};
/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const _stcd = row.stcd;
  const res = await getYzStDayevR(_stcd);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改";
};
//下载按钮
const handledownload = (row: any) => {};
// 取消按钮
const cancel = () => {
  dialogOpen.value = false;
  resetForm();
};
/** 提交按钮 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      if (dialogTiltle.value == "修改") {
        const res: any = await updateYzStDayevR(form.value);
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "修改成功！",
          });
          dialogOpen.value = false;
          getList();
        }
      } else {
        const res: any = await addYzStDayevR(form.value);
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "添加成功！",
          });
          dialogOpen.value = false;
          getList();
        }
      }
    }
  });
};
/** 删除按钮操作 */
const handleDelete = (row: any) => {
  const _stcds = row.stcd;
  ElMessageBox.confirm("是否确认删除该条数据项？", "删除确认框", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res: any = await delYzStDayevR(_stcds);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除成功！",
      });
      getList();
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
/** 批量删除按钮操作 */
const handleAllDelete = () => {};
/** 导出按钮操作 */
const handleExport = async () => {
  // const res = await exportYzStDayevR(queryParams);
  const res = await exportYzStDayevR({ STCD: 10001 });
  // `YzStDayevR_${new Date().getTime()}.xlsx`
};
getList();
</script>
