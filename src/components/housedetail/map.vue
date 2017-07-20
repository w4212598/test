<template>
  <div class="map-view">

    <el-amap vid="amap" :plugin="plugin">
      </el-amap>
    </div>
</template>
<script>

  export default {
      name:'map',
    mouted(){

      getCurrentPosition()
    },
    data() {
      return {

        plugin: [{
          pName: 'ToolBar',
          autoPosition:true,
          noIpLocate:true,
          liteStyle:true,
          events: {

          }
        },{
          pName: 'Geolocation',
        }]
      };
    },
    methods:{
      getCurrentPosition(){
        let onSuccess = function(position) {

        };

        //定位数据获取失败响应
        function onError(error) {

        }

        //开始获取定位数据
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    }
  };
</script>
