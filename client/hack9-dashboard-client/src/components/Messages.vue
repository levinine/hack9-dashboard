<template>
  <div>
    <md-card class="md-layout md-elevation-8" v-for="message in state.messages" :key="message.id">
      <md-card-header class="md-layout-item md-size-100">
        <div class="md-title">{{ message.title }}</div>
        <div class="md-subhead">{{ message.createdBy }}</div>
      </md-card-header>
      <md-card-content>{{message.content}}</md-card-content>
    </md-card>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Messages",
  data: function() {
    return {
      state: store.state
    };
  }
};
</script>