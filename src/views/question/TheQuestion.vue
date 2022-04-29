<template>
    <div class="question">
        <el-card v-for="(question,index) in list" :key="question.id" class="card">
            <el-row slot="header" class="clearfix">
                <span v-text="index+1"></span>.
                <span v-if="question.rightAnswer.length === 1">【单选题】</span>
                <span v-else>【多选题】</span>
                <span v-text="question.questionTitle"></span>
                <template v-if="show">
                    <el-icon v-if="getRight(question)" name="check" style="color: green"></el-icon>
                    <el-icon v-else name="close" style="color:red;"></el-icon>
                </template>
            </el-row>
            <div>
                <el-form>
                    <div v-for="answer in question.answerList" :key="answer.title"
                         style="margin-top: 10px">
                        <el-checkbox v-model="answer.select"></el-checkbox>
                        <span v-if="show" style="margin-left: 10px;"
                              :style="{backgroundColor:answer.right ?'green':'',
                              color:answer.right?'#fff':'#000'}"
                              v-text="answer.title"></span>
                        <span v-else style="margin-left: 10px" v-text="answer.title"></span>
                    </div>
                </el-form>
            </div>
        </el-card>

        <div v-if="!show" style="padding: 20px">
            <el-button style="width: 100%;" type="warning" @click="submitClick">提交答案</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {QuestionBean} from "@/beans/QuestionBean";
import {Request} from "@/plugins/Request";
import {QuestionApi} from "@/apis/QuestionApi";
import {Loading} from "@/plugins/Loading";

@Component({
  name: 'TheQuestion'
})
export default class TheQuestion extends Vue {
  //data
  list: QuestionBean[] = [];
  show = false;

  get id(): number {
    const id = this.$route.params['id'];
    return Number.parseInt(id?.toString());
  }

  //mounted
  mounted() {
    this.loadList();
  }

  //methods
  async loadList() {
    const list = await Request.run<QuestionBean[]>(QuestionApi.GET_LIST({
      questionGroupId: this.id,
    }));

    for (let question of list) {
      const answerList = [];
      for (let key in question.answer) {
        answerList.push({
          title: key,
          right: (question.answer as any)[key],
          select: false
        })
      }
      question.answerList = answerList;
    }
    this.list = list;
  }

  getRight(question: QuestionBean) {

    const answerList = question.answerList! as any[];

    const rights = answerList.filter(item => item.right)
      .map(item => item.title as string)
      .sort((s1, s2) => s1.localeCompare(s2));

    const selects = answerList.filter(item => item.select)
      .map(item => item.title as string)
      .sort((s1, s2) => s1.localeCompare(s2));
    return JSON.stringify(rights) === JSON.stringify(selects);
  }

  submitClick() {
    Loading.start('系统疯狂判题中...');
    setTimeout(() => {
      this.show = true;
      Loading.close();
    }, 3000);
  }
}
</script>

<style lang="stylus" scoped>
.question {
  width 90%
  margin 0 auto
}

.card {
  margin 20px
}
</style>