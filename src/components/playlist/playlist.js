import './playlist.css';

export function Playlist(props) {
	const { songs, currentSongIndex, setCurrentSong, audioElement } = props;

	function handleSongClick(index) {
		return () => {
			if (index === currentSongIndex) return;
			setCurrentSong({
				...songs[index],
				progress: 0,
				length: audioElement.current.duration,
			});
		};
	}

	return (
		<div className='playlistContainer'>
			<ul className='playListList'>
				{songs.map((song, index) => (
					<li
						className='playlistItem'
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
