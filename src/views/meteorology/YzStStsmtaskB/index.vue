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
      :data="YzStStsmtaskBList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="报汛段次" align="center" prop="dfrtms" />
      <el-table-column label="降水量标志" align="center" prop="pfl" />
      <el-table-column label="蒸发量标志" align="center" prop="efl" />
      <el-table-column label="水位标志" align="center" prop="zfl" />
      <el-table-column label="流量标志" align="center" prop="qfl" />
      <el-table-column label="蓄水量标志" align="center" prop="wfl" />
      <el-table-column label="入库流量标志" align="center" prop="inqfl" />
      <el-table-column label="闸门启闭标志" align="center" prop="damfl" />
      <el-table-column label="出库流量标志" align="center" prop="otqfl" />
      <el-table-column label="风浪标志" align="center" prop="wdwvfl" />
      <el-table-column label="泥沙标志" align="center" prop="sedfl" />
      <el-table-column label="冰情标志" align="center" prop="icefl" />
      <el-table-column label="引水量标志" align="center" prop="ppfl" />
      <el-table-column label="排水量标志" align="center" prop="drnfl" />
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

    <!-- 添加或修改测站报送任务对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStStsmtaskBRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改测站报送任务'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="报汛段次" prop="dfrtms">
          <el-input v-model="form.dfrtms" placeholder="请输入报汛段次" />
        </el-form-item>
        <el-form-item label="降水量标志" prop="pfl">
          <el-input v-model="form.pfl" placeholder="请输入降水量标志" />
        </el-form-item>
        <el-form-item label="蒸发量标志" prop="efl">
          <el-input v-model="form.efl" placeholder="请输入蒸发量标志" />
        </el-form-item>
        <el-form-item label="水位标志" prop="zfl">
          <el-input v-model="form.zfl" placeholder="请输入水位标志" />
        </el-form-item>
        <el-form-item label="流量标志" prop="qfl">
          <el-input v-model="form.qfl" placeholder="请输入流量标志" />
        </el-form-item>
        <el-form-item label="蓄水量标志" prop="wfl">
          <el-input v-model="form.wfl" placeholder="请输入蓄水量标志" />
        </el-form-item>
        <el-form-item label="入库流量标志" prop="inqfl">
          <el-input v-model="form.inqfl" placeholder="请输入入库流量标志" />
        </el-form-item>
        <el-form-item label="闸门启闭标志" prop="damfl">
          <el-input v-model="form.damfl" placeholder="请输入闸门启闭标志" />
        </el-form-item>
        <el-form-item label="出库流量标志" prop="otqfl">
          <el-input v-model="form.otqfl" placeholder="请输入出库流量标志" />
        </el-form-item>
        <el-form-item label="风浪标志" prop="wdwvfl">
          <el-input v-model="form.wdwvfl" placeholder="请输入风浪标志" />
        </el-form-item>
        <el-form-item label="泥沙标志" prop="sedfl">
          <el-input v-model="form.sedfl" placeholder="请输入泥沙标志" />
        </el-form-item>
        <el-form-item label="冰情标志" prop="icefl">
          <el-input v-model="form.icefl" placeholder="请输入冰情标志" />
        </el-form-item>
        <el-form-item label="引水量标志" prop="ppfl">
          <el-input v-model="form.ppfl" placeholder="请输入引水量标志" />
        </el-form-item>
        <el-form-item label="排水量标志" prop="drnfl">
          <el-input v-model="form.drnfl" placeholder="请输入排水量标志" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStStsmtaskBRef)"
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
  listYzStStsmtaskB,
  getYzStStsmtaskB,
  delYzStStsmtaskB,
  addYzStStsmtaskB,
  updateYzStStsmtaskB,
  importTemplateYzStStsmtaskB,
  importYzStStsmtaskB,
  exportYzStStsmtaskB,
} from "@/apis/modules/meteorology/YzStStsmtaskB";

const YzStStsmtaskBRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStStsmtaskBList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询测站报送任务列表 */
const getList = async () => {
  loading.value = true;
  const res: any = await listYzStStsmtaskB(queryParams);
  YzStStsmtaskBList.value = res.rows;
  if (YzStStsmtaskBList.value.length > 0) {
    YzStStsmtaskBList.value.forEach((item: any) => {
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
    dfrtms: null,
    pfl: null,
    efl: null,
    zfl: null,
    qfl: null,
    wfl: null,
    inqfl: null,
    damfl: null,
    otqfl: null,
    wdwvfl: null,
    sedfl: null,
    icefl: null,
    ppfl: null,
    drnfl: null,
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
  dialogTiltle.value = "添加测站报送任务";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStStsmtaskB(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改测站报送任务";
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
      if (dialogTiltle.value == "修改测站报送任务") {
        const res: any = await updateYzStStsmtaskB(form.value);
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
        const res: any = await addYzStStsmtaskB(form.value);
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
    "是否确认删除测站报送任务编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStStsmtaskB(params);
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
  const res = await exportYzStStsmtaskB(queryParams);
  saveAsExcelFile(res, `YzStStsmtaskB_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStStsmtaskB({});
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
  const res: any = await importYzStStsmtaskB(formData);
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
