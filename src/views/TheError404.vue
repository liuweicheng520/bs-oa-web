<template>
    <div class="error" >
        <h1 style="text-align: center">404</h1>
        <input-file></input-file>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import InputFile from "@/components/input/InputFile.vue";

  @Component({
    name: 'TheError404',
    components: {InputFile}
  })
  export default class TheError404 extends Vue {
    //data

    //mounted
    mounted() {

    }

    //methods

  }
</script>

<style lang="stylus" scoped>
    .error {

    }
</style>