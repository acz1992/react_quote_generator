import React, { useState, useEffect } from "react";
import rotate from "../Assets/rotate.svg";
import twitter from "../Assets/twitter.svg";
import { typeFitDataSource } from "./DataSources/typeFitDataSource";
import { trumpDataSource } from "./DataSources/trumpDataSource";
import { customQuoteSources } from "./DataSources/customQuoteSources";
import "./RandomQuote.css";

export const RandomQuote = () => {
	const [quote, setQuote] = useState({});
	const [loading, setLoading] = useState(false);

	const getRandomDataSource = () => {
		const dataSource = [
			typeFitDataSource,
			trumpDataSource,
			customQuoteSources,
		][Math.floor(Math.random() * 3)];

		if (
			(dataSource === trumpDataSource ||
				dataSource === typeFitDataSource) &&
			!navigator.onLine
		) {
			console.error("Internet connection is not available.");
			return customQuoteSources;
		}

		return dataSource;
	};

	const getRandomQuote = async (source) => {
		const dataSource = source || getRandomDataSource();

		try {
			const quote = await dataSource.getQuote();

			if (!quote || !quote.quote || !quote.author) {
				throw new Error("Invalid quote structure");
			}

			return { ...quote, source: dataSource.name };
		} catch (error) {
			throw new Error("Error fetching quote from data source");
		}
	};

	const updatePageWithQuote = async () => {
		setLoading(true);

		let randomQuoteResult;
		try {
			randomQuoteResult = await getRandomQuote();
		} catch (error) {
			console.log(error);
			randomQuoteResult = await getRandomDataSource(customQuoteSources);
		}

		const { quote, author = "Unknown", source } = randomQuoteResult;

		setQuote({ quote, author, source });
		setLoading(false);
	};

	const tweetQuote = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				`"${quote.quote}"\n- ${quote.author}\n\nSource: ${quote.source}`
			)}`
		);
	};

	/* const generateRandomColourNumber = () => Math.floor(Math.random() * 255);

	const generateRandomColourCode = () => {
		const r = generateRandomColourNumber();
		const g = generateRandomColourNumber();
		const b = generateRandomColourNumber();

		return { r, g, b };
	};

	const setRandomBackgroundColour = () => {
		const { r, g, b } = generateRandomColourCode();
		document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
	}; */

	useEffect(() => {
		updatePageWithQuote();
	}, []);

	return (
		<div className="container">
			{loading ? (
				<div className="loading">Loading...</div>
			) : (
				<div>
					<div className="quote">{quote.quote}</div>
					<div>
						<div className="line"></div>
						<div className="bottom">
							<div className="author">- {quote.author}</div>
							<div className="icons">
								<img
									onClick={updatePageWithQuote}
									src={rotate}
									alt=""
								/>
								<img
									onClick={tweetQuote}
									src={twitter}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
