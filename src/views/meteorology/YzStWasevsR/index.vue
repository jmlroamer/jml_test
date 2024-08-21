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
      <el-form-item label="标志时间" style="width: 440px">
        <el-date-picker
          v-model="daterangeIDTM"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="HH:mm:ss"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="统计时段标志" prop="sttdrcd">
        <el-input
          v-model="queryParams.sttdrcd"
          placeholder="请输入统计时段标志"
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
      :data="YzStWasevsRList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="标志时间" align="center" prop="idtm" />
      <el-table-column label="统计时段标志" align="center" prop="sttdrcd" />
      <el-table-column label="最高闸上水位" align="center" prop="htupz" />
      <el-table-column label="最低闸上水位" align="center" prop="ltupz" />
      <el-table-column label="最大过闸流量" align="center" prop="mxgtq" />
      <el-table-column label="最小过闸流量" align="center" prop="mngtq" />
      <el-table-column label="最高闸下水位" align="center" prop="htdwz" />
      <el-table-column label="最低闸下水位" align="center" prop="ltdwz" />
      <el-table-column
        label="最高闸上水位出现时间"
        align="center"
        prop="htupztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.htupztm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最低闸上水位出现时间"
        align="center"
        prop="ltupztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ltupztm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大过闸流量出现时间"
        align="center"
        prop="mxgtqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mxgtqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最小过闸流量出现时间"
        align="center"
        prop="mngtqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mngtqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最高闸下水位出现时间"
        align="center"
        prop="htdwztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.htdwztm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最低闸下水位出现时间"
        align="center"
        prop="ltdwztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ltdwztm }}</span>
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

    <!-- 添加或修改堰闸水情极值对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="650px"
      append-to-body
    >
      <el-form
        ref="YzStWasevsRRef"
        :model="form"
        :rules="rules"
        label-width="180px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改堰闸水情极值'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="标志时间" prop="idtm">
          <el-date-picker
            clearable
            :disabled="dialogTiltle == '修改堰闸水情极值'"
            v-model="form.idtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择标志时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="统计时段标志" prop="sttdrcd">
          <el-input
            :disabled="dialogTiltle == '修改堰闸水情极值'"
            v-model="form.sttdrcd"
            placeholder="请输入统计时段标志"
          />
        </el-form-item>
        <el-form-item label="最高闸上水位" prop="htupz">
          <el-input v-model="form.htupz" placeholder="请输入最高闸上水位" />
        </el-form-item>
        <el-form-item label="最低闸上水位" prop="ltupz">
          <el-input v-model="form.ltupz" placeholder="请输入最低闸上水位" />
        </el-form-item>
        <el-form-item label="最大过闸流量" prop="mxgtq">
          <el-input v-model="form.mxgtq" placeholder="请输入最大过闸流量" />
        </el-form-item>
        <el-form-item label="最小过闸流量" prop="mngtq">
          <el-input v-model="form.mngtq" placeholder="请输入最小过闸流量" />
        </el-form-item>
        <el-form-item label="最高闸下水位" prop="htdwz">
          <el-input v-model="form.htdwz" placeholder="请输入最高闸下水位" />
        </el-form-item>
        <el-form-item label="最低闸下水位" prop="ltdwz">
          <el-input v-model="form.ltdwz" placeholder="请输入最低闸下水位" />
        </el-form-item>
        <el-form-item label="最高闸上水位出现时间" prop="htupztm">
          <el-date-picker
            clearable
            v-model="form.htupztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最高闸上水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低闸上水位出现时间" prop="ltupztm">
          <el-date-picker
            clearable
            v-model="form.ltupztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最低闸上水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大过闸流量出现时间" prop="mxgtqtm">
          <el-date-picker
            clearable
            v-model="form.mxgtqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最大过闸流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最小过闸流量出现时间" prop="mngtqtm">
          <el-date-picker
            clearable
            v-model="form.mngtqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最小过闸流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最高闸下水位出现时间" prop="htdwztm">
          <el-date-picker
            clearable
            v-model="form.htdwztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最高闸下水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低闸下水位出现时间" prop="ltdwztm">
          <el-date-picker
            clearable
            v-model="form.ltdwztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最低闸下水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStWasevsRRef)"
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
  listYzStWasevsR,
  getYzStWasevsR,
  delYzStWasevsR,
  addYzStWasevsR,
  updateYzStWasevsR,
  importTemplateYzStWasevsR,
  importYzStWasevsR,
  exportYzStWasevsR,
} from "@/apis/modules/meteorology/YzStWasevsR";

const YzStWasevsRRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStWasevsRList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeIDTM: any = ref("");
const daterangeHTUPZTM: any = ref("");
const daterangeLTUPZTM: any = ref("");
const daterangeMXGTQTM: any = ref("");
const daterangeMNGTQTM: any = ref("");
const daterangeHTDWZTM: any = ref("");
const daterangeLTDWZTM: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
  idtm: null,
  sttdrcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询堰闸水情极值列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeIDTM && "" != daterangeIDTM) {
    queryParams.params["beginIDTM"] = TimeToYMDhms(daterangeIDTM.value[0]);
    queryParams.params["endIDTM"] = TimeToYMDhms(daterangeIDTM.value[1]);
  }
  if (null != daterangeHTUPZTM && "" != daterangeHTUPZTM) {
    queryParams.params["beginHTUPZTM"] = TimeToYMDhms(
      daterangeHTUPZTM.value[0]
    );
    queryParams.params["endHTUPZTM"] = TimeToYMDhms(daterangeHTUPZTM.value[1]);
  }
  if (null != daterangeLTUPZTM && "" != daterangeLTUPZTM) {
    queryParams.params["beginLTUPZTM"] = TimeToYMDhms(
      daterangeLTUPZTM.value[0]
    );
    queryParams.params["endLTUPZTM"] = TimeToYMDhms(daterangeLTUPZTM.value[1]);
  }
  if (null != daterangeMXGTQTM && "" != daterangeMXGTQTM) {
    queryParams.params["beginMXGTQTM"] = TimeToYMDhms(
      daterangeMXGTQTM.value[0]
    );
    queryParams.params["endMXGTQTM"] = TimeToYMDhms(daterangeMXGTQTM.value[1]);
  }
  if (null != daterangeMNGTQTM && "" != daterangeMNGTQTM) {
    queryParams.params["beginMNGTQTM"] = TimeToYMDhms(
      daterangeMNGTQTM.value[0]
    );
    queryParams.params["endMNGTQTM"] = TimeToYMDhms(daterangeMNGTQTM.value[1]);
  }
  if (null != daterangeHTDWZTM && "" != daterangeHTDWZTM) {
    queryParams.params["beginHTDWZTM"] = TimeToYMDhms(
      daterangeHTDWZTM.value[0]
    );
    queryParams.params["endHTDWZTM"] = TimeToYMDhms(daterangeHTDWZTM.value[1]);
  }
  if (null != daterangeLTDWZTM && "" != daterangeLTDWZTM) {
    queryParams.params["beginLTDWZTM"] = TimeToYMDhms(
      daterangeLTDWZTM.value[0]
    );
    queryParams.params["endLTDWZTM"] = TimeToYMDhms(daterangeLTDWZTM.value[1]);
  }
  const res: any = await listYzStWasevsR(queryParams);
  YzStWasevsRList.value = res.rows;
  if (YzStWasevsRList.value.length > 0) {
    YzStWasevsRList.value.forEach((item: any) => {
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
    idtm: null,
    sttdrcd: null,
    htupz: null,
    ltupz: null,
    mxgtq: null,
    mngtq: null,
    htdwz: null,
    ltdwz: null,
    htupztm: null,
    ltupztm: null,
    mxgtqtm: null,
    mngtqtm: null,
    htdwztm: null,
    ltdwztm: null,
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
  daterangeIDTM.value = "";
  daterangeHTUPZTM.value = "";
  daterangeLTUPZTM.value = "";
  daterangeMXGTQTM.value = "";
  daterangeMNGTQTM.value = "";
  daterangeHTDWZTM.value = "";
  daterangeLTDWZTM.value = "";
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
  dialogTiltle.value = "添加堰闸水情极值";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStWasevsR(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改堰闸水情极值";
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
      if (dialogTiltle.value == "修改堰闸水情极值") {
        const res: any = await updateYzStWasevsR(form.value);
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
        const res: any = await addYzStWasevsR(form.value);
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
    "是否确认删除堰闸水情极值编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStWasevsR(params);
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
  const res = await exportYzStWasevsR(queryParams);
  saveAsExcelFile(res, `YzStWasevsR_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStWasevsR({});
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
  const res: any = await importYzStWasevsR(formData);
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
