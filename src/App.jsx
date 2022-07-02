import './main.css';
import { Player } from './components/player/player';
import { useRef, useState, useEffect } from 'react';
import { Tabs } from './components/tabs';
import { Footer } from './components/footer/footer';

const INITIAL_TAB = 'playlist';

export function App() {
	const [songs, setSongs] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState(INITIAL_TAB);

	const audioElement = useRef();

	useEffect(() => {
		fetchSongs();
	}, []);

	// keeps the state of the player (playing/paused)
	useEffect(() => {
		if (!audioElement.current) return;
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [isPlaying]);

	// resets current song progress
	useEffect(() => {
		setSongs((currentSongs) => {
			if (!currentSongs) return;
			return currentSongs.map((song, index) => {
				if (index === currentSongIndex) {
					return {
						...song,
						progress: 0,
					};
				}
				return song;
			});
		});
	}, [currentSongIndex, setSongs]);

	async function fetchSongs() {
		const res = await fetch('http://0.0.0.0:8000/song');
		const data = await res.json();

		const formattedSongs = data.map((dataSong) => ({
			...dataSong,
			progress: 0,
		}));

		setSongs(formattedSongs);
	}

	if (!songs) {
		return <div>Loading...</div>;
	}

	return (
		<div className='AppWrapper'>
			<div className='App'>
				<Tabs
					songs={songs}
					currentSongIndex={currentSongIndex}
					setCurrentSongIndex={setCurrentSongIndex}
					selectedTab={selectedTab}
				/>

				<div className='Layout'>
					<Player
						songs={songs}
						setSongs={setSongs}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						audioElement={audioElement}
						currentSongIndex={currentSongIndex}
						setCurrentSongIndex={setCurrentSongIndex}
					/>
					<Footer setSelectedTab={setSelectedTab} />
				</div>
			</div>
		</div>
	);
}
