
import Link  from "next/link";
import { RiPlayMiniLine } from "react-icons/ri";

export default function RecommendedVideos() {
  const videoData = [
    {
      title: "What Peptides Can Actually Do for Your Body",
      poster: "/Dashboard/rec-vid/purpleBlock.jpg",
      videoSrc: "#",
    },
    {
      title: "Choosing the Right Peptides for Your Health Goals",
      poster: "/Dashboard/rec-vid/bottle.jpg",
      videoSrc: "#",
    },
    {
      title: "How to Use Peptides Safely and Effectively",
      poster: "/Dashboard/rec-vid/insulin.jpg",
      videoSrc: "#",
    },
    {
      title: "How to Use Peptides Safely and Effectively",
      poster: "/Dashboard/rec-vid/insulin.jpg",
      videoSrc: "#",
    },
  ];

  return (
    <div className=" rounded-xl ">
      <div className="flex justify-between items-center py-2">
        <h2 className="txt-28 font-medium text-[#25292A]">
          Recommended Videos
        </h2>

        <span className="cursor-pointer text-[#224674] text-base underline font-semibold hover:text-[#1b3a5c]">
          <Link href="/Dashboard/videos?viewAll=true">View All</Link> 
        </span>
       
      </div>

      <div className="pt-1 flex gap-3   max-xl:flex-wrap  w-full ">
        {videoData.map((video, index) => (
          <div
            key={index}
            className=" grow-1 relative w-full h-[190px] lg:w-[250px] lg:h-[230px] xl:w-[287px] xl:h-[280px] 
            rounded-[12px] overflow-hidden"
            // style={{ boxShadow: "0px 14px 18px 0px #00000040" }}
          >
            <video
              className="w-full h-full object-cover rounded-[12px] no-action"
              poster={video.poster}
            >
              <source src={video.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              className="absolute inset-0 flex items-end justify-center max-lg:justify-between text-white text-center gap-2 p-4 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 44.11%, rgba(0, 0, 0, 0.7) 98.75%)",
              }}
            >
              <h2
                className="txt-20 font-semibold tracking-[0.5%] text-white text-start w-[207px] h-[54px] overflow-hidden"
                style={{
                  fontFamily: "'Afacad Flux', sans-serif",
                  textShadow: "1px 1px 0px #000000",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {video.title}
              </h2>
              <button
                className="relative z-10 w-12 h-12 p-3 rounded-full bg-[#C8E4FC] text-[#224674] 
                flex items-center justify-center backdrop-blur-[24px]"
              >
                <RiPlayMiniLine className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
