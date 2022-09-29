import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { COLLECTIONS } from "../../../constant/collections";

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.COUNTER,
    timestamps: true,
  },
})

export class Counter {
  @prop({ required: true })
  name: string; //* name:'order'
  @prop({})
  value: number;//* value:i++
  public static async getValue(name) {
    const counter = await CounterModel.findOne({ name });
    if (!counter) {
      await CounterModel.findOneAndUpdate({ name }, { value: 10000 }, { new: true, upsert: true })
    }
    const result = await CounterModel.findOneAndUpdate({ name }, { $inc: { value: 1 } }, { new: true, upsert: true })
    return result?.value
  }
}
export const CounterModel = getModelForClass(Counter)