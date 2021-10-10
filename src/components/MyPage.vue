<template>
  <div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="🔍" @input="search"/>
  <div class="post-header" v-for="follower in followers" :key="follower">
    <div class="profile" :style="`background-image:url(${follower.image})`"></div>
    <span class="profile-name">{{follower.name}}</span>
  </div>
</div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    name: "mypage",
    setup() {
        let followers = ref([]);
        let followersOriginal = ref([]);

        function search(e) {
            let searchWord = e.target.value;
            let result = followersOriginal.value.filter((a) => {
                return a.name.indexOf(searchWord) != -1
            });
            this.followers = [...result];
        }

        onMounted(() => {
            axios.get('/follower.json').then((a) => {
                followers.value = a.data;
                followersOriginal.value = [...a.data];
            })
        })

        return {followers, search}
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>