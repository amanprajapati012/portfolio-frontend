const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("❌ API BASE URL is missing in .env");
}

export default API_BASE_URL;
