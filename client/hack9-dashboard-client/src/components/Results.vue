<template>
  <div>
    <transition-group name="team-list" tag="div">
      <md-card
        class="md-layout md-elevation-8"
        v-for="team in teams"
        v-bind:key="team.id"
        :class="{ 'md-primary': isMyTeam(team) }"
      >
        <md-card-header class="md-layout-item md-size-100">
          <div class="md-title">{{ team.name }}</div>
          <div class="md-subhead">{{ team.members }}</div>
        </md-card-header>

        <ResultDetails v-if="team.showDetails" :details="team.details" />

        <md-card-actions class="md-layout-item md-size-60" md-alignment="left">
          <md-button v-show="isMyTeam(team) || isUserAdmin()" @click="apiUrlSettings(team)">
            <md-icon class="md-size-2x">settings_applications</md-icon>
          </md-button>
          <md-field v-show="team.editApiUrl">
            <label>API URL</label>
            <md-input v-model="team.apiUrl"></md-input>
          </md-field>
          <md-button v-show="team.editApiUrl" @click="setApiUrl(team)">
            <md-icon class="md-size-2x">check</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-actions class="md-layout-item md-size-20" md-alignment="right">
          <md-button
            v-show="isMyTeam(team) || isUserAdmin()"
            @click="getResultDetails(team)"
          >details</md-button>
        </md-card-actions>

        <md-card-actions class="md-layout-item md-size-20" md-alignment="right">
          <label>SCORE: {{Number(team.score)}} </label>
          <label v-show="team.executionNumber">Exec. no: {{Number(team.executionNumber)}}</label>
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
  </div>
</template>

<script>
import Vue from "vue";
import ResultDetails from "./ResultDetails";
import AuthService from "../service/auth.service";
import TeamService from "../service/team.service";

export default {
  name: "Results",
  components: { ResultDetails },
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
            if (!team) {
              this.teams.push(t1);
            } else {
              team = Object.assign({}, team, t1);
            }
          } catch (error) {
            throw error;
          }
        });
        this.teams.sort((t1, t2) =>
          Number(t1.score) < Number(t2.score) ? 1 : -1
        );
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
    },
    getResultDetails: function(team) {
      if (team.showDetails) {
        Vue.set(team, "showDetails", false);
      }
      if (this.isUserAdmin() || this.isMyTeam(team)) {
        TeamService.getResultDetails(team.id).then(response => {
          Vue.set(team, "showDetails", true);
          Vue.set(team, "details", response.data);
        });
      }
    }
  }
};
</script>