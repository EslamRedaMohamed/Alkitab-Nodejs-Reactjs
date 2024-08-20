import React, { useEffect, useState } from 'react';
import { Space, Table, Select, Rate } from 'antd';
import axios from 'axios';

const { Column } = Table;

interface BookDataType {
    key: React.Key;
    cover: string;
    name: string;
    author: string;
    avgrate: number;
    rating: number;
}

interface UserTableProps {
    userId: string;
}

type BookType = {
    _id: string;
    name: string;
    author: string;
};

type FavouriteType = {
    book: BookType;
    status: string;
    rate: number;
    _id: string;
};

const UserTable: React.FC<UserTableProps> = ({ userId }) => {
    const [favourites, setFavourites] = useState<FavouriteType[]>([]);
    const [booksData, setBooksData] = useState<BookDataType[]>([]);

    useEffect(() => {
        const fetchFavourites = async (uId: string) => {
            try {
                console.log("Fetching favourites for userId: " + uId);
                const response = await axios.post('http://localhost:8080/users/getuserfavourite', { userId: uId });
                const favData = response.data;

                // Save fetched favourites to local storage
                localStorage.setItem('userFavourites', JSON.stringify(favData));
                setFavourites(favData);
            } catch (err: any) {
                console.error("Error fetching favourites:", err.message);
            }
        };

        // Fetch data only if not present in local storage
        const localData = localStorage.getItem('userFavourites');
        if (localData) {
            setFavourites(JSON.parse(localData));
        } else {
            fetchFavourites(userId);
        }
    }, [userId]);

    useEffect(() => {
        // Update booksData state whenever favourites change
        const updatedBooksData = favourites.map((fav: FavouriteType) => ({
            key: fav.book._id,
            cover: 'https://fakeimg.pl/667x1000/cc6600',
            name: fav.book.name,
            author: fav.book.author,
            avgrate: 4.5, // Placeholder value
            rating: fav.rate,
        }));
        setBooksData(updatedBooksData);
        // Save booksData to local storage
        localStorage.setItem('booksData', JSON.stringify(updatedBooksData));
    }, [favourites]);

    useEffect(() => {
        // Load booksData from local storage on component mount
        const localBooksData = localStorage.getItem('booksData');
        if (localBooksData) {
            setBooksData(JSON.parse(localBooksData));
        }
    }, []);

    const handleChange = (value: string, key: any) => {
        console.log(value + " in " + key);
    };

    return (
        <Table dataSource={booksData}>
            <Column
                title="Cover"
                dataIndex="cover"
                key="cover"
                render={(_: any, record: BookDataType) => (
                    <img src={record.cover} width='70px' alt="cover" />
                )}
            />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Author" dataIndex="author" key="author" />
            <Column
                title="AVG Rate"
                dataIndex="avgrate"
                key="avgrate"
                render={(text: any) => (
                    <Rate disabled defaultValue={text} />
                )}
            />
            <Column
                title="Rating"
                dataIndex="rating"
                key="rating"
                render={(text: any) => (
                    <Rate disabled defaultValue={text} />
                )}
            />
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
                        />
                    </Space>
                )}
            />
        </Table>
    );
};

export default UserTable;
