'use client'


import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "@mui/material";
import {Container, InputGroup, FormControl, Button, Card, Row, Col, Carousel, Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Typography, Icon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronRight } from '@mui/icons-material';
import {Monoton} from 'next/font/google'
import styles from '../page.module.css';
import {motion} from 'framer-motion'
import Link from "next/link";




const monoton = Monoton({subsets: ['latin'], weight: ['400']})


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
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility
    const [currentTrackInfo, setCurrentTrackInfo] = useState(null); // State for track details in modal


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


        const trackParameters = {
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


    async function handleMashButtonClick() {
        if(selectedTracks.length < 2) {
            console.log("You need to select two tracks.");
            return;
        }


        const suggestion = await generateAISuggestion(selectedTracks);
     
        if (suggestion) {
          setAiResponse(suggestion);
          // Optionally, you can show a success message or perform other actions
          console.log("AI Suggestion: ", suggestion);
        } else {
          // Handle errors or display a message indicating no suggestion was generated
          console.error("Error generating AI suggestion");
        }
    }


     // Function to request AI's suggestion based on the two selected tracks
     async function generateAISuggestion(trackFeatures) {
        console.log(trackFeatures);


        try {
            const response = await fetch('/api/analyze-tracks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    trackFeatures, // Sending track features to the API endpoint
                }),
            });


            if (!response.ok) {
                throw new Error('Error generating AI suggestion.');
            }


            const data = await response.json();
            return data.suggestion;
        } catch(error) {
            console.error("Error generating AI response: ", error);
            return null;
        }
    }


    const handleTrackClick = (track) => {
        setCurrentTrackInfo(track); // Set the track info to be shown
        setShowModal(true); // Open the modal
    };


    const handleCloseModal = () => setShowModal(false); // Close the modal


    const pulseVariants = {
        pulse: {
          scale: [1, 1.1, 1],
          opacity: [1, 0.95, 1],
          transition: {
            duration: 1.5,
            ease: 'easeInOut',
            color: "#97fce3",
            repeat: Infinity,
            repeatType: 'loop'
          },
        }
      };


      const colorVariants = {
        colorChange: {
          color: ['#e1a2f2', '#97fce3','#d1ff7a', '#fc979f', '#619eff'],  // Color change from #e1a2f2 to #97fce3 and back
          transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop'
          }
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
        <div className="App" style = {{backgroundColor: "black", minHeight:'100vh'}}>
            <Box sx={{textAlign: 'center', my:1}}>
            <motion.div
              variants = {pulseVariants}
              animate = "pulse"
              style = {{
                display:'inline-block',
              }}
            >
            <motion.div
              variants={colorVariants}
              animate="colorChange"
            >
              <Link href ="/" passHref>
              <Typography
                className={monoton.className}
                variant="h1"
                >
                MIXER AI.
              </Typography>
              </Link>
            </motion.div>
            </motion.div>
          </Box>
            <Container style={{ backgroundColor: 'black'}}>
                <InputGroup className="mb=3" size="lg">
                    <FormControl
                        placeholder="Search for track"
                        type="input"
                        onKeyDown={event => {
                            if(event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchFirstInput(event.target.value)}
                    />
                    <Button onClick={search} style={{
                        backgroundColor: '#e1a2f2',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                    }}>
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
                <Container styles = {{backgroundColor: "black"}}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mb: 1}}>
                        <Typography variant="h3" sx={{ mb: 2 , mb: 1, fontFamily: 'Monoton, sans-serif', color:"#e1a2f2"}} className={monoton.className}>Tracklist</Typography>


                       
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <motion.div variants = {pulseVariants} animate = "pulse">
                        <Button variant="contained" sx={{mt: 4, mr: 4, mt: 4, backgroundColor: '#e1a2f2', '&:hover':{backgroundColor: '#97fce3'}, minWidth:"150px", height:"60px" }} className = "rounded-full bg-white group-hover:bg-accent" onClick={handleMashButtonClick}>
                            Mash!
                        </Button>
                        </motion.div>
                    </Box>
                   


                    <Row>
                        {selectedTracks.map(track => (
                            <Col key = {track.id} sm = {6} md = {6}>
                                <Box sx = {{
                                    padding: 2,
                                    backgroundColor: 'transparent',
                                    borderRadius: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Center align the content
                                    marginBottom: 2 // Space between the cards
                                }}>
                                    <motion.div variants = {pulseVariants} animate = "pulse">
                                    <img
                                        className = {styles['spin-album']}
                                        src={track.album.images && track.album.images.length > 0
                                            ? track.album.images[0].url
                                            : 'https://via.placeholder.com/150'}
                                        alt={track.name}
                                        onClick={() => handleTrackClick(track)} // Open modal on click
                                        style={{
                                            borderRadius: '50%', // Circular album cover
                                            width: '180px', // Set width
                                            height: '180px', // Set height
                                            objectFit: 'cover', // Maintain aspect ratio
                                            marginBottom: '15px' // Space below the image
                                        }}
                                       
                                    />
                                    </motion.div>
                                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color:"#e1a2f2" }} className={monoton.className}>
                                        {track.name || "N/A"}
                                    </Typography>
                                    <Typography variant="body1" sx={{ textAlign: 'center', color: '#97fce3' }}>
                                        {track.artists[0]?.name || "Unknown Artist"}
                                    </Typography>
                                </Box>
                            </Col>
                        ))}
                    </Row>


                    {aiResponse && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body1" color="#ffffff">
                                {/* Assuming aiResponse is now a JSON object or string, display the response */}
                                {typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse, null, 2)}
                            </Typography>
                        </Box>
                    )}
                </Container>
            )}
            {/* Modal to show track details */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Track Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTrackInfo && (
                        <>
                            <Typography variant="h6">
                                Name: {currentTrackInfo?.name || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                Artist: {currentTrackInfo?.artists?.[0]?.name || 'TBD'}
                            </Typography>
                            <Typography variant="body1">
                                Album: {currentTrackInfo?.album?.name || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                Tempo: {currentTrackInfo.features?.tempo || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                Key: {currentTrackInfo.features?.key || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                Beats: {currentTrackInfo.features?.beats || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                Acousticness: {currentTrackInfo.features?.acousticness || 'N/A'}
                            </Typography>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
