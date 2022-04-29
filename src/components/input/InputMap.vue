<template>
    <div class="input-map">
        <div class="tip" v-if="!list.length">
            <el-button type="text" @click="addClick(0)">新增</el-button>
        </div>
        <el-row v-for="(_,index) in list" :key="index">
            <el-col :span="5">
                <el-input class="input-key"
                          :value="list[index].key"
                          @input="(val)=>onKeyInput(val,index)">
                </el-input>
            </el-col>
            <el-col class="split" :span="1">
                <span>:</span>
            </el-col>
            <el-col :span="18">
                <el-input class="input-value"
                          :value="list[index].value"
                          @input="(val)=>onValueInput(val,index)">
                    <template #suffix>
                        <i class="icon el-input__icon el-icon-plus" @click="addClick(index)"></i>
                        <i class="icon el-input__icon el-icon-minus" @click="minusClick(index)"></i>
                    </template>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  export interface Item {
    key?: string;
    value?: any;
  }

  @Component({
    name: 'InputMap'
  })
  export default class InputMap extends Vue {
    @Prop({
      type: [Object, String]
    })
    public value!: object | string | undefined;

    @Prop({
      type: Boolean,
      default: false
    })
    public json!: boolean;

    //data

    get list(): Item[] {
      if (!this.value) {
        return [];
      }

      let map;
      if (this.json && typeof this.value === 'string') {
        map = JSON.parse(this.value);
      } else {
        map = this.value;
      }

      const list: Item[] = [];
      for (let key of Object.keys(map)) {
        list.push({
          key: key,
          value: map[key]
        });
      }

      return list;
    }

    //mounted
    mounted() {

    }

    //methods
    addClick(index: number) {
      const clone = [...this.list];
      clone.splice(index + 1, 0, {key: '', value: ''});
      const map = this.makeMap(clone);
      this.emit(map);
    }

    minusClick(index: number) {
      const clone = [...this.list];
      clone.splice(index, 1);
      const map = this.makeMap(clone);
      this.emit(map);
    }

    onKeyInput(key: string, index: number) {
      const clone = [...this.list];
      clone[index].key = key?.trim();
      const map = this.makeMap(clone);
      this.emit(map);
    }

    onValueInput(value: any, index: number) {
      const clone = [...this.list];
      clone[index].value = value?.trim();
      const map = this.makeMap(clone);
      this.emit(map);
    }

    makeMap(list: Item[]) {
      const map = {};
      for (let item of list) {
        if (item.key != undefined) {
          // @ts-ignore
          map[item.key] = item.value;
        }
      }
      return map;
    }

    emit(map: object) {
      if (this.json) {
        this.$emit('input', JSON.stringify(map));
      } else {
        this.$emit('input', map);
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .input-map {

    }

    .tip {
        text-align center
    }

    .input-key {
        display block
        margin-bottom 5px
    }

    .split {
        text-align center
    }

    .input-value {
        display block
        margin-bottom 5px
    }

    .icon {
        cursor pointer
    }
</style>