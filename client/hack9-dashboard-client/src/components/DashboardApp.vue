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
            <router-link  v-if="isUserAuthenticated()" to="/logout">Logout</router-link>
            <router-link v-if="!isUserAuthenticated()" to="/login">Login</router-link>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <transition-group name="team-list" tag="div">
          <md-card
            class="md-layout md-elevation-8"
            v-for="team in teams"
            v-bind:key="team.id"
            :class="{ 'md-primary': isMyTeam(team) }"
          >
            <md-card-header class="md-layout-item">
              <div class="md-title">{{ team.name }}</div>
              <div class="md-subhead">{{ team.members }}</div>
            </md-card-header>

            <md-card-content class="md-layout-item md-size-100">
              <div class="md-layout md-gutter">
                <div
                  class="md-layout-item md-size-33"
                  v-if="team.showLatestExecution"
                  v-html="team.latestExecution"
                ></div>
              </div>
            </md-card-content>

            <md-card-actions class="md-layout-item md-size-40" md-alignment="left">
              <md-button v-show="isMyTeam(team) || isUserAdmin()" @click="apiUrlSettings(team)">
                <md-icon class="md-size-2x">settings_applications</md-icon>
              </md-button>
              <md-button v-show="team.editApiUrl" @click="setApiUrl(team)">
                <md-icon class="md-size-2x">check</md-icon>
              </md-button>
              <md-field v-show="team.editApiUrl">
                <label>API URL</label>
                <md-input v-model="team.apiUrl"></md-input>
              </md-field>
            </md-card-actions>

            <md-card-actions class="md-layout-item md-size-38" md-alignment="left"></md-card-actions>

            <md-card-actions class="md-layout-item md-size-20" md-alignment="right">
              <label @click="getLatestExecution(team)">SCORE {{team.score}}</label>
              <md-button v-if="team.status==='ready'" @click="requestTest(team.id)">
                <md-icon class="md-size-2x">play_arrow</md-icon>
              </md-button>
              <md-button v-if="team.status==='scheduled'">
                <md-icon class="md-size-2x">av_timer</md-icon>
              </md-button>
              <md-button v-if="team.status==='running'">
                <md-progress-spinner md-mode="indeterminate" :md-diameter="30"></md-progress-spinner>
              </md-button>
            </md-card-actions>
          </md-card>
        </transition-group>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Vue from "vue";
import TeamService from "../service/team.service";
import AuthService from "../service/auth.service";

export default {
  name: "DashboardApp",
  data: function() {
    return {
      teams: [],
      userEmail: AuthService.getUserEmail()
    };
  },
  mounted: function() {
    this.loadResults();
    setInterval(this.loadResults, 30000);
  },
  methods: {
    loadResults: function() {
      TeamService.getResults().then(response => {
        response.data.forEach(t1 => {
          try {
            let team = this.teams.find(t2 => t2.id === t1.id);
            if (team == null) {
              this.teams.push(t1);
            } else {
              team = Object.assign({}, team, t1);
            }
          } catch (error) {
            throw error;
          }
        });
        this.teams.sort((t1, t2) => (Number(t1.score) < Number(t2.score) ? 1 : -1));
      });
    },
    isUserAdmin: function() {
      return AuthService.isUserAdmin();
    },
    isUserAuthenticated: function() {
      return AuthService.isUserAuthenticated();
    },
    isMyTeam: function(team) {
      return team.members && team.members.includes(AuthService.getUserEmail());
    },
    getLatestExecution: function(team) {
      if (team.showLatestExecution) {
        team.showLatestExecution = false;
      } else {
        if (this.isUserAdmin() || this.isMyTeam(team)) {
          TeamService.getLatestExecution(team.id).then(response => {
            Vue.set(team, "showLatestExecution", true);
            Vue.set(team, "latestExecution", response.data.execution);
          });
        }
      }
    },
    apiUrlSettings: function(team) {
      if (team.editApiUrl) {
        team.editApiUrl = false;
      } else {
        if (this.isUserAdmin() || this.isMyTeam(team)) {
          TeamService.getApiUrl(team.id).then(response => {
            Vue.set(team, "editApiUrl", true);
            Vue.set(team, "apiUrl", response.data.apiUrl);
          });
        }
      }
    },
    setApiUrl: function(team) {
      TeamService.putApiUrl(team.id, team.apiUrl);
    },
    requestTest: function(teamId) {
      TeamService.postTestRequest(teamId);
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
