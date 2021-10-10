import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            name: "joel",
            age: 20,
            likes: 30,
            more : {},
        }
    },
    mutations: {
        changeName(state) {
            state.name = 'park';
        },
        changeAge(state, payload) {
            state.age+= payload;
        }, 
        addLike(state) {
            state.likes++;
        }, 
        removeLike(state) {
            state.likes--;
        },
        setMore(state, result) {
            state.more = result;
        }
    },
    actions: {
        getData(store) {
            axios
            .get("https://codingapple1.github.io/vue/more0.json")
            .then((result) => {
                store.commit('setMore', result);
            })
        }
    }
})

export default store;