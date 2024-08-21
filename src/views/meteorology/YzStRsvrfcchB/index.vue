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
      :data="YzStRsvrfcchBList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="水库类型" align="center" prop="rsvrtp" />
      <el-table-column label="坝顶高程" align="center" prop="damel" />
      <el-table-column label="校核洪水位" align="center" prop="ckflz" />
      <el-table-column label="设计洪水位" align="center" prop="dsflz" />
      <el-table-column label="正常高水位" align="center" prop="normz" />
      <el-table-column label="死水位" align="center" prop="ddz" />
      <el-table-column label="兴利水位" align="center" prop="actz" />
      <el-table-column label="总库容" align="center" prop="ttcp" />
      <el-table-column label="防洪库容" align="center" prop="fldcp" />
      <el-table-column label="兴利库容" align="center" prop="actcp" />
      <el-table-column label="死库容" align="center" prop="ddcp" />
      <el-table-column label="历史最高库水位" align="center" prop="hhrz" />
      <el-table-column label="历史最大蓄水量" align="center" prop="hmxw" />
      <el-table-column
        label="历史最高库水位"
        align="center"
        prop="hhrztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hhrztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最大入流" align="center" prop="hmxinq" />
      <el-table-column label="历史最大入流时段长" align="center" prop="rstdr" />
      <el-table-column
        label="历史最大入流出现时间"
        align="center"
        prop="hmxinqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmxinqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最大出流" align="center" prop="hmxotq" />
      <el-table-column
        label="历史最大出流出现时间"
        align="center"
        prop="hmxotqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmxotqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最低库水位" align="center" prop="hlrz" />
      <el-table-column
        label="历史最低库水位出现时间"
        align="center"
        prop="hlrztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hlrztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最小日均入流" align="center" prop="hmninq" />
      <el-table-column
        label="历史最小日均入流出现时间"
        align="center"
        prop="hmninqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmninqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="低水位告警值" align="center" prop="laz" />
      <el-table-column label="启动预报流量标准" align="center" prop="sfq" />
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

    <!-- 添加或修改库（湖）站防洪指标对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="700px"
      append-to-body
    >
      <el-form
        ref="YzStRsvrfcchBRef"
        :model="form"
        :rules="rules"
        label-width="220px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改库（湖）站防洪指标'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="水库类型" prop="rsvrtp">
          <el-input v-model="form.rsvrtp" placeholder="请输入水库类型" />
        </el-form-item>
        <el-form-item label="坝顶高程" prop="damel">
          <el-input v-model="form.damel" placeholder="请输入坝顶高程" />
        </el-form-item>
        <el-form-item label="校核洪水位" prop="ckflz">
          <el-input v-model="form.ckflz" placeholder="请输入校核洪水位" />
        </el-form-item>
        <el-form-item label="设计洪水位" prop="dsflz">
          <el-input v-model="form.dsflz" placeholder="请输入设计洪水位" />
        </el-form-item>
        <el-form-item label="正常高水位" prop="normz">
          <el-input v-model="form.normz" placeholder="请输入正常高水位" />
        </el-form-item>
        <el-form-item label="死水位" prop="ddz">
          <el-input v-model="form.ddz" placeholder="请输入死水位" />
        </el-form-item>
        <el-form-item label="兴利水位" prop="actz">
          <el-input v-model="form.actz" placeholder="请输入兴利水位" />
        </el-form-item>
        <el-form-item label="总库容" prop="ttcp">
          <el-input v-model="form.ttcp" placeholder="请输入总库容" />
        </el-form-item>
        <el-form-item label="防洪库容" prop="fldcp">
          <el-input v-model="form.fldcp" placeholder="请输入防洪库容" />
        </el-form-item>
        <el-form-item label="兴利库容" prop="actcp">
          <el-input v-model="form.actcp" placeholder="请输入兴利库容" />
        </el-form-item>
        <el-form-item label="死库容" prop="ddcp">
          <el-input v-model="form.ddcp" placeholder="请输入死库容" />
        </el-form-item>
        <el-form-item label="历史最高库水位" prop="hhrz">
          <el-input v-model="form.hhrz" placeholder="请输入历史最高库水位" />
        </el-form-item>
        <el-form-item label="历史最大蓄水量" prop="hmxw">
          <el-input v-model="form.hmxw" placeholder="请输入历史最大蓄水量" />
        </el-form-item>
        <el-form-item label="历史最高库水位" prop="hhrztm">
          <el-date-picker
            clearable
            v-model="form.hhrztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最高库水位"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最大入流" prop="hmxinq">
          <el-input v-model="form.hmxinq" placeholder="请输入历史最大入流" />
        </el-form-item>
        <el-form-item label="历史最大入流时段长" prop="rstdr">
          <el-input
            v-model="form.rstdr"
            placeholder="请输入历史最大入流时段长"
          />
        </el-form-item>
        <el-form-item label="历史最大入流出现时间" prop="hmxinqtm">
          <el-date-picker
            clearable
            v-model="form.hmxinqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最大入流出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最大出流" prop="hmxotq">
          <el-input v-model="form.hmxotq" placeholder="请输入历史最大出流" />
        </el-form-item>
        <el-form-item label="历史最大出流出现时间" prop="hmxotqtm">
          <el-date-picker
            clearable
            v-model="form.hmxotqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最大出流出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最低库水位" prop="hlrz">
          <el-input v-model="form.hlrz" placeholder="请输入历史最低库水位" />
        </el-form-item>
        <el-form-item label="历史最低库水位出现时间" prop="hlrztm">
          <el-date-picker
            clearable
            v-model="form.hlrztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最低库水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最小日均入流" prop="hmninq">
          <el-input
            v-model="form.hmninq"
            placeholder="请输入历史最小日均入流"
          />
        </el-form-item>
        <el-form-item label="历史最小日均入流出现时间" prop="hmninqtm">
          <el-date-picker
            clearable
            v-model="form.hmninqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最小日均入流出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="低水位告警值" prop="laz">
          <el-input v-model="form.laz" placeholder="请输入低水位告警值" />
        </el-form-item>
        <el-form-item label="启动预报流量标准" prop="sfq">
          <el-input v-model="form.sfq" placeholder="请输入启动预报流量标准" />
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
          <el-button type="primary" @click="submitForm(YzStRsvrfcchBRef)"
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
  listYzStRsvrfcchB,
  getYzStRsvrfcchB,
  delYzStRsvrfcchB,
  addYzStRsvrfcchB,
  updateYzStRsvrfcchB,
  importTemplateYzStRsvrfcchB,
  importYzStRsvrfcchB,
  exportYzStRsvrfcchB,
} from "@/apis/modules/meteorology/YzStRsvrfcchB";

const YzStRsvrfcchBRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRsvrfcchBList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeHHRZTM: any = ref("");
const daterangeHMXINQTM: any = ref("");
const daterangeHMXOTQTM: any = ref("");
const daterangeHLRZTM: any = ref("");
const daterangeHMNINQTM: any = ref("");
const daterangeMODITIME: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询库（湖）站防洪指标列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeHHRZTM && "" != daterangeHHRZTM) {
    queryParams.params["beginHHRZTM"] = TimeToYMDhms(daterangeHHRZTM.value[0]);
    queryParams.params["endHHRZTM"] = TimeToYMDhms(daterangeHHRZTM.value[1]);
  }
  if (null != daterangeHMXINQTM && "" != daterangeHMXINQTM) {
    queryParams.params["beginHMXINQTM"] = TimeToYMDhms(
      daterangeHMXINQTM.value[0]
    );
    queryParams.params["endHMXINQTM"] = TimeToYMDhms(
      daterangeHMXINQTM.value[1]
    );
  }
  if (null != daterangeHMXOTQTM && "" != daterangeHMXOTQTM) {
    queryParams.params["beginHMXOTQTM"] = TimeToYMDhms(
      daterangeHMXOTQTM.value[0]
    );
    queryParams.params["endHMXOTQTM"] = TimeToYMDhms(
      daterangeHMXOTQTM.value[1]
    );
  }
  if (null != daterangeHLRZTM && "" != daterangeHLRZTM) {
    queryParams.params["beginHLRZTM"] = TimeToYMDhms(daterangeHLRZTM.value[0]);
    queryParams.params["endHLRZTM"] = TimeToYMDhms(daterangeHLRZTM.value[1]);
  }
  if (null != daterangeHMNINQTM && "" != daterangeHMNINQTM) {
    queryParams.params["beginHMNINQTM"] = TimeToYMDhms(
      daterangeHMNINQTM.value[0]
    );
    queryParams.params["endHMNINQTM"] = TimeToYMDhms(
      daterangeHMNINQTM.value[1]
    );
  }
  if (null != daterangeMODITIME && "" != daterangeMODITIME) {
    queryParams.params["beginMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[0]
    );
    queryParams.params["endMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[1]
    );
  }
  const res: any = await listYzStRsvrfcchB(queryParams);
  YzStRsvrfcchBList.value = res.rows;
  if (YzStRsvrfcchBList.value.length > 0) {
    YzStRsvrfcchBList.value.forEach((item: any) => {
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
    rsvrtp: null,
    damel: null,
    ckflz: null,
    dsflz: null,
    normz: null,
    ddz: null,
    actz: null,
    ttcp: null,
    fldcp: null,
    actcp: null,
    ddcp: null,
    hhrz: null,
    hmxw: null,
    hhrztm: null,
    hmxinq: null,
    rstdr: null,
    hmxinqtm: null,
    hmxotq: null,
    hmxotqtm: null,
    hlrz: null,
    hlrztm: null,
    hmninq: null,
    hmninqtm: null,
    laz: null,
    sfq: null,
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
  daterangeHHRZTM.value = "";
  daterangeHMXINQTM.value = "";
  daterangeHMXOTQTM.value = "";
  daterangeHLRZTM.value = "";
  daterangeHMNINQTM.value = "";
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
  dialogTiltle.value = "添加库（湖）站防洪指标";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRsvrfcchB(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改库（湖）站防洪指标";
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
      if (dialogTiltle.value == "修改库（湖）站防洪指标") {
        const res: any = await updateYzStRsvrfcchB(form.value);
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
        const res: any = await addYzStRsvrfcchB(form.value);
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
    "是否确认删除库（湖）站防洪指标编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRsvrfcchB(params);
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
  const res = await exportYzStRsvrfcchB(queryParams);
  saveAsExcelFile(res, `YzStRsvrfcchB_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRsvrfcchB({});
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
  const res: any = await importYzStRsvrfcchB(formData);
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
