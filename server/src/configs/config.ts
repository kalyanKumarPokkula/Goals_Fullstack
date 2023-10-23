import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DBURL = process.env.DBURL;
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS;
const DOMAIN = process.env.DOMAIN;

export { PORT, DBURL, EMAIL_ID, EMAIL_PASS, DOMAIN };
