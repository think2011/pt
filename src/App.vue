<template>
  <div id="app">
    <div class="toolbars">1</div>
    <div class="main">2</div>
    <div class="properties">3</div>
  </div>
</template>

<script>

</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    display: flex;
    min-height: 100vh;

    .toolbars {
      flex: 0 0 300px;
      background: seagreen;
    }

    .main {
      flex: 1;
      padding: 0 50px;
      background: saddlebrown;
    }

    .properties {
      flex: 0 0 300px;
      background: salmon;
    }
  }
</style>
