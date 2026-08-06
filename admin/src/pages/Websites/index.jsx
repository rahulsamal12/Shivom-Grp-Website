import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Websites() {
  return <ResourceManager config={resources.websites} />;
}
