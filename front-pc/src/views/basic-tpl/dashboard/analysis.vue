<template>
  <div class="page-basic-layout analysis-container">
    <IntroduceRow></IntroduceRow>
    <ProportionSales></ProportionSales>
  </div>
</template>

<script>
    import IntroduceRow from './components/IntroduceRow'
    import ProportionSales from './components/ProportionSales'
    import moment from 'moment';
    export default {
        name: "analysis",
        data(){
            return {
                dataList: [
                    {name: 'asda1', id: '1',checked: true},
                    {name: 'asda2', id: '2',checked: false},
                ],
                dateOption: {
                    disabledDate (date) {
                        return moment(date).isBefore(moment(), 'day')
                    }
                }
            }
        },
        components : {
            IntroduceRow,
            ProportionSales
        },
        methods : {
        }
    }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
.analysis-container {
  .card-title-icon {
    float: right;
    cursor: pointer;
  }
}
</style>