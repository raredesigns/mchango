import React, {useState} from 'react';
import type {TableColumnsType} from 'antd';
import {Table} from 'antd';
import {useList} from "@refinedev/core";
import {currencyNumber} from "../utility/currency-numbers";


interface DataType {
    id: string;
    firstName: string;
    lastName: string;
    amount: number;
    paid: number;
    balance: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: "firstName"
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: "lastName"
    },
    {
        title: 'Ahadi',
        dataIndex: 'amount',
        key: "amount",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyolipwa',
        dataIndex: 'paid',
        key: "paid",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyobakia',
        dataIndex: 'balance',
        key: "balance",
        render: (value: number) => currencyNumber(value)
    },
];

export const MkekaTable: React.FC = () => {
    const {data: mkekaList} = useList({
        resource: "mkeka",
        meta: {
            select: `id,firstName,lastName,amount,paid,balance`
        },
        pagination: {
            pageSize: 10,
        },
        sorters: [
            {
                field: "firstName",
                order: "asc",
            },
        ],
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Row selection configuration
    const rowSelection = {
        selectedRowKeys, // Selected rows
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
        selections: [
            {
                key: "selectRowsWithBalanceGreaterThanZero",
                text: "Wadaiwa Ahadi",
                onSelect: () => {
                    // Find rows that meet the condition `balance <= 0`
                    const keysToSelect = mkekaList?.data
                        .filter((row) => row.balance > 0) // Filter rows where balance <= 0
                        .map((row) => row.id); // Map their IDs (or `key`) for selection

                    setSelectedRowKeys(keysToSelect); // Update selected row keys
                },
            },
            {
                key: "selectRowsWithBalanceZeroOrLess",
                text: "Wamaliza Ahadi",
                onSelect: () => {
                    // Find rows that meet the condition `balance <= 0`
                    const keysToSelect = mkekaList?.data
                        .filter((row) => row.balance <= 0) // Filter rows where balance <= 0
                        .map((row) => row.id); // Map their IDs (or `key`) for selection

                    setSelectedRowKeys(keysToSelect); // Update selected row keys
                },
            },
        ],
    };


    return <Table<DataType>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={mkekaList?.data as DataType[] | undefined}
        size={"small"}
    />;
};
