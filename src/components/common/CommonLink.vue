<template>
    <router-link :to="to"
                 :class="linkClass"
                 :href="disabled ? null : to"
                 v-bind="$attrs"
                 @click="handleClick">

        <i :class="icon" v-if="icon"></i>

        <span v-if="$slots.default" class="el-link--inner">
            <slot></slot>
        </span>

        <template v-if="$slots.icon">
            <slot v-if="$slots.icon" name="icon"></slot>
        </template>
    </router-link>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'CommonLink'
  })
  export default class CommonLink extends Vue {
    @Prop({
      type: String,
      default: 'default'
    })
    public type?: string;
    @Prop({
      type: String,
      required: true
    })
    public to!: string;
    @Prop({
      type: Boolean,
      default: false
    })
    @Prop({
      type: Boolean,
      default: false
    })
    public underline?: boolean;
    @Prop({
      type: Boolean,
      default: false
    })
    public disabled?: boolean;
    @Prop({
      type: String,
    })
    public icon?: string;
    @Prop({
      type: Boolean,
    })
    public button?: boolean;

    get linkClass(): any[] {
      return [
        'el-link',
        this.type ? `el-link--${this.type}` : '',
        this.disabled && 'is-disabled',
        this.underline && !this.disabled && 'is-underline',
        this.button ? 'button' : ''
      ]
    }

    // methods
    handleClick(event: any) {
      if (!this.disabled) {
        if (!this.to) {
          this.$emit('click', event);
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .button {
        font-size 12px
        padding 9px 5px
    }
</style>