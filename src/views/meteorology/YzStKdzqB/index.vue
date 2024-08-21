<template>
  <div class="box-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="水闸编码" prop="wagacode">
        <el-input
          v-model="queryParams.wagacode"
          placeholder="请输入水闸编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="闸门开度" prop="gtophgt">
        <el-input
          v-model="queryParams.gtophgt"
          placeholder="请输入闸门开度"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="前后水位差" prop="bawldif">
        <el-input
          v-model="queryParams.bawldif"
          placeholder="请输入前后水位差"
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
      :data="YzStKdzqBList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="水闸编码" align="center" prop="wagacode" />
      <el-table-column label="闸门开度" align="center" prop="gtophgt" />
      <el-table-column label="前后水位差" align="center" prop="bawldif" />
      <el-table-column label="流量" align="center" prop="q" />
      <el-table-column label="备注" align="center" prop="note" />
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

    <!-- 添加或修改节制闸开启高度、水位差、流量关系对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStKdzqBRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="水闸编码" prop="wagacode">
          <el-input
            :disabled="dialogTiltle == '修改节制闸开启高度、水位差、流量关系'"
            v-model="form.wagacode"
            placeholder="请输入水闸编码"
          />
        </el-form-item>
        <el-form-item label="闸门开度" prop="gtophgt">
          <el-input
            :disabled="dialogTiltle == '修改节制闸开启高度、水位差、流量关系'"
            v-model="form.gtophgt"
            placeholder="请输入闸门开度"
          />
        </el-form-item>
        <el-form-item label="前后水位差" prop="bawldif">
          <el-input
            :disabled="dialogTiltle == '修改节制闸开启高度、水位差、流量关系'"
            v-model="form.bawldif"
            placeholder="请输入前后水位差"
          />
        </el-form-item>
        <el-form-item label="流量" prop="q">
          <el-input v-model="form.q" placeholder="请输入流量" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStKdzqBRef)"
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
  listYzStKdzqB,
  getYzStKdzqB,
  delYzStKdzqB,
  addYzStKdzqB,
  updateYzStKdzqB,
  importTemplateYzStKdzqB,
  importYzStKdzqB,
  exportYzStKdzqB,
} from "@/apis/modules/meteorology/YzStKdzqB";

const YzStKdzqBRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStKdzqBList = ref([]);
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
  wagacode: null,
  gtophgt: null,
  bawldif: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询节制闸开启高度、水位差、流量关系列表 */
const getList = async () => {
  loading.value = true;
  const res: any = await listYzStKdzqB(queryParams);
  YzStKdzqBList.value = res.rows;
  if (YzStKdzqBList.value.length > 0) {
    YzStKdzqBList.value.forEach((item: any) => {
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
    wagacode: null,
    gtophgt: null,
    bawldif: null,
    q: null,
    note: null,
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
  ids.value = selection.map((item: any) => item.wagacode);
  idslist.value = selection;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  resetForm();
  dialogOpen.value = true;
  dialogTiltle.value = "添加节制闸开启高度、水位差、流量关系";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStKdzqB(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改节制闸开启高度、水位差、流量关系";
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
      if (dialogTiltle.value == "修改节制闸开启高度、水位差、流量关系") {
        const res: any = await updateYzStKdzqB(form.value);
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
        const res: any = await addYzStKdzqB(form.value);
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
  const _wagacodes = row.wagacode || ids.value;
  const params = row.wagacode ? [row] : idslist.value;
  ElMessageBox.confirm(
    "是否确认删除节制闸开启高度、水位差、流量关系编号为" +
      _wagacodes +
      "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStKdzqB(params);
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
  const res = await exportYzStKdzqB(queryParams);
  saveAsExcelFile(res, `YzStKdzqB_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStKdzqB({});
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
  const res: any = await importYzStKdzqB(formData);
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
