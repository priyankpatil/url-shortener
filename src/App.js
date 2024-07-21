import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    useEffect(() => {
        console.log('Component mounted');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted with URL:', longUrl);

        const urlPattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');

        const isValid = urlPattern.test(longUrl);
        if (!isValid) {
            alert('Please enter a valid URL');
            return;
        }

        try {
            const response = await axios.post('/api/shorten', { longUrl });
            console.log('Response from API:', response.data);
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error('There was an error shortening the URL!', error);
        }
    };

    return (
        <div className="container">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                />
                <button type="submit">Shorten</button>
            </form>
            {shortUrl && (
                <div>
                    <p>Shortened URL: <a href={shortUrl}>{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
}

export default App;