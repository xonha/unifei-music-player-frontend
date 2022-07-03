import { useRecoilState, useSetRecoilState } from "recoil";
import AlbumsIcon from "../../assets/icons/albums_icon.svg";
import ArtistsIcon from "../../assets/icons/artists_icon.svg";
import PlaylistsIcon from "../../assets/icons/playlists_icon.svg";
import SongsIcon from "../../assets/icons/songs_icon.svg";
import UploadIcon from "../../assets/icons/upload_icon.svg";
import { HeaderBackFunctionAtom } from "../../atoms/headerBackFunction.atom";
import { SelectedTabAtom } from "../../atoms/selectedTab.atom";
import styles from "./footer.module.css";

export function Footer() {
  const [selectedTab, setSelectedTab] = useRecoilState(SelectedTabAtom);
  const setHeaderState = useSetRecoilState(HeaderBackFunctionAtom);

  const TABS = [
    { icon: SongsIcon, selector: "songs" },
    { icon: AlbumsIcon, selector: "albums" },
    { icon: UploadIcon, selector: "upload" },
    { icon: ArtistsIcon, selector: "artists" },
    { icon: PlaylistsIcon, selector: "playlists" },
  ];

  function handleTabClick(selector) {
    return () => {
      setSelectedTab(selector);
      setHeaderState((prevHeaderState) => ({
        ...prevHeaderState,
        title: selector,
      }));
    };
  }

  return (
    <div className={styles.footerContainer}>
      {TABS.map((tab) => (
        <div
          style={{
            backgroundColor:
              tab.selector === selectedTab ? "rgb(35, 35, 35)" : "transparent",
          }}
          key={tab.selector}
          className={styles.footerItem}
          onClick={handleTabClick(tab.selector)}
        >
          <img
            title={tab.selector}
            src={tab.icon}
            height={30}
            width={30}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
