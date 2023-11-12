
const isLeapYear = (year:number) =>{
    return (year%400 === 0 || year % 4 === 0 && year % 100 !== 0)
}

const getPrevDate = (year:number, month: number, day:number) =>
{
    let tm = month
    let ty = year
    let td = day
    let dayofmonth:number[] = [0, 31,28,31,30,31,30,31,31,30,31,30,31]
    if(isLeapYear(year))
        dayofmonth[2] += 1

    if(td === 1)
    {
        if(tm === 1)
        {
            ty--
            tm = 12
            td = 31
        }
        else
        {
            tm--
            td = dayofmonth[tm]
        }
    }
    else
    {
        td--
    }

    const  res = new Date(tm, ty, td, 0, 0, 0)
    return res
}