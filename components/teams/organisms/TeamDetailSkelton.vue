<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <div class="skelton-breadcrumbs">
        <v-skeleton-loader type="text" width="40%" />
        <v-skeleton-loader type="text" width="80%" />
        <v-skeleton-loader type="text" width="60%" />
      </div>
      <div class="skelton-teams-header mt-8 pt-8">
        <div class="d-flex justify-space-between">
          <v-skeleton-loader type="text" width="70%" />
          <v-skeleton-loader type="text" width="20px" />
        </div>
        <v-skeleton-loader type="divider" width="100%" />
        <div class="mt-2 ml-2">
          <v-skeleton-loader type="text" width="30%" />
          <v-skeleton-loader type="text" width="35%" />
          <v-skeleton-loader type="text" width="25%" />
          <v-skeleton-loader type="text" width="25%" />
        </div>
      </div>
      <div class="skelton-teams-body mt-4">
        <div class="d-flex justify-space-between">
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
        </div>
        <v-sheet
          color="grey lighten-4"
          class="pa-1"
        >
          <div class="d-flex flex-column mx-4 my-4">
            <v-skeleton-loader class="mr-4" type="image" width="100%" height="200px" />
            <div class="mt-6">
              <v-skeleton-loader type="text" class="skelton-text" width="100%" />
              <v-skeleton-loader type="text" class="skelton-text" width="60%" />
              <v-skeleton-loader type="text" class="skelton-text" width="70%" />
              <v-skeleton-loader type="text" class="skelton-text" width="100%" />
              <v-skeleton-loader type="text" class="skelton-text" width="60%" />
              <v-skeleton-loader type="text" class="skelton-text" width="70%" />
            </div>
          </div>
        </v-sheet>
      </div>
    </div>
    <div v-else>
      <div class="skelton-breadcrumbs">
        <v-skeleton-loader type="text" width="400px" />
      </div>
      <div class="skelton-teams-header mt-8 pt-8">
        <div class="d-flex justify-space-between">
          <v-skeleton-loader type="text" width="70%" />
          <v-skeleton-loader type="text" width="20px" />
        </div>
        <v-skeleton-loader type="divider" width="100%" />
        <div class="d-flex justify-end mt-2">
          <v-skeleton-loader type="text" width="50%" />
        </div>
      </div>
      <div class="skelton-teams-body mt-4">
        <div class="d-flex justify-space-between">
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
          <v-skeleton-loader type="image" width="calc(20% - 4px)" height="40px" />
        </div>
        <v-sheet
          color="grey lighten-4"
          class="pa-1"
        >
          <div class="d-flex mx-3 my-6">
            <v-skeleton-loader class="mr-4" type="image" width="200px" height="200px" />
            <div>
              <v-skeleton-loader type="text" class="skelton-text" width="500px" />
              <v-skeleton-loader type="text" class="skelton-text" width="560px" />
              <v-skeleton-loader type="text" class="skelton-text" width="520px" />
              <v-skeleton-loader type="text" class="skelton-text" width="500px" />
              <v-skeleton-loader type="text" class="skelton-text" width="560px" />
              <v-skeleton-loader type="text" class="skelton-text" width="520px" />
            </div>
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash'
export default {
  data () {
    return {
      range
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
