import { useBreakpointValue } from "@chakra-ui/react";

  // export const sliceLength = useBreakpointValue({
  //   base: 120, // smaller screens
  //   sm: 180,
  //   md: 250,
  //   lg: 320, // large screens
  // });

  
//  export  const displayText =
//     slide.body.length > sliceLength
//       ? `${slide.body.slice(0, sliceLength)}...`
//       : slide.body;

export const getVideoThumbnail = (url) => {
  if (!url) return "/placeholder.png"; // fallback

  // 🟡 YOUTUBE
  const youtubeMatch = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?/ ]{11})/
  );
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  // 🟢 VIMEO
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    // Vimeo thumbnails require an API, so we use a placeholder for now
    return "/vimeo-placeholder.jpg";
  }

  // 🟠 OTHER SOURCES — fallback
  return "/placeholder.png";
};
