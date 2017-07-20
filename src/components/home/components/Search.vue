<template>
  <div class="search-box">
  <router-link class="search-container" to="/search">
    <div><input readonly="readonly" class='house-search' name='house-search' type="text" placeholder="更多房源搜索">

    </div>
  </router-link>
  </div>
</template>
<script>
  export default{
    name:"Search"
  }
</script>
