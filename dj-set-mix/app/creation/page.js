'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "@mui/material";
import {Container, InputGroup, FormControl, Button, Card, Row, Col, Carousel} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Typography, Icon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronRight } from '@mui/icons-material';

const iconStyle = {
    color: '#e1a2f2',
    fontSize: '2rem',
};

const CLIENT_ID = "0e963ff5610343dab902de5b0de48b87"
const CLIENT_SECRET_ID = "b62fc8432dbc421babca7833133de652"

// Helper function to truncate long text
const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function Creation() {
    const [searchFirstInput, setSearchFirstInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [trackData, setTrackData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedTracks, setSelectedTracks] = useState([]);
    const [aiResponse, setAiResponse] = useState("");

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+ CLIENT_ID + '&client_secret=' + CLIENT_SECRET_ID 
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json()) 
            .then(data => setAccessToken(data.access_token))
            
    }, [])

    async function search() {
        console.log("Search for " + searchFirstInput);

        var trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchFirstInput)}&type=track`, trackParameters);
            const data = await response.json();
            
            if (data.tracks && data.tracks.items.length > 0) {
                // Successfully found tracks
                setTrackData(data.tracks.items)  // track array
                console.log(data.tracks.items);
            } else {
                // No tracks found
                console.log("No tracks found.");
                setTrackData([]);
            }
        } catch (error) {
            console.error("Error fetching track data:", error);
        }
    }

    async function fetchTrackFeatures(trackId) {
        const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        const features = await response.json();
        return features; // This will include tempo, key, etc.
    }

    async function selectTrack(track) {
        if(selectedTracks.length < 2) {
            console.log("Selected track ID: " + track.id);

            const features = await fetchTrackFeatures(track.id);
            const trackWithFeatures = {...track, features};

            setSelectedTracks(prevTracks => [...prevTracks, trackWithFeatures]);
        } else {
            console.log("You can only compare two tracks.");
        }
    }

     // Function to request AI's suggestion based on the two selected tracks
     async function generateAISuggestion() {
        if (selectedTracks.length < 2) {
            console.log("Select two tracks to compare.");
            return;
        }

        const trackFeatures = selectedTracks.map(track => ({
            name: track.name,
            tempo: track.features.tempo,
            key: track.features.key,
            mode: track.features.mode,
            time_signature: track.features.time_signature,
            acousticness: track.features.acousticness
        }));

        console.log(trackFeatures);

        try {
            const response = await fetch('/api/analyze-tracks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tracks: trackFeatures, // Sending track features to the API endpoint
                }),
            });

            if (!response.ok) {
                throw new Error('Error generating AI suggestion.');
            }

            const data = await response.json();
            setAiResponse(data.suggestion);
        } catch(error) {
            console.error("Error generating AI response: ", error);
        }
    }
    const TrackInfo = ({ track }) => {
        const {features} = track; 
        return (
            <Container>
                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="h6" component="h2">
                        Name: {track?.name || "N/A"} <br />
                        Artist: {track?.artists?.[0]?.name || "TBD"} <br />
                        Album: {track?.album?.name || "N/A"} <br />
                        Tempo: {features?.tempo || "N/A"} <br />
                        Key: {features?.key || "N/A"} <br />
                        Acousticness: {features?.acousticness || "N/A"} <br />
                        Mode: {features?.mode || "TBD"} <br />
                        Time Signature: {features?.time_signature || "N/A"} <br />
                        Bars: {features?.bars || "N/A"} <br />
                        Beats: {features?.beats || "N/A"} <br />
                    </Typography>
                </Box>
            </Container>
        );
    };

    // Paginate tracks into sets of 6
    const tracksPerPage = 4;
    const paginatedTracks = [];
    for (let i = 0; i < trackData.length; i += tracksPerPage) {
        paginatedTracks.push(trackData.slice(i, i + tracksPerPage));
    }

    // Handle Carousel navigation
    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    return (
        <div className="App">
            <Container>
                <InputGroup className="mb=3" size="lg">
                    <FormControl
                        placeholder="Search For track"
                        type="input"
                        onKeyDown={event => {
                            if(event.key == "Enter") {
                                search(); 
                            }
                        }} 
                        onChange={event => setSearchFirstInput(event.target.value)}
                    /> 
                    <Button onClick={search}>
                        Search
                    </Button>
                </InputGroup>
            </Container>

            <Container>
                {trackData.length > 0 ? (
                    <Carousel
                        activeIndex={currentIndex}
                        onSelect={handleSelect}
                        interval={null}  // Disable auto-scrolling
                        nextIcon= {
                            <Button variant="link" style={{position: 'absolute', right: '-40%', top: '50%', transform: 'translateY(-50%)'}}>
                                <ChevronRightIcon style = {iconStyle} onClick={scroll}/>
                            </Button>
                        }

                        prevIcon= {
                            <Button variant="link" style={{position: 'absolute', left: '-40%', top: '50%', transform: 'translateY(-50%)'}}>
                                <ChevronLeftIcon style = {iconStyle} onClick={scroll}/>
                            </Button>
                        }
                    >
                        {paginatedTracks.map((trackSet, pageIndex) => (
                            <Carousel.Item key={pageIndex}>
                                <Row>
                                    {trackSet.map(track => (
                                        <Col key={track.id} sm={3} md={3} lg={3}>
                                            <Button 
                                                variant="white" 
                                                className="transparent-button" 
                                                style= {{width: '100%', height: '100%'}}
                                                onClick={() => {
                                                    selectTrack(track); // Call selectTrack here
                                                }}>
                                                <Card className="mb-4"
                                                    style={{ 
                                                        width: '100%', 
                                                        height: '260px', 
                                                        overflow: 'hidden' // Ensures uniform height 
                                                    }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={track.album.images && track.album.images.length > 0 
                                                            ? track.album.images[0].url 
                                                            : 'https://via.placeholder.com/150'}
                                                        style={{ height: '160px', objectFit: 'cover' }} // Keeps image aspect ratio
                                                    />
                                                    <Card.Body>
                                                        <Card.Title className="no-underline" style={{ 
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            whiteSpace: 'nowrap', 
                                                            overflow: 'hidden', 
                                                            textOverflow: 'ellipsis', 
                                                            width: '100%'
                                                        }}>
                                                            {truncateText(track.name, 20)} {/* Truncate title */}
                                                        </Card.Title>
                                                        <Typography className="no-underline" style={{
                                                            textDecoration: 'none',
                                                            color: 'inherit'
                                                        }}>
                                                            by {truncateText(track.artists[0].name, 20)}
                                                        </Typography>
                                                    </Card.Body>
                                                </Card>
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p></p>
                )}
            </Container>

            {selectedTracks.length > 0 && (
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2  }}>
                        <Typography variant="h3" sx={{ mb: 2 }}>Tracklist</Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ ml: 2, padding: '4px 8px', minWidth: 'auto' }}
                            onClick={generateAISuggestion}
                        >
                            Mash!
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {selectedTracks.map(track => (
                            <TrackInfo key={track.id} track={track} />
                        ))}
                    </Box>

                    {aiResponse && (
                        <Box sx={{mt: 4}}>
                            <Typography variant="body1">{aiResponse}</Typography>
                        </Box>
                    )}
                </Container>
            )}
        </div>
    );
}