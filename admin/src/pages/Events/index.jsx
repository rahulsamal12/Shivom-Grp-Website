import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Events() {
  return <ResourceManager config={resources.events} />;
}
