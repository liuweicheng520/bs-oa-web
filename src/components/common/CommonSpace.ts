import {Component, Prop, Vue} from "vue-property-decorator";
import {CreateElement, RenderContext} from "vue";

@Component({
  name: 'CommonSpace',
  functional: true,
})
export default class CommonSpace extends Vue {

  @Prop({
    type: [String, Number],
  })
  public height?: string | number;

  render(h: CreateElement, {props}: RenderContext) {
    return h('div', {
      style: {
        height: props.height ? props.height + 'px' : undefined,
      }
    })
  }
}