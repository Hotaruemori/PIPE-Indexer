import React from 'react';
import { AppDispatch, RootState, useAppSelector } from '../../redux/store';

interface totalMarketCapProps {
    count: number,
}

const TotalCapView: React.FC<totalMarketCapProps> = ({count}) => {
    
  return (
    <div className="w-full grow px-6">
        <div className="mb-8 mt-8 w-full grow ">
            <h1 className="mb-6 text-3xl text-center font-semibold">PIPE-Indexer</h1>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Total tokens: </p>
                <span className="text-3xl font-bold text-blue-600">{count}</span>
            </div>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Market Caps: </p>
                <span className="text-3xl font-bold text-blue-600">${ localStorage.getItem("totalCap") }</span>
            </div>
            <div className="mb-2 flex items-center">
                <p className="flex w-1/2 justify-end text-3xl font-extrabold pr-3">Trading Volumes: </p>
                <span className="text-3xl font-bold text-blue-600">${ localStorage.getItem("tradingVol") } </span>
            </div>
        </div>
    </div>
  );
};

export default TotalCapView;