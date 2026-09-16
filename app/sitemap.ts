import type { MetadataRoute } from "next"
const routes = ["/", "/case-studies", "/how-we-build", "/knowledge-sharing", "/about", "/contact", "/portfolio", "/achievements", "/architecture", "/ai-operating-system", "/machine-learning-decision-systems", "/lean-value-tree", "/workstreams", "/principles", "/writing", "/case-studies/nbo-nrt-azure-databricks", "/case-studies/telco-churn-mlops", "/case-studies/txttoaudio"]
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(route=>({url:`https://sararin.ai${route}`})) }
