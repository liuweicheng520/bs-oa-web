import Vue from "vue-property-decorator";

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    functional?: boolean
  }
}
