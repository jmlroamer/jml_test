<template>
  <div class="box-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="测站号" prop="stcd">
        <el-input
          v-model="queryParams.stcd"
          placeholder="请输入测站号"
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
      :data="YzStGateRRealList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站号" align="center" prop="stcd" />
      <el-table-column label="实际开度" align="center" prop="realaperture" />
      <el-table-column label="设定开度" align="center" prop="setaperture" />
      <el-table-column label="传感器水位" align="center" prop="sensorlever" />
      <el-table-column label="海拔水位" align="center" prop="altitudelever" />
      <el-table-column
        label="闸门远控信号"
        align="center"
        prop="remotesignal"
      />
      <el-table-column
        label="闸门电源故障信号"
        align="center"
        prop="powersignal"
      />
      <el-table-column label="闸门开闸中" align="center" prop="openingsignal" />
      <el-table-column
        label="闸门关闸中"
        align="center"
        prop="closeingsignal"
      />
      <el-table-column label="闸门故障" align="center" prop="errorsignal" />
      <el-table-column label="闸门全开" align="center" prop="openedsignal" />
      <el-table-column label="闸门全关" align="center" prop="closedsignal" />
      <el-table-column label="第几个闸门" align="center" prop="gatenumber" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="时间" align="center" prop="tm" width="180">
        <template #default="scope">
          <span>{{ scope.row.tm }}</span>
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

    <!-- 添加或修改闸门状态日志对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStGateRRealRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站号" prop="stcd">
          <el-input v-model="form.stcd" placeholder="请输入测站号" />
        </el-form-item>
        <el-form-item label="实际开度" prop="realaperture">
          <el-input v-model="form.realaperture" placeholder="请输入实际开度" />
        </el-form-item>
        <el-form-item label="设定开度" prop="setaperture">
          <el-input v-model="form.setaperture" placeholder="请输入设定开度" />
        </el-form-item>
        <el-form-item label="传感器水位" prop="sensorlever">
          <el-input v-model="form.sensorlever" placeholder="请输入传感器水位" />
        </el-form-item>
        <el-form-item label="海拔水位" prop="altitudelever">
          <el-input v-model="form.altitudelever" placeholder="请输入海拔水位" />
        </el-form-item>
        <el-form-item label="闸门远控信号" prop="remotesignal">
          <el-input
            v-model="form.remotesignal"
            placeholder="请输入闸门远控信号"
          />
        </el-form-item>
        <el-form-item label="闸门电源故障信号" prop="powersignal">
          <el-input
            v-model="form.powersignal"
            placeholder="请输入闸门电源故障信号"
          />
        </el-form-item>
        <el-form-item label="闸门开闸中" prop="openingsignal">
          <el-input
            v-model="form.openingsignal"
            placeholder="请输入闸门开闸中"
          />
        </el-form-item>
        <el-form-item label="闸门关闸中" prop="closeingsignal">
          <el-input
            v-model="form.closeingsignal"
            placeholder="请输入闸门关闸中"
          />
        </el-form-item>
        <el-form-item label="闸门故障" prop="errorsignal">
          <el-input v-model="form.errorsignal" placeholder="请输入闸门故障" />
        </el-form-item>
        <el-form-item label="闸门全开" prop="openedsignal">
          <el-input v-model="form.openedsignal" placeholder="请输入闸门全开" />
        </el-form-item>
        <el-form-item label="闸门全关" prop="closedsignal">
          <el-input v-model="form.closedsignal" placeholder="请输入闸门全关" />
        </el-form-item>
        <el-form-item label="第几个闸门" prop="gatenumber">
          <el-input v-model="form.gatenumber" placeholder="请输入第几个闸门" />
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="form.id" placeholder="请输入id" />
        </el-form-item>
        <el-form-item label="时间" prop="tm">
          <el-date-picker
            clearable
            v-model="form.tm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStGateRRealRef)"
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
  listYzStGateRReal,
  getYzStGateRReal,
  delYzStGateRReal,
  addYzStGateRReal,
  updateYzStGateRReal,
  importTemplateYzStGateRReal,
  importYzStGateRReal,
  exportYzStGateRReal,
} from "@/apis/modules/meteorology/YzStGateRReal";

const YzStGateRRealRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStGateRRealList = ref([]);
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
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询闸门状态日志列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeTM && "" != daterangeTM) {
    queryParams.params["beginTM"] = TimeToYMDhms(daterangeTM.value[0]);
    queryParams.params["endTM"] = TimeToYMDhms(daterangeTM.value[1]);
  }
  const res: any = await listYzStGateRReal(queryParams);
  YzStGateRRealList.value = res.rows;
  if (YzStGateRRealList.value.length > 0) {
    YzStGateRRealList.value.forEach((item: any) => {
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
    realaperture: null,
    setaperture: null,
    sensorlever: null,
    altitudelever: null,
    remotesignal: null,
    powersignal: null,
    openingsignal: null,
    closeingsignal: null,
    errorsignal: null,
    openedsignal: null,
    closedsignal: null,
    gatenumber: null,
    id: null,
    tm: null,
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
  dialogTiltle.value = "添加闸门状态日志";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStGateRReal(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改闸门状态日志";
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
      if (dialogTiltle.value == "修改闸门状态日志") {
        const res: any = await updateYzStGateRReal(form.value);
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
        const res: any = await addYzStGateRReal(form.value);
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
    "是否确认删除闸门状态日志编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStGateRReal(params);
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
  const res = await exportYzStGateRReal(queryParams);
  saveAsExcelFile(res, `YzStGateRReal_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStGateRReal({});
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
  const res: any = await importYzStGateRReal(formData);
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
