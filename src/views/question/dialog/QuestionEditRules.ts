import {Component, Vue} from "vue-property-decorator";

@Component
export default class QuestionEditRules extends Vue {
  rules = {
    questionTitle: [
      {required: true, message: '请输入问题题目', trigger: 'blur'},
    ],
    rightAnswer: [
      {required: true, message: '请输入正确答案', trigger: 'blur'},
    ],
    errorAnswer: [
      {required: true, message: '请输入错误答案', trigger: 'blur'},
    ],
  }
}