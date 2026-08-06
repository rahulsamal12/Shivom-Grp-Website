import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Testimonials() {
  return <ResourceManager config={resources.testimonials} />;
}
