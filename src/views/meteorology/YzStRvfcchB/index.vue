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
      :data="YzStRvfcchBList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="左堤高程" align="center" prop="ldkel" />
      <el-table-column label="右堤高程" align="center" prop="rdkel" />
      <el-table-column label="警戒水位" align="center" prop="wrz" />
      <el-table-column label="警戒流量" align="center" prop="wrq" />
      <el-table-column label="保证水位" align="center" prop="grz" />
      <el-table-column label="保证流量" align="center" prop="grq" />
      <el-table-column label="平滩流量" align="center" prop="flpq" />
      <el-table-column label="实测最高水位" align="center" prop="obhtz" />
      <el-table-column
        label="实测最高水位出现时间"
        align="center"
        prop="obhtztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.obhtztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调查最高水位" align="center" prop="ivhz" />
      <el-table-column
        label="调查最高水位出现时间"
        align="center"
        prop="ivhztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ivhztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实测最大流量" align="center" prop="obmxq" />
      <el-table-column
        label="实测最大流量出现时间"
        align="center"
        prop="obmxqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.obmxqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调查最大流量" align="center" prop="ivmxq" />
      <el-table-column
        label="调查最大流量出现时间"
        align="center"
        prop="ivmxqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.ivmxqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最大含沙量" align="center" prop="hmxs" />
      <el-table-column
        label="历史最大含沙量出现时间"
        align="center"
        prop="hmxstm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmxstm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="历史最大断面平均流速"
        align="center"
        prop="hmxavv"
      />
      <el-table-column
        label="历史最大断面平均流速出现时间"
        align="center"
        prop="hmxavvtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmxavvtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最低水位" align="center" prop="hlz" />
      <el-table-column
        label="历史最低水位出现时间"
        align="center"
        prop="hlztm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hlztm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="历史最小流量" align="center" prop="hmnq" />
      <el-table-column
        label="历史最小流量出现时间"
        align="center"
        prop="hmnqtm"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.hmnqtm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高水位告警值" align="center" prop="taz" />
      <el-table-column label="大流量告警值" align="center" prop="taq" />
      <el-table-column label="低水位告警值" align="center" prop="laz" />
      <el-table-column label="小流量告警值" align="center" prop="laq" />
      <el-table-column label="启动预报水位标准" align="center" prop="sfz" />
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

    <!-- 添加或修改河道站防洪指标对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="700px"
      append-to-body
    >
      <el-form
        ref="YzStRvfcchBRef"
        :model="form"
        :rules="rules"
        label-width="210px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改河道站防洪指标'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="左堤高程" prop="ldkel">
          <el-input v-model="form.ldkel" placeholder="请输入左堤高程" />
        </el-form-item>
        <el-form-item label="右堤高程" prop="rdkel">
          <el-input v-model="form.rdkel" placeholder="请输入右堤高程" />
        </el-form-item>
        <el-form-item label="警戒水位" prop="wrz">
          <el-input v-model="form.wrz" placeholder="请输入警戒水位" />
        </el-form-item>
        <el-form-item label="警戒流量" prop="wrq">
          <el-input v-model="form.wrq" placeholder="请输入警戒流量" />
        </el-form-item>
        <el-form-item label="保证水位" prop="grz">
          <el-input v-model="form.grz" placeholder="请输入保证水位" />
        </el-form-item>
        <el-form-item label="保证流量" prop="grq">
          <el-input v-model="form.grq" placeholder="请输入保证流量" />
        </el-form-item>
        <el-form-item label="平滩流量" prop="flpq">
          <el-input v-model="form.flpq" placeholder="请输入平滩流量" />
        </el-form-item>
        <el-form-item label="实测最高水位" prop="obhtz">
          <el-input v-model="form.obhtz" placeholder="请输入实测最高水位" />
        </el-form-item>
        <el-form-item label="实测最高水位出现时间" prop="obhtztm">
          <el-date-picker
            clearable
            v-model="form.obhtztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择实测最高水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调查最高水位" prop="ivhz">
          <el-input v-model="form.ivhz" placeholder="请输入调查最高水位" />
        </el-form-item>
        <el-form-item label="调查最高水位出现时间" prop="ivhztm">
          <el-date-picker
            clearable
            v-model="form.ivhztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择调查最高水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实测最大流量" prop="obmxq">
          <el-input v-model="form.obmxq" placeholder="请输入实测最大流量" />
        </el-form-item>
        <el-form-item label="实测最大流量出现时间" prop="obmxqtm">
          <el-date-picker
            clearable
            v-model="form.obmxqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择实测最大流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调查最大流量" prop="ivmxq">
          <el-input v-model="form.ivmxq" placeholder="请输入调查最大流量" />
        </el-form-item>
        <el-form-item label="调查最大流量出现时间" prop="ivmxqtm">
          <el-date-picker
            clearable
            v-model="form.ivmxqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择调查最大流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最大含沙量" prop="hmxs">
          <el-input v-model="form.hmxs" placeholder="请输入历史最大含沙量" />
        </el-form-item>
        <el-form-item label="历史最大含沙量出现时间" prop="hmxstm">
          <el-date-picker
            clearable
            v-model="form.hmxstm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最大含沙量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最大断面平均流速" prop="hmxavv">
          <el-input
            v-model="form.hmxavv"
            placeholder="请输入历史最大断面平均流速"
          />
        </el-form-item>
        <el-form-item label="历史最大断面平均流速出现时间" prop="hmxavvtm">
          <el-date-picker
            clearable
            v-model="form.hmxavvtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最大断面平均流速出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最低水位" prop="hlz">
          <el-input v-model="form.hlz" placeholder="请输入历史最低水位" />
        </el-form-item>
        <el-form-item label="历史最低水位出现时间" prop="hlztm">
          <el-date-picker
            clearable
            v-model="form.hlztm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最低水位出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历史最小流量" prop="hmnq">
          <el-input v-model="form.hmnq" placeholder="请输入历史最小流量" />
        </el-form-item>
        <el-form-item label="历史最小流量出现时间" prop="hmnqtm">
          <el-date-picker
            clearable
            v-model="form.hmnqtm"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            placeholder="请选择历史最小流量出现时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="高水位告警值" prop="taz">
          <el-input v-model="form.taz" placeholder="请输入高水位告警值" />
        </el-form-item>
        <el-form-item label="大流量告警值" prop="taq">
          <el-input v-model="form.taq" placeholder="请输入大流量告警值" />
        </el-form-item>
        <el-form-item label="低水位告警值" prop="laz">
          <el-input v-model="form.laz" placeholder="请输入低水位告警值" />
        </el-form-item>
        <el-form-item label="小流量告警值" prop="laq">
          <el-input v-model="form.laq" placeholder="请输入小流量告警值" />
        </el-form-item>
        <el-form-item label="启动预报水位标准" prop="sfz">
          <el-input v-model="form.sfz" placeholder="请输入启动预报水位标准" />
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
          <el-button type="primary" @click="submitForm(YzStRvfcchBRef)"
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
  listYzStRvfcchB,
  getYzStRvfcchB,
  delYzStRvfcchB,
  addYzStRvfcchB,
  updateYzStRvfcchB,
  importTemplateYzStRvfcchB,
  importYzStRvfcchB,
  exportYzStRvfcchB,
} from "@/apis/modules/meteorology/YzStRvfcchB";

const YzStRvfcchBRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStRvfcchBList = ref([]);
const dialogOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const idslist = ref([]);
const multiple = ref(true);
const total = ref(0);
const dialogTiltle = ref("");
const daterangeOBHTZTM: any = ref("");
const daterangeIVHZTM: any = ref("");
const daterangeOBMXQTM: any = ref("");
const daterangeIVMXQTM: any = ref("");
const daterangeHMXSTM: any = ref("");
const daterangeHMXAVVTM: any = ref("");
const daterangeHLZTM: any = ref("");
const daterangeHMNQTM: any = ref("");
const daterangeMODITIME: any = ref("");

const queryParams: any = reactive({
  pageNum: 1,
  pageSize: 20,
  stcd: null,
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询河道站防洪指标列表 */
const getList = async () => {
  loading.value = true;
  queryParams.params = {};
  if (null != daterangeOBHTZTM && "" != daterangeOBHTZTM) {
    queryParams.params["beginOBHTZTM"] = TimeToYMDhms(
      daterangeOBHTZTM.value[0]
    );
    queryParams.params["endOBHTZTM"] = TimeToYMDhms(daterangeOBHTZTM.value[1]);
  }
  if (null != daterangeIVHZTM && "" != daterangeIVHZTM) {
    queryParams.params["beginIVHZTM"] = TimeToYMDhms(daterangeIVHZTM.value[0]);
    queryParams.params["endIVHZTM"] = TimeToYMDhms(daterangeIVHZTM.value[1]);
  }
  if (null != daterangeOBMXQTM && "" != daterangeOBMXQTM) {
    queryParams.params["beginOBMXQTM"] = TimeToYMDhms(
      daterangeOBMXQTM.value[0]
    );
    queryParams.params["endOBMXQTM"] = TimeToYMDhms(daterangeOBMXQTM.value[1]);
  }
  if (null != daterangeIVMXQTM && "" != daterangeIVMXQTM) {
    queryParams.params["beginIVMXQTM"] = TimeToYMDhms(
      daterangeIVMXQTM.value[0]
    );
    queryParams.params["endIVMXQTM"] = TimeToYMDhms(daterangeIVMXQTM.value[1]);
  }
  if (null != daterangeHMXSTM && "" != daterangeHMXSTM) {
    queryParams.params["beginHMXSTM"] = TimeToYMDhms(daterangeHMXSTM.value[0]);
    queryParams.params["endHMXSTM"] = TimeToYMDhms(daterangeHMXSTM.value[1]);
  }
  if (null != daterangeHMXAVVTM && "" != daterangeHMXAVVTM) {
    queryParams.params["beginHMXAVVTM"] = TimeToYMDhms(
      daterangeHMXAVVTM.value[0]
    );
    queryParams.params["endHMXAVVTM"] = TimeToYMDhms(
      daterangeHMXAVVTM.value[1]
    );
  }
  if (null != daterangeHLZTM && "" != daterangeHLZTM) {
    queryParams.params["beginHLZTM"] = TimeToYMDhms(daterangeHLZTM.value[0]);
    queryParams.params["endHLZTM"] = TimeToYMDhms(daterangeHLZTM.value[1]);
  }
  if (null != daterangeHMNQTM && "" != daterangeHMNQTM) {
    queryParams.params["beginHMNQTM"] = TimeToYMDhms(daterangeHMNQTM.value[0]);
    queryParams.params["endHMNQTM"] = TimeToYMDhms(daterangeHMNQTM.value[1]);
  }
  if (null != daterangeMODITIME && "" != daterangeMODITIME) {
    queryParams.params["beginMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[0]
    );
    queryParams.params["endMODITIME"] = TimeToYMDhms(
      daterangeMODITIME.value[1]
    );
  }
  const res: any = await listYzStRvfcchB(queryParams);
  YzStRvfcchBList.value = res.rows;
  if (YzStRvfcchBList.value.length > 0) {
    YzStRvfcchBList.value.forEach((item: any) => {
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
    ldkel: null,
    rdkel: null,
    wrz: null,
    wrq: null,
    grz: null,
    grq: null,
    flpq: null,
    obhtz: null,
    obhtztm: null,
    ivhz: null,
    ivhztm: null,
    obmxq: null,
    obmxqtm: null,
    ivmxq: null,
    ivmxqtm: null,
    hmxs: null,
    hmxstm: null,
    hmxavv: null,
    hmxavvtm: null,
    hlz: null,
    hlztm: null,
    hmnq: null,
    hmnqtm: null,
    taz: null,
    taq: null,
    laz: null,
    laq: null,
    sfz: null,
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
  daterangeOBHTZTM.value = "";
  daterangeIVHZTM.value = "";
  daterangeOBMXQTM.value = "";
  daterangeIVMXQTM.value = "";
  daterangeHMXSTM.value = "";
  daterangeHMXAVVTM.value = "";
  daterangeHLZTM.value = "";
  daterangeHMNQTM.value = "";
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
  dialogTiltle.value = "添加河道站防洪指标";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStRvfcchB(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改河道站防洪指标";
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
      if (dialogTiltle.value == "修改河道站防洪指标") {
        const res: any = await updateYzStRvfcchB(form.value);
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
        const res: any = await addYzStRvfcchB(form.value);
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
    "是否确认删除河道站防洪指标编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStRvfcchB(params);
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
  const res = await exportYzStRvfcchB(queryParams);
  saveAsExcelFile(res, `YzStRvfcchB_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStRvfcchB({});
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
  const res: any = await importYzStRvfcchB(formData);
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
