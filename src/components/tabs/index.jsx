import { Playlist } from './playlist/playlist';

export function Tabs(props) {
	const { selectedTab, songs, currentSongIndex,setCurrentSongIndex } = props;

	const TABS = {
		playlist: (
			<Playlist
				songs={songs}
				currentSongIndex={currentSongIndex}
				setCurrentSongIndex={setCurrentSongIndex}
			/>
		),
	};

	return <>{TABS[selectedTab]}</>;
}
