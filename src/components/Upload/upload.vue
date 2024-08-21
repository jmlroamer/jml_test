<template>
  <el-dialog
    v-model="dialogUpload"
    title="上传文件"
    width="500"
    :before-close="handleClose"
  >
    <div>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :headers="headers"
        action="https://cir8.com:7462/api/filesssss"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
        :on-change="handleChange"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="colseDdialog">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import { jmlimportExcel, jmlexportExcel } from "@/utils/excel";
import {
  uploadFile,
  uploadFileSec,
  getFileList,
  getFileDirs,
  addFolder,
  deleteFileById,
  deleteFileByUrl,
  downloadFile,
  getDirTreeList,
  updateByName,
} from "@/apis/modules/file/index";

import { defineProps, ref, watch } from "vue";
type Props = {
  show?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  show: false,
});
const dialogUpload = ref(false);
//导入表格
const handleChange = async (ev: any) => {
  console.log(ev);

  let formData = new FormData();
  formData.append("dirIds", "/");
  // 这里有个坑，在将文件append到formData的时候， item其实并不是真是数据 item.raw才是
  formData.append("file", ev.raw);
  // 这里是发送请求，注意 headers: {'Content-Type': 'multipart/form-data'}
  const res = await uploadFile(formData);

  // const data = await jmlimportExcel(ev);
  // console.log(data);
};

const handleClose = (done: () => void) => {
  if (fileList.value.length == 0) {
    colseDdialog();
    return;
  }
  ElMessageBox.confirm("文件还没有保存，是否取消上传?")
    .then(() => {
      colseDdialog();
    })
    .catch(() => {
      // catch error
    });
};

const headers = ref({
  Authorization:
    "Bearer " + "Bearer " + JSON.parse(sessionStorage.getItem("token")!).token,
});

const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();
const colseDdialog = () => {
  emit("close");
};
const confirm = () => {
  if (fileList.value.length == 0) {
    colseDdialog();
    return;
  }
  ElMessageBox.confirm("确认上传?")
    .then(() => {
      emit("confirm");
    })
    .catch(() => {
      // catch error
    });
};
watch(
  () => props.show,
  (val) => {
    dialogUpload.value = val;
  }
);
</script>
<style scoped></style>
