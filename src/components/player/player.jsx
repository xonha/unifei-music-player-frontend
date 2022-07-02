import { useEffect, useRef } from 'react';
import styles from './player.module.css';
import {
	BsFillPlayCircleFill,
	BsFillPauseCircleFill,
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
} from 'react-icons/bs';

export const Player = (props) => {
	const {
		songs,
		setSongs,
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


	function onPlaying() {
		const newSongs = songs.map((song, index) => {
			if (index === currentSongIndex) {
				return {
					...song,
					progress:
						(audioElement.current.currentTime / audioElement.current.duration) *
						100,
				};
			}
			return song;
		});
		setSongs(newSongs);
	}
	
	return (
		<>
			<div className={styles.player_container}>
				<div className={styles.title}>
					<p>{songs[currentSongIndex].title}</p>
				</div>
				<div className={styles.navigation}>
					<div
						className={styles.navigation_wrapper}
						onClick={checkWidth}
						ref={clickRef}
					>
						<div
							className={styles.seek_bar}
							style={{ width: `${songs[currentSongIndex].progress + '%'}` }}
						></div>
					</div>
				</div>
				<div className={styles.controls}>
					<BsFillSkipStartCircleFill
						className={styles.btn_action}
						onClick={skipBack}
					/>
					{isPlaying ? (
						<BsFillPauseCircleFill
							className={`${styles.btn_action}  ${styles.pp}`}
							onClick={PlayPause}
						/>
					) : (
						<BsFillPlayCircleFill
							className={`${styles.btn_action} ${styles.pp}`}
							onClick={PlayPause}
						/>
					)}
					<BsFillSkipEndCircleFill
						className={styles.btn_action}
						onClick={skiptoNext}
					/>
				</div>
			</div>
			<audio
				src={songs[currentSongIndex].public_url}
				ref={audioElement}
				onTimeUpdate={onPlaying}
			/>
		</>
	);
};
