import React, { useState } from "react";
import "./RandomQuote.css";
import twitter from "../Assets/twitter.svg";
import rotate from "../Assets/rotate.svg";
import { customQuoteSources } from "./DataSources/customQuoteSources";
import { trumpDataSource } from "./DataSources/trumpDataSource";
import { typeFitDataSource } from "./DataSources/typeFitDataSource";

export const RandomQuote = () => {
	let quotes = [];

	async function loadQuotes() {
		const response = await fetch("https://type.fit/api/quotes");
		quotes = await response.json();
		console.log(quotes);
	}

	const random = () => {
		const select = quotes[Math.floor(Math.random() * quotes.length)];
		setQuote(select);
	};

	const [quote, setQuote] = useState({
		text: "Difficulties increase the nearer we get to the goal",
		author: "Johann Wolfgang von Goethe",
	});

	const tweetQuote = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${
				quote.text
			} - ${quote.author.split(",")[0].trim()}`
		);
	};

	loadQuotes();
	return (
		<div className="container">
			<div className="quote">{quote.text}</div>
			<div>
				<div className="line"></div>
				<div className="bottom">
					<div className="author">
						- {quote.author.split(",")[0].trim()}
					</div>
					<div className="icons">
						<img
							onClick={() => {
								random();
							}}
							src={rotate}
							alt=""
						/>
						<img
							src={twitter}
							onClick={() => {
								tweetQuote();
							}}
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
