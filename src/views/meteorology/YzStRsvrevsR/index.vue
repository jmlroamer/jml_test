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
      :data="YzStRsvrevsRList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="标志时间" align="center" prop="idtm" />
      <el-table-column label="统计时段标志" align="center" prop="sttdrcd" />
      <el-table-column label="最高库水位" align="center" prop="htrz" />
      <el-table-column label="最低库水位" align="center" prop="ltrz" />
      <el-table-column label="最大入库流量" align="center" prop="mxinq" />
      <el-table-column label="最小入库流量" align="center" prop="mninq" />
      <el-table-column label="最大出库流量" align="center" prop="mxotq" />
      <el-table-column label="最小出库流量" align="center" prop="mnotq" />
      <el-table-column label="最大蓄水量" align="center" prop="mxw" />
      <el-table-column label="最小蓄水量" align="center" prop="mnw" />
      <el-table-column
        label="最高库水位出现时间"
        align="center"
        prop="htrztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.htrztm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最低库水位出现时间"
        align="center"
        prop="ltrztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ltrztm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大入库流量出现时间"
        align="center"
        prop="mxinqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mxinqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最小入库流量出现时间"
        align="center"
        prop="mninqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mninqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大出库流量出现时间"
        align="center"
        prop="mxotqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mxotqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最小出库流量出现时间"
        align="center"
        prop="mnotqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mnotqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大蓄水量出现时间"
        align="center"
        prop="mxwtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mxwtm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最小蓄水量出现时间"
        align="center"
        prop="mnwtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.mnwtm }}</span>
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

    <!-- 添加或修改水库水情极值对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="650px"
      append-to-body
    >
      <el-form
        ref="YzStRsvrevsRRef"
        :model="form"
        :rules="rules"
        label-width="160px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改水库水情极值'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="标志时间" prop="idtm">
          <el-date-picker
            clearable
            :disabled="dialogTiltle == '修改水库水情极值'"
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
            :disabled="dialogTiltle == '修改水库水情极值'"
            v-model="form.sttdrcd"
            placeholder="请输入统计时段标志"
          />
        </el-form-item>
        <el-form-item label="最高库水位" prop="htrz">
          <el-input v-model="form.htrz" placeholder="请输入最高库水位" />
        </el-form-item>
        <el-form-item label="最低库水位" prop="ltrz">
          <el-input v-model="form.ltrz" placeholder="请输入最低库水位" />
        </el-form-item>
        <el-form-item label="最大入库流量" prop="mxinq">
          <el-input v-model="form.mxinq" placeholder="请输入最大入库流量" />
        </el-form-item>
        <el-form-item label="最小入库流量" prop="mninq">
          <el-input v-model="form.mninq" placeholder="请输入最小入库流量" />
        </el-form-item>
        <el-form-item label="最大出库流量" prop="mxotq">
          <el-input v-model="form.mxotq" placeholder="请输入最大出库流量" />
        </el-form-item>
        <el-form-item label="最小出库流量" prop="mnotq">
          <el-input v-model="form.mnotq" placeholder="请输入最小出库流量" />
        </el-form-item>
        <el-form-item label="最大蓄水量" prop="mxw">
          <el-input v-model="form.mxw" placeholder="请输入最大蓄水量" />
        </el-form-item>
        <el-form-item label="最小蓄水量" prop="mnw">
          <el-input v-model="form.mnw" placeholder="请输入最小蓄水量" />
        </el-form-item>
        <el-form-item label="最高库水位出现时间" prop="htrztm">
          <el-date-picker
            clearable
            v-model="form.htrztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最高库水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低库水位出现时间" prop="ltrztm">
          <el-date-picker
            clearable
            v-model="form.ltrztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最低库水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大入库流量出现时间" prop="mxinqtm">
          <el-date-picker
            clearable
            v-model="form.mxinqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最大入库流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最小入库流量出现时间" prop="mninqtm">
          <el-date-picker
            clearable
            v-model="form.mninqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最小入库流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大出库流量出现时间" prop="mxotqtm">
          <el-date-picker
            clearable
            v-model="form.mxotqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最大出库流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最小出库流量出现时间" prop="mnotqtm">
          <el-date-picker
            clearable
            v-model="form.mnotqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最小出库流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大蓄水量出现时间" prop="mxwtm">
          <el-date-picker
            clearable
            v-model="form.mxwtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最大蓄水量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最小蓄水量出现时间" prop="mnwtm">
          <el-date-picker
            clearable
            v-model="form.mnwtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择最小蓄水量出现时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStRsvrevsRRef)"
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
  listYzStRsvrevsR,
  getYzStRsvrevsR,
  delYzStRsvrevsR,
  addYzStRsvrevsR,
  updateYzStRsvrevsR,
  importTemplateYzStRsvrevsR,
  importYzStRsvrevsR,
  exportYzStRsvrevsR,
} from "@/apis/modules/meteorology/YzStRsvrevsR";

const YzStRsvrevsRRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRsvrevsRList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeIDTM: any = ref("");
const daterangeHTRZTM: any = ref("");
const daterangeLTRZTM: any = ref("");
const daterangeMXINQTM: any = ref("");
const daterangeMNINQTM: any = ref("");
const daterangeMXOTQTM: any = ref("");
const daterangeMNOTQTM: any = ref("");
const daterangeMXWTM: any = ref("");
const daterangeMNWTM: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
  idtm: null,
  sttdrcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询水库水情极值列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeIDTM && "" != daterangeIDTM) {
    queryParams.params["beginIDTM"] = TimeToYMDhms(daterangeIDTM.value[0]);
    queryParams.params["endIDTM"] = TimeToYMDhms(daterangeIDTM.value[1]);
  }
  if (null != daterangeHTRZTM && "" != daterangeHTRZTM) {
    queryParams.params["beginHTRZTM"] = TimeToYMDhms(daterangeHTRZTM.value[0]);
    queryParams.params["endHTRZTM"] = TimeToYMDhms(daterangeHTRZTM.value[1]);
  }
  if (null != daterangeLTRZTM && "" != daterangeLTRZTM) {
    queryParams.params["beginLTRZTM"] = TimeToYMDhms(daterangeLTRZTM.value[0]);
    queryParams.params["endLTRZTM"] = TimeToYMDhms(daterangeLTRZTM.value[1]);
  }
  if (null != daterangeMXINQTM && "" != daterangeMXINQTM) {
    queryParams.params["beginMXINQTM"] = TimeToYMDhms(
      daterangeMXINQTM.value[0]
    );
    queryParams.params["endMXINQTM"] = TimeToYMDhms(daterangeMXINQTM.value[1]);
  }
  if (null != daterangeMNINQTM && "" != daterangeMNINQTM) {
    queryParams.params["beginMNINQTM"] = TimeToYMDhms(
      daterangeMNINQTM.value[0]
    );
    queryParams.params["endMNINQTM"] = TimeToYMDhms(daterangeMNINQTM.value[1]);
  }
  if (null != daterangeMXOTQTM && "" != daterangeMXOTQTM) {
    queryParams.params["beginMXOTQTM"] = TimeToYMDhms(
      daterangeMXOTQTM.value[0]
    );
    queryParams.params["endMXOTQTM"] = TimeToYMDhms(daterangeMXOTQTM.value[1]);
  }
  if (null != daterangeMNOTQTM && "" != daterangeMNOTQTM) {
    queryParams.params["beginMNOTQTM"] = TimeToYMDhms(
      daterangeMNOTQTM.value[0]
    );
    queryParams.params["endMNOTQTM"] = TimeToYMDhms(daterangeMNOTQTM.value[1]);
  }
  if (null != daterangeMXWTM && "" != daterangeMXWTM) {
    queryParams.params["beginMXWTM"] = TimeToYMDhms(daterangeMXWTM.value[0]);
    queryParams.params["endMXWTM"] = TimeToYMDhms(daterangeMXWTM.value[1]);
  }
  if (null != daterangeMNWTM && "" != daterangeMNWTM) {
    queryParams.params["beginMNWTM"] = TimeToYMDhms(daterangeMNWTM.value[0]);
    queryParams.params["endMNWTM"] = TimeToYMDhms(daterangeMNWTM.value[1]);
  }
  const res: any = await listYzStRsvrevsR(queryParams);
  YzStRsvrevsRList.value = res.rows;
  if (YzStRsvrevsRList.value.length > 0) {
    YzStRsvrevsRList.value.forEach((item: any) => {
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
    htrz: null,
    ltrz: null,
    mxinq: null,
    mninq: null,
    mxotq: null,
    mnotq: null,
    mxw: null,
    mnw: null,
    htrztm: null,
    ltrztm: null,
    mxinqtm: null,
    mninqtm: null,
    mxotqtm: null,
    mnotqtm: null,
    mxwtm: null,
    mnwtm: null,
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
  daterangeHTRZTM.value = "";
  daterangeLTRZTM.value = "";
  daterangeMXINQTM.value = "";
  daterangeMNINQTM.value = "";
  daterangeMXOTQTM.value = "";
  daterangeMNOTQTM.value = "";
  daterangeMXWTM.value = "";
  daterangeMNWTM.value = "";
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
  dialogTiltle.value = "添加水库水情极值";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRsvrevsR(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改水库水情极值";
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
      if (dialogTiltle.value == "修改水库水情极值") {
        const res: any = await updateYzStRsvrevsR(form.value);
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
        const res: any = await addYzStRsvrevsR(form.value);
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
    "是否确认删除水库水情极值编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRsvrevsR(params);
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
  const res = await exportYzStRsvrevsR(queryParams);
  saveAsExcelFile(res, `YzStRsvrevsR_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRsvrevsR({});
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
  const res: any = await importYzStRsvrevsR(formData);
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
