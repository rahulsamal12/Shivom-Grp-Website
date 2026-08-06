import ResourceManager from "../../components/ResourceManager.jsx";
import { resources } from "../../utils/resourceConfigs.js";

export default function Contacts() {
  return <ResourceManager config={resources.contacts} />;
}
