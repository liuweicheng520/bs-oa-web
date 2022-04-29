import {Component, Prop, Vue} from 'vue-property-decorator';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
import {CreateElement, RenderContext} from "vue";

@Component({
  name: 'HtmlEditor',
  functional: true
})
export default class HtmlEditor extends Vue {
  @Prop({
    type: String,
  })
  public value!: string;

  //methods
  render(h: CreateElement, {props, listeners}: RenderContext) {
    return h(quillEditor, {
      props: {
        value: props.value
      },
      on: listeners
    })
  }
}