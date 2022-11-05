<template>
    <div class="text-sm relative" :class="{'opacity-20': gameState.loading}">
        <div v-if="gameState.currentPage">
            <h1 class="mb-0 font-serif text-3xl">{{ gameState.wikiTitle }}</h1>
            <p class="mt-2 mb-4">From Wikipedia, the free encyclopedia</p>
            <div ref="wikiBody" v-html="gameState.wikiHtml"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGameState } from '~/store/gameState';

const wikiBody = ref(null)

const gameState = useGameState()

gameState.$onAction(({ after }) => {
    after(() => {
        replaceAnchorClicks()
    })
})

const replaceAnchorClicks = () => {
    if (!wikiBody.value) return
    const links: NodeList = wikiBody.value.querySelectorAll('a')
    links.forEach((a: HTMLAnchorElement) => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href')
            if (href[0] === '#') return
        
            e.preventDefault()
            const page = href.substring(6, href.length) // index 6: strip '/wiki/' from href
            gameState.setNewPage(page)
        })
    })
}

gameState.setDefault()

</script>
