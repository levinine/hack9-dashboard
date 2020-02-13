<template>
  <div id="dashboard-app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class>
        <div class="md-toolbar-row md-layout">
          <router-link to="/" class="md-layout-item md-size-60">
            <div class="md-title md-layout-item title">Hack9 leaderboard</div>
          </router-link>
          <div class="email-wrapper md-size-20 md-layout-item md-size-10">
            <div class="alert alert-info">{{userEmail}}</div>
          </div>
          <div class="link-wrapper md-size-15 md-layout-item" style="text-align: right">
            <div class="link-container">
              <router-link to="/messages" v-show="isUserAuthenticated">
                <md-icon class="md-size-1x">mail_outline</md-icon>
                <md-tooltip md-direction="bottom">Messages</md-tooltip>
              </router-link>
            </div>
            <div class="link-container">
              <router-link
                class="md-size-5"
                v-show="isUserAuthenticated && isUserAdmin"
                to="/newMessage"
              >
                <md-icon class="md-size-1x">create</md-icon>
                <md-tooltip md-direction="bottom">New message</md-tooltip>
              </router-link>
            </div>
            <div class="link-container">
              <router-link
                class="login-link md-size-5"
                :to="{ path: (isUserAuthenticated ? '/logout': '/login') }"
              >{{isUserAuthenticated ? "Logout" : "Login"}}</router-link>
            </div>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <Spinner v-if="state.loading" />
        <router-view />

        <div to="/messages" v-if="state.newMessages.length" class="modal-wrapper">
          <span v-for="message in state.newMessages" :key="message.id">
            <MessageModal :message="message" @close="closeMessage" />
          </span>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Spinner from "./Spinner";
import store from "../store";
import MessageModal from "./MessageModal";

export default {
  name: "DashboardApp",
  components: { Spinner, MessageModal },
  mounted: function() {
    if (this.isUserAuthenticated) {
      store.getAllMessages();
      setInterval(store.getNewMessages, 30000);
    }
  },
  data: function() {
    return {
      state: store.state,
      closeMessage: store.closeMessage
    };
  },
  computed: {
    isUserAdmin() {
      return store.isUserAdmin();
    },
    isUserAuthenticated() {
      return store.isUserAuthenticated();
    },
    userEmail() {
      return store.getUserEmail();
    }
  }
};
</script>

<style>
.md-card {
  opacity: 85%;
  margin-bottom: 1em;
}
.team-list-move {
  transition: transform 1s;
}
.countdown ul {
  padding: 0 10%;
}
.countdown li {
  display: inline-block;
  width: 24%;
  font-size: 1.8em;
  list-style-type: none;
  padding: 2em 2em 1em;
  text-transform: uppercase;
  text-align: center;
}
@media only screen and (max-width: 1300px) {
  .countdown ul {
    padding: 0;
  }
  .countdown li {
    width: 100%;
  }
}

.countdown li span {
  display: block;
  font-size: 6.5rem;
  margin-bottom: 0.3em;
  text-align: center;
}
.title {
  text-align: left;
}
.login-link {
  font-size: 20px;
  color: aliceblue;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.link-container {
  display: inline-block;
  margin-left: 20px;
}
.modal-wrapper {
  position: relative;
  z-index: 9998;
  top: 0;
}
.link-wrapper {
  display: inline-block;
}
.email-wrapper {
  font-size: 14px;
}
</style>