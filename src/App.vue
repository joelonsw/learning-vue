<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Publish</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  
  <!-- computed 함수는 () 붙이면 안됨 성능적으로 이점이 있음 한번계산하고 뚝딱 -->
  <!-- <p>{{now2}} {{counter}}</p> 
  <button @click="counter++">현시각</button>

  <h4>안녕 {{ name }} {{ 나이 }}</h4>
  <button @click="changeAge(10)">나이바꿔</button>

  <p>{{ $store.state.more }}</p>
  <button @click="getData()">더보기 버튼</button> -->

  <Container @text="text = $event" :instagramData="instagramData" :step="step" :fileUrl="fileUrl" :filter="filter"/>
  
  <!-- <button @click="more">더보기</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import instagramData from "./assets/data.js";
import axios from "axios";
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  name: "App",
  data() {
    return {
      text: "",
      fileUrl: "",
      step: 3,
      btnClick: 0,
      instagramData: instagramData,
      filter: "",
      counter: 0,
    };
  },
  mounted() {
    this.emitter.on('chooseFilter', (filter) => {
      this.filter = filter;
    });
  },
  components: {
    Container: Container,
  },
  methods: {
    ...mapMutations(['changeAge']),
    ...mapActions(['getData']),
    more() {
      if (this.btnClick == 0) {
        axios
          .get("https://codingapple1.github.io/vue/more0.json")
          .then((result) => {
            this.instagramData.push(result.data);
          });
        this.btnClick++;
      } else {
        axios
          .get("https://codingapple1.github.io/vue/more1.json")
          .then((result) => {
            this.instagramData.push(result.data);
          });
      }
    },
    upload(e) {
      let files = e.target.files;
      this.fileUrl = URL.createObjectURL(files[0]);
      this.step = 1;
    },
    publish() {
      var newPost = {
        name: "Joel",
        userImage: this.fileUrl,
        postImage: this.fileUrl,
        likes: 0,
        date: "October 10",
        liked: false,
        content: this.text,
        filter: this.filter,
      };
      this.instagramData.unshift(newPost);
      this.step = 0;
    },
    now() {
      return new Date();
    }
  },
  computed: {
    now2() {
      return new Date();
    },
    ...mapState(['name', 'likes']),
    ...mapState({ '나이': 'age'})
  }
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
