<template>
    <div>
        <div ref="scrollBodyRef" class="w-full h-screen overflow-y-auto overflow-x-hidden">
            <div class="max-w-screen-xl mx-auto px-4 xl:px-0">
                <wiki-race-header />
                <wiki-race />
            </div>
        </div>
        <wiki-race-results v-if="gameState.isComplete" />
    </div>
</template>

<script lang="ts" setup>
import { onKeyUp } from '@vueuse/core'
import { useGameState } from '~/store/gameState';

const gameState = useGameState()
const scrollBodyRef = ref(null)

gameState.$onAction(({ after }) => {
    after(() => {
        scrollBodyRef?.value?.scrollTo?.({ top: 0 })
    })
})

onKeyUp('Shift', e => {
    gameState.setDefault()
})

</script>
