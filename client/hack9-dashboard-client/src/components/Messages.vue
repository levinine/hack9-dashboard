<template>
  <div>
    <md-card class="md-layout md-elevation-8" v-for="message in messages" :key="message.id">
      <md-card-header class="md-layout-item md-size-100">
        <div class="md-title">{{ message.title }}</div>
        <div class="md-subhead">{{ message.createdBy }}</div>
      </md-card-header>
      <md-card-content>{{message.content}}</md-card-content>
    </md-card>
  </div>
</template>

<script>
import MessageService from "../service/message.service";

export default {
  name: "Messages",
  data: function() {
    return {
      messages: [],
    };
  },
  mounted: function() {
    this.getAllMessages();
    setInterval(this.getAllMessages, 30000);
  },
  methods: {
    getAllMessages: function() {
      MessageService.getMessages().then(response => {
        this.messages = [...response.data];
      });
    }
  }
};
</script>