import mongoose from 'mongoose';
const { Schema } = mongoose;

const DuelSchema = new Schema(
    {
        _winner: {
            type: Schema.Types.ObjectId,
            ref: 'Cat',
            index: true,
        },
        _loser: {
            type: Schema.Types.ObjectId,
            ref: 'Cat',
            index: true,
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const DuelModel = mongoose.model('Duel', DuelSchema);

export { DuelModel };
