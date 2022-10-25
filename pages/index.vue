<template>
    <div class="p-12 text-sm">
        <h1>Hello World</h1>
        <nuxt-link to="/play">
            <n-button>Play</n-button>
        </nuxt-link>
        <!-- <div v-html="wikiHtml"></div> -->
    </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'

// const wikiUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Canada&formatversion=2`

// const { data } = await useFetch(wikiUrl)

// // @ts-ignore
// const wikiHtml = data.value.parse.text

// if (process.client) {
//     document.documentElement.classList.add('client-js')
// }

// // @ts-ignore
// console.log(data.value.parse)

</script>
