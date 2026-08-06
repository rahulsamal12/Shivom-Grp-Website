import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Pages() {
  return <ResourceManager config={resources.pages} />;
}
