export const getMarketCap = (maxval:number, price:number, salecount:number) => {
    return maxval/salecount*price
}