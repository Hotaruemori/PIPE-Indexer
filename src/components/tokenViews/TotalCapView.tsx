import React from 'react';
import { AppDispatch, RootState, useAppSelector } from '../../redux/store';

interface totalMarketCapProps {
    count: number,
    totalMarketCap: number
}

const TotalCapView: React.FC<totalMarketCapProps> = ({count, totalMarketCap}) => {
    
  return (
    <div className="w-full grow px-6">
        <div className="mb-8 mt-10 w-full grow ">
            <h1 className="mb-10 text-3xl text-center">BRC-20 Tokens</h1>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Total tokens: </p>
                <span className="text-3xl font-bold text-blue-600">{count}</span>
            </div>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Market Caps: </p>
                <span className="text-3xl font-bold text-blue-600">${ Number(totalMarketCap).toLocaleString("en-US") }</span>
            </div>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Trading Volumes: </p>
                <span className="text-3xl font-bold text-blue-600">$123123123</span>
            </div>
        </div>
    </div>
  );
};

export default TotalCapView;