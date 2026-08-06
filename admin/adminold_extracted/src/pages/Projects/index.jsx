import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Projects() {
  return <ResourceManager config={resources.projects} />;
}
