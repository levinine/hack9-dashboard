<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="saveMessage">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">New message</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field>
                <label for="title">Title</label>
                <md-input name="title" id="title" v-model="form.title" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field>
                <label for="content">Content</label>
                <md-textarea
                  name="content"
                  id="content"
                  v-model="form.content"
                  :disabled="sending"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-100" md-alignment="left">
              <md-checkbox
                name="isGlobal"
                id="isGlobal"
                v-model="form.isGlobal"
                :disabled="sending"
              >Global message</md-checkbox>
            </div>

            <div class="md-layout-item">
              <md-field>
                <label for="country">Country</label>
                <md-select
                  v-model="form.country"
                  name="country"
                  id="country"
                  :disabled="form.isGlobal"
                >
                  <md-option value="Netherlands">Netherlands</md-option>
                  <md-option value="Romania">Romania</md-option>
                  <md-option value="Serbia">Serbia</md-option>
                  <md-option value="Ukraine">Ukraine</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100">
            <label for="expirationTime">Expiration Time</label>
            <md-datepicker v-model="form.expirationTime" value="string" />
          </div>

          <div class="md-layout-item">
            <md-field>
              <md-select v-model="form.hours" name="hours" id="hours">
                <md-option v-for="index in 23" :key="index" :value="index">{{index}}</md-option>
              </md-select>:
              <md-select v-model="form.minutes" name="minutes" id="minutes">
                <md-option v-for="index in 59" :key="index" :value="index">{{index}}</md-option>
              </md-select>
            </md-field>
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
      isGlobal: false,
      expirationTime: null,
      country: null,
      minutes: null,
      hours: null
    },
    messageSaved: false,
    sending: false,
    lastMessage: null
  }),
  methods: {
    clearForm() {
      this.form.title = null;
      this.form.content = null;
      this.form.isGlobal = false;
      this.form.expirationTime = null;
      this.form.country = null;
      this.form.minutes = null;
      this.form.hours = null;
    },
    saveMessage() {
      this.sending = true;
      let { minutes, hours, ...data } = this.form;

      const expirationDate = new Date(data.expirationTime);
      expirationDate.setHours(hours, minutes)
      data.expirationTime = (expirationDate.getTime() - new Date().getTime())/1000

      MessageService.postMessage(data).then(() => {
        this.lastMessage = this.form.title;
        this.messageSaved = true;
        this.sending = false;
        this.clearForm();
      });
    }
  }
};
</script>

<style scoped>
.md-layout-item {
  text-align: left;
}
</style>>