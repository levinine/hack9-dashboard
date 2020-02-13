<template>
  <md-dialog
    :md-active.sync="showOutput"
    :md-backdrop="false"
    :md-click-outside-to-close="false"
    :md-close-on-esc="false"
    :style="getStyle()"
  >
    <md-dialog-title>{{ message.title }}</md-dialog-title>

    <md-dialog-content md-dynamic-width>{{message.createdBy}}</md-dialog-content>
    <md-dialog-content md-dynamic-width>{{message.content}}</md-dialog-content>

    <md-dialog-actions>
      <md-button @click="close(message.id)">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    message: {
      type: Object
    }
  },
  data: function() {
    return {
      output: "",
      showOutput: true
    };
  },
  methods: {
    close: function(messageId) {
      this.$emit("close", messageId);
    },
    getStyle: function() {
      return {
        position: "relative",
        maxWidth: "400px",
        maxHeight: "200px",
        textOverflow: "visible"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog-container {
  position: absolute;
}
</style>