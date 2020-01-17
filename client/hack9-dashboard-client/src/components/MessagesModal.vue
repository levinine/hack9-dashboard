<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <md-dialog :md-active.sync="showOutput" :md-backdrop="false">
        <md-dialog-title>{{message.title}}</md-dialog-title>

        <md-dialog-content md-dynamic-height>
          <p>{{message.content}}</p>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="close(message.id)">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    messages: {
      type: Array
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
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>