const mongoose =require('mongoose');
const CounterSchema = new mongoose.Schema({
    counter: {
      type: Number,
      required: true,
      default :0
    },
    type: {
      type: String,
      enum : ['ORDER']
    },
  });



module.exports = mongoose.model("counter",CounterSchema);
