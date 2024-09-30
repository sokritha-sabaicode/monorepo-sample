import Agenda from "agenda";
import { sendNewRegistrationNotification } from "@/src/jobs/notify-new-registration.job";

export const SCHEDULE_JOBS = {
  NOTIFICATION_NEW_REGISTRATION: 'notify-new-registration'
}

export const registerJobs = (agenda: Agenda) => {
  agenda.define(SCHEDULE_JOBS.NOTIFICATION_NEW_REGISTRATION, sendNewRegistrationNotification)
}