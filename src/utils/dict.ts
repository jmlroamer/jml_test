import useDictStore from "@/stores/modules/dict";
import { getDicts } from "@/apis/system/dict/data";
import { ref, toRefs } from "vue";

/**
 * 获取字典数据
 */
export function useDict(...args: any) {
  const res: any = ref({});
  return (() => {
    args.forEach((dictType: any, index: any) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDicts(dictType).then((resp: any) => {
          res.value[dictType] = resp.data.map((p: any) => ({
            label: p.dictLabel,
            value: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass,
          }));
          useDictStore().setDict(dictType, res.value[dictType]);
        });
      }
    });
    return toRefs(res.value);
  })();
}
