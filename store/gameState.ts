import { defineStore } from 'pinia'
import { useTimestamp } from '@vueuse/core'
import { WikiPageDisplay, WikiPageDto } from '~/types/wiki';
import { convertMS, TimeDisplayType } from '~/utils/helpers';
import { UnwrapNestedRefs } from '@vue/reactivity';

interface GameState {
    startPage: WikiPageDisplay;
    endPage: WikiPageDisplay;
    currentPage: WikiPageDto;
    isComplete: boolean;
    history: WikiPageDisplay[];
    loading: boolean;
    timeDisplay: UnwrapNestedRefs<TimeDisplayType>;
}

let timerInterval
let startTime = -1
let pauseTimer: () => void;

export const useGameState = defineStore({
    id: 'game-state',

    state: (): GameState => ({
        startPage: null,
        endPage: null,
        currentPage: null,
        isComplete: false,
        history: [],
        loading: false,
        timeDisplay: reactive({
            milliseconds: '00',
            seconds: '00',
            minutes: '00',
        }),
    }),

    getters: {
        wikiHtml: state => state.currentPage?.text,
        wikiTitle: state => state.currentPage?.title,
        isOnGoalPage: state => state.currentPage?.pageid === state.endPage?.pageid,
        isStarted: state => Boolean(state.startPage) && Boolean(state.endPage),
    },

    actions: {

        doComplete() {
            this.isComplete = true
            this.stopTimer()
        },

        startTimer() {
            this.stopTimer()
            startTime = new Date().valueOf()

            const { pause } = useTimestamp({
                controls: true,
                callback: timestamp => {
                    this.timeDisplay = convertMS(timestamp - startTime)
                }
            })
            pauseTimer = pause
        },

        stopTimer() {
            pauseTimer?.()
        },

        async setNewPage(page: string) {
            this.loading = true

            this.currentPage = await $wiki.getPage(page)

            if (this.isOnGoalPage) {
                this.doComplete()
            } else {
                // Goal page has not been reached
                const pageDisplay = await $wiki.getPageDisplay(page)
                this.history.push(pageDisplay)
            }

            this.loading = false
        },

        async setDefault() {
            this.loading = true

            this.isComplete = false

            this.stopTimer()

            const [startPage, currentPage, endPage] = await Promise.all([
                $wiki.getPageDisplay('Canada'),
                $wiki.getPage('Canada'),
                $wiki.getPageDisplay('Arctic_Ocean')
            ])

            this.startPage = startPage
            this.currentPage = currentPage
            this.endPage = endPage
            this.history = []

            this.startTimer()

            this.loading = false
        }
    },

})
