import React, { useEffect, useState } from 'react';
import { Space, Table, Select, Rate } from 'antd';
import axios from 'axios';

const { Column } = Table;

interface BookDataType {
    key: React.Key;
    cover: string;
    name: string;
    authorName: string;
    avgrate: number;
    rating: number;
}

interface UserTableProps {
    userId: string;
}

type BookType = {
    _id: string;
    name: string;
    authorName: string;
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

                // Update state with fetched favourites
                setFavourites(favData);

                // Map the fetched favourites to booksData
                const updatedBooksData = favData.map((fav: FavouriteType) => ({
                    key: fav.book._id,
                    cover: 'https://fakeimg.pl/667x1000/cc6600',
                    name: fav.book.name,
                    authorName: fav.book.authorName,
                    avgrate: 4.5, // Placeholder value
                    rating: fav.rate,
                }));

                setBooksData(updatedBooksData);
            } catch (err: any) {
                console.error("Error fetching favourites:", err.message);
            }
        };

        fetchFavourites(userId);
    }, [userId]);
    


    const handleChange = async (value: string, key: any) => {
        try {
            // Find the selected book in favourites
            const selectedFavourite = favourites.find(fav => fav.book._id === key);

            if (selectedFavourite) {
                // Prepare the PUT request payload
                const payload = {
                    userId,
                    bookId: selectedFavourite.book._id,
                    newStatus: value
                };

                // Make the PUT request
                await axios.put('http://localhost:8080/users/userfavourite', payload);

                // Optionally update the local state to reflect the change
                const updatedFavourites = favourites.map(fav => 
                    fav.book._id === key ? { ...fav, status: value } : fav
                );

                setFavourites(updatedFavourites);

                const updatedBooksData = updatedFavourites.map((fav: FavouriteType) => ({
                    key: fav.book._id,
                    cover: 'https://fakeimg.pl/667x1000/cc6600',
                    name: fav.book.name,
                    authorName: fav.book.authorName,
                    avgrate: 4.5, // Placeholder value
                    rating: fav.rate,
                }));

                setBooksData(updatedBooksData);

                console.log(`Updated status to ${value} for book ${selectedFavourite.book.name}`);
            }
        } catch (err: any) {
            console.error("Error updating status:", err.message);
        }
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
            <Column title="authorName" dataIndex="authorName" key="authorName" />
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
                            value={favourites.find(fav => fav.book._id === record.key)?.status || "Want to read"}
                            style={{ width: 180 }}
                            onChange={(value) => handleChange(value, record.key)}
                            options={[
                                { value: 'Want to read', label: 'Want To Read' },
                                { value: 'Reading', label: 'Reading' },
                                { value: 'Read', label: 'Read' },
                            ]}
                        />
                    </Space>
                )}
            />
        </Table>
    );
};

export default UserTable;



