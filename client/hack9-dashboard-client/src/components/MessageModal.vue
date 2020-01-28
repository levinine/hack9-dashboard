<template>
  <md-dialog :md-active.sync="showOutput" :md-backdrop="false" :style="getStyle()">
    <md-dialog-title>{{message.title}}</md-dialog-title>

    <md-dialog-content md-dynamic-height>
      <p>{{message.content}}</p>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="close(message.id)">Close</md-button>
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
        maxWidth: "768px",
        maxHeight: "768px",
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