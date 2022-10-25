<template>
    <div>
        <div v-if="gameState.currentPage">Current Page ID: {{ gameState.currentPage.pageid }}</div>
        <div v-if="gameState.endPage">Target Page ID: {{ gameState.endPage.pageid }}</div>
        <div class="wiki-path mt-4" v-if="gameState.startPage">
            <div class="path-line"></div>
            <wiki-page-indicator :page="gameState.startPage" large />
            <div ref="stepsRef" class="relative w-full flex justify-start items-center">
                <wiki-page-indicator 
                    v-for="(page, index) in gameState.history"
                    :page="page"
                    :active="!gameState.isComplete && index === gameState.history.length-1"
                    step
                    :left="getStepOffset(index)"
                />
            </div>
            <wiki-page-indicator :page="gameState.endPage" large :active="gameState.isComplete" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { useGameState } from '~/store/gameState';

const gameState = useGameState()

const stepsRef: Ref<HTMLDivElement> = ref()

const STEP_EL_SIZE = 20
const DEFAULT_OFFSET = 16
let offset = DEFAULT_OFFSET

const getStepOffset = (index) => {
    const stepsEl = stepsRef.value
    const halfPoint = stepsEl.clientWidth / 2

    // reduce offset to current total step length minus 
    if (gameState.history.length * (offset + STEP_EL_SIZE) > halfPoint) {
        const offsetReduction = (gameState.history.length * (offset + STEP_EL_SIZE) - halfPoint) / gameState.history.length
        offset = offset - offsetReduction
    }

    console.log('stepsEl', stepsEl.clientWidth)
    return (offset) * (index+1) + (STEP_EL_SIZE * index)
}

</script>

<style scoped>
.wiki-path {
    @apply relative flex justify-between items-center;
}

.path-line {
    @apply absolute inset-0 m-auto bg-neutral-200 w-full;
    height: 8px;
}
</style>