<template>
  <div>
    <md-app md-waterfall md-mode="fixed">
      <div class="alert alert-danger">{{message}}</div>
    </md-app>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      message: ""
    };
  },
  mounted() {
    this.message = this.$route.query.message;
  }
};
</script>