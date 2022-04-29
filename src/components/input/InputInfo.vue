<template>
    <div class="input-info">
        <el-form-item v-for="key in infoKeys"
                      :key="key"
                      :label="`${key}：`"
                      :prop="`${prefix}.${key}`">
            <el-input class="input" v-model.trim="info[key]"></el-input>
        </el-form-item>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'InputInfo',
  })
  export default class InputInfo extends Vue {
    @Prop({
      type: Object
    })
    public value!: object;
    @Prop({
      type: Array
    })
    public infoKeys!: string[];
    @Prop({
      type: String,
      default: 'info'
    })
    public prefix!: string;

    //data
    info = {...this.value};

    //created
    created() {
      if (!this.info) {
        this.$emit('input', {});
        this.info = {};
      }
      for (let key of this.infoKeys) {
        // @ts-ignore
        if (!this.info[key]) {
          this.$set(this.info, key, '');
        }
      }
    }

    //mounted
    mounted() {

    }

    //methods

  }
</script>

<style lang="stylus" scoped>
    .input-info {

    }
</style>