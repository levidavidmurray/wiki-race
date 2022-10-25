import { WikiPageDisplay, WikiPageDto, WikiParseResponse, WikiQueryResponse } from "~/types/wiki"
import { toQueryParams } from "~/utils/helpers"

const WIKI_BASE_URL = 'https://en.wikipedia.org'

export const $wiki = {
    getPage: async (page: string): Promise<WikiPageDto> => {
        const params = {
            action: 'parse',
            format: 'json',
            formatversion: 2,
            origin: '*',
            prop: 'text|properties',
            page: page,
            redirects: true,
        }
        const wikiUrl = `${WIKI_BASE_URL}/w/api.php?${toQueryParams(params)}`
        // const { data } = await useFetch<WikiParseResponse>(wikiUrl, { key: wikiUrl, transform: data => data })
        const res = await $fetch<WikiParseResponse>(wikiUrl)

        return res.parse
    },

    getPageDisplay: async (page: string): Promise<WikiPageDisplay> => {
        const params = {
            action: 'query',
            format: 'json',
            formatversion: 2,
            origin: '*',
            prop: 'pageimages|description',
            piprop: 'thumbnail',
            pithumbsize: 50,
            titles: page,
            redirects: true,
        }
        const wikiUrl = `${WIKI_BASE_URL}/w/api.php?${toQueryParams(params)}`
        // const response = await useFetch<WikiQueryResponse>(wikiUrl, { key: wikiUrl, transform: data => data })

        const res = await $fetch<WikiQueryResponse>(wikiUrl)

        return res.query.pages[0]
    }

}
