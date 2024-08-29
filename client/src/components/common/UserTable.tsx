import React, { useEffect, useState } from 'react';
import { Space, Table, Select, Rate } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    photo: string;
};

type FavouriteType = {
    book: BookType;
    status: string;
    rate: number;
    avgrate:number;
    _id: string;
};

const UserTable: React.FC<UserTableProps> = ({ userId }) => {
    const [favourites, setFavourites] = useState<FavouriteType[]>([]);
    const [booksData, setBooksData] = useState<BookDataType[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavourites = async (uId: string) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/getuserfavourite`, { userId: uId });
                const favData = response.data;

                setFavourites(favData);

                const updatedBooksData = await Promise.all(favData.map(async (fav: FavouriteType) => {
                    const avgRateResponse = await axios.get(`${import.meta.env.VITE_API_URL}/books/${fav.book._id}/average-rating`);
                    const avgRate = avgRateResponse.data.averageRating;

                    return {
                        key: fav.book._id,
                        cover: fav.book.photo,
                        name: fav.book.name,
                        authorName: fav.book.authorName,
                        avgrate: avgRate,
                        rating: fav.rate,
                    };
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
            const selectedFavourite = favourites.find(fav => fav.book._id === key);
            let updatedFavourites = favourites;

            if (selectedFavourite) {
                if (value.match('[12345]')) {
                    const payload = {
                        userId,
                        bookId: selectedFavourite.book._id,
                        newRate: value,
                    };
                    await axios.put(`${import.meta.env.VITE_API_URL}/users/userfavourite/updateRate`, payload);

                    updatedFavourites = favourites.map(fav =>
                        fav.book._id === key ? { ...fav, rate: parseInt(value) } : fav
                    );
                } else {
                    const payload = {
                        userId,
                        bookId: selectedFavourite.book._id,
                        newStatus: value,
                    };
                    await axios.put(`${import.meta.env.VITE_API_URL}/users/userfavourite`, payload);

                    updatedFavourites = favourites.map(fav =>
                        fav.book._id === key ? { ...fav, status: value } : fav
                    );
                }

                setFavourites(updatedFavourites);

                const updatedBooksData = updatedFavourites.map((fav: FavouriteType) => ({
                    key: fav.book._id,
                    cover: fav.book.photo,
                    name: fav.book.name,
                    authorName: fav.book.authorName,
                    avgrate: fav.avgrate,
                    rating: fav.rate,
                }));

                setBooksData(updatedBooksData);
            }
        } catch (err: any) {
            console.error("Error updating status:", err.message);
        }
    };

    const handleBookClick = (bookId: string) => {
        navigate(`/Books/${bookId}`);
    };

    return (
        <Table dataSource={booksData}>
            <Column
                title="Cover"
                dataIndex="cover"
                key="cover"
                render={(_: any, record: BookDataType) => (
                    <img src={`${import.meta.env.VITE_API_URL}/` + record.cover} width="70px" alt="cover" />
                )}
            />
            <Column
                title="Name"
                dataIndex="name"
                key="name"
                render={(_: any, record: BookDataType) => (
                    <span
                        style={{ color: 'gray', cursor: 'pointer' }}
                        onClick={() => handleBookClick(record.key.toString())}
                    >
                        {record.name}
                    </span>
                )}
            />
            <Column title="Author Name" dataIndex="authorName" key="authorName" />
            <Column
                title="AVG Rate"
                dataIndex="avgrate"
                key="avgrate"
                render={(text: any) => <Rate disabled defaultValue={text} />}
            />
            <Column
                title="Rating"
                dataIndex="rating"
                key="rating"
                render={(text: any, record: BookDataType) => (
                    <Rate
                        onChange={(value) => handleChange(String(value), record.key)}
                        defaultValue={text}
                    />
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

