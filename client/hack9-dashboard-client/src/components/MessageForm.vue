<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validate" @submit="saveMessage">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">New message</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field class="md-invalid">
                <label for="title">Title</label>
                <md-input name="title" id="title" v-model="form.title" :disabled="submitDisabled" :valid="false" required/>
                <span class="md-error">Title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field>
                <label for="content">Content</label>
                <md-textarea
                  name="content"
                  id="content"
                  v-model="form.content"
                  :disabled="submitDisabled"
                  md-autogrow
                  required
                />
                <span class="md-error">Field is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-100" md-alignment="left">
              <md-checkbox
                name="isGlobal"
                id="isGlobal"
                v-model="form.isGlobal"
                :disabled="submitDisabled"
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
            <label for="expirationTime">Expiration Date</label>
            <md-datepicker
              v-model="form.expirationTime"
              value="string"
              :md-disabled-dates="disabledDates"
            />
          </div>
          <label>Expiration Time</label>
          <div class="time-container">
            <div class="md-layout-item md-size-30 md-small-size-60" md-alignment="left">
              <md-field>
                <md-select v-model="form.hours" name="hours" id="hours">
                  <md-option v-for="index in 23" :key="index" :value="index">{{index}}</md-option>
                </md-select>
              </md-field>
            </div>
            <p>:</p>
            <div class="md-layout-item md-size-30 md-small-size-60">
              <md-field>
                <md-select v-model="form.minutes" name="minutes" id="minutes">
                  <md-option v-for="index in 59" :key="index" :value="index">{{index}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="submitDisabled">Create message</md-button>
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
    submitDisabled: false,
    lastMessage: null,
    disabledDates: date => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0);
      return date < currentDate;
    }
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
      this.submitDisabled = true;
      let { minutes, hours, ...data } = this.form;

      const expirationDate = new Date(data.expirationTime);
      expirationDate.setHours(hours, minutes);
      data.expirationTime =
        (expirationDate.getTime() - new Date().getTime()) / 1000;

      MessageService.postMessage(data).then(() => {
        this.lastMessage = this.form.title;
        this.messageSaved = true;
        this.submitDisabled = false;
        this.clearForm();
      });
    },
    validate() {
      if (!this.form.title || !this.form.content){
        this.submitDisabled = true;
      } else {
        this.submitDisabled = false;
      }
    }
  },
  computed: {
      messageClass () {
        return {
          'md-invalid': this.hasMessages
        }
      }
    }
};
</script>

<style scoped>
.md-layout-item {
  text-align: left;
}
p {
  margin: 20px;
}
.time-container {
  display: flex;
  flex-direction: row;
}
</style>>