<template>
    <div class="fixed top-0 left-0 w-full h-screen z-50">
        <div ref="overlayRef" class="overlay-mask"></div>
        <div class="relative z-40 max-w-5xl mx-auto">
            <h3 class="p-0 m-0 text-6xl overflow-visible font-black text-center uppercase space-x-6 relative z-10">
                <span class="complete-text-word inline-block" v-for="chars in completeTextWords">
                    <span class="complete-char text-shadow-md opacity-0 inline-block" v-for="char in chars">{{ char }}</span>
                </span>
            </h3>
            <div 
                ref="resultsBoxRef" 
                class="bg-neutral-50 rounded-3xl min-h-screen opacity-0 relative z-0 overflow-hidden"
            >
                <svg class="svg-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1" d="M0,320L120,304C240,288,480,256,720,245.3C960,235,1200,245,1320,250.7L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
                </svg>
                <div>
                    <div class="space-x-4">
                        <div>
                            <Icon name="bi:stopwatch-fill"></Icon>
                            <span>Time:</span>
                        </div>
                        <span>{{ gameState.timeDisplay }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGameState } from '~/store/gameState';


const COMPLETE_TEXT = 'RACE COMPLETED'
const completeTextWords = []

const gameState = useGameState()
const overlayRef = ref(null)
const resultsBoxRef = ref(null)

// Separate by words
COMPLETE_TEXT.split(' ').forEach(word => {
    // Separate by chars
    completeTextWords.push(word.split(''))
})

onMounted(() => {
    const RESULT_DELAY = 100
    setTimeout(() => {

        /* 0. Anim: Overlay Blur */
        const OVERLAY_BLUR = 4
        const OVERLAY_BLUR_TIMEOUT = 0

        setTimeout(() => {
            $anime({
                targets: overlayRef.value,
                duration: 500,
                update: anim => {
                    // @ts-ignore
                    overlayRef.value.style.backdropFilter = `blur(${OVERLAY_BLUR * anim.progress / 100}px)`
                }
            })
        }, OVERLAY_BLUR_TIMEOUT)

        /* 1. Anim: Show Results */
        const wordEls: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.complete-text-word')
        const TEXT_DELAY = 1000

        setTimeout(() => {
            /* 1a. Anim: Completed Text */
            wordEls.forEach((wordEl) => {
                const TIME_SCALE = 1
                const STAGGER_TIME = 50
                const staggerTime = STAGGER_TIME * TIME_SCALE
                setTimeout(() => {
                    $anime({
                        targets: wordEl.children,
                        delay: $anime.stagger(staggerTime),
                        translateY: {
                            value: 100,
                            duration: 500 * TIME_SCALE,
                        },
                        opacity: {
                            value: [0, 1],
                            duration: 300 * TIME_SCALE,
                        },
                    })
                }, staggerTime * wordEl.textContent.length)
            })

            /* 1b. Anim: Result Box */
            const RESULT_BOX_OPACITY_TRANSFORM_OFFSET = 0
            const RESULT_BOX_RESULT_TEXT_OFFSET = 500
            const resultBoxDelay = TEXT_DELAY + RESULT_BOX_RESULT_TEXT_OFFSET
            $anime({
                targets: resultsBoxRef.value,
                easing: 'cubicBezier(0.35, 1.25, 0.75, 1)',
                translateY: {
                    value: ['100%', 0],
                    duration: 800,
                    delay: resultBoxDelay - RESULT_BOX_OPACITY_TRANSFORM_OFFSET,
                },
                opacity: {
                    value: [1, 1],
                    duration: 1000,
                    delay: resultBoxDelay,
                },
            })

        }, TEXT_DELAY)


    }, RESULT_DELAY)
})

</script>

<style scoped>
.overlay-mask {
    @apply w-full h-screen absolute z-0;
}
.svg-wave {
    @apply opacity-40;
    transform: translateY(-30px);
}
</style>
