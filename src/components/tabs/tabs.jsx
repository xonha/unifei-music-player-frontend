import { useRecoilValue } from "recoil";
import { SelectedTabAtom } from "../../atoms/selectedTab.atom";
import { AlbumsComponent } from "./albums/albums";
import { ArtistsComponent } from "./artists/artists";
import { PlaylistsComponent } from "./playlists/playlists";
import { SongsComponent } from "./songs/songs";
import styles from "./tabs.module.css";
import { UploadComponent } from "./upload/upload";

export function Tabs() {
  const selectedTab = useRecoilValue(SelectedTabAtom);

  const TABS = {
    songs: <SongsComponent />,
    albums: <AlbumsComponent />,
    artists: <ArtistsComponent />,
    upload: <UploadComponent />,
    playlists: <PlaylistsComponent />,
  };

  return <div className={styles.tabsWrapper}>{TABS[selectedTab]}</div>;
}
