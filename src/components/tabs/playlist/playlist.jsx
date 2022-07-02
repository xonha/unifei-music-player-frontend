import styles from './playlist.module.css';

export function Playlist(props) {
	const { songs, currentSongIndex, setCurrentSongIndex } = props;

	function handleSongClick(index) {
		return () => {
			if (index === currentSongIndex) return;
			setCurrentSongIndex(index);
		};
	}

	return (
		<div className={styles.playlistContainer}>
			<ul className={styles.playListList}>
				{songs.map((song, index) => (
					<li
						className={styles.playlistItem}
						key={song.title}
						style={{
							backgroundColor:
								currentSongIndex === index ? 'black' : 'transparent',
						}}
						onClick={handleSongClick(index)}
					>
						{song.title}
					</li>
				))}
			</ul>
		</div>
	);
}
