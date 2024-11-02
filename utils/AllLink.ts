import {
  FaAmazon,
  FaApple,
  FaApplePay,
  FaBandcamp,
  FaBehance,
  FaBlog,
  FaCalendarAlt,
  FaCode,
  FaComment,
  FaCommentAlt,
  FaDiscord,
  FaDownload,
  FaDribbble,
  FaEnvelope,
  FaEtsy,
  FaFacebook,
  FaFacebookMessenger,
  FaFigma,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaGoogleDrive,
  FaGooglePay,
  FaGooglePlay,
  FaInstagram,
  FaKickstarter,
  FaLine,
  FaLinkedin,
  FaMailchimp,
  FaMapMarkerAlt,
  FaMastodon,
  FaMedium,
  FaMicrosoft,
  FaPatreon,
  FaPaypal,
  FaPhone,
  FaPinterest,
  FaProductHunt,
  FaReddit,
  FaSignal,
  FaSlack,
  FaSnapchat,
  FaSpotify,
  FaStackOverflow,
  FaSteam,
  FaTelegram,
  FaTiktok,
  FaTrello,
  FaTumblr,
  FaTwitch,
  FaUnsplash,
  FaVimeo,
  FaWhatsapp,
  FaWordpress,
  FaYoutube,
} from "react-icons/fa";
import {
  FaBluesky,
  FaGoogleScholar,
  FaHashnode,
  FaLetterboxd,
  FaShop,
  FaThreads,
  FaUpwork,
  FaXTwitter,
} from "react-icons/fa6";
import {
  SiAmazonmusic,
  SiApplemusic,
  SiApplepodcasts,
  SiAwsamplify,
  SiBuymeacoffee,
  SiCalendly,
  SiCashapp,
  SiDevdotto,
  SiDiscogs,
  SiFiverr,
  SiGofundme,
  SiGoodreads,
  SiKofi,
  SiMicrosoftazure,
  SiNetlify,
  SiNotion,
  SiOnlyfans,
  SiReaddotcv,
  SiRedbubble,
  SiRevolut,
  SiTrakt,
  SiVercel,
  SiZoom,
} from "react-icons/si";

const AllLink = [
  {
    name: "Github",
    icon: FaGithub,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    className: "bg-blue-600 text-white",
  },
  {
    name: "Netlify",
    icon: SiNetlify,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "AWS Amplify",
    icon: SiAwsamplify,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Figma",
    icon: FaFigma,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Buy me a Coffee",
    icon: SiBuymeacoffee,
    className: "bg-[#ffdd00] border-2 border-black text-black",
  },
  {
    name: "Amazon",
    icon: FaAmazon,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Amazon Music",
    icon: SiAmazonmusic,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Apple",
    icon: FaApple,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Apple Music",
    icon: SiApplemusic,
    className: "bg-[#FA243C] text-black border-2 border-black",
  },
  {
    name: "Apple Podcasts",
    icon: SiApplepodcasts,
    className: "bg-[#9933CC] text-black border-2 border-black",
  },
  {
    name: "Apple Pay",
    icon: FaApplePay,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Bandcamp", icon: FaBandcamp, className: "bg-sky-500 text-white" },
  { name: "Behance", icon: FaBehance, className: "bg-blue-600 text-white" },
  {
    name: "Bluesky",
    icon: FaBluesky,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Calendly", icon: SiCalendly, className: "bg-blue-500 text-white" },
  {
    name: "Cash App",
    icon: SiCashapp,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Dev.to",
    icon: SiDevdotto,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Discogs",
    icon: SiDiscogs,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Discord", icon: FaDiscord, className: "bg-blue-800 text-white" },
  {
    name: "Dribbble",
    icon: FaDribbble,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Etsy", icon: FaEtsy, className: "bg-orange-500 text-white" },
  { name: "Facebook", icon: FaFacebook, className: "bg-blue-600 text-white" },
  {
    name: "Messenger",
    icon: FaFacebookMessenger,
    className: "bg-blue-600 text-white",
  },
  { name: "Fiverr", icon: SiFiverr, className: "bg-emerald-500 text-white" },
  { name: "Gitlab", icon: FaGitlab, className: "bg-indigo-600 text-white" },
  {
    name: "GoFundMe",
    icon: SiGofundme,
    className: "bg-emerald-600 text-white",
  },
  {
    name: "Goodreads",
    icon: SiGoodreads,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Google Drive",
    icon: FaGoogleDrive,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Google Pay",
    icon: FaGooglePay,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "PlayStore",
    icon: FaGooglePlay,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Google Scholar",
    icon: FaGoogleScholar,
    className: "bg-white text-black border-black border-2",
  },
  {
    name: "Hashnode",
    icon: FaHashnode,
    className: "bg-white text-black border-black border-2",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    className: "bg-pink-600 text-white",
  },
  {
    name: "Kick",
    icon: FaKickstarter,
    className: "bg-black text-white border-white border-2",
  },
  { name: "ko-fi", icon: SiKofi, className: "bg-sky-400 text-white" },
  {
    name: "Letterboxd",
    icon: FaLetterboxd,
    className: "bg-gray-800 text-white border-2 border-white",
  },
  { name: "Line", icon: FaLine, className: "bg-green-500 text-white" },
  { name: "Linkedin", icon: FaLinkedin, className: "bg-blue-700 text-white" },
  {
    name: "MailChimp",
    icon: FaMailchimp,
    className: "bg-yellow-300 text-black",
  },
  {
    name: "Mastodon",
    icon: FaMastodon,
    className: "bg-indigo-900 text-white",
  },
  {
    name: "Medium",
    icon: FaMedium,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Microsoft",
    icon: FaMicrosoft,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "Azure",
    icon: SiMicrosoftazure,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Notion",
    icon: SiNotion,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Onlyfans",
    icon: SiOnlyfans,
    className: "bg-sky-500 text-white",
  },
  {
    name: "Patreon",
    icon: FaPatreon,
    className: "bg-black border-2 border-white text-white",
  },
  { name: "PayPal", icon: FaPaypal, className: "bg-blue-900 text-white" },
  {
    name: "Pinterest",
    icon: FaPinterest,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Product Hunt",
    icon: FaProductHunt,
    className: "bg-white text-black border-2 border-black",
  },
  {
    name: "Read.cv",
    icon: SiReaddotcv,
    className: "bg-black text-white border-2 border-white",
  },
  {
    name: "Redbubble",
    icon: SiRedbubble,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Reddit", icon: FaReddit, className: "bg-orange-600 text-white" },
  {
    name: "Revolut",
    icon: SiRevolut,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Signal", icon: FaSignal, className: "bg-blue-500 text-white" },
  {
    name: "Slack",
    icon: FaSlack,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Snapchat", icon: FaSnapchat, className: "bg-yellow-300 text-black" },
  { name: "Spotify", icon: FaSpotify, className: "bg-green-500 text-black" },
  {
    name: "Stackoverflow",
    icon: FaStackOverflow,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Steam", icon: FaSteam, className: "bg-blue-500 text-white" },
  { name: "Telegram", icon: FaTelegram, className: "bg-blue-400 text-white" },
  {
    name: "Threads",
    icon: FaThreads,
    className: "bg-black text-white border-2 border-white",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    className: "bg-black text-white border-2 border-white",
  },
  { name: "Trakt", icon: SiTrakt, className: "bg-red-700 text-white" },
  { name: "Trello", icon: FaTrello, className: "bg-blue-600 text-white" },
  {
    name: "Tumblr",
    icon: FaTumblr,
    className: "bg-black text-white border-white border-2",
  },
  { name: "Twitch", icon: FaTwitch, className: "bg-purple-500 text-white" },
  {
    name: "Unsplash",
    icon: FaUnsplash,
    className: "bg-white text-black border-2 border-black",
  },
  { name: "Upwork", icon: FaUpwork, className: "bg-green-600 text-white" },
  { name: "Vimeo", icon: FaVimeo, className: "bg-cyan-500 text-white" },
  { name: "Whatsapp", icon: FaWhatsapp, className: "bg-gray-600  text-white" },
  {
    name: "Wordpress",
    icon: FaWordpress,
    className: "bg-blue-900 text-white",
  },
  {
    name: "X",
    icon: FaXTwitter,
    className: "bg-black text-white border-white border-2",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    className: "bg-black text-white border-white border-2",
  },
  { name: "Zoom", icon: SiZoom, className: "bg-blue-600 text-white" },
  // Generic
  { name: "Blog", icon: FaBlog, className: "bg-blue-600 text-white" },
  { name: "Event", icon: FaCalendarAlt, className: "bg-blue-600 text-white" },
  { name: "Download", icon: FaDownload, className: "bg-blue-600 text-white" },
  { name: "Code", icon: FaCode, className: "bg-blue-600 text-white" },
  { name: "Email", icon: FaEnvelope, className: "bg-blue-600 text-white" },
  { name: "Map", icon: FaMapMarkerAlt, className: "bg-blue-600 text-white" },
  { name: "Phone", icon: FaPhone, className: "bg-blue-600 text-white" },
  { name: "Review", icon: FaCommentAlt, className: "bg-blue-600 text-white" },
  { name: "Shopping", icon: FaShop, className: "bg-blue-600 text-white" },
  { name: "Message", icon: FaComment, className: "bg-blue-600 text-white" },
  { name: "Web", icon: FaGlobe, className: "bg-blue-600 text-white" },
];

export default AllLink;
