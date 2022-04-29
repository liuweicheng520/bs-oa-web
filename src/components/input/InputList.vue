<template>
    <div class="input-list">
        <div class="tip" v-if="!list.length">
            <el-button type="text" @click="addClick(0)">新增</el-button>
        </div>
        <template v-for="(_,index) in list">
            <el-input class="input"
                      :value="list[index]"
                      @input="(val)=>onInput(val,index)">
                <template #suffix>
                    <i class="icon el-input__icon el-icon-plus" @click="addClick(index)"></i>
                    <i class="icon el-input__icon el-icon-minus" @click="minusClick(index)"></i>
                </template>
            </el-input>
        </template>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'InputList',
  })
  export default class InputList extends Vue {
    @Prop({
      type: [Array, String]
    })
    public value!: any[] | string | undefined;

    @Prop({
      type: Boolean,
      default: false
    })
    public json!: boolean;

    //data

    get list() {
      if (!this.value) {
        return [];
      }
      if (this.json && typeof this.value === 'string') {
        return JSON.parse(this.value);
      }
      return this.value;
    }

    //mounted
    mounted() {

    }

    //methods
    addClick(index: number) {
      const clone = [...this.list];
      clone.splice(index + 1, 0, '');
      this.emit(clone);
    }

    minusClick(index: number) {
      const clone = [...this.list];
      clone.splice(index, 1);
      this.emit(clone);
    }

    onInput(value: any, index: number) {
      const clone = [...this.list];
      clone[index] = value?.trim();
      this.emit(clone);
    }

    emit(list: any[]) {
      if (this.json) {
        this.$emit('input', JSON.stringify(list));
      } else {
        this.$emit('input', list);
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .input-list {

    }

    .tip {
        text-align center
    }

    .input {
        display block
        margin-bottom 5px
    }

    .icon {
        cursor pointer
    }
</style>