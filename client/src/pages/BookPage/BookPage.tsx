import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {  Button, Row, Col, Typography, Spin, Rate, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

export interface Book {
    photo: string;
    name: string;
    categoryName: string;
    authorName: string;
    description: string; // Placeholder for the description
}

const BookPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchBook = async () => {
        try {
            const response = await axios.get<Book>(`http://localhost:8080/books/${bookId}`);
            setBook(response.data);
            
            const ratingUrl = `http://localhost:8080/books/${bookId}/average-rating`;
            const ratingResponse = await axios.get<{ averageRating: number }>(ratingUrl);
            setAverageRating(ratingResponse.data.averageRating);
    
        } catch (error) {
            setError('Failed to fetch book data or rating.');
        } finally {
            setLoading(false);
        }
        };
        fetchBook();
    }, [bookId]);

    const addToFavorites = async () => {
        
    };

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!book) {
        return <div>No book found.</div>;
    }

    return (
    <Card style={{backgroundColor: '#fff'}}>
        <div className="container mx-auto p-4">
        <Row gutter={[32, 16]} align="top">
            {/* Left Column: Book Image */}
            <Col xs={24} md={8}>
            <img
                src={`http://localhost:8080/${book.photo}`}
                // src={'./../../../public/book cover place holder.jpg'}
                alt={book.name}
                className="w-full h-full object-cover"
                style={{ maxHeight: '40rem' }}
            />
            </Col>

            {/* Right Column: Book Info */}
            <Col xs={24} md={16}>
            <Title level={1}>{book.name}</Title>

            <Text strong>by {book.authorName}</Text>
            <Text>(Author)</Text>



            <div style={{ marginTop: '12px' }}>
                {/* Display the average rating */}
                <Rate disabled defaultValue={averageRating || 0} />{' '}



                <Paragraph style={{ marginTop: '12px' }}>
                <strong>Category:</strong> {book.categoryName}
                </Paragraph>


                <Paragraph style={{ marginTop: '20px' }}>
                {book.description || "This is a placeholder for the book's description. The description will provide a summary of the book's plot, characters, and themes.This is a placeholder for the book's description. The description will provide a summary of the book's plot, characters, and themes.This is a placeholder for the book's description. The description will provide a summary of the book's plot, characters, and themes."}
                </Paragraph>


                <Button  style={{marginTop: '25px'}} type="primary" size="large" onClick={addToFavorites}>
                Add to Favorites
                </Button>
            </div>
            </Col>
        </Row>
        </div>
    </Card>
    );
    };

export default BookPage;
