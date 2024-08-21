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
      <el-form-item label="扩展关键字" prop="exkey">
        <el-input
          v-model="queryParams.exkey"
          placeholder="请输入扩展关键字"
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
      :data="YzStSoilRList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="时间" align="center" prop="tm" />
      <el-table-column label="扩展关键字" align="center" prop="exkey" />
      <el-table-column label="垂线平均含水量" align="center" prop="vtavslm" />
      <el-table-column label="表层含水量" align="center" prop="srlslm" />
      <el-table-column label="100cm 深度含水量" align="center" prop="slm10" />
      <el-table-column label="20cm 深度含水量" align="center" prop="slm20" />
      <el-table-column label="30cm 深度含水量" align="center" prop="slm30" />
      <el-table-column label="40cm 深度含水量" align="center" prop="slm40" />
      <el-table-column label="60cm 深度含水量" align="center" prop="slm60" />
      <el-table-column label="80cm 深度含水量" align="center" prop="slm80" />
      <el-table-column label="100cm 深度含水量" align="center" prop="slm100" />
      <el-table-column label="作物种类" align="center" prop="crpty" />
      <el-table-column label="作物生长期" align="center" prop="crpgrwprd" />
      <el-table-column label="作物水分状态" align="center" prop="hitrsn" />
      <el-table-column label="土壤含水量测法" align="center" prop="slmmmt" />
      <el-table-column label="通道" align="center" prop="chan" />
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

    <!-- 添加或修改土壤墒情对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStSoilRRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改土壤墒情'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="时间" prop="tm">
          <el-date-picker
            clearable
            :disabled="dialogTiltle == '修改土壤墒情'"
            v-model="form.tm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="扩展关键字" prop="exkey">
          <el-input
            :disabled="dialogTiltle == '修改土壤墒情'"
            v-model="form.exkey"
            placeholder="请输入扩展关键字"
          />
        </el-form-item>
        <el-form-item label="垂线平均含水量" prop="vtavslm">
          <el-input v-model="form.vtavslm" placeholder="请输入垂线平均含水量" />
        </el-form-item>
        <el-form-item label="表层含水量" prop="srlslm">
          <el-input v-model="form.srlslm" placeholder="请输入表层含水量" />
        </el-form-item>
        <el-form-item label="100cm 深度含水量" prop="slm10">
          <el-input v-model="form.slm10" placeholder="请输入100cm 深度含水量" />
        </el-form-item>
        <el-form-item label="20cm 深度含水量" prop="slm20">
          <el-input v-model="form.slm20" placeholder="请输入20cm 深度含水量" />
        </el-form-item>
        <el-form-item label="30cm 深度含水量" prop="slm30">
          <el-input v-model="form.slm30" placeholder="请输入30cm 深度含水量" />
        </el-form-item>
        <el-form-item label="40cm 深度含水量" prop="slm40">
          <el-input v-model="form.slm40" placeholder="请输入40cm 深度含水量" />
        </el-form-item>
        <el-form-item label="60cm 深度含水量" prop="slm60">
          <el-input v-model="form.slm60" placeholder="请输入60cm 深度含水量" />
        </el-form-item>
        <el-form-item label="80cm 深度含水量" prop="slm80">
          <el-input v-model="form.slm80" placeholder="请输入80cm 深度含水量" />
        </el-form-item>
        <el-form-item label="100cm 深度含水量" prop="slm100">
          <el-input
            v-model="form.slm100"
            placeholder="请输入100cm 深度含水量"
          />
        </el-form-item>
        <el-form-item label="作物种类" prop="crpty">
          <el-input v-model="form.crpty" placeholder="请输入作物种类" />
        </el-form-item>
        <el-form-item label="作物生长期" prop="crpgrwprd">
          <el-input v-model="form.crpgrwprd" placeholder="请输入作物生长期" />
        </el-form-item>
        <el-form-item label="作物水分状态" prop="hitrsn">
          <el-input v-model="form.hitrsn" placeholder="请输入作物水分状态" />
        </el-form-item>
        <el-form-item label="土壤含水量测法" prop="slmmmt">
          <el-input v-model="form.slmmmt" placeholder="请输入土壤含水量测法" />
        </el-form-item>
        <el-form-item label="通道" prop="chan">
          <el-input v-model="form.chan" placeholder="请输入通道" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStSoilRRef)"
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
  listYzStSoilR,
  getYzStSoilR,
  delYzStSoilR,
  addYzStSoilR,
  updateYzStSoilR,
  importTemplateYzStSoilR,
  importYzStSoilR,
  exportYzStSoilR,
} from "@/apis/modules/meteorology/YzStSoilR";

const YzStSoilRRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStSoilRList = ref([]);
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
  exkey: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询土壤墒情列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeTM && "" != daterangeTM) {
    queryParams.params["beginTM"] = TimeToYMDhms(daterangeTM.value[0]);
    queryParams.params["endTM"] = TimeToYMDhms(daterangeTM.value[1]);
  }
  const res: any = await listYzStSoilR(queryParams);
  YzStSoilRList.value = res.rows;
  if (YzStSoilRList.value.length > 0) {
    YzStSoilRList.value.forEach((item: any) => {
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
    exkey: null,
    vtavslm: null,
    srlslm: null,
    slm10: null,
    slm20: null,
    slm30: null,
    slm40: null,
    slm60: null,
    slm80: null,
    slm100: null,
    crpty: null,
    crpgrwprd: null,
    hitrsn: null,
    slmmmt: null,
    chan: null,
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
  dialogTiltle.value = "添加土壤墒情";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStSoilR(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改土壤墒情";
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
      if (dialogTiltle.value == "修改土壤墒情") {
        const res: any = await updateYzStSoilR(form.value);
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
        const res: any = await addYzStSoilR(form.value);
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
    "是否确认删除土壤墒情编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStSoilR(params);
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
  const res = await exportYzStSoilR(queryParams);
  saveAsExcelFile(res, `YzStSoilR_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStSoilR({});
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
  const res: any = await importYzStSoilR(formData);
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
