<template>
  <div id="dashboard-app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class>
        <div class="md-toolbar-row md-layout">
          <div class="md-title md-layout-item md-size-80 title">Hack9 leaderboard</div>
          <div class="md-caption md-layout-item md-size-10">
            <div class="alert alert-info">{{userEmail}}</div>
          </div>
          <div class="md-title md-layout-item">
            <router-link to="/messages">
              <md-icon class="md-size-2x">mail_outline</md-icon>
            </router-link>
            <router-link
              :to="{ path: (isUserAuthenticated()? '/logout': '/login') }"
            >{{isUserAuthenticated()? "Logout" : "Login"}}</router-link>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import AuthService from "../service/auth.service";
import MessageService from "../service/message.service";

export default {
  name: "DashboardApp",
  data: function() {
    return {
      userEmail: AuthService.getUserEmail(),
      messages: [],
      newMessages: []
    };
  },
  // mounted: function() {
  //   this.getAllMessages();
  //   setInterval(this.getNewMessages, 30000);
  // },
  methods: {
    isUserAdmin: function() {
      return AuthService.isUserAdmin();
    },
    isUserAuthenticated: function() {
      return AuthService.isUserAuthenticated();
    },
    getAllMessages: function() {
      MessageService.getMessages().then(response => {
        this.messages = [...response.data];
      });
    },
    getNewMessages: function() {
      MessageService.getMessages().then(response => {
        response.data.forEach(m => {
          try {
            let message = this.messages.find(message => message.id === m.id);
            if (!message) {
              this.messages.push(m);
              this.newMessages.push(m);
            }
          } catch (error) {
            throw error;
          }
        });
      });
    },
    closeMessage: function(messageId) {
      let index = -1;
      this.newMessages.some((message, idx) => {
        if (message.id === messageId) {
          index = idx;
          return true;
        }
        return false;
      });
      if (index !== -1) {
        this.newMessages.splice(index, 1);
      }
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
</style>
