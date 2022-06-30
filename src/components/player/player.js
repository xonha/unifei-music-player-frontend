import { useEffect, useRef } from 'react';
import './player.css';
import {
	BsFillPlayCircleFill,
	BsFillPauseCircleFill,
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
} from 'react-icons/bs';

export const Player = (props) => {
	const {
		songs,
		audioElement,
		isPlaying,
		setIsPlaying,
		currentSongIndex,
		setCurrentSongIndex,
	} = props;

	const clickRef = useRef();

	useEffect(() => {
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [currentSongIndex, audioElement, isPlaying]);

	function PlayPause() {
		setIsPlaying(!isPlaying);
	}

	function checkWidth(e) {
		let width = clickRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;
		const progressBar = (offset / width) * 100;
		audioElement.current.currentTime =
			(progressBar / 100) * songs[currentSongIndex].duration;
	}

	function skipBack() {
		if (currentSongIndex === 0) setCurrentSongIndex(songs.length - 1);
		else setCurrentSongIndex(currentSongIndex - 1);
	}

	function skiptoNext() {
		if (currentSongIndex === songs.length - 1) setCurrentSongIndex(0);
		else setCurrentSongIndex(currentSongIndex + 1);
	}

	return (
		<div className='player_container'>
			<div className='title'>
				<p>{songs[currentSongIndex].title}</p>
			</div>
			<div className='navigation'>
				<div className='navigation_wrapper' onClick={checkWidth} ref={clickRef}>
					<div
						className='seek_bar'
						style={{ width: `${songs[currentSongIndex].progress + '%'}` }}
					></div>
				</div>
			</div>
			<div className='controls'>
				<BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
				{isPlaying ? (
					<BsFillPauseCircleFill
						className='btn_action pp'
						onClick={PlayPause}
					/>
				) : (
					<BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />
				)}
				<BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext} />
			</div>
		</div>
	);
};
