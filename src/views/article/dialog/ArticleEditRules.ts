import {Component, Vue} from "vue-property-decorator";

@Component
export default class ArticleEditRules extends Vue {
  rules = {
    articleName: [
      {required: true, message: '请输入[非空]', trigger: 'blur'},
    ],
    articleType: [
      {required: true, message: '请输入[非空]', trigger: 'blur'},
    ],
  }
}