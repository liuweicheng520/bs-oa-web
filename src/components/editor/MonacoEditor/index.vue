<script type="text/ecmascript-6">
  import defaultConfig from "./default-config";
  /**
   * @author 白雨浓
   * @date 2019/6/23 18:39
   *
   * Monaco 编辑器
   **/
  export default {
    name: 'MonacoEditor',
    props: {
      value: {
        type: String
      },
      lang: {
        type: String,
        required: true,
      },
      width: {
        type: [Number, String],
        default: '100%',
      },
      height: {
        type: [Number, String],
        default: 500,
      },
      config: {
        type: Object,
      },
      theme: {
        type: String,
        default: 'vs-dark'
      }
    },
    data() {
      return {
        editor: null,
        loading: true,
      }
    },
    watch: {
      value(val) {
        if (this.editor === null) {
          return;
        }
        if (val !== this.editor.getValue()) {
          this.editor.setValue(val);
        }
      },
    },
    async mounted() {
      const monaco = await import('monaco-editor');

      const config = {
        ...defaultConfig,
        ...this.config,
        theme: this.theme,
        value: this.value,
        language: this.lang
      };

      this.editor = monaco.editor.create(
        this.$el,
        config,
      );

      this.loading = false;

      window.onresize = function () {
        if (this.editor) {
          this.editor.layout();
        }
      };

      this.editor.onDidChangeModelContent(evt => {
        this.$emit('input', this.editor.getValue());
        this.$emit('change', this.editor.getValue(), evt);
      });
    },
    render(h) {
      return h('div', {
        class: 'monaco-editor',
        style: {
          width: typeof this.width === "number" ? this.width + 'px' : this.width,
          height: typeof this.height === "number" ? this.height + 'px' : this.height,
        },
        attrs: {
          'element-loading-text': 'Editor Init Loading...',
          'element-loading-background': this.theme === 'vs-dark' ? 'rgba(0, 0, 0, .9)' : 'rgba(255, 255, 255, .9)'
        },
        directives: [{
          name: 'loading',
          value: this.loading,
        }],
      })
    },
    beforeDestroy() {
      this.editor && this.editor.dispose();
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .monaco-editor {
    }
</style>
