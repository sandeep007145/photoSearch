export interface IPagination {
    count?: number;
    pageNum?: number;
    pageNo?: number;
    limit?: number;
}


const DEFAULT = Object.freeze({
    PAGINATION: Object.freeze({
        PAGE_NO: 1,
        LIMIT: 10,
        COUNT: 0
    })
});

export class Pagination implements IPagination {
    count: number;
    pageNum: number = DEFAULT.PAGINATION.PAGE_NO;
    limit: number = DEFAULT.PAGINATION.LIMIT;
    constructor(opts: IPagination = {}) {
        Object.assign(this, opts);
    }
    set pageNo(page: number) {
        this.pageNum = page;
    }
    get pageNo() {
        return this.pageNum;
    }
}
