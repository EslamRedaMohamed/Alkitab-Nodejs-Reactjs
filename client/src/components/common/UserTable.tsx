import React, { useState } from 'react'
import { Space, Table, Select } from 'antd';

const { Column, ColumnGroup } = Table;

interface BookDataType {
    key: React.Key;
    cover: string;
    name: string;
    author: string;
    avgrate: number;
    rating: number;

}

const booksData: BookDataType[] = [
    {
        key: 1,
        cover: 'https://fakeimg.pl/667x1000/cc6600',
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        avgrate: 3.5,
        rating: 5,

    },
    {
        key: 2,
        cover: 'https://fakeimg.pl/667x1000/cc6600',
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        avgrate: 4.5,
        rating: 4
    },
];



const UserTable = () => {
    const handleChange = (value: string,key:any) => {
        console.log(value+" in "+key);
        
    };
    return (
        
        <Table dataSource={booksData}>
            <Column 
            title="Cover" 
            dataIndex="cover" 
            key="cover" 
            render={(_:any,record:BookDataType)=>(
                <>
                <img src={record.cover} width='70px'/>
                </>
            )}
            />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Author" dataIndex="author" key="author" />
            <Column title="AVG Rate" dataIndex="avgrate" key="avgrate" />
            <Column title="Rating" dataIndex="rating" key="rating" />


            <Column
                title="Shelve"
                key="shelve"
                render={(_: any, record: BookDataType) => (
                    <Space size="middle">
                        <Select
                            defaultValue="want to read"
                            style={{ width: 180 }}
                            onChange={(value) => handleChange(value, record.key)}
                            options={[
                                
                                { value: 'want to read', label: 'Want To Read' },
                                { value: 'reading', label: 'Reading' },
                                { value: 'read', label: 'Read' },
                            ]}
                            
                        >
                        </Select>
                    </Space>
                )}
            />
        </Table>
    )
}

export default UserTable