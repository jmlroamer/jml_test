<template>
  <div class="box-container">
    <el-card class="box-card">
      <div class="box-header">
        <div class="box-header-left">
          <div class="box-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                :to="{ path: '#' }"
                v-for="(item, index) in breadcrumbList"
                :key="item.name"
                @click="goTo(item, index)"
                >{{ item.name }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </div>
        <div style="display: flex">
          <el-button type="primary" @click="downyear">下载</el-button>

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
            ><el-button type="primary" icon="Edit"
              >上传文件</el-button
            ></el-upload
          >
          <el-button type="primary" @click="dialogCreate = true"
            >新建文件夹</el-button
          >
          <el-button type="primary" @click="refreshList">刷新</el-button>
        </div>
      </div>
      <el-table
        :data="fileList"
        empty-text="没有文件"
        height="726"
        style="width: 100%"
        @row-click="rowClick"
      >
        <el-table-column type="index" align="center" label="#" width="100" />
        <el-table-column align="left" prop="name" label="文件名" width="270" />
        <el-table-column
          align="center"
          prop="putTime"
          label="上传日期"
          width="250"
          sortable
        >
          <template #default="scope">
            <span>{{
              scope.row.putTime ? TimeToYMDhms(scope.row.putTime) : ""
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" prop="type" label="类型" sortable>
          <template #default="scope">
            {{ scope.row.type == "dir" ? "文件夹" : scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="size" label="大小" sortable>
          <template #default="scope">
            {{ scope.row.size ? formatBytes(scope.row.size) : "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.stop="openEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-show="scope.row.type != 'dir'"
              link
              type="primary"
              size="small"
              @click.stop="toDownloadFile(scope.row)"
              >下载</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click.stop="deleteClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination-box">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 50, 100]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div> -->
    </el-card>

    <el-dialog
      v-model="dialogCreate"
      title="创建文件夹"
      width="500"
      :before-close="handleClose"
    >
      <div>
        <el-form-item label="文件夹名称:">
          <el-input v-model="newFolderName" />
        </el-form-item>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogCreate = false">取消</el-button>
          <el-button type="primary" @click="createFolder()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogEdit"
      title="文件编辑"
      width="500"
      :before-close="handleClose"
    >
      <div>
        <el-form :model="form" label-width="120px">
          <el-form-item label="文件名称:">
            <el-input v-model="form.rename" />
          </el-form-item>
          <el-form-item label="上传日期:">
            {{ form.putTime ? TimeToYMDhms(form.putTime) : "" }}
          </el-form-item>
          <el-form-item label="文件类型:">
            {{ form.type == "dir" ? "文件夹" : form.type }}
          </el-form-item>
          <el-form-item label="文件大小:">
            {{ form.size ? formatBytes(form.size) : "" }}
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogEdit = false">取消</el-button>
          <el-button type="primary" @click="editClick()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
import { saveAsFile, formatBytes } from "@/utils/excel";
import { TimeToYMDhms } from "@/utils/time";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import {
  uploadFile,
  addFolder,
  getFileTreeList,
  deleteFileById,
  downloadFile,
  updateByName,
} from "@/apis/modules/file/index";
import { getFileList, downloadFileYearbook } from "@/apis/modules/test/index";

const upload = ref<UploadInstance>();
const fileList: any = ref([]);
const breadcrumbList: any = ref([]);
const idpath = ref<string>("/");
const dialogCreate = ref(false);
const newFolderName = ref("");
const form: any = ref({});

//获取文件目录
const getList = async () => {
  breadcrumbList.value = [];
  const res = await getFileList({
    "": "",
    YR: "2023",
    database: "test",
    code: "大事件",
  });
  console.log(res);

  fileList.value = res.data;
  breadcrumbList.value.push({
    name: "根目录",
    id: "/",
    idpath: "/",
    data: res.data,
  });
};
const downyear = async () => {
  const res = await downloadFileYearbook({
    "": "",
    YR: "2023",
    database: "test",
    uploadPath: "240311051737825logo.png",
  });
  URL.createObjectURL(res);
  saveAsFile(res, "test", "png");
  console.log(res);
};
getList();
//刷新
const refreshList = async () => {
  const res = await getFileTreeList({});
  let tmepdata = res.data;
  let tmeplist = breadcrumbList.value;
  for (let i = 0; i < breadcrumbList.value.length; i++) {
    if (breadcrumbList.value[i].id == "/") {
      breadcrumbList.value[i].data = tmepdata;
      if (i + 1 < breadcrumbList.value.length) {
        tmepdata = tmepdata.filter(
          (item: any) => item.id == breadcrumbList.value[i + 1].id
        )[0].children;
        tmeplist = breadcrumbList.value[i + 1];
      }
    } else {
      breadcrumbList.value[i].data = tmepdata;
      if (i + 1 < breadcrumbList.value.length) {
        tmepdata = tmepdata.filter(
          (item: any) => item.id == breadcrumbList.value[i + 1].id
        )[0].children;
        tmeplist = breadcrumbList.value[i + 1];
      }
    }
  }
  fileList.value = breadcrumbList.value[breadcrumbList.value.length - 1].data;
};
//点击文件夹
const rowClick = (row: any) => {
  if (row.type == "dir") {
    fileList.value = row.children;
    breadcrumbList.value.push({
      name: row.name,
      id: row.id,
      idpath: idpath.value + row.id + "/",
      data: row.children,
    });
    idpath.value = idpath.value + row.id + "/";
  }
};
//前往文件夹
const goTo = (e: any, index: any) => {
  breadcrumbList.value.splice(index + 1);
  fileList.value = e.data;
  idpath.value = e.id;
};
//确保上传文件时，替换之前的文件
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
//上传文件
const handleAddFile = async (ev: any) => {
  let path = idpath.value;
  if (idpath.value != "/") {
    path = idpath.value.slice(0, idpath.value.length - 1);
  }
  let formData = new FormData();
  formData.append("dirIds", path);
  formData.append("file", ev.raw);
  const res: any = await uploadFile(formData);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "上传成功！",
    });
    refreshList();
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};
//新增文件夹
const createFolder = async () => {
  let path = idpath.value;
  if (newFolderName.value.trim() == "") {
    newFolderName.value = "";
    return ElMessage({
      type: "error",
      message: "文件夹名不能为空！",
    });
  }
  if (idpath.value != "/") {
    path = idpath.value.slice(0, idpath.value.length - 1);
  }
  const res = await addFolder({ dirIds: path, name: newFolderName.value });
  if (res.code == 200) {
    newFolderName.value = "";
    ElMessage({
      type: "success",
      message: "创建成功！",
    });
    refreshList();
    dialogCreate.value = false;
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};

//打开编辑文件名
const openEdit = (e: any) => {
  form.value = e;
  form.value.rename = JSON.parse(JSON.stringify(form.value.name));
  dialogEdit.value = true;
};
//修改文件名
const editClick = async () => {
  const res = await updateByName({
    id: form.value.id,
    name: form.value.name,
    rename: form.value.rename,
  });
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "修改成功！",
    });
    refreshList();
    dialogEdit.value = false;
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};
//下载文件
const toDownloadFile = async (e: any) => {
  const res = await downloadFile({ url: e.url });
  URL.createObjectURL(res);
  saveAsFile(res, e.name, e.type);
};
//修改
const dialogEdit = ref(false);
const handleClose = () => {
  dialogEdit.value = false;
  dialogCreate.value = false;
};
//删除
const deleteClick = (e: any) => {
  ElMessageBox.confirm("确认是否删除该文件?", "删除确认框", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteFileById({ id: e.id });
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功！",
        });
        refreshList();
      } else {
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>

<style scoped>
.box-container {
  padding: 15px 20px;
  .box-card {
    height: 828px;
    padding: 5px 20px;
    .box-breadcrumb {
      height: 25px;
      border: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 10px;
      .box-header-left {
        display: flex;
        .box-breadcrumb {
          width: 600px;
          height: 32px;
          border: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          padding: 0 10px;
        }
      }
    }
  }
  .pagination-box {
    margin: 15px 50px 0 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
