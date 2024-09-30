import configs from "@/src/config";
import { registerJobs } from "@/src/jobs";
import Agenda from "agenda";

const agenda = new Agenda({ db: { address: `${configs.mongodbUrl}` } });

registerJobs(agenda);

export default agenda;