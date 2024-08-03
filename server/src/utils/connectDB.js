import { connect } from "mongoose";
import { errorMessages, successMessages } from "../constants/message.js";

const connectdb = async (uri) => {
	try {
		await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log(successMessages.CONNECT_DB_SUCCESS);
	} catch (error) {
		console.error(errorMessages.CONNECT_DB_FAIL, error.message);
	}
};

export default connectdb;
