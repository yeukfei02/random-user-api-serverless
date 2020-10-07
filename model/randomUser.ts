import mongoose from 'mongoose';
import moment from 'moment';
import momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const randomUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  gender: { type: String, required: true },
  name: { type: mongoose.Schema.Types.Mixed, required: true },
  location: { type: mongoose.Schema.Types.Mixed, required: true },
  email: { type: String, required: true },
  dob: { type: mongoose.Schema.Types.Mixed, required: true },
  registered: { type: mongoose.Schema.Types.Mixed, required: true },
  phone: { type: String, required: true },
  picture: { type: mongoose.Schema.Types.Mixed, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const randomUserModel = mongoose.model('RandomUser', randomUserSchema);

export default randomUserModel;
