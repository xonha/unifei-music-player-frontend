import { useRecoilValue } from "recoil";
import CaretLeftIcon from "../../assets/icons/caret_left_icon.svg";
import { HeaderBackFunctionAtom } from "../../atoms/headerBackFunction.atom";
import { SelectedTabAtom } from "../../atoms/selectedTab.atom";
import styles from "./header.module.css";

export function Header() {
  const headerFunction = useRecoilValue(HeaderBackFunctionAtom);
  const selectedTab = useRecoilValue(SelectedTabAtom);

  function formatUppercaseText(text) {
    if (!text) return "";

    const [firstLetter, ...rest] = text;
    return firstLetter.toUpperCase() + rest.join("");
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.textContainer}>
        {headerFunction && (
          <img
            className={styles.returnButton}
            src={CaretLeftIcon}
            alt="back"
            height={30}
            width={30}
            onClick={() => headerFunction()}
          />
        )}
        {formatUppercaseText(selectedTab)}
      </div>
    </div>
  );
}
