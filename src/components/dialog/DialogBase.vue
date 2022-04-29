<template>
    <el-dialog class="dialog-base"
               :visible.sync="visible"
               :width="width"
               :title="getTitle()"
               :show-close="!saveLoading"
               :close-on-click-modal="!saveLoading"
               @close="handleClose"
               @closed="handleClosed">

        <slot></slot>

        <template #footer>
            <div v-if="!$slots.footer">
                <el-button size="small" :loading="saveLoading" @click="cancelClick">
                    <span v-text="cancelButtonText"></span>
                </el-button>
                <el-button type="primary" size="small" :loading="saveLoading" @click="saveClick">
                    <span v-text="confirmButtonText"></span>
                </el-button>
            </div>
            <slot v-else name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {EnumItem} from "@/enums/base/Enum";
  import {SubmitCallback} from "@/components/dialog/SubmitCallback";
  import {DialogType} from "@/components/dialog/DialogType";

  @Component({
    name: 'DialogBase'
  })
  export default class DialogBase extends Vue {

    @Prop({
      type: Object
    })
    public type?: EnumItem;
    @Prop({
      type: String,
      default: '55%'
    })
    public width!: string;
    @Prop({
      type: String,
      required: true
    })
    public title!: string;
    @Prop({
      type: String,
      default: '取 消'
    })
    public cancelButtonText!: string;
    @Prop({
      type: String,
      default: '确 定'
    })
    public confirmButtonText!: string;

    //data
    visible = true;
    saveLoading = false;

    //mounted
    mounted() {

    }

    //methods
    getTitle() {
      if (!this.type) {
        return this.title;
      }

      return this.type.message + (this.title ?? '');
    }

    saveClick() {
      const start = () => {
        this.saveLoading = true;
      };
      const close = () => {
        this.saveLoading = false;
      };
      const submit = (res: any) => {
        this.handleClose();
        this.$parent.$emit('submit', res);
      };
      this.$emit('submit', new SubmitCallback(
        start,
        close,
        submit
      ));
    }

    cancelClick() {
      this.handleClose();
      this.$emit('cancel');
    }

    handleClose() {
      this.visible = false;
    }

    handleClosed() {
      this.$parent.$emit('input', false);
    }

  }
</script>

<style lang="stylus" scoped>
    .dialog-base {

    }
</style>