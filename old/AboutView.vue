<template>
  <div class="about">
    <div
      :class="this.flip ? 'flip card' : 'card'"
      @click="this.flip = !this.flip"
    >
      <div class="face front">
        <h1>{{ thePokemon.name }}</h1>
        <div class="image">
          <img
            v-if="thePokemon.sprites"
            :src="thePokemon.sprites.front_default"
            alt="poke img"
          />
          <img
            v-if="thePokemon.sprites"
            :src="thePokemon.sprites.back_default"
            alt="poke img"
          />
        </div>

        <div class="type">
          <h3 v-for="pokeType in thePokemon.types" :key="pokeType.id">
            {{ pokeType.type.name }}
          </h3>
        </div>
        <div class="abilites">
          <h4 v-for="ab in thePokemon.abilities" :key="ab.id">
            {{ ab.ability.name }}
          </h4>
        </div>
        <div class="stats" v-if="thePokemon.stats">
          <p v-for="stat in thePokemon.stats" :key="stat.id">
            {{
              stat.stat.name.length > 12
                ? stat.stat.name.replace("special", "Sp")
                : stat.stat.name
            }}
            : {{ stat.base_stat }}
          </p>
        </div>
      </div>
      <div class="face back">
        <div class="image">
          <img src="../assets/pokeCard2.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      flip: true,
    };
  },
  setup() {
    const route = useRoute();
    let theUrl = "https://pokeapi.co/api/v2/pokemon/";
    let pokeId = route.params.id;
    let thePokemon = ref({});

    fetch(`${theUrl}${pokeId}/`)
      .then((res) => res.json())
      .then((data) => {
        thePokemon.value = data;
        console.log(thePokemon.value);
      });

    return { thePokemon };
  },
};
</script>
