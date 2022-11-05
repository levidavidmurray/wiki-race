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
</script>
