import { defineStore } from 'pinia'
import { WikiPageDisplay, WikiPageDto } from '~/types/wiki';

interface GameState {
    startPage: WikiPageDisplay;
    endPage: WikiPageDisplay;
    currentPage: WikiPageDto;
    history: WikiPageDisplay[];
    loading: boolean;
}

export const useGameState = defineStore({
    id: 'game-state',

    state: (): GameState => ({
        startPage: null,
        endPage: null,
        currentPage: null,
        history: [],
        loading: false,
    }),

    getters: {
        wikiHtml: state => state.currentPage?.text,
        wikiTitle: state => state.currentPage?.title,
        isComplete: state => state.currentPage?.pageid === state.endPage?.pageid,
    },

    actions: {
        async setNewPage(page: string) {
            this.loading = true

            this.currentPage = await $wiki.getPage(page)

            if (!this.isComplete) {
                const pageDisplay = await $wiki.getPageDisplay(page)
                this.history.push(pageDisplay)
            }

            this.loading = false
        },

        async setDefault() {
            this.loading = true

            const [startPage, currentPage, endPage] = await Promise.all([
                $wiki.getPageDisplay('Canada'),
                $wiki.getPage('Canada'),
                $wiki.getPageDisplay('Arctic_Ocean')
            ])

            this.startPage = startPage
            this.currentPage = currentPage
            this.endPage = endPage

            this.loading = false
        }
    },

})
