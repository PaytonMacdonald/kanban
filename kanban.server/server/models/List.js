import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default List
