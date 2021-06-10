/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const Mongoose = require('mongoose');

const schema = new Mongoose.Schema(
  {
    name: {
      type: 'String',
      required: [true, 'Nome do planeta é um parâmetro obrigatório'],
    },
    climate: {
      type: 'String',
      required: [true, 'Clima do planeta é um parâmetro obrigatório'],
    },
    terrain: {
      type: 'String',
      required: [true, 'Terreno do planeta é um parâmetro obrigatório'],
    },
    filmsCount: {
      type: 'Number',
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

module.exports = schema;
