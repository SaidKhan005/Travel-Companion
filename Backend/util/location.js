const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDOGgrdx4LtlOhWhw-Y3ERcFiSL-qjNhzY";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    // encoded uri converts the address string to a url friendly format
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  //  axios gives us a data field with the response data
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
