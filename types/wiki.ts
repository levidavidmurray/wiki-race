
interface WikiResultProperties {
    'wikibase-shortdesc': string;
    page_image_free: string;
}

export interface WikiPageDto {
    title: string;
    pageid: number;
    text?: string;
    properties: WikiResultProperties;
}

export interface WikiPageDisplay {
    pageid: number;
    title: string;
    description?: string;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
}

export interface WikiParseResponse {
    parse: WikiPageDto;
}

export interface WikiQueryResponse {
    batchcomplete: boolean;
    query: {
        normalized: [
            {
                fromencoded: boolean;
                from: string;
                to: string;
            }
        ];
        pages: WikiPageDisplay[];
    }
}
