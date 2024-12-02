import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: string;
  title: string;
  price: number;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: {
    type: String,
    required: true,
    maxlength: 30,
    match: /^[A-Za-z\s-]+$/,
  },
  price: { type: Number, required: true, min: 1, maxlength: 30 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
