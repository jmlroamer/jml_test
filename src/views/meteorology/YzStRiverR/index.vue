<template>
  <div class="box-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="测站编码" prop="stcd">
        <el-input
          v-model="queryParams.stcd"
          placeholder="请输入测站编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间" style="width: 440px">
        <el-date-picker
          v-model="daterangeTM"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="HH:mm:ss"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
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
        <el-button type="primary" plain icon="Plus" @click="handleAdd"
          >新增</el-button
        >
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
        <el-upload
          ref="upload"
          style="margin: 0 10px 0"
          class="upload-demo"
          multiple
          :show-file-list="false"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleAddFile"
          ><el-button type="success" plain icon="Edit"
            >导入</el-button
          ></el-upload
        >
        <el-button
          type="success"
          plain
          icon="Download"
          @click="handleExportTemplate"
          >导出模板</el-button
        >
        <el-button type="warning" plain icon="Download" @click="handleExport"
          >导出</el-button
        >
      </div>
    </div>

    <el-table
      v-loading="loading"
      height="690"
      border
      style="width: 100%"
      :data="YzStRiverRList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="时间" align="center" prop="tm" />
      <el-table-column label="水位" align="center" prop="z" />
      <el-table-column label="流量" align="center" prop="q" />
      <el-table-column label="断面过水面积" align="center" prop="xsa" />
      <el-table-column label="断面平均流速" align="center" prop="xsavv" />
      <el-table-column label="断面最大流速" align="center" prop="xsmxv" />
      <el-table-column label="河水特征码" align="center" prop="flwchrcd" />
      <el-table-column label="水势" align="center" prop="wptn" />
      <el-table-column label="测流方法" align="center" prop="msqmt" />
      <el-table-column label="测积方法" align="center" prop="msamt" />
      <el-table-column label="测速方法" align="center" prop="msvmt" />
      <el-table-column
        label="操作"
        fixed="right"
        width="155"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-box">
      <el-pagination
        v-show="total > 0"
        :page-sizes="[20, 40, 60, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @change="getList"
      />
    </div>

    <!-- 添加或修改河道水情对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStRiverRRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改河道水情'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="时间" prop="tm">
          <el-date-picker
            clearable
            :disabled="dialogTiltle == '修改河道水情'"
            v-model="form.tm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="水位" prop="z">
          <el-input v-model="form.z" placeholder="请输入水位" />
        </el-form-item>
        <el-form-item label="流量" prop="q">
          <el-input v-model="form.q" placeholder="请输入流量" />
        </el-form-item>
        <el-form-item label="断面过水面积" prop="xsa">
          <el-input v-model="form.xsa" placeholder="请输入断面过水面积" />
        </el-form-item>
        <el-form-item label="断面平均流速" prop="xsavv">
          <el-input v-model="form.xsavv" placeholder="请输入断面平均流速" />
        </el-form-item>
        <el-form-item label="断面最大流速" prop="xsmxv">
          <el-input v-model="form.xsmxv" placeholder="请输入断面最大流速" />
        </el-form-item>
        <el-form-item label="河水特征码" prop="flwchrcd">
          <el-input v-model="form.flwchrcd" placeholder="请输入河水特征码" />
        </el-form-item>
        <el-form-item label="水势" prop="wptn">
          <el-input v-model="form.wptn" placeholder="请输入水势" />
        </el-form-item>
        <el-form-item label="测流方法" prop="msqmt">
          <el-input v-model="form.msqmt" placeholder="请输入测流方法" />
        </el-form-item>
        <el-form-item label="测积方法" prop="msamt">
          <el-input v-model="form.msamt" placeholder="请输入测积方法" />
        </el-form-item>
        <el-form-item label="测速方法" prop="msvmt">
          <el-input v-model="form.msvmt" placeholder="请输入测速方法" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStRiverRRef)"
            >确 定</el-button
          >
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";
import { saveAsExcelFile } from "@/utils/excel";
import { TimeToYMDhms } from "@/utils/time";
import {
  listYzStRiverR,
  getYzStRiverR,
  delYzStRiverR,
  addYzStRiverR,
  updateYzStRiverR,
  importTemplateYzStRiverR,
  importYzStRiverR,
  exportYzStRiverR,
} from "@/apis/modules/meteorology/YzStRiverR";

const YzStRiverRRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRiverRList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeTM: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
  tm: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询河道水情列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeTM && "" != daterangeTM) {
    queryParams.params["beginTM"] = TimeToYMDhms(daterangeTM.value[0]);
    queryParams.params["endTM"] = TimeToYMDhms(daterangeTM.value[1]);
  }
  const res: any = await listYzStRiverR(queryParams);
  YzStRiverRList.value = res.rows;
  if (YzStRiverRList.value.length > 0) {
    YzStRiverRList.value.forEach((item: any) => {
      Object.keys(item).forEach(function (key) {
        if (isNaN(item[key]) && !isNaN(Date.parse(item[key]))) {
          item[key] = TimeToYMDhms(item[key]);
        }
      });
    });
  }
  total.value = Number(res.total);
  loading.value = false;
};

// 取消按钮
const cancel = () => {
  dialogOpen.value = false;
  resetForm();
};

// 表单重置
const resetForm = () => {
  form.value = {
    stcd: null,
    tm: null,
    z: null,
    q: null,
    xsa: null,
    xsavv: null,
    xsmxv: null,
    flwchrcd: null,
    wptn: null,
    msqmt: null,
    msamt: null,
    msvmt: null,
  };
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  daterangeTM.value = "";
  handleQuery();
};

// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  ids.value = selection.map((item: any) => item.stcd);
  idslist.value = selection;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  resetForm();
  dialogOpen.value = true;
  dialogTiltle.value = "添加河道水情";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRiverR(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改河道水情";
};

/** 提交按钮 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  Object.keys(form.value).forEach(function (key) {
    if (form.value[key] instanceof Date) {
      form.value[key] = TimeToYMDhms(form.value[key]);
    }
  });
  formEl.validate(async (valid) => {
    if (valid) {
      if (dialogTiltle.value == "修改河道水情") {
        const res: any = await updateYzStRiverR(form.value);
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "修改成功！",
          });
          dialogOpen.value = false;
          getList();
        } else {
          ElMessage({
            type: "error",
            message: "修改失败，请检查重试",
          });
        }
      } else {
        const res: any = await addYzStRiverR(form.value);
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "添加成功！",
          });
          dialogOpen.value = false;
          getList();
        } else {
          ElMessage({
            type: "error",
            message: "添加失败，请检查重试！",
          });
        }
      }
    }
  });
};

/** 删除按钮操作 */
const handleDelete = (row: any) => {
  const _stcds = row.stcd || ids.value;
  const params = row.stcd ? [row] : idslist.value;
  ElMessageBox.confirm(
    "是否确认删除河道水情编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRiverR(params);
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

/** 导出按钮操作 */
const handleExport = async () => {
  const res = await exportYzStRiverR(queryParams);
  saveAsExcelFile(res, `YzStRiverR_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRiverR({});
  saveAsExcelFile(res, `YzStHailR_Template`);
};
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
/** 导入按钮操作 */
const handleAddFile = async (ev: any) => {
  let formData = new FormData();
  formData.append("file", ev.raw);
  const res: any = await importYzStRiverR(formData);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "导入成功！",
    });
    getList();
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
  getList();
};
getList();
</script>
