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
      <el-form-item label="月份" prop="mnth">
        <el-input
          v-model="queryParams.mnth"
          placeholder="请输入月份"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="旬月标示" prop="prdtp">
        <el-input
          v-model="queryParams.prdtp"
          placeholder="请输入旬月标示"
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
      :data="YzStRvdmmyavSList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="月份" align="center" prop="mnth" />
      <el-table-column label="旬月标示" align="center" prop="prdtp" />
      <el-table-column label="多年旬月平均水位" align="center" prop="mymavz" />
      <el-table-column label="多年旬月平均流量" align="center" prop="mymavq" />
      <el-table-column label="开始年份" align="center" prop="bgyr" />
      <el-table-column label="结束年份" align="center" prop="edyr" />
      <el-table-column label="统计年数" align="center" prop="sttyrnum" />
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

    <!-- 添加或修改水位流量多年旬月平均统计对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStRvdmmyavSRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改水位流量多年旬月平均统计'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="月份" prop="mnth">
          <el-input
            :disabled="dialogTiltle == '修改水位流量多年旬月平均统计'"
            v-model="form.mnth"
            placeholder="请输入月份"
          />
        </el-form-item>
        <el-form-item label="旬月标示" prop="prdtp">
          <el-input
            :disabled="dialogTiltle == '修改水位流量多年旬月平均统计'"
            v-model="form.prdtp"
            placeholder="请输入旬月标示"
          />
        </el-form-item>
        <el-form-item label="多年旬月平均水位" prop="mymavz">
          <el-input
            v-model="form.mymavz"
            placeholder="请输入多年旬月平均水位"
          />
        </el-form-item>
        <el-form-item label="多年旬月平均流量" prop="mymavq">
          <el-input
            v-model="form.mymavq"
            placeholder="请输入多年旬月平均流量"
          />
        </el-form-item>
        <el-form-item label="开始年份" prop="bgyr">
          <el-input v-model="form.bgyr" placeholder="请输入开始年份" />
        </el-form-item>
        <el-form-item label="结束年份" prop="edyr">
          <el-input v-model="form.edyr" placeholder="请输入结束年份" />
        </el-form-item>
        <el-form-item label="统计年数" prop="sttyrnum">
          <el-input v-model="form.sttyrnum" placeholder="请输入统计年数" />
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
          <el-button type="primary" @click="submitForm(YzStRvdmmyavSRef)"
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
  listYzStRvdmmyavS,
  getYzStRvdmmyavS,
  delYzStRvdmmyavS,
  addYzStRvdmmyavS,
  updateYzStRvdmmyavS,
  importTemplateYzStRvdmmyavS,
  importYzStRvdmmyavS,
  exportYzStRvdmmyavS,
} from "@/apis/modules/meteorology/YzStRvdmmyavS";

const YzStRvdmmyavSRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRvdmmyavSList = ref([]);
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
  mnth: null,
  prdtp: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询水位流量多年旬月平均统计列表 */
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
  const res: any = await listYzStRvdmmyavS(queryParams);
  YzStRvdmmyavSList.value = res.rows;
  if (YzStRvdmmyavSList.value.length > 0) {
    YzStRvdmmyavSList.value.forEach((item: any) => {
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
    mnth: null,
    prdtp: null,
    mymavz: null,
    mymavq: null,
    bgyr: null,
    edyr: null,
    sttyrnum: null,
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
  dialogTiltle.value = "添加水位流量多年旬月平均统计";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRvdmmyavS(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改水位流量多年旬月平均统计";
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
      if (dialogTiltle.value == "修改水位流量多年旬月平均统计") {
        const res: any = await updateYzStRvdmmyavS(form.value);
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
        const res: any = await addYzStRvdmmyavS(form.value);
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
    "是否确认删除水位流量多年旬月平均统计编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRvdmmyavS(params);
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
  const res = await exportYzStRvdmmyavS(queryParams);
  saveAsExcelFile(res, `YzStRvdmmyavS_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRvdmmyavS({});
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
  const res: any = await importYzStRvdmmyavS(formData);
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
