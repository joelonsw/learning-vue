<template>
  <div @click="fire" :class="filter" class="filter-item" :style="`background-image:url(${fileUrl})`">
      <slot name="a"></slot>
  </div>
</template>

<script>
export default {
  name: "filterBox",
  props: {
    fileUrl: String,
    filter: String
  },
  methods: {
      fire() {
        this.emitter.emit('chooseFilter', this.filter)
      }
  }
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>