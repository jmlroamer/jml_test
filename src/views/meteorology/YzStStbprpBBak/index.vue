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
      :data="YzStStbprpBBakList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="测站编码" align="center" prop="stcd" />
      <el-table-column label="测站名称" align="center" prop="stnm" />
      <el-table-column label="河流名称" align="center" prop="rvnm" />
      <el-table-column label="水系名称" align="center" prop="hnnm" />
      <el-table-column label="流域名称" align="center" prop="bsnm" />
      <el-table-column label="经度" align="center" prop="lgtd" />
      <el-table-column label="纬度" align="center" prop="lttd" />
      <el-table-column label="站址" align="center" prop="stlc" />
      <el-table-column label="行政区划码" align="center" prop="addvcd" />
      <el-table-column label="基面名称" align="center" prop="dtmnm" />
      <el-table-column label="基面高程" align="center" prop="dtmel" />
      <el-table-column label="基面修正值" align="center" prop="dtpr" />
      <el-table-column label="站类" align="center" prop="sttp" />
      <el-table-column label="报汛等级" align="center" prop="frgrd" />
      <el-table-column label="建站年月" align="center" prop="esstym" />
      <el-table-column label="始报年月" align="center" prop="bgfrym" />
      <el-table-column label="隶属行业单位" align="center" prop="atcunit" />
      <el-table-column label="信息管理单位" align="center" prop="admauth" />
      <el-table-column label="交换管理单位" align="center" prop="locality" />
      <el-table-column label="测站岸别" align="center" prop="stbk" />
      <el-table-column label="测站方位" align="center" prop="stazt" />
      <el-table-column label="至河口距离" align="center" prop="dstrvm" />
      <el-table-column label="集水面积" align="center" prop="drna" />
      <el-table-column label="拼音码" align="center" prop="phcd" />
      <el-table-column label="启用标志" align="center" prop="usfl" />
      <el-table-column label="备注" align="center" prop="comments" />
      <el-table-column label="站点来源" align="center" prop="src" />
      <el-table-column label="灌区所在代码" align="center" prop="irrcode" />
      <el-table-column label="管理单位代码" align="center" prop="engmancode" />
      <el-table-column label="类型1流域，2灌区" align="center" prop="type" />
      <el-table-column label="所在渠道代码" align="center" prop="chancode" />
      <el-table-column label="源头" align="center" prop="origin" />
      <el-table-column label="河流代码" align="center" prop="rvcode" />
      <el-table-column label="修正值" align="center" prop="adjust" />
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

    <!-- 添加或修改测站基本属性对话框 -->
    <el-dialog
      :title="dialogTiltle"
      v-model="dialogOpen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="YzStStbprpBBakRef"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="测站编码" prop="stcd">
          <el-input
            :disabled="dialogTiltle == '修改测站基本属性'"
            v-model="form.stcd"
            placeholder="请输入测站编码"
          />
        </el-form-item>
        <el-form-item label="测站名称" prop="stnm">
          <el-input v-model="form.stnm" placeholder="请输入测站名称" />
        </el-form-item>
        <el-form-item label="河流名称" prop="rvnm">
          <el-input v-model="form.rvnm" placeholder="请输入河流名称" />
        </el-form-item>
        <el-form-item label="水系名称" prop="hnnm">
          <el-input v-model="form.hnnm" placeholder="请输入水系名称" />
        </el-form-item>
        <el-form-item label="流域名称" prop="bsnm">
          <el-input v-model="form.bsnm" placeholder="请输入流域名称" />
        </el-form-item>
        <el-form-item label="经度" prop="lgtd">
          <el-input v-model="form.lgtd" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lttd">
          <el-input v-model="form.lttd" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="站址" prop="stlc">
          <el-input v-model="form.stlc" placeholder="请输入站址" />
        </el-form-item>
        <el-form-item label="行政区划码" prop="addvcd">
          <el-input v-model="form.addvcd" placeholder="请输入行政区划码" />
        </el-form-item>
        <el-form-item label="基面名称" prop="dtmnm">
          <el-input v-model="form.dtmnm" placeholder="请输入基面名称" />
        </el-form-item>
        <el-form-item label="基面高程" prop="dtmel">
          <el-input v-model="form.dtmel" placeholder="请输入基面高程" />
        </el-form-item>
        <el-form-item label="基面修正值" prop="dtpr">
          <el-input v-model="form.dtpr" placeholder="请输入基面修正值" />
        </el-form-item>
        <el-form-item label="站类" prop="sttp">
          <el-input v-model="form.sttp" placeholder="请输入站类" />
        </el-form-item>
        <el-form-item label="报汛等级" prop="frgrd">
          <el-input v-model="form.frgrd" placeholder="请输入报汛等级" />
        </el-form-item>
        <el-form-item label="建站年月" prop="esstym">
          <el-input v-model="form.esstym" placeholder="请输入建站年月" />
        </el-form-item>
        <el-form-item label="始报年月" prop="bgfrym">
          <el-input v-model="form.bgfrym" placeholder="请输入始报年月" />
        </el-form-item>
        <el-form-item label="隶属行业单位" prop="atcunit">
          <el-input v-model="form.atcunit" placeholder="请输入隶属行业单位" />
        </el-form-item>
        <el-form-item label="信息管理单位" prop="admauth">
          <el-input v-model="form.admauth" placeholder="请输入信息管理单位" />
        </el-form-item>
        <el-form-item label="交换管理单位" prop="locality">
          <el-input v-model="form.locality" placeholder="请输入交换管理单位" />
        </el-form-item>
        <el-form-item label="测站岸别" prop="stbk">
          <el-input v-model="form.stbk" placeholder="请输入测站岸别" />
        </el-form-item>
        <el-form-item label="测站方位" prop="stazt">
          <el-input v-model="form.stazt" placeholder="请输入测站方位" />
        </el-form-item>
        <el-form-item label="至河口距离" prop="dstrvm">
          <el-input v-model="form.dstrvm" placeholder="请输入至河口距离" />
        </el-form-item>
        <el-form-item label="集水面积" prop="drna">
          <el-input v-model="form.drna" placeholder="请输入集水面积" />
        </el-form-item>
        <el-form-item label="拼音码" prop="phcd">
          <el-input v-model="form.phcd" placeholder="请输入拼音码" />
        </el-form-item>
        <el-form-item label="启用标志" prop="usfl">
          <el-input v-model="form.usfl" placeholder="请输入启用标志" />
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
        <el-form-item label="站点来源" prop="src">
          <el-input v-model="form.src" placeholder="请输入站点来源" />
        </el-form-item>
        <el-form-item label="灌区所在代码" prop="irrcode">
          <el-input v-model="form.irrcode" placeholder="请输入灌区所在代码" />
        </el-form-item>
        <el-form-item label="管理单位代码" prop="engmancode">
          <el-input
            v-model="form.engmancode"
            placeholder="请输入管理单位代码"
          />
        </el-form-item>
        <el-form-item label="所在渠道代码" prop="chancode">
          <el-input v-model="form.chancode" placeholder="请输入所在渠道代码" />
        </el-form-item>
        <el-form-item label="源头" prop="origin">
          <el-input v-model="form.origin" placeholder="请输入源头" />
        </el-form-item>
        <el-form-item label="河流代码" prop="rvcode">
          <el-input v-model="form.rvcode" placeholder="请输入河流代码" />
        </el-form-item>
        <el-form-item label="修正值" prop="adjust">
          <el-input v-model="form.adjust" placeholder="请输入修正值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(YzStStbprpBBakRef)"
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
  listYzStStbprpBBak,
  getYzStStbprpBBak,
  delYzStStbprpBBak,
  addYzStStbprpBBak,
  updateYzStStbprpBBak,
  importTemplateYzStStbprpBBak,
  importYzStStbprpBBak,
  exportYzStStbprpBBak,
} from "@/apis/modules/meteorology/YzStStbprpBBak";

const YzStStbprpBBakRef = ref<FormInstance>();
const queryRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const YzStStbprpBBakList = ref([]);
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
});
const form: any = ref();
const rules = reactive<FormRules<typeof form>>({});

/** 查询测站基本属性列表 */
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
  const res: any = await listYzStStbprpBBak(queryParams);
  YzStStbprpBBakList.value = res.rows;
  if (YzStStbprpBBakList.value.length > 0) {
    YzStStbprpBBakList.value.forEach((item: any) => {
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
    stnm: null,
    rvnm: null,
    hnnm: null,
    bsnm: null,
    lgtd: null,
    lttd: null,
    stlc: null,
    addvcd: null,
    dtmnm: null,
    dtmel: null,
    dtpr: null,
    sttp: null,
    frgrd: null,
    esstym: null,
    bgfrym: null,
    atcunit: null,
    admauth: null,
    locality: null,
    stbk: null,
    stazt: null,
    dstrvm: null,
    drna: null,
    phcd: null,
    usfl: null,
    comments: null,
    moditime: null,
    src: null,
    irrcode: null,
    engmancode: null,
    type: null,
    chancode: null,
    origin: null,
    rvcode: null,
    adjust: null,
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
  dialogTiltle.value = "添加测站基本属性";
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  resetForm();
  const res: any = await getYzStStbprpBBak(row);
  form.value = res.data;
  dialogOpen.value = true;
  dialogTiltle.value = "修改测站基本属性";
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
      if (dialogTiltle.value == "修改测站基本属性") {
        const res: any = await updateYzStStbprpBBak(form.value);
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
        const res: any = await addYzStStbprpBBak(form.value);
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
    "是否确认删除测站基本属性编号为" + _stcds + "的数据项？",
    "删除确认框",
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    const res: any = await delYzStStbprpBBak(params);
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
  const res = await exportYzStStbprpBBak(queryParams);
  saveAsExcelFile(res, `YzStStbprpBBak_${new Date().getTime()}`);
};
/** 导出模板按钮操作 */
const handleExportTemplate = async () => {
  const res: any = await importTemplateYzStStbprpBBak({});
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
  const res: any = await importYzStStbprpBBak(formData);
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
