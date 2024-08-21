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
      :data="YzStForecayzStFList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="预报单位" align="center" prop="unitname" />
      <el-table-column label="方案代码" align="center" prop="plcd" />
      <el-table-column label="依据时间" align="center" prop="fymdh" width="180">
        <template #default="scope">
          <span>{{ scope.row.fymdh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" prop="iymdh" width="180">
        <template #default="scope">
          <span>{{ scope.row.iymdh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" align="center" prop="ymdh" width="180">
        <template #default="scope">
          <span>{{ scope.row.ymdh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预报水位" align="center" prop="z" />
      <el-table-column label="预报流量" align="center" prop="q" />
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

    <!-- 添加或修改水情预报成果对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStForecayzStFRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input v-model="form.stcd" placeholder="请输入测站编码" />
        </el-form-item>
        <el-form-item label="预报单位" prop="unitname">
          <el-input v-model="form.unitname" placeholder="请输入预报单位" />
        </el-form-item>
        <el-form-item label="方案代码" prop="plcd">
          <el-input v-model="form.plcd" placeholder="请输入方案代码" />
        </el-form-item>
        <el-form-item label="依据时间" prop="fymdh">
          <el-date-picker
            clearable
            v-model="form.fymdh"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择依据时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布时间" prop="iymdh">
          <el-date-picker
            clearable
            v-model="form.iymdh"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择发布时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发生时间" prop="ymdh">
          <el-date-picker
            clearable
            v-model="form.ymdh"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择发生时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预报水位" prop="z">
          <el-input v-model="form.z" placeholder="请输入预报水位" />
        </el-form-item>
        <el-form-item label="预报流量" prop="q">
          <el-input v-model="form.q" placeholder="请输入预报流量" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStForecayzStFRef)"
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
  listYzStForecayzStF,
  getYzStForecayzStF,
  delYzStForecayzStF,
  addYzStForecayzStF,
  updateYzStForecayzStF,
  importTemplateYzStForecayzStF,
  importYzStForecayzStF,
  exportYzStForecayzStF,
} from "@/apis/modules/meteorology/YzStForecayzStF";

const YzStForecayzStFRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStForecayzStFList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeFYMDH: any = ref("");
const daterangeIYMDH: any = ref("");
const daterangeYMDH: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({
  iymdh: [{ required: true, message: "发布时间不能为空", trigger: "blur" }],
});

/** 查询水情预报成果列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeFYMDH && "" != daterangeFYMDH) {
    queryParams.params["beginFYMDH"] = TimeToYMDhms(daterangeFYMDH.value[0]);
    queryParams.params["endFYMDH"] = TimeToYMDhms(daterangeFYMDH.value[1]);
  }
  if (null != daterangeIYMDH && "" != daterangeIYMDH) {
    queryParams.params["beginIYMDH"] = TimeToYMDhms(daterangeIYMDH.value[0]);
    queryParams.params["endIYMDH"] = TimeToYMDhms(daterangeIYMDH.value[1]);
  }
  if (null != daterangeYMDH && "" != daterangeYMDH) {
    queryParams.params["beginYMDH"] = TimeToYMDhms(daterangeYMDH.value[0]);
    queryParams.params["endYMDH"] = TimeToYMDhms(daterangeYMDH.value[1]);
  }
  const res: any = await listYzStForecayzStF(queryParams);
  YzStForecayzStFList.value = res.rows;
  if (YzStForecayzStFList.value.length > 0) {
    YzStForecayzStFList.value.forEach((item: any) => {
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
    unitname: null,
    plcd: null,
    fymdh: null,
    iymdh: null,
    ymdh: null,
    z: null,
    q: null,
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
  daterangeFYMDH.value = "";
  daterangeIYMDH.value = "";
  daterangeYMDH.value = "";
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
  dialogTiltle.value = "添加水情预报成果";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStForecayzStF(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改水情预报成果";
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
      if (dialogTiltle.value == "修改水情预报成果") {
        const res: any = await updateYzStForecayzStF(form.value);
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
        const res: any = await addYzStForecayzStF(form.value);
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
    "是否确认删除水情预报成果编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStForecayzStF(params);
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
  const res = await exportYzStForecayzStF(queryParams);
  saveAsExcelFile(res, `YzStForecayzStF_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStForecayzStF({});
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
  const res: any = await importYzStForecayzStF(formData);
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
