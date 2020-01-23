<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateMessage">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">New message</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="title">Title</label>
                <md-input name="title" id="title" v-model="form.title" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="content">Content</label>
                <md-input name="content" id="content" v-model="form.content" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="isGlobal">Global message</label>
                <md-checkbox
                  name="isGlobal"
                  id="isGlobal"
                  v-model="form.isGlobal"
                  :disabled="sending"
                />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create message</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active.sync="messageSaved"
      >The message {{ lastMessage }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import MessageService from "../service/message.service";

export default {
  name: "MessageForm",
  data: () => ({
    form: {
      title: null,
      content: null,
      isGlobal: null,
      expirationTime: null
    },
    messageSaved: false,
    sending: false,
    lastMessage: null
  }),
  methods: {
    clearForm() {
      this.form.title = null;
      this.form.content = null;
      this.form.isGlobal = null;
      this.form.expirationTime = null;
    },
    saveMessage() {
      this.sending = true;
      MessageService.postMessage(this.form).then(() => {
        this.lastMessage = this.form.title;
        this.messageSaved = true;
        this.sending = false;
        this.clearForm();
      });
    }
  }
};
</script>