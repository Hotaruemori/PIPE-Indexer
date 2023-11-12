export const getMarketCap = (maxval:number, price:number, salecount:number) => {
    if(salecount === 0)
        return 0
    return maxval/salecount*price
}