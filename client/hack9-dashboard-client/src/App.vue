<template>
<div id="app">
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>
  <div class="contents">
    <DashboardApp />
  </div>
</div>
</template>

<script>
import DashboardApp from "./components/DashboardApp";

export default {
  name: "app",
  components: { DashboardApp }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
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
  background: url(https://hack9-judge-thread.s3-eu-west-1.amazonaws.com/banner.jpg)
    fixed right top;
}
</style>
