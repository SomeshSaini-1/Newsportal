import { useNavigate } from "react-router-dom";
// import Nav from "../component/Nav";
import NewsBox from "../component/Newsbox";
import { Rightbar } from "../component/Rightbar";

const Home = () => {
  const dataarr = [
    {
      title:
        "Several dozen killed in explosion and fire at bar in Swiss ski resort Crans-Montana",
      source: "Reuters / Various",
      description:
        "Dozens dead and over 100 injured after a massive explosion and fire ripped through a crowded New Year's Eve bar in the luxury Alpine resort of Crans-Montana, Switzerland.",
      imageUrls: [
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2026-01/260101-switzerland-fire-ha-4c88e7.jpg",
        "https://www.geo.tv/assets/uploads/updates/2026-01-01/642607_7868716_updates.jpg",
        "https://i.dawn.com/large/2026/01/01123757285fa9b.webp",
      ],
    },
    {
      title:
        "Zohran Mamdani sworn in as New York City mayor in historic midnight ceremony",
      source: "Reuters / AP / NYT",
      description:
        "Zohran Mamdani was officially sworn in as NYC's first Muslim and South Asian mayor just after midnight on January 1, 2026, in the historic old City Hall subway station.",
      imageUrls: [
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2026-01/260101-mamdani-swearing-in-cc-1211a-b108b5.jpg",
        "https://i.ytimg.com/vi/zj4hZVxitpU/maxresdefault.jpg",
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/1024x683+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Ffa%2F56%2F39ee08ec46cbb14c7768d2723970%2Fgettyimages-2253640293.jpg",
      ],
    },
    {
      title:
        "Goa govt dismisses Arpora Sarpanch & Panchayat Secretary for 'persistent negligence' in Birch nightclub fire tragedy",
      source: "ANI / Various",
      description:
        "Following the December 2025 fire at Birch by Romeo Lane nightclub in Arpora that killed 25 people, the Goa government has dismissed the local sarpanch and secretary citing serious lapses in approvals and oversight.",
      imageUrls: [
        "https://live-production.wcms.abc-cdn.net.au/cc181955f40992b8a6f9014224d244e2?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485",
        "https://media.assettype.com/outlooktraveller%2F2025-12-07%2Fbyrft52b%2FG7if5gWaYAA6PN0.jpg?w=480&auto=format%2Ccompress",
        "https://static.toiimg.com/thumb/msid-125812665,imgsize-593453,width-400,height-225,resizemode-72/fire-at-a-nightclub-in-goa-claimed-at-least-twenty-five-lives-primarily-staff-members-trapped-in-the-basement.jpg",
      ],
    },
    {
      title:
        "'Want to end war, not Ukraine' – Zelenskyy vows not to sign weak peace deal",
      source: "Reuters / Various",
      description:
        "In his New Year's address, Ukrainian President Volodymyr Zelenskyy stated that Ukraine seeks peace but will reject any 'weak' agreement that could prolong the conflict or compromise the country's future.",
      imageUrls: [
        "https://www.aljazeera.com/wp-content/uploads/2025/11/AP25325619978339-1763753760.jpg?resize=770%2C513&quality=80",
        "https://img.lemde.fr/2025/11/19/0/0/2717/1811/1440/960/60/0/c6f97bd_ftp-import-images-1-thmy5t5zqijx-5472041-01-06.jpg",
        "https://d3i6fh83elv35t.cloudfront.net/static/2025/12/2025-12-10T200439Z_431824153_RC2ECIA4BAGA_RTRMADP_3_UKRAINE-CRISIS-USA-ZELENSKIY-1024x683.jpg",
      ],
    },
  ];


  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Top Stories */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 inline-block">
            Top Stories
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Main Story */}
            <div className="md:col-span-1 shadow-lg p-2 group cursor-pointer"  onClick={() =>  navigate("/details")}>
              <div className="bg-gray-200 border-2  rounded-xl w-full h-96 mb-4 bg-cover bg-center transition-transform 
              group-hover:scale-[1.02]"
                style={{ backgroundImage: `url('https://i.dawn.com/large/2026/01/01123757285fa9b.webp')` }} // Use first image or add carousel
              ></div>{" "}
              {/* Placeholder for large image */}
              <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-red-700 transition-colors">
                Begums of Bangladesh: When rivals Khaleda Zia & Sheikh Hasina
                joined hands to topple dictatorship
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Debdutta Chakraborty - December 30, 2025
              </p>
              <p className="text-gray-700">
                Their much talked about brief alliance, despite differences,
                helped end nearly a decade of dictatorship under General
              </p>
            </div>

            {/* Smaller Stories */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div  className="group cursor-pointer" onClick={() =>  navigate("/details")}>
                <div className="bg-gray-200 border-2  rounded-xl w-full h-48 mb-4 bg-cover bg-center
                 transition-transform group-hover:scale-[1.02]"
                style={{ backgroundImage: `url('https://i.dawn.com/large/2026/01/01123757285fa9b.webp')` }} // Use first image or add carousel
              ></div>
                <h4 className="font-semibold leading-tight mb-1 group-hover:text-red-700 transition-colors">
                  Dehradun, Bareilly, Tamil Nadu attack— Indians are turning
                  violent. Don't keep blaming politics
                </h4>
                <p className="text-sm text-gray-600">
                  Vir Sanghvi - December 30, 2025
                </p>
              </div>

                  <div  className="group cursor-pointer"  onClick={() =>  navigate("/details")}>
                <div className="bg-gray-200 border-2  rounded-xl w-full h-48 mb-4 bg-cover bg-center transition-transform group-hover:scale-[1.02]"
                style={{ backgroundImage: `url('https://i.dawn.com/large/2026/01/01123757285fa9b.webp')` }} // Use first image or add carousel
              ></div>
                <h4 className="font-semibold leading-tight mb-1 group-hover:text-red-700 transition-colors">
                  Dehradun, Bareilly, Tamil Nadu attack— Indians are turning
                  violent. Don't keep blaming politics
                </h4>
                <p className="text-sm text-gray-600">
                  Vir Sanghvi - December 30, 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        <Rightbar />
      </div>

      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold leading-tight">
            GET THE YEAR-END OFFER
            <br />
            <span className="text-xl">3 years of ThePrint for Rs. 10,000</span>
          </p>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-md transition-colors whitespace-nowrap">
          Subscribe Now
        </button>
      </div>

      <NewsBox dataarr={dataarr} title={"Latest"}/>
      <NewsBox dataarr={dataarr} title={"Opinion"}/>
      <NewsBox dataarr={dataarr} title={"Politics"}/>
      <NewsBox dataarr={dataarr} title={"Ground Reports"}/>
    </div>
  );
};

export default Home;
