import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Team() {
  return <ResourceManager config={resources.team} />;
}
