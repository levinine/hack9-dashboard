<template>
  <div>
    <ul
      class="details-container"
      v-for="detail in details"
      v-bind:key="detail.testId"
      md-with-hover
    >
      <li class="md-layout-item">
        <div class="md-title">{{detail.testName}}</div>
        <div class="md-subhead">Score: {{Number(detail.score)}}</div>
        <md-button @click="openOutput(detail)">Show output</md-button>
      </li>
    </ul>
    <div class="output-container">
      <md-card v-if="showOutput" md-with-hover>
        <md-card-actions class="md-layout-item md-size-100" md-alignment="right">
          <md-button @click="closeOutput()">
            <md-icon class="md-size-2x">close</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-content class="md-layout-item md-size-100" v-html="output"></md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultDetails",
  props: {
    details: {
      type: Array
    }
  },
  data: function() {
    return {
      output: "",
      showOutput: false
    };
  },
  methods: {
    openOutput: function(detail) {
      this.showOutput = true;
      this.output = detail.output;
    },
    closeOutput: function() {
      this.showOutput = false;
      this.output = "";
    }
  }
};
</script>

<style scoped>
.details-container {
  width: 15%;
  height: 150px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  list-style-type: none;
}
.output-container {
  width: 50%;
  padding-top: 10px;
  margin: auto;
}
</style>