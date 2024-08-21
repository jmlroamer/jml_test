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
      <el-form-item label="典型年" prop="tpcyr">
        <el-input
          v-model="queryParams.tpcyr"
          placeholder="请输入典型年"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重现期" prop="rcint">
        <el-input
          v-model="queryParams.rcint"
          placeholder="请输入重现期"
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
      :data="YzStFfrarBList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="典型年" align="center" prop="tpcyr" />
      <el-table-column label="重现期" align="center" prop="rcint" />
      <el-table-column label="流量" align="center" prop="q" />
      <el-table-column label="水位" align="center" prop="z" />
      <el-table-column label="一日洪量" align="center" prop="w1" />
      <el-table-column label="三日洪量" align="center" prop="w3" />
      <el-table-column label="五日洪量" align="center" prop="w5" />
      <el-table-column label="七日洪量" align="center" prop="w7" />
      <el-table-column label="十日洪量" align="center" prop="w10" />
      <el-table-column label="十五日洪量" align="center" prop="w15" />
      <el-table-column label="三十日洪量" align="center" prop="w30" />
      <el-table-column label="六十日洪量" align="center" prop="w60" />
      <el-table-column label="备注" align="center" prop="comments" />
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

    <!-- 添加或修改洪水频率分析成果对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStFfrarBRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改洪水频率分析成果'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="典型年" prop="tpcyr">
          <el-input
            :disabled="dialogTiltle == '修改洪水频率分析成果'"
            v-model="form.tpcyr"
            placeholder="请输入典型年"
          />
        </el-form-item>
        <el-form-item label="重现期" prop="rcint">
          <el-input
            :disabled="dialogTiltle == '修改洪水频率分析成果'"
            v-model="form.rcint"
            placeholder="请输入重现期"
          />
        </el-form-item>
        <el-form-item label="流量" prop="q">
          <el-input v-model="form.q" placeholder="请输入流量" />
        </el-form-item>
        <el-form-item label="水位" prop="z">
          <el-input v-model="form.z" placeholder="请输入水位" />
        </el-form-item>
        <el-form-item label="一日洪量" prop="w1">
          <el-input v-model="form.w1" placeholder="请输入一日洪量" />
        </el-form-item>
        <el-form-item label="三日洪量" prop="w3">
          <el-input v-model="form.w3" placeholder="请输入三日洪量" />
        </el-form-item>
        <el-form-item label="五日洪量" prop="w5">
          <el-input v-model="form.w5" placeholder="请输入五日洪量" />
        </el-form-item>
        <el-form-item label="七日洪量" prop="w7">
          <el-input v-model="form.w7" placeholder="请输入七日洪量" />
        </el-form-item>
        <el-form-item label="十日洪量" prop="w10">
          <el-input v-model="form.w10" placeholder="请输入十日洪量" />
        </el-form-item>
        <el-form-item label="十五日洪量" prop="w15">
          <el-input v-model="form.w15" placeholder="请输入十五日洪量" />
        </el-form-item>
        <el-form-item label="三十日洪量" prop="w30">
          <el-input v-model="form.w30" placeholder="请输入三十日洪量" />
        </el-form-item>
        <el-form-item label="六十日洪量" prop="w60">
          <el-input v-model="form.w60" placeholder="请输入六十日洪量" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.comments"
            :autosize="{ minRows: 2, maxRows: 5 }"
            type="textarea"
            placeholder="请输入备注"
          />
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
          <el-button type="primary" @click="submitForm(YzStFfrarBRef)"
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
  listYzStFfrarB,
  getYzStFfrarB,
  delYzStFfrarB,
  addYzStFfrarB,
  updateYzStFfrarB,
  importTemplateYzStFfrarB,
  importYzStFfrarB,
  exportYzStFfrarB,
} from "@/apis/modules/meteorology/YzStFfrarB";

const YzStFfrarBRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStFfrarBList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeMODITIME: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
  tpcyr: null,
  rcint: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({
  moditime: [{ required: true, message: "时间戳不能为空", trigger: "blur" }],
});

/** 查询洪水频率分析成果列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeMODITIME && "" != daterangeMODITIME) {
    queryParams.params["beginMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[0]
    );
    queryParams.params["endMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[1]
    );
  }
  const res: any = await listYzStFfrarB(queryParams);
  YzStFfrarBList.value = res.rows;
  if (YzStFfrarBList.value.length > 0) {
    YzStFfrarBList.value.forEach((item: any) => {
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
    tpcyr: null,
    rcint: null,
    q: null,
    z: null,
    w1: null,
    w3: null,
    w5: null,
    w7: null,
    w10: null,
    w15: null,
    w30: null,
    w60: null,
    comments: null,
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
  dialogTiltle.value = "添加洪水频率分析成果";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStFfrarB(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改洪水频率分析成果";
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
      if (dialogTiltle.value == "修改洪水频率分析成果") {
        const res: any = await updateYzStFfrarB(form.value);
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
        const res: any = await addYzStFfrarB(form.value);
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
    "是否确认删除洪水频率分析成果编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStFfrarB(params);
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
  const res = await exportYzStFfrarB(queryParams);
  saveAsExcelFile(res, `YzStFfrarB_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStFfrarB({});
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
  const res: any = await importYzStFfrarB(formData);
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
