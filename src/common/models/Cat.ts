import mongoose from 'mongoose';

const { Schema } = mongoose;

export const CatSchema = new Schema(
    {
        external_id: {
            type: String,
        },
        picture_url: {
            type: String,
        },
        number_of: {
            votes: {
                type: Number,
                default: 0,
            },
            victories: {
                type: Number,
                default: 0,
            },
            defeats: {
                type: Number,
                default: 0,
            },
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
const CatModel = mongoose.model('Cat', CatSchema);

export { CatModel };
