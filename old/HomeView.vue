<template>
  <div class="home">
    <img src="../assets/pokeBall.jpg" alt="icon" />
    <div class="search" v-if="poke">
      <input
        type="text"
        v-model="search"
        placeholder="enter pokemon name ..."
      />
    </div>
    <div class="results" v-if="searchList">
      <ul>
        <li v-for="pokemon in searchList" :key="pokemon.name">
          <router-link :to="'/about/' + shortIt(pokemon.url)">
            <img src="../assets/openedBall.jpg" alt="poke" /> {{ pokemon.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
export default {
  name: "HomeView",
  data() {
    return {
      poke: true,
      searchList: computed(() => {
        console.log(this.filterIt());
        return this.filterIt();
      }),
    };
  },
  setup() {
    const search = ref("");
    let pokeList = reactive({});
    let filteredList = reactive({});
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        pokeList = data.results;
        console.log(pokeList);
      });
    //.match(/\/d*\//gi)
    //"https://pokeapi.co/api/v2/pokemon/1/"
    const filterIt = function () {
      if (search.value != "") {
        filteredList = pokeList.filter((e) => {
          return e.name.includes(search.value);
        });
        return filteredList;
      }
    };
    return { search, pokeList, filterIt };
  },
  methods: {
    shortIt(val) {
      let Regexp = new RegExp(/\/\d*\//gi);
      let pre = val.match(Regexp).toString();
      let final = pre.replaceAll("/", "").replaceAll(",", "");
      return final;
    },
  },
};
</script>
