import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Blogs() {
  return <ResourceManager config={resources.blogs} />;
}
