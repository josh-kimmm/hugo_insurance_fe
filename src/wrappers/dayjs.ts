import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Dayjs } from "dayjs";

dayjs.extend(relativeTime);


export type { Dayjs };


export default dayjs;