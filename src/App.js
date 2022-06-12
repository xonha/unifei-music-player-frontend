import './App.css';
import { Player } from './components/player/player';
import { songsData } from './audios';
import { useRef, useState, useEffect } from 'react';

export function App() {
	const [songs, setSongs] = useState(songsData);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(songsData[1]);

	const audioElement = useRef();

	useEffect(() => {
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [isPlaying]);

	function onPlaying() {
		setCurrentSong({
			...currentSong,
			progress:
				(audioElement.current.currentTime / audioElement.current.duration) *
				100,
			length: audioElement.current.duration,
		});
	}

	return (
		<div className='App'>
			<audio
				src={currentSong.url}
				ref={audioElement}
				onTimeUpdate={onPlaying}
			/>
			<Player
				songs={songs}
				setSongs={setSongs}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				audioElement={audioElement}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
			/>
		</div>
	);
}
