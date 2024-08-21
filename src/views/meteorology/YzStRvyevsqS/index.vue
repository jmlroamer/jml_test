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
      <el-form-item label="年份" prop="yr">
        <el-input
          v-model="queryParams.yr"
          placeholder="请输入年份"
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
      :data="YzStRvyevsqSList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="年份" align="center" prop="yr" />
      <el-table-column label="最高水位" align="center" prop="htz" />
      <el-table-column
        label="最高水位出现时间"
        align="center"
        prop="htztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.htztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大流量" align="center" prop="mxq" />
      <el-table-column
        label="最大流量出现时间"
        align="center"
        prop="mxqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mxqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低水位" align="center" prop="ltz" />
      <el-table-column
        label="最低水位出现时间"
        align="center"
        prop="ltztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ltztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最小流量" align="center" prop="mnq" />
      <el-table-column
        label="最小流量出现时间"
        align="center"
        prop="mnqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mnqtm }}</span>
        </template>
      </el-table-column>
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

    <!-- 添加或修改水位流量年极值系列对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStRvyevsqSRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改水位流量年极值系列'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="年份" prop="yr">
          <el-input
            :disabled="dialogTiltle == '修改水位流量年极值系列'"
            v-model="form.yr"
            placeholder="请输入年份"
          />
        </el-form-item>
        <el-form-item label="最高水位" prop="htz">
          <el-input v-model="form.htz" placeholder="请输入最高水位" />
        </el-form-item>
        <el-form-item label="最高水位出现时间" prop="htztm">
          <el-date-picker
            clearable
            v-model="form.htztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最高水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大流量" prop="mxq">
          <el-input v-model="form.mxq" placeholder="请输入最大流量" />
        </el-form-item>
        <el-form-item label="最大流量出现时间" prop="mxqtm">
          <el-date-picker
            clearable
            v-model="form.mxqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最大流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低水位" prop="ltz">
          <el-input v-model="form.ltz" placeholder="请输入最低水位" />
        </el-form-item>
        <el-form-item label="最低水位出现时间" prop="ltztm">
          <el-date-picker
            clearable
            v-model="form.ltztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最低水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最小流量" prop="mnq">
          <el-input v-model="form.mnq" placeholder="请输入最小流量" />
        </el-form-item>
        <el-form-item label="最小流量出现时间" prop="mnqtm">
          <el-date-picker
            clearable
            v-model="form.mnqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最小流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间戳" prop="moditime">
          <el-date-picker
            clearable
            v-model="form.moditime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择时间戳"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStRvyevsqSRef)"
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
  listYzStRvyevsqS,
  getYzStRvyevsqS,
  delYzStRvyevsqS,
  addYzStRvyevsqS,
  updateYzStRvyevsqS,
  importTemplateYzStRvyevsqS,
  importYzStRvyevsqS,
  exportYzStRvyevsqS,
} from "@/apis/modules/meteorology/YzStRvyevsqS";

const YzStRvyevsqSRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRvyevsqSList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeHTZTM: any = ref("");
const daterangeMXQTM: any = ref("");
const daterangeLTZTM: any = ref("");
const daterangeMNQTM: any = ref("");
const daterangeMODITIME: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
  yr: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询水位流量年极值系列列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeHTZTM && "" != daterangeHTZTM) {
    queryParams.params["beginHTZTM"] = TimeToYMDhms(daterangeHTZTM.value[0]);
    queryParams.params["endHTZTM"] = TimeToYMDhms(daterangeHTZTM.value[1]);
  }
  if (null != daterangeMXQTM && "" != daterangeMXQTM) {
    queryParams.params["beginMXQTM"] = TimeToYMDhms(daterangeMXQTM.value[0]);
    queryParams.params["endMXQTM"] = TimeToYMDhms(daterangeMXQTM.value[1]);
  }
  if (null != daterangeLTZTM && "" != daterangeLTZTM) {
    queryParams.params["beginLTZTM"] = TimeToYMDhms(daterangeLTZTM.value[0]);
    queryParams.params["endLTZTM"] = TimeToYMDhms(daterangeLTZTM.value[1]);
  }
  if (null != daterangeMNQTM && "" != daterangeMNQTM) {
    queryParams.params["beginMNQTM"] = TimeToYMDhms(daterangeMNQTM.value[0]);
    queryParams.params["endMNQTM"] = TimeToYMDhms(daterangeMNQTM.value[1]);
  }
  if (null != daterangeMODITIME && "" != daterangeMODITIME) {
    queryParams.params["beginMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[0]
    );
    queryParams.params["endMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[1]
    );
  }
  const res: any = await listYzStRvyevsqS(queryParams);
  YzStRvyevsqSList.value = res.rows;
  if (YzStRvyevsqSList.value.length > 0) {
    YzStRvyevsqSList.value.forEach((item: any) => {
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
    yr: null,
    htz: null,
    htztm: null,
    mxq: null,
    mxqtm: null,
    ltz: null,
    ltztm: null,
    mnq: null,
    mnqtm: null,
    moditime: null,
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
  daterangeHTZTM.value = "";
  daterangeMXQTM.value = "";
  daterangeLTZTM.value = "";
  daterangeMNQTM.value = "";
  daterangeMODITIME.value = "";
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
  dialogTiltle.value = "添加水位流量年极值系列";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRvyevsqS(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改水位流量年极值系列";
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
      if (dialogTiltle.value == "修改水位流量年极值系列") {
        const res: any = await updateYzStRvyevsqS(form.value);
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
        const res: any = await addYzStRvyevsqS(form.value);
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
    "是否确认删除水位流量年极值系列编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRvyevsqS(params);
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
  const res = await exportYzStRvyevsqS(queryParams);
  saveAsExcelFile(res, `YzStRvyevsqS_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRvyevsqS({});
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
  const res: any = await importYzStRvyevsqS(formData);
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
