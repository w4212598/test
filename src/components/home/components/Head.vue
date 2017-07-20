<template>
  <div class="home-header">
  <div class="items" v-for="link in items">
    <span>{{link.chinese}}</span><br>
    <span>{{link.english}}</span>
  </div>
  </div>
</template>
<script>
  export default{
    name:"Head",
    data(){
        return {
            items:[
              {
                  chinese:'房源预定',
                  english:'Remarkit'
              },
              {
                  chinese:'精品房源',
                  english:'Boutique'
              },
              {
                chinese:'房东加盟',
                  english:'landLord'
              },
            ]
        }


    }
  }
</script>
