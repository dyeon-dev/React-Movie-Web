import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "../Sections/MainImage";
import StarRating from "./StarRating";
import styles from "./SlideCard.module.css"

export default function TvDetail({ tvId, onClose }) {
  const [tv, setTv] = useState(null);
  const [Casts, setCasts] = useState([]);

  useEffect(() => {
    let endpointCrew = `${API_URL}tv/${tvId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}tv/${tvId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setTv(response);
      });

      fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast.slice(0, 3));
      });
  }, [tvId]);

  if (!tv) return null;
  let voteAverage = tv.vote_average.toFixed(1);
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relsative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-black px-4 pb-4 pt-5">
              <MainImage
                image={`${IMAGE_BASE_URL}original${tv.backdrop_path}`}
                title={tv.original_title}
              />
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-white"
                  >
                    <div className="flex space-x-2 ">
                      <span className={styles.info}>{tv.first_air_date}</span>
                      <span className={styles.info}>
                      <div className="flex space-x-2">
                        {tv.genres &&
                        tv.genres.map((g, index) => (
                          <p key={g.id}>
                            {g.name}
                            {index < tv.genres.length - 1 && ","}
                          </p>
                        ))}</div>
                        </span>
                    </div>

                    <br />
                    <StarRating voteAverage={voteAverage}/>
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-lg text-white">
                      Casts:{" "}
                      {Casts.map((cast, index) => (
                        <span key={index}>
                          {cast.original_name}
                          {index < Casts.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="text-sm text-white">{tv.overview}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
