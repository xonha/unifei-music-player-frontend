import { useRef } from 'react';
import './player.css';
import {
	BsFillPlayCircleFill,
	BsFillPauseCircleFill,
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
} from 'react-icons/bs';

export const Player = ({
	songs,
	audioElement,
	isPlaying,
	setIsPlaying,
	currentSong,
	setCurrentSong,
}) => {
	const clickRef = useRef();

	function PlayPause() {
		setIsPlaying(!isPlaying);
	}

	function checkWidth(e) {
		let width = clickRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;
		const progressBar = (offset / width) * 100;
		audioElement.current.currentTime = (progressBar / 100) * currentSong.length;
	}

	function skipBack() {
		const index = songs.findIndex((x) => x.title === currentSong.title);
		if (index === 0) setCurrentSong(songs[songs.length - 1]);
		else setCurrentSong(songs[index - 1]);
		audioElement.current.currentTime = 0;
	}

	function skiptoNext() {
		const index = songs.findIndex((x) => x.title === currentSong.title);
		if (index === songs.length - 1) setCurrentSong(songs[0]);
		else setCurrentSong(songs[index + 1]);
		audioElement.current.currentTime = 0;
	}

	return (
		<div className='player_container'>
			<div className='title'>
				<p>{currentSong.title}</p>
			</div>
			<div className='navigation'>
				<div className='navigation_wrapper' onClick={checkWidth} ref={clickRef}>
					<div
						className='seek_bar'
						style={{ width: `${currentSong.progress + '%'}` }}
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
