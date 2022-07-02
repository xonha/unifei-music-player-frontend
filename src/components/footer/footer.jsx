import styles from './footer.module.css';

export function Footer(props) {
	const { setSelectedTab } = props;

	const TABS = [
		{ icon: 'a', selector: 'playlist' },
		{ icon: 'a', selector: 'albuns' },
		{ icon: 'a', selector: 'artists' },
		{ icon: 'a', selector: 'upload' },
		{ icon: 'a', selector: 'favorites' },
	];

	return (
		<div className={styles.footerContainer}>
			{TABS.map((tab, index) => (
				<div
					key={tab.selector}
					className={styles.footerItem}
					onClick={() => setSelectedTab(tab.selector)}
				>
					{index}
				</div>
			))}
		</div>
	);
}
