"use client";

import React, { useEffect, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// If you have a specific type for the video data, define it here
type VideoId = string;

const YtVideos = () => {
  const playlistId = "PLiXWhYdRertSt6ewULFZleJOgEBfiYHpl";
  const [videos, setVideos] = useState<VideoId[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoId | null>(null);

  useEffect(() => {
    const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API Key
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const videoIds: VideoId[] = data?.items?.map(
          (item: any) => item.snippet.resourceId.videoId
        );
        setVideos(videoIds);
        if (videoIds?.length) {
          setCurrentVideo(
            videoIds[Math.floor(Math.random() * videoIds.length)]
          );
        }
      });
  }, [playlistId]);

  //   const handlePrevClick = () => {
  //     const currentIndex = videos.indexOf(currentVideo);
  //     const newIndex = (currentIndex - 1 + videos.length) % videos.length;
  //     setCurrentVideo(videos[newIndex]);
  //   };

  //   const handleNextClick = () => {
  //     const currentIndex = videos.indexOf(currentVideo);
  //     const newIndex = (currentIndex + 1) % videos.length;
  //     setCurrentVideo(videos[newIndex]);
  //   };

  return (
    <div>
      {currentVideo && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1`}
            title="NoireTV Youtube Playlist"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="YT-slides-controls">
            {/* <button onClick={handlePrevClick}>
              <FaChevronLeft />
            </button>
            <button onClick={handleNextClick}>
              <FaChevronRight />
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default YtVideos;
