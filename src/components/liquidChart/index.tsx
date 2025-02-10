import Tiny from '@ant-design/plots';
import React from 'react';

type Props = {
    progress: number
}

export const ProgressBar = ({progress}: Props) => {
    const percent = progress;
    const config = {
        percent,
        width: 240,
        height: 240,
        color: ['#f0f5ff', '#1d39c4'],
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${(percent * 100).toFixed(0)}%`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 16,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return <Tiny.RingProgress {...config} />;
};





