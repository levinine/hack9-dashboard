<template>
<div id="app">
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>
  <div class="contents">
      <router-view />
  </div>
</div>
</template>

<script>

export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#dashboard-app,
.md-app,
.md-app-content {
  height: 100%;
  max-height: 100%;
  background: transparent !important;
}
.md-app-container {
  background: url(https://hack9-judge-thread.s3-eu-west-1.amazonaws.com/banner.jpg) no-repeat fixed right top/cover;
}
</style>
