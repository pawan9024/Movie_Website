// import axios from "axios";
// import dotenv from 'dotenv'
// dotenv.config()
// export const fetchFromTMDB = async (url) => {
// 	const options = {
// 		headers: {
// 			accept: "application/json",
// 			Authorization: "Bearer " + process.env.TMDB_API_KEY,
// 		},
// 	};

// 	const res = await axios.get(url, options);

// 	if (res.status !== 200) {
// 		throw new Error("Failed to fetch data from TMDB" + res.statusText);
// 	}

// 	return res.data;
// };
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const fetchFromTMDB = async (url) => {
    const apiKey = process.env.TMDB_API_KEY;
    let finalUrl = url;

    // Add api_key to query string if not present
    if (!finalUrl.includes("api_key=")) {
        finalUrl += (finalUrl.includes("?") ? "&" : "?") + "api_key=" + apiKey;
    }

    const res = await axios.get(finalUrl, {
        headers: {
            accept: "application/json"
        }
    });

    if (res.status !== 200) {
        throw new Error("Failed to fetch data from TMDB: " + res.statusText);
    }

    return res.data;
};
